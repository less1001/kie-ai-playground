/* ═══════════════════════════════════════════════════════════
   OpenMontage Studio — Application Logic
   Step-by-step wizard flow inspired by HeyGen / Synthesia
   ═══════════════════════════════════════════════════════════ */

// ── Pipeline Definitions ──
const PIPELINES = {
  "avatar-spokesperson": {
    name: { en: "AI Spokesperson", zh: "AI 数字人带货" },
    desc: { en: "Generate a realistic talking-head video from a portrait and sales script. Perfect for e-commerce and product demos.", zh: "输入主播肖像和带货文案，自动生成逼真的 AI 数字人带货视频。" },
    icon: "user-circle",
    engines: ["OmniHuman 1.5", "Lip-Sync"],
    tag: { en: "Most Popular", zh: "最热门", type: "hot" },
    sections: ["avatar", "script", "voice"],
    featured: true,
    model: "omnihuman-v1.5"
  },
  "animated-explainer": {
    name: { en: "Animated Explainer", zh: "动画解说视频" },
    desc: { en: "Auto-generate educational explainer videos with AI voiceover, images, and Remotion animation rendering.", zh: "自动生成教育科普视频：AI 撰写脚本、生成配图、合成配音并渲染为动画。" },
    icon: "presentation",
    engines: ["Imagen4", "Google TTS", "Remotion"],
    tag: { en: "Popular", zh: "热门", type: "hot" },
    sections: ["script"],
    featured: true,
    model: "imagen4"
  },
  "cinematic": {
    name: { en: "Cinematic Trailer", zh: "电影预告片" },
    desc: { en: "Create stunning cinematic storyboards and render high-fidelity video with Kling or Veo engines.", zh: "自动生成电影级分镜脚本，调用 Kling/Veo 引擎渲染高画质预告片。" },
    icon: "clapperboard",
    engines: ["Kling v3", "Veo 3.1"],
    tag: { en: "New", zh: "新功能", type: "new" },
    sections: ["script"],
    featured: true,
    model: "kling-v3"
  },
  "talking-head": {
    name: { en: "Lip-Sync Video", zh: "口型同步视频" },
    desc: { en: "Perfectly synchronize mouth movements in an existing presenter video with a new audio track.", zh: "将已有的主播视频口型与新音频精准同步对齐，实现完美口型匹配。" },
    icon: "mic-vocal",
    engines: ["Volcengine Lip-Sync"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "volcengine/video-to-video-lip-sync"
  },
  "localization-dub": {
    name: { en: "Video Dubbing", zh: "视频翻译配音" },
    desc: { en: "Translate speech, clone voice in target language, and burn in multilingual subtitles.", zh: "翻译视频语音，克隆音色生成目标语种配音，自动烧录双语字幕。" },
    icon: "languages",
    engines: ["WhisperX", "GPT", "ElevenLabs"],
    tag: null,
    sections: ["media-dub"],
    featured: false,
    model: "volcengine/video-to-video-lip-sync"
  },
  "documentary-montage": {
    name: { en: "Documentary Montage", zh: "纪录片蒙太奇" },
    desc: { en: "CLIP-indexed retrieval from open databases to compile archival tone-poems and montages.", zh: "从开源数据库语义检索真实档案素材并自动拼接剪辑为纪录片。" },
    icon: "film",
    engines: ["Archive.org", "Wikimedia", "FFmpeg"],
    tag: null,
    sections: ["script"],
    featured: false,
    model: "grok-imagine"
  },
  "clip-factory": {
    name: { en: "Clip Factory", zh: "长视频智能切片" },
    desc: { en: "Automatically split long videos into viral short clips for social media distribution.", zh: "将长视频自动切片，提取精彩画面生成适合社交媒体的短视频。" },
    icon: "scissors",
    engines: ["WhisperX", "SceneDetect", "FFmpeg"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3"
  },
  "animation": {
    name: { en: "Motion Graphics", zh: "动态图形视频" },
    desc: { en: "Generate typography-driven GSAP motion graphics for SaaS and product launches.", zh: "生成以文字排版驱动的动态图形视频，适合 SaaS 产品发布。" },
    icon: "sparkles",
    engines: ["GSAP", "HyperFrames"],
    tag: null,
    sections: ["script"],
    featured: false,
    model: "ideogram-v3"
  },
  "screen-demo": {
    name: { en: "Screen Demo", zh: "录屏演示增强" },
    desc: { en: "Polish raw screen recordings with dynamic zoom, cursor highlights, and AI voiceover.", zh: "为原始录屏添加平滑缩放、鼠标高亮、边框排版及 AI 配音讲解。" },
    icon: "monitor",
    engines: ["FFmpeg", "Remotion"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3"
  },
  "hybrid": {
    name: { en: "Hybrid Video", zh: "混合合成视频" },
    desc: { en: "Fuse live-action footage with AI-generated overlays and graphics enhancements.", zh: "将实拍录像与 AI 视觉特效进行图层融合与画中画合成。" },
    icon: "layers",
    engines: ["Remotion", "FFmpeg"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3"
  },
  "podcast-repurpose": {
    name: { en: "Podcast to Video", zh: "播客转视频" },
    desc: { en: "Transform audio podcasts into short video formats with waveforms and dynamic subtitles.", zh: "为播客音频添加波形图、动态字幕和头像动画，转换为短视频。" },
    icon: "podcast",
    engines: ["WhisperX", "Waveform", "Remotion"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3"
  }
};

// ── Avatar Presets ──
const AVATARS = [
  { id: "xiaomi", name: { en: "Sophie", zh: "小米" }, role: { en: "Beauty & Fashion", zh: "美妆服饰" }, thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80" },
  { id: "xiaomei", name: { en: "Emma", zh: "小美" }, role: { en: "Lifestyle", zh: "生活百货" }, thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80" },
  { id: "daqiang", name: { en: "James", zh: "大强" }, role: { en: "Tech & Digital", zh: "数码科技" }, thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80" },
  { id: "lisa", name: { en: "Lisa", zh: "丽萨" }, role: { en: "English Sales", zh: "外贸英文" }, thumb: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80" }
];

// ── Voice Presets ──
const VOICES = [
  { id: "female-sales", name: { en: "Sales Queen", zh: "带货女王" }, desc: { en: "High energy, enthusiastic", zh: "高能量激情风格" }, emoji: "👩‍💼" },
  { id: "female-sweet", name: { en: "Sweet & Warm", zh: "亲和甜美" }, desc: { en: "Friendly, approachable", zh: "友好温暖型" }, emoji: "💁‍♀️" },
  { id: "male-pro", name: { en: "Professional", zh: "专业男声" }, desc: { en: "Calm, authoritative", zh: "沉稳权威型" }, emoji: "👨‍💻" },
  { id: "en-female", name: { en: "English Female", zh: "英文女声" }, desc: { en: "Clear, international", zh: "国际化英语发音" }, emoji: "🌍" }
];

// ── Script Templates ──
const TEMPLATES = {
  "avatar-spokesperson": [
    { label: { en: "🔥 New Launch", zh: "🔥 新品首发" }, text: { en: "Look at this brand new tech gadget! Today's launch exclusive — $50 off instantly plus a free 1-year warranty. Click below to grab yours before they're gone!", zh: "家人们看我手上这款最新上市的科技好物！今天首发专享直降300元，限时赠送一年质保！赶快点击下方链接购买，手慢无！" } },
    { label: { en: "⚡ Flash Sale", zh: "⚡ 限量秒杀" }, text: { en: "Last 5 minutes! This is the absolute lowest price online — only 50 units left. Once they're gone, it's back to full price. Don't miss this!", zh: "倒计时最后五分钟！全网最低价限量五十单，抢完立马恢复原价！犹豫一秒就没有了，家人们手速一定要快！" } },
    { label: { en: "⭐ Best Seller", zh: "⭐ 爆款推荐" }, text: { en: "This product has sold over 100,000 units and has a 98% satisfaction rate. Today we're offering an exclusive bundle deal — buy 2 get 1 free!", zh: "这款产品累计销量突破十万单，好评率高达98%！今天给家人们带来专属组合优惠，买二送一超划算！" } }
  ],
  "animated-explainer": [
    { label: { en: "🧠 AI Explainer", zh: "🧠 AI科普" }, text: { en: "Explain how neural networks learn in 60 seconds, using everyday analogies like training a puppy.", zh: "用60秒通俗解释神经网络是如何学习的，使用像训练小狗一样的生活化类比。" } },
    { label: { en: "₿ Bitcoin 101", zh: "₿ 比特币入门" }, text: { en: "Explain blockchain and bitcoin mining in simple terms for complete beginners.", zh: "为完全零基础的小白通俗讲解区块链账本与比特币挖矿的原理。" } }
  ],
  "cinematic": [
    { label: { en: "🎬 Sci-Fi Trailer", zh: "🎬 科幻预告" }, text: { en: "A dystopian future where AI has taken control. The last human programmer must hack back into the system. Neon-lit cyberpunk cityscape.", zh: "一个AI统治的反乌托邦未来，最后一位人类程序员必须入侵回系统。霓虹闪烁的赛博朋克城市景观。" } }
  ],
  "documentary-montage": [
    { label: { en: "🌃 City at Dawn", zh: "🌃 城市黎明" }, text: { en: "A dreamlike montage of cities waking up at 4 AM — empty streets, first lights, bakeries opening. Elegiac, contemplative tone.", zh: "凌晨四点城市苏醒的梦幻蒙太奇——空旷街道、第一缕光线、面包房开门。挽歌般的冥想基调。" } }
  ]
};

// ── i18n ──
const I18N = {
  en: {
    navCreate: "Create", navProjects: "My Projects",
    step1: "Choose Template", step2: "Configure", step3: "Preview & Generate",
    chooseTemplateTitle: "What would you like to create?",
    chooseTemplateSub: "Select a production pipeline to get started",
    backBtn: "Back", newVideoBtn: "Create New Video",
    selectAvatar: "Select Presenter", customAvatarPlaceholder: "Or paste a custom portrait image URL...",
    scriptTitle: "Script & Content", scriptPlaceholder: "Write your script, topic description, or paste a URL...",
    mediaTitle: "Source Media", videoUrlLabel: "Video URL", audioUrlLabel: "Audio Track URL (Optional)", dubLangLabel: "Target Language",
    voiceTitle: "Voice & Tone",
    settingsTitle: "Output Settings", ratioLabel: "Ratio", qualityLabel: "Quality",
    previewTitle: "Live Preview", previewNoAvatar: "Select an avatar to preview", previewEta: "~2-5 min",
    generateBtn: "Generate Video", downloadBtn: "Download", createAnother: "Create Another",
    generatingTitle: "Creating your video...", generatingDesc: "Our AI pipeline is working its magic",
    stageResearch: "Research", stageScript: "Script", stageStoryboard: "Storyboard", stageAssets: "Assets", stageRender: "Render", stageReview: "QA",
    myProjectsTitle: "My Projects", myProjectsSub: "All your generated videos in one place",
    noProjects: "No projects yet", noProjectsDesc: "Create your first AI video to see it here", createFirst: "Create Video",
    modalEngine: "Engine", modalDate: "Date", modalScript: "Script", rerunBtn: "Re-run"
  },
  zh: {
    navCreate: "创建视频", navProjects: "我的项目",
    step1: "选择模板", step2: "配置参数", step3: "预览并生成",
    chooseTemplateTitle: "您想创建什么类型的视频？",
    chooseTemplateSub: "选择一条视频生产流水线以开始",
    backBtn: "返回", newVideoBtn: "创建新视频",
    selectAvatar: "选择数字人主播", customAvatarPlaceholder: "或粘贴自定义肖像图片 URL...",
    scriptTitle: "脚本与内容", scriptPlaceholder: "输入您的带货文案、解说大纲或画面分镜脚本...",
    mediaTitle: "源素材", videoUrlLabel: "视频 URL", audioUrlLabel: "音频 URL（可选）", dubLangLabel: "目标翻译语言",
    voiceTitle: "配音音色",
    settingsTitle: "输出设置", ratioLabel: "画面比例", qualityLabel: "清晰度",
    previewTitle: "实时预览", previewNoAvatar: "选择主播以预览效果", previewEta: "约2-5分钟",
    generateBtn: "开始生成视频", downloadBtn: "下载视频", createAnother: "创建新视频",
    generatingTitle: "正在为您生成视频...", generatingDesc: "AI 流水线正在全力运转中",
    stageResearch: "研究", stageScript: "脚本", stageStoryboard: "分镜", stageAssets: "资产", stageRender: "渲染", stageReview: "质检",
    myProjectsTitle: "我的项目", myProjectsSub: "您生成的所有视频都在这里",
    noProjects: "还没有项目", noProjectsDesc: "创建您的第一个 AI 视频", createFirst: "创建视频",
    modalEngine: "渲染引擎", modalDate: "创建日期", modalScript: "脚本内容", rerunBtn: "重新运行"
  }
};

// ── App State ──
let lang = localStorage.getItem("om_lang") || "en";
let currentStep = 1;
let selectedPipeline = null;
let selectedAvatarId = "xiaomi";
let selectedVoiceId = "female-sales";
let selectedRatio = "9:16";
let gallery = JSON.parse(localStorage.getItem("om_gallery") || "[]");
let activeGeneration = null; // { taskId, pipeline, model, prompt, elapsed, stageIndex, interval }

// ── DOM Ready ──
document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  renderTemplateGrid();
  fetchCredits();
  renderProjects();
  lucide.createIcons();

  // Nav tabs
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      document.getElementById(`view-${tab.dataset.view}`).classList.add("active");
    });
  });

  // Language toggle
  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "en" ? "zh" : "en";
    localStorage.setItem("om_lang", lang);
    applyI18n();
    renderTemplateGrid();
    if (selectedPipeline) renderStep2();
    renderProjects();
    lucide.createIcons();
  });

  // Back buttons
  document.getElementById("back-to-step1").addEventListener("click", () => goToStep(1));
  document.getElementById("back-to-step2").addEventListener("click", () => goToStep(1));

  // Generate
  document.getElementById("generate-btn").addEventListener("click", handleGenerate);

  // Credits
  document.getElementById("refresh-credits").addEventListener("click", fetchCredits);

  // Script char count
  document.getElementById("script-input").addEventListener("input", (e) => {
    document.getElementById("char-count").textContent = `${e.target.value.length} / 5000`;
    updatePreviewScript();
  });

  // Ratio pills
  document.querySelectorAll(".ratio-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".ratio-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedRatio = pill.dataset.ratio;
      document.getElementById("preview-ratio").textContent = selectedRatio;
    });
  });

  // Modal
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-backdrop").addEventListener("click", closeModal);

  // Result buttons
  document.getElementById("result-new").addEventListener("click", () => goToStep(1));

  // Create first button
  document.getElementById("create-first-btn").addEventListener("click", () => {
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
    document.querySelector('[data-view="create"]').classList.add("active");
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById("view-create").classList.add("active");
    goToStep(1);
  });
});

