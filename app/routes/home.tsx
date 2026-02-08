// import { resumes } from '../../constants';
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Footer } from "~/components/footer";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumai" },
    { name: "description", content: "Smart feedback for your desired jobs." },
  ];
}

export default function Home() {
  const { auth, kv, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      console.log("parsedResumes", parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="main-section flex-1">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>
              No Resumes Found... Upload your first Resume to get feedback
            </h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="btn-primary btn-lg">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
