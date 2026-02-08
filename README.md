# Resumai

AI-powered resume analysis and feedback platform built with React Router v7 and Puter.js.

## Overview

Resumai helps job seekers optimize their resumes by providing AI-powered feedback across five key dimensions: ATS compatibility, tone and style, content quality, structure, and skills presentation. Upload your resume, specify the job you're applying for, and receive detailed, actionable feedback powered by Claude Sonnet 4.5 AI.

## Features

- **AI-Powered Analysis**: Comprehensive feedback using Claude Sonnet 4.5
- **ATS Scoring**: Check how well your resume performs with Applicant Tracking Systems
- **Five-Category Assessment**: Detailed analysis of ATS compatibility, tone and style, content, structure, and skills
- **Job-Specific Feedback**: Tailored recommendations based on your target job description
- **Score-Based Ratings**: 0-100 scores for each category plus overall assessment
- **Resume History**: Track all your uploaded resumes and analysis results
- **Data Management**: View and delete your stored resume files
- **Secure Authentication**: User login powered by Puter.js
- **Breadcrumb Navigation**: Easy navigation between pages
- **Responsive Design**: Clean, modern UI with Tailwind CSS v4

## Tech Stack

### Frontend

- **React Router v7**: Modern full-stack React framework with SSR
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **react-dropzone**: Drag-and-drop file uploads
- **pdfjs-dist**: PDF to image conversion

### Backend

- **Puter.js**: Serverless backend platform providing:
  - Authentication (user sign-in/sign-out)
  - File Storage (resume PDFs and images)
  - Key-Value Store (resume metadata)
  - AI Services (Claude integration)

### AI

- **Claude Sonnet 4.5**: Resume analysis and feedback generation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MOHKSADAH/resume-analyzer
cd resume-analyzer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Development Commands

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm start            # Run production server
npm run typecheck    # Run TypeScript type checking
```

## Project Structure

```
resume-analyzer/
├── app/
│   ├── components/          # React components
│   │   ├── Navbar.tsx      # Navigation bar with auth and logout
│   │   ├── FileUploader.tsx # PDF upload component
│   │   ├── ResumeCard.tsx  # Resume list card
│   │   └── footer.tsx      # Page footer
│   ├── routes/             # Route components
│   │   ├── home.tsx        # Dashboard with resume list
│   │   ├── upload.tsx      # Resume upload and analysis
│   │   ├── resume.tsx      # Individual resume feedback
│   │   ├── auth.tsx        # Authentication page
│   │   ├── wipe.tsx        # Data management page
│   │   └── faq.tsx         # FAQ page
│   ├── lib/                # Utilities and services
│   │   ├── puter.ts        # Puter.js integration
│   │   ├── pdf2img.ts      # PDF conversion
│   │   └── utils.ts        # Helper functions
│   └── app.css             # Global styles
├── constants/
│   └── index.ts            # AI prompts and data structures
├── types/
│   └── index.d.ts          # TypeScript type definitions
└── public/                 # Static assets
```

## Key Features Explained

### Resume Upload and Analysis

1. User uploads a PDF resume with job details (company, title, description)
2. PDF is converted to PNG image for AI vision analysis
3. Both files are stored in Puter.js file system
4. AI analyzes the image using job-specific context
5. Structured feedback is generated with scores and tips
6. Results are saved to Puter.js KV store
7. User is redirected to detailed feedback page

### Feedback Categories

Each resume analysis includes five scored categories:

- **ATS Compatibility**: How well the resume works with Applicant Tracking Systems
- **Tone and Style**: Professional language, formatting, and presentation
- **Content Quality**: Achievement descriptions, impact statements, and relevance
- **Structure**: Layout, organization, and visual hierarchy
- **Skills**: Technical and professional skills presentation

Each category receives:
- A score from 0-100
- 3-4 specific tips
- "Good" or "Improve" indicators
- Detailed explanations for each tip

### Data Storage

All data is stored per-user in Puter.js:

- **File System**: PDF resumes and PNG previews
- **Key-Value Store**: Resume metadata and AI feedback (pattern: `resume:*`)

### Authentication Flow

- Users must authenticate to access the home page
- Authentication handled by Puter.js OAuth
- Protected routes redirect to auth page with return URL
- Automatic auth check prevents unauthorized KV access
- Logout button available in navbar when authenticated

## Environment

- **Server-Side Rendering**: Enabled by default
- **TypeScript**: Strict mode
- **Module System**: ES2022 with bundler resolution
- **JSX**: react-jsx runtime

## Browser Compatibility

Modern browsers with ES2022 support:

- Chrome 94+
- Firefox 93+
- Safari 15+
- Edge 94+

## Known Limitations

- Maximum file size: 20MB for PDF uploads
- Supported format: PDF only
- AI model: Claude Sonnet 4.5 (via Puter.js)
- Requires Puter.js CDN to be accessible
- Authentication requires third-party cookies enabled

## Troubleshooting

### Vite Cache Issues

If you encounter errors about missing files after updates:

```bash
rm -rf node_modules/.vite
npm run dev
```

### PDF Worker Errors

Ensure `pdf.worker.min.mjs` exists in the `public/` directory.

### Authentication Dialog Auto-Popup

If the Puter auth dialog appears automatically on page load, ensure the home page checks authentication before calling KV operations. This has been fixed in the current version.

### Authentication Issues

Clear browser cache and reload if authentication state becomes inconsistent.

## Demo

Visit the live demo: [https://resume-analyzer-ten-pi.vercel.app/](https://resume-analyzer-ten-pi.vercel.app/)

## Contributing

This is a personal project. Feel free to fork and adapt for your own use.

## License

All rights reserved. Copyright 2025 Mohammad Al-Sadah.

## Author

**Mohammad Al-Sadah**
- GitHub: [@MOHKSADAH](https://github.com/MOHKSADAH)

Built with React Router v7, TypeScript, Tailwind CSS v4, and Puter.js.
