import { type FormEvent, useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { Footer } from "~/components/footer";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const upload = () => {
  const { auth, isLoading, fs, kv, ai } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!auth.isAuthenticated) navigate("/auth?next=/upload");
  }, [auth.isAuthenticated, isLoading, navigate]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    try {
      setStatusText("Uploading the file...");
      const uploadedFile = await fs.upload([file]);
      console.log("Uploaded file:", uploadedFile);

      if (!uploadedFile) {
        setStatusText("Error: Failed to upload file");
        setIsProcessing(false);
        return;
      }

      setStatusText("Converting to image...");
      const imageFile = await convertPdfToImage(file);
      console.log("Converted image:", imageFile);

      if (!imageFile.file) {
        setStatusText("Error: Failed to convert PDF to image");
        setIsProcessing(false);
        return;
      }

      setStatusText("Uploading the image...");
      const uploadedImage = await fs.upload([imageFile.file]);
      console.log("Uploaded image:", uploadedImage);

      if (!uploadedImage) {
        setStatusText("Error: Failed to upload image");
        setIsProcessing(false);
        return;
      }

      setStatusText("Preparing data...");

      const uuid = generateUUID();
      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      console.log("Saved initial data to KV store");

      setStatusText("Analyzing...");

      const feedback = await ai.feedback(
        uploadedImage.path,
        prepareInstructions({ jobTitle, jobDescription }),
      );

      console.log("AI Feedback Response:", feedback);

      if (!feedback) {
        setStatusText("Error: Failed to get AI response");
        setIsProcessing(false);
        return;
      }

      let feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      console.log("Feedback Text (raw):", feedbackText);

      // Remove markdown code blocks if present
      if (feedbackText.includes("```json")) {
        feedbackText = feedbackText
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        console.log("Feedback Text (cleaned):", feedbackText);
      }

      data.feedback = JSON.parse(feedbackText);
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete, redirecting...");
      console.log("Final data:", data);
      navigate(`/resume/${uuid}`);
    } catch (error) {
      console.error("Complete error:", error);
      setStatusText(
        `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      );
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted, file:", file);

    const form = e.currentTarget.closest("form");
    if (!form) {
      console.error("Form not found");
      return;
    }

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    console.log("Form data:", { companyName, jobTitle, jobDescription, file });

    if (!file) {
      setStatusText("Error: Please upload a resume file first");
      console.error("No file selected");
      return;
    }

    handleAnalyze({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="main-section flex-1">
        <div className="page-heading py-16">
          <div className="breadcrumb mb-4">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Upload Resume</span>
          </div>
          <h1>Smart Feedback for your job.</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full max-w-md" />
            </>
          ) : (
            <h2>Drop your Resume for an ATS score and improvement tips.</h2>
          )}
          {!isProcessing && (
            <div className="w-full max-w-3xl mt-8 bg-white rounded-xl border-2 border-blueprint-line p-8">
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    id="company-name"
                    name="company-name"
                    placeholder="e.g. Google"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    id="job-title"
                    name="job-title"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    rows={5}
                    id="job-description"
                    name="job-description"
                    placeholder="e.g. Develop and maintain software applications"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="uploader">Upload Resume</label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>

                <button
                  className="btn-primary btn-lg w-full"
                  type="submit"
                  disabled={!file || isProcessing}
                  style={{
                    opacity: !file || isProcessing ? 0.5 : 1,
                    cursor: !file || isProcessing ? "not-allowed" : "pointer",
                  }}
                >
                  {isProcessing ? "Analyzing..." : "Analyze Resume"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default upload;
