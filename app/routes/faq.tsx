import Navbar from "~/components/Navbar";
import { Footer } from "~/components/footer";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "~/components/Accordion";
import type { Route } from "./+types/faq";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FAQ - Resumi" },
    { name: "description", content: "Frequently asked questions about Resumi" },
  ];
}

export default function FAQ() {
  const faqItems = [
    {
      id: "ats-scoring",
      question: "What is ATS scoring?",
      answer:
        "ATS (Applicant Tracking System) scoring evaluates how well your resume is formatted for automated screening systems used by employers. Our analyzer checks for ATS-friendly formatting, keyword optimization, and readability. A higher ATS score means your resume is more likely to pass through automated filters and reach human recruiters.",
    },
    {
      id: "how-analyzer-works",
      question: "How does the analyzer work?",
      answer:
        "Our analyzer uses advanced AI (Claude 3.7 Sonnet) to review your resume against job descriptions. It analyzes five key areas: ATS compatibility, content quality, document structure, relevant skills, and tone & style. The AI provides specific feedback and actionable tips to improve each area.",
    },
    {
      id: "file-formats",
      question: "What file formats are supported?",
      answer:
        "Currently, we only support PDF files. Your resume PDF is converted to an image for AI analysis. Make sure your PDF is under 20MB in size. We recommend using standard fonts and avoiding complex formatting to ensure accurate analysis.",
    },
    {
      id: "data-storage",
      question: "How is my data stored?",
      answer:
        "Your resume data is securely stored using Puter.js cloud storage. Each resume is associated with your user account and can only be accessed by you. We use the data solely for providing resume analysis feedback. Your resume files and analysis results are stored in your personal cloud storage space.",
    },
    {
      id: "improve-score",
      question: "How can I improve my resume score?",
      answer:
        "Focus on the feedback provided in each category. For ATS: use standard formatting and include relevant keywords. For content: quantify achievements and use action verbs. For structure: organize information logically with clear sections. For skills: align your skills with the job requirements. For tone: maintain professional language appropriate for your industry.",
    },
    {
      id: "score-meanings",
      question: "What do the different scores mean?",
      answer:
        "Scores range from 0-100. Overall Score: weighted average of all categories. ATS Score: formatting and keyword optimization. Content Score: relevance and quality of information. Structure Score: organization and readability. Skills Score: alignment with job requirements. Tone & Style Score: professionalism and language appropriateness. Scores above 80 are excellent, 60-80 are good, 40-60 need improvement, and below 40 require significant revision.",
    },
    {
      id: "privacy",
      question: "Is my data private and secure?",
      answer:
        "Yes! Your resume data is private and secure. We use Puter.js authentication and storage, which provides secure, encrypted cloud storage. Your resumes are only accessible to you when logged into your account. We do not share your resume data with third parties or use it for any purpose other than providing you with analysis feedback.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="main-section flex-1">
        <div className="page-heading py-16">
          <h1>Frequently Asked Questions</h1>
          <h2>Everything you need to know about Resumi</h2>
        </div>

        <div className="w-full max-w-4xl space-y-4">
          <Accordion allowMultiple>
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                className="bg-white border-2 border-blueprint-line rounded-xl overflow-hidden hover:border-blueprint-accent transition-colors duration-200"
              >
                <AccordionHeader
                  itemId={item.id}
                  className="text-blueprint-text hover:bg-blueprint-paper"
                >
                  <span className="font-semibold text-lg">{item.question}</span>
                </AccordionHeader>
                <AccordionContent
                  itemId={item.id}
                  className="bg-blueprint-paper border-t border-blueprint-line"
                >
                  <p className="text-blueprint-text-muted leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Footer />
    </main>
  );
}