// ── i18n Apply ──
function applyI18n() {
  const dict = I18N[lang];
  document.getElementById("lang-text").textContent = lang === "en" ? "中文" : "English";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });
}

// ── Step Navigation ──
function goToStep(step) {
  currentStep = step;
  document.querySelectorAll(".wizard-step").forEach(s => s.classList.remove("active"));
  document.getElementById(`wizard-step-${step}`).classList.add("active");

  // Update step indicators
  document.querySelectorAll(".step-indicator").forEach(si => {
    const s = parseInt(si.dataset.step);
    si.classList.remove("active", "completed");
    if (s === step) si.classList.add("active");
    else if (s < step) si.classList.add("completed");
  });

  document.querySelectorAll(".step-line").forEach((line, i) => {
    line.classList.toggle("completed", i + 1 < step);
  });

  lucide.createIcons();
}

// ── Step 1: Render Template Cards ──
function renderTemplateGrid() {
  const grid = document.getElementById("template-grid");
  grid.innerHTML = "";

  // Show featured first
  const sorted = Object.entries(PIPELINES).sort((a, b) => (b[1].featured ? 1 : 0) - (a[1].featured ? 1 : 0));

  sorted.forEach(([key, pipe]) => {
    const card = document.createElement("div");
    card.className = `template-card ${pipe.featured ? "featured" : ""}`;
    card.addEventListener("click", () => selectPipeline(key));

    const tagHtml = pipe.tag ? `<div class="card-tag ${pipe.tag.type}">${pipe.tag[lang]}</div>` : "";
    const enginesHtml = pipe.engines.map(e => `<span class="engine-tag">${e}</span>`).join("");

    card.innerHTML = `
      <div class="card-visual">
        <div class="card-visual-bg" style="background: radial-gradient(circle at 50% 80%, var(--accent-glow), transparent 70%)"></div>
        <i data-lucide="${pipe.icon}"></i>
      </div>
      <div class="card-body">
        ${tagHtml}
        <h3 class="card-title">${pipe.name[lang]}</h3>
        <p class="card-desc">${pipe.desc[lang]}</p>
        <div class="card-engines">${enginesHtml}</div>
      </div>
    `;
    grid.appendChild(card);
  });

  lucide.createIcons();
}

