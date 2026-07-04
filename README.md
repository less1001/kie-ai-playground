# Kie AI Creative Studio 🎨🎬

Kie AI Creative Studio is a sleek, modern, dark-themed playground for generating stunning AI images and videos using the **Kie.ai API**. It provides a beautiful user interface with dynamic tab switching, real-time credit balance tracking, prompt suggestions, task execution logs, and an interactive media gallery.

## Features 🚀

- **Sleek UI/UX:** Ultra-premium cosmic dark mode UI with responsive grids, glassmorphism, glowing micro-animations, and fullscreen preview modals.
- **Image Generation:** Support for top-tier image generators like **Flux-2 (Pro)**, **Ideogram V3**, **Google Imagen 4**, and **Grok Imagine**, complete with customizable aspect ratios and quality settings.
- **Video Generation:** Support for state-of-the-art video generators like **Kling v3.0**, **Google Veo 3.1**, **Wan v2.7**, and **Seedance v1.5 Pro**, including optional support for Image-to-Video.
- **Real-Time Task Monitoring:** A visual queue tracking in-progress tasks (Pending -> Processing -> Success/Failed) with automatic status polling.
- **Credit Balance Tracker:** Instantly fetch and display your remaining account credits on load or on demand.
- **Interactive Gallery:** View and download all generated media. Re-use prompts and model configurations with a single click. Uses `localStorage` to persist your gallery.
- **Secure Express Proxy:** Protects your secret API key by handling all communication with `https://api.kie.ai` via a Node.js backend.

## Tech Stack 🛠️

- **Frontend:** Vanilla HTML5, Vanilla CSS3 (Glassmorphism, custom layout), and modern JavaScript. Icons powered by Lucide.
- **Backend:** Node.js, Express, Axios, and dotenv.

---

## Installation & Setup 💻

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 2. Clone & Install
Clone the project, navigate to the directory, and install dependencies:
```bash
git clone <your-repository-url>
cd kie-ai-playground
npm install
```

### 3. Configure Credentials
Create a `.env` file in the root directory (one should be generated automatically by the setup, check if it's there):
```env
KIE_API_KEY=YOUR_KIE_AI_API_KEY
PORT=3000
```
*(Your API key has already been configured in the local `.env` file for immediate testing)*

### 4. Run the Application
Start the development server:
```bash
npm run dev
# or
npm start
```
Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## Folder Structure 📂

```
kie-ai-playground/
├── public/                 # Static files for the frontend
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Vanilla CSS styles and animation
│   └── app.js              # Frontend UI logic & polling
├── .env                    # Secret API keys (ignored by git)
├── .gitignore              # Tells git to ignore .env and node_modules
├── package.json            # Node.js project configuration
├── server.js               # Express backend acting as a secure API proxy
└── README.md               # Project documentation
```

## Security Warning ⚠️
The `.gitignore` is configured to prevent committing the `.env` file containing your secret API key. Do not remove `.env` from `.gitignore` or upload it to any public repositories.
