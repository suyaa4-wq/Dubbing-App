const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Simple upload using multer (saves to ./uploads)
const upload = multer({ dest: 'uploads/' });

// STT placeholder: returns dummy text or integrate real STT API here
app.post('/stt', upload.single('file'), (req, res) => {
  // In production, send file to Whisper/Google STT and return transcript
  res.json({ text: 'Transcribed text (placeholder)' });
});

// TTS placeholder: returns path to generated audio (needs integration)
app.post('/tts', express.json(), (req, res) => {
  // req.body.text, req.body.voice etc.
  // Integrate TTS provider and return audio path or URL
  res.json({ audio: '/assets/sample-voice.mp3', note: 'TTS endpoint not implemented. Replace with provider.' });
});

// Dubbing endpoint: accepts video file + prepared audio file (or use existing files)
// For demo, this command overlays audio over the input video and produces output/final.mp4
app.post('/dubbing', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), (req, res) => {
  try {
    const videoFile = req.files['video'][0].path;
    const audioFile = req.files['audio'][0].path;
    const outDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const outputPath = path.join(outDir, 'final_' + Date.now() + '.mp4');

    // ffmpeg command: copy video stream, replace audio with new audio
    const cmd = `ffmpeg -y -i ${videoFile} -i ${audioFile} -c:v copy -map 0:v:0 -map 1:a:0 -shortest ${outputPath}`;
    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) {
        console.error('ffmpeg error', err, stderr);
        return res.status(500).json({ error: 'ffmpeg failed', details: stderr });
      }
      // Return download path (in Gitpod you can open port/file)
      res.json({ output: outputPath });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Serve static output files for download
app.use('/output', express.static(path.join(__dirname, 'output')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Backend running on', PORT));