// ── Select Pipeline → Go to Step 2 ──
function selectPipeline(key) {
  selectedPipeline = key;
  goToStep(2);
  renderStep2();
}

// ── Step 2: Render Configuration ──
function renderStep2() {
  const pipe = PIPELINES[selectedPipeline];
  if (!pipe) return;

  // Pipeline badge
  document.getElementById("config-pipeline-name").textContent = pipe.name[lang];

  // Show/hide sections
  const hasAvatar = pipe.sections.includes("avatar");
  const hasScript = pipe.sections.includes("script");
  const hasMedia = pipe.sections.includes("media") || pipe.sections.includes("media-dub");
  const hasVoice = pipe.sections.includes("voice");
  const hasDub = pipe.sections.includes("media-dub");

  document.getElementById("section-avatar").style.display = hasAvatar ? "block" : "none";
  document.getElementById("section-script").style.display = (hasScript || hasAvatar) ? "block" : "none";
  document.getElementById("section-media").style.display = hasMedia ? "block" : "none";
  document.getElementById("section-voice").style.display = hasVoice ? "block" : "none";
  document.getElementById("group-audio-url").style.display = hasDub ? "none" : (hasMedia ? "block" : "none");
  document.getElementById("group-dub-lang").style.display = hasDub ? "block" : "none";

  // Render avatars
  if (hasAvatar) renderAvatars();

  // Render voice cards
  if (hasVoice) renderVoiceCards();

  // Render script templates
  renderScriptChips();

  // Update preview
  updatePreviewAvatar();
  updatePreviewScript();
  document.getElementById("preview-engine").textContent = pipe.engines[0];

  lucide.createIcons();
}

