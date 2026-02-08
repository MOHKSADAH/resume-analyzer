# Resumai

AI-powered resume analysis and feedback platform built with React Router v7 and Puter.js.

## Overview

Resumai helps job seekers optimize their resumes by providing AI-powered feedback across multiple categories including ATS compatibility, tone and style, content quality, structure, and skills assessment. Upload your resume, specify the job you're applying for, and receive detailed, actionable feedback powered by Claude AI.

## Features

- **AI-Powered Analysis**: Get comprehensive feedback on your resume using Claude Sonnet 4.5
- **ATS Scoring**: Check how well your resume performs with Applicant Tracking Systems
- **Category-Based Feedback**: Receive detailed tips on tone, content, structure, and skills
- **Resume History**: Track all your uploaded resumes and their analysis results
- **Data Management**: View and manage your stored resume files
- **User Authentication**: Secure login with Puter.js authentication
- **Breadcrumb Navigation**: Easy navigation between pages
- **Responsive Design**: Clean, modern UI with Tailwind CSS

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
git clone <repository-url>
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
│   │   ├── Navbar.tsx      # Navigation bar with auth
│   │   ├── FileUploader.tsx # PDF upload component
│   │   ├── ResumeCard.tsx  # Resume list card
│   │   └── footer.tsx      # Page footer
│   ├── routes/             # Route components
│   │   ├── home.tsx        # Dashboard with resume list
│   │   ├── upload.tsx      # Resume upload and analysis
│   │   ├── resume.tsx      # Individual resume feedback
│   │   ├── auth.tsx        # Authentication page
│   │   └── wipe.tsx        # Data management page
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

1. User uploads a PDF resume
2. PDF is converted to PNG image for AI vision analysis
3. Both files are stored in Puter.js file system
4. AI analyzes the image and provides structured feedback
5. Results are saved to Puter.js KV store
6. User is redirected to detailed feedback page

### Feedback Categories

- **ATS Compatibility**: How well the resume works with tracking systems
- **Tone and Style**: Professional language and formatting
- **Content Quality**: Achievement descriptions and impact
- **Structure**: Layout and organization
- **Skills**: Technical and soft skills presentation

### Data Storage

All data is stored per-user in Puter.js:

- **File System**: PDF resumes and PNG previews
- **Key-Value Store**: Resume metadata and AI feedback (`resume:*` pattern)

### Authentication Flow

- Users must sign in to access the application
- Authentication handled by Puter.js
- Protected routes redirect to auth page with return URL
- Data management page only accessible when authenticated

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

## Troubleshooting

### Vite Cache Issues

If you encounter errors about missing files after updates:

```bash
rm -rf node_modules/.vite
npm run dev
```

### PDF Worker Errors

Ensure `pdf.worker.min.mjs` exists in the `public/` directory.

### Authentication Issues

Clear browser cache and reload if authentication state becomes inconsistent.

## Contributing

This is a personal project. Feel free to fork and adapt for your own use.

## License

All rights reserved. Copyright 2025 Mohammad Al-Sadah.

## Author

**Mohammad Al-Sadah**

Built with React Router, and Puter.js,
