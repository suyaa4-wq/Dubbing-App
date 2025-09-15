# Dubbing App (Gitpod-ready)

This repository contains a starter **Dubbing App** with:
- `frontend/` (React Native + Expo starter)
- `backend/` (Node.js + Express + ffmpeg)
- `.gitpod.yml` and `.gitpod.Dockerfile` to auto-prepare Gitpod workspace

## Quick start (Gitpod)
1. Push this repo to GitHub under your account.
2. Open in Gitpod:
   ```
   https://gitpod.io/#https://github.com/<username>/dubbing-app
   ```
3. Wait for workspace to provision. Backend (port 8080) and Frontend (port 3000) will be started by Gitpod tasks.
4. Upload a sample video (or use sample files) and test the `/dubbing` endpoint.

## Notes
- This project uses ffmpeg (installed in the Gitpod Dockerfile). For STT/TTS you can integrate external APIs (OpenAI TTS, Google Speech-to-Text, Whisper).
- The included backend endpoints are placeholders which demonstrate flow. Replace API integrations with your credentials.