// ── Render Avatar Cards ──
function renderAvatars() {
  const container = document.getElementById("avatar-showcase");
  container.innerHTML = "";

  AVATARS.forEach(av => {
    const card = document.createElement("div");
    card.className = `avatar-card ${av.id === selectedAvatarId ? "selected" : ""}`;
    card.innerHTML = `
      <img src="${av.thumb}" alt="${av.name[lang]}">
      <div class="avatar-label">${av.name[lang]}<br><small style="opacity:0.6">${av.role[lang]}</small></div>
      <div class="avatar-check"><i data-lucide="check"></i></div>
    `;
    card.addEventListener("click", () => {
      selectedAvatarId = av.id;
      document.getElementById("custom-avatar-url").value = "";
      document.querySelectorAll(".avatar-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      updatePreviewAvatar();
      lucide.createIcons();
    });
    container.appendChild(card);
  });

  // Custom URL listener
  document.getElementById("custom-avatar-url").addEventListener("input", (e) => {
    if (e.target.value.trim()) {
      selectedAvatarId = null;
      document.querySelectorAll(".avatar-card").forEach(c => c.classList.remove("selected"));
      updatePreviewAvatar();
    }
  });

  lucide.createIcons();
}

// ── Render Voice Cards ──
function renderVoiceCards() {
  const container = document.getElementById("voice-cards");
  container.innerHTML = "";

  VOICES.forEach(v => {
    const card = document.createElement("div");
    card.className = `voice-card ${v.id === selectedVoiceId ? "selected" : ""}`;
    card.innerHTML = `
      <div class="voice-avatar">${v.emoji}</div>
      <div class="voice-info">
        <div class="voice-name">${v.name[lang]}</div>
        <div class="voice-desc">${v.desc[lang]}</div>
      </div>
    `;
    card.addEventListener("click", () => {
      selectedVoiceId = v.id;
      document.querySelectorAll(".voice-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
    });
    container.appendChild(card);
  });
}

// ── Render Script Template Chips ──
function renderScriptChips() {
  const container = document.getElementById("script-chips");
  container.innerHTML = "";

  const templates = TEMPLATES[selectedPipeline] || TEMPLATES["animated-explainer"] || [];
  templates.forEach(tmpl => {
    const chip = document.createElement("button");
    chip.className = "script-chip";
    chip.textContent = tmpl.label[lang];
    chip.addEventListener("click", () => {
      document.getElementById("script-input").value = tmpl.text[lang];
      document.getElementById("char-count").textContent = `${tmpl.text[lang].length} / 5000`;
      updatePreviewScript();
    });
    container.appendChild(chip);
  });
}

// ── Preview Updates ──
function updatePreviewAvatar() {
  const img = document.getElementById("preview-avatar-img");
  const noAvatar = document.getElementById("preview-no-avatar");
  const customUrl = document.getElementById("custom-avatar-url").value.trim();

  let url = null;
  if (customUrl) {
    url = customUrl;
  } else if (selectedAvatarId) {
    const av = AVATARS.find(a => a.id === selectedAvatarId);
    if (av) url = av.full;
  }

  if (url) {
    img.src = url;
    img.classList.add("visible");
    noAvatar.style.display = "none";
  } else {
    img.classList.remove("visible");
    noAvatar.style.display = "flex";
  }
}

function updatePreviewScript() {
  const text = document.getElementById("script-input").value.trim();
  const overlay = document.getElementById("preview-script-overlay");
  const textEl = document.getElementById("preview-script-text");

  if (text) {
    textEl.textContent = text;
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
  }
}

// ── Generate Video ──
async function handleGenerate() {
  const pipe = PIPELINES[selectedPipeline];
  if (!pipe) return;

  const script = document.getElementById("script-input").value.trim();
  const videoUrl = document.getElementById("video-url-input").value.trim();
  const audioUrl = document.getElementById("audio-url-input").value.trim();
  const dubLang = document.getElementById("dub-lang-select").value;
  const quality = document.getElementById("quality-select").value;

  // Build input
  let input = { pipeline: selectedPipeline, aspectRatio: selectedRatio, quality };

  if (pipe.sections.includes("script") || pipe.sections.includes("avatar")) {
    if (!script) { alert(lang === "en" ? "Please enter a script." : "请输入脚本内容。"); return; }
    input.prompt = script;
  }

  if (pipe.sections.includes("avatar")) {
    input.voice = selectedVoiceId;
    if (selectedAvatarId) {
      const av = AVATARS.find(a => a.id === selectedAvatarId);
      input.avatarUrl = av ? av.full : "";
    } else {
      input.avatarUrl = document.getElementById("custom-avatar-url").value.trim();
    }
  }

  if (pipe.sections.includes("media") || pipe.sections.includes("media-dub")) {
    if (!videoUrl) { alert(lang === "en" ? "Please provide a source video URL." : "请提供源视频 URL。"); return; }
    input.video_url = videoUrl;
    if (pipe.sections.includes("media-dub")) {
      input.dubLang = dubLang;
    } else {
      input.audio_url = audioUrl;
    }
  }

  // Disable button
  const btn = document.getElementById("generate-btn");
  const loader = document.getElementById("btn-loader");
  btn.disabled = true;
  loader.classList.remove("hidden");

  try {
    const res = await fetch("/api/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: pipe.model, input })
    });
    const result = await res.json();

    if (result.code === 200 && result.data && result.data.taskId) {
      startGeneration(result.data.taskId, selectedPipeline, pipe.model, script || `Pipeline: ${pipe.name[lang]}`);
    } else {
      alert(lang === "en" ? `Error: ${result.msg || "Unknown"}` : `错误：${result.msg || "未知错误"}`);
    }
  } catch (err) {
    console.error(err);
    alert(lang === "en" ? "Connection error" : "连接错误");
  } finally {
    btn.disabled = false;
    loader.classList.add("hidden");
  }
}

// ── Generation Tracking ──
function startGeneration(taskId, pipeline, model, prompt) {
  goToStep(3);

  // Reset UI
  document.getElementById("gen-progress").classList.remove("hidden");
  document.getElementById("gen-result").classList.add("hidden");

  const stages = ["research", "script", "storyboard", "assets", "render", "review"];
  let stageIndex = 0;
  let elapsed = 0;

  document.getElementById("gen-task-id").textContent = `ID: ${taskId}`;
  updateStageUI(stages, stageIndex);

  activeGeneration = {
    taskId, pipeline, model, prompt,
    interval: setInterval(async () => {
      elapsed += 2;
      document.getElementById("gen-elapsed").textContent = formatTime(elapsed);

      // Advance stages
      if (elapsed > 4 && stageIndex === 0) { stageIndex = 1; updateStageUI(stages, stageIndex); }
      if (elapsed > 8 && stageIndex === 1) { stageIndex = 2; updateStageUI(stages, stageIndex); }
      if (elapsed > 14 && stageIndex === 2) { stageIndex = 3; updateStageUI(stages, stageIndex); }
      if (elapsed > 22 && stageIndex === 3) { stageIndex = 4; updateStageUI(stages, stageIndex); }
      if (elapsed > 30 && stageIndex === 4) { stageIndex = 5; updateStageUI(stages, stageIndex); }

      // Poll
      try {
        const res = await fetch(`/api/record-info?taskId=${taskId}`);
        const result = await res.json();
        if (result.code === 200 && result.data) {
          const d = result.data;
          const status = d.status || d.state;
          if (status === "success" || status === "completed" || d.videoUrl || d.imageUrl) {
            clearInterval(activeGeneration.interval);
            const mediaUrl = d.videoUrl || d.imageUrl || (d.output ? d.output[0] : null);
            generationComplete(mediaUrl);
          } else if (status === "failed" || status === "error") {
            clearInterval(activeGeneration.interval);
            alert(lang === "en" ? "Generation failed." : "生成失败。");
            goToStep(1);
          }
        }
      } catch (e) { console.error(e); }
    }, 2000)
  };
}

function updateStageUI(stages, index) {
  const fill = document.getElementById("stage-fill");
  fill.style.width = `${((index + 1) / stages.length) * 100}%`;

  stages.forEach((s, i) => {
    const el = document.getElementById(`stage-${s}`);
    if (!el) return;
    el.classList.remove("active", "completed");
    if (i < index) el.classList.add("completed");
    else if (i === index) el.classList.add("active");
  });
}

function generationComplete(mediaUrl) {
  // Save to gallery
  const gen = activeGeneration;
  const item = {
    taskId: gen.taskId,
    pipeline: gen.pipeline,
    model: gen.model,
    prompt: gen.prompt,
    mediaUrl: mediaUrl || "",
    timestamp: Date.now()
  };
  gallery.unshift(item);
  localStorage.setItem("om_gallery", JSON.stringify(gallery));

  // Show result
  document.getElementById("gen-progress").classList.add("hidden");
  document.getElementById("gen-result").classList.remove("hidden");

  if (mediaUrl) {
    const video = document.getElementById("result-video");
    video.src = mediaUrl;
    video.load();

    document.getElementById("result-download").onclick = () => {
      const a = document.createElement("a");
      a.href = mediaUrl;
      a.download = `${gen.pipeline}-${gen.taskId}`;
      a.target = "_blank";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    };
  }

  fetchCredits();
  renderProjects();
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ── Credits ──
async function fetchCredits() {
  try {
    const res = await fetch("/api/credit");
    const data = await res.json();
    if (data.code === 200) {
      document.getElementById("credit-value").textContent = typeof data.data === "number" ? data.data.toFixed(2) : data.data;
    }
  } catch (e) {
    document.getElementById("credit-value").textContent = "Error";
  }
}

// ── Projects Gallery ──
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const empty = document.getElementById("empty-projects");

  if (gallery.length === 0) {
    empty.style.display = "flex";
    // Remove any cards
    grid.querySelectorAll(".project-card").forEach(c => c.remove());
    return;
  }

  empty.style.display = "none";
  // Clear previous cards only
  grid.querySelectorAll(".project-card").forEach(c => c.remove());

  gallery.forEach(item => {
    const pipe = PIPELINES[item.pipeline];
    const card = document.createElement("div");
    card.className = "project-card";

    const date = new Date(item.timestamp);
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    card.innerHTML = `
      <div class="project-thumb">
        ${item.mediaUrl ? `<video src="${item.mediaUrl}" muted loop playsinline preload="metadata"></video>` : ""}
        <div class="play-overlay"><div class="play-overlay-circle"><i data-lucide="play"></i></div></div>
        <div class="project-badge">${pipe ? pipe.name[lang] : item.pipeline}</div>
      </div>
      <div class="project-info">
        <div class="project-title">${item.prompt}</div>
        <div class="project-date">${dateStr} · ${item.model}</div>
      </div>
    `;

    // Hover play
    const video = card.querySelector("video");
    if (video) {
      card.addEventListener("mouseenter", () => video.play().catch(() => {}));
      card.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0; });
    }

    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });

  lucide.createIcons();
}

