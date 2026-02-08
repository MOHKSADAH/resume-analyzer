import React, { useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
  }, [imagePath]);
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-blueprint-accent uppercase">
                TARGET:
              </span>
              <h3 className="text-2xl font-bold break-words text-blueprint-text">
                {companyName}
              </h3>
            </>
          )}
          {jobTitle && (
            <>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-blueprint-text-muted uppercase mt-1">
                ROLE:
              </span>
              <p className="text-sm break-words text-blueprint-text-muted font-medium">
                {jobTitle}
              </p>
            </>
          )}
          {!companyName && !jobTitle && (
            <>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-blueprint-accent uppercase">
                DOCUMENT:
              </span>
              <h3 className="text-2xl font-bold text-blueprint-text">Resume</h3>
            </>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className="border-2 border-blueprint-line rounded-lg p-2 animate-in fade-in duration-1000 flex-1">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-full min-h-[400px] max-sm:min-h-[250px] object-cover object-top rounded"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
