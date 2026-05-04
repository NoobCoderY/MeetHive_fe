# MeetHive Frontend

MeetHive is a meeting management and transcription application that lets teams record, transcribe, and summarise meetings in real time. It integrates AWS services for speech-to-text and natural-language processing, supports multiple languages, and provides PDF export of meeting summaries.

## Features

- 🎙️ **Live Transcription** – Real-time speech recognition with audio visualisation powered by AWS Transcribe and `react-speech-recognition`.
- 📝 **Meeting Summaries** – AI-generated meeting summaries using AWS Comprehend, exportable as PDF via `@react-pdf/renderer`.
- 🗂️ **Project & Company Management** – Organise meetings under projects and companies.
- 👤 **User Authentication & Profiles** – Secure authentication via AWS Cognito.
- 🎵 **Audio Recording & Upload** – In-browser microphone recording with FFmpeg/LAMEjs encoding, plus file upload support.
- 🌍 **Multi-language Support** – Internationalisation using `react-intl`.
- 🌙 **Dark / Light Theme** – System-aware theme switching.
- 📊 **Real-time Audio Visualisation** – Waveform display during recording via `react-voice-visualizer`.
- ☁️ **AWS Integration** – Cognito (auth), Transcribe (speech-to-text), Comprehend (NLP/summaries).

## Technology Stack

| Category | Technology |
|---|---|
| Framework | React 18.3.1 + TypeScript 5.2.2 |
| Build tool | Vite 5.3.1 |
| Styling | Tailwind CSS 3.4.4 |
| UI components | Radix UI primitives + shadcn/ui |
| State management | Redux + Redux Toolkit 2.2.6, redux-persist |
| Forms | React Hook Form 7.52.1 + Zod validation |
| Routing | React Router DOM 6.24.1 |
| Audio processing | FFmpeg 0.8/0.9, LAMEjs, microphone-stream |
| Audio visualisation | react-voice-visualizer |
| Speech recognition | react-speech-recognition |
| Internationalisation | react-intl 6.6.8 |
| AWS SDKs | @aws-sdk/client-comprehend, @aws-sdk/client-transcribe-streaming, @aws-sdk/credential-provider-cognito-identity |
| PDF generation | @react-pdf/renderer |
| HTTP client | Axios |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/                    # App-level providers and configuration
├── assets/                 # Static assets (images, icons)
├── hooks/                  # Custom React hooks
│   ├── useDebounce.tsx
│   ├── useFFmpeg.tsx       # FFmpeg initialisation and encoding hook
│   └── useResponsive.tsx
├── i18n/                   # Internationalisation messages and configuration
├── layouts/                # Shared page layout components
├── modules/                # Feature modules
│   ├── auth/               # Login, registration, password reset
│   ├── audio-recorder/     # In-browser audio recording
│   ├── upload-recording/   # Audio file upload
│   ├── transcription/      # Live and uploaded transcription
│   ├── summary/            # Meeting summary generation and PDF export
│   ├── dashboard/          # Dashboard and meeting list
│   ├── project-company/    # Project and company management
│   ├── global-search/      # Cross-module search
│   ├── feedback/           # User feedback
│   ├── support/            # Support pages
│   ├── terms-and-condtion/ # Terms and conditions
│   └── core/               # Shared UI and utilities
├── routes/                 # Route definitions and guards
│   ├── index.tsx
│   ├── protected-route/    # Auth-protected routes
│   ├── public-route/       # Unauthenticated-only routes
│   ├── recording-permission-route/  # Microphone permission guard
│   ├── error-boundry/      # Error boundary wrapper
│   └── not-found-page/     # 404 page
├── shadcn/                 # shadcn/ui component library (local copies)
├── store/                  # Redux store configuration
│   └── store.ts
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- AWS account with Cognito User Pool, Transcribe, and Comprehend enabled

### Installation

```bash
git clone https://github.com/NoobCoderY/MeetHive_fe.git
cd MeetHive_fe
npm install
```

### Environment Variables

Create a `.env` file in the project root based on the variables your app expects. Typical values include:

```env
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_COGNITO_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VITE_API_BASE_URL=https://api.example.com
```

> **Never commit your `.env` file.** It is already listed in `.gitignore`.

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The compiled output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Deployment

The project is configured for one-click deployment on [Vercel](https://vercel.com). The `vercel.json` at the project root rewrites all routes to `index.html` to support client-side routing.

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`.
2. Make your changes and ensure `npm run lint` and `npm run build` pass.
3. Open a pull request against `main` describing what you changed and why.

## License

This project is private. All rights reserved.