// ── Modal ──
function openModal(item) {
  const pipe = PIPELINES[item.pipeline];
  document.getElementById("modal-video").src = item.mediaUrl || "";
  document.getElementById("modal-pipeline-name").textContent = pipe ? pipe.name[lang] : item.pipeline;
  document.getElementById("modal-engine").textContent = pipe ? pipe.engines.join(", ") : item.model;
  document.getElementById("modal-task-id").textContent = item.taskId;
  document.getElementById("modal-date").textContent = new Date(item.timestamp).toLocaleString();
  document.getElementById("modal-script").textContent = item.prompt;

  document.getElementById("modal-download").onclick = () => {
    if (item.mediaUrl) {
      const a = document.createElement("a");
      a.href = item.mediaUrl; a.download = `${item.pipeline}-${item.taskId}`; a.target = "_blank";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  document.getElementById("modal-rerun").onclick = () => {
    closeModal();
    selectPipeline(item.pipeline);
    setTimeout(() => {
      document.getElementById("script-input").value = item.prompt;
      document.getElementById("char-count").textContent = `${item.prompt.length} / 5000`;
      updatePreviewScript();
    }, 100);
  };

  document.getElementById("modal-overlay").classList.remove("hidden");
  lucide.createIcons();
}

function closeModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-video").pause();
  document.getElementById("modal-video").src = "";
}
