// Predefined Digital Human Avatars (Unsplash Professional Headshots)
const PRESETS_AVATARS = [
  {
    id: "xiaomi",
    name: { en: "Xiaomi (Beauty)", zh: "小米 (美妆服饰)" },
    thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60",
    full: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "xiaomei",
    name: { en: "Xiaomei (Lifestyle)", zh: "小美 (生活百货)" },
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
    full: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "daqiang",
    name: { en: "Daqiang (Tech)", zh: "大强 (数码科技)" },
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    full: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "lisa",
    name: { en: "Lisa (English)", zh: "丽萨 (外贸英文)" },
    thumb: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60",
    full: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80"
  }
];

// E-commerce & Explainer Script Templates
const SCRIPT_TEMPLATES = {
  "animated-explainer": [
    {
      id: "exp-tech",
      label: { en: "AI Explainer", zh: "AI科普解说" },
      text: {
        en: "Explain how neural networks learn in 60 seconds, using analog analogies like training a dog.",
        zh: "用60秒通俗解释神经网络是如何学习的，使用像驯狗一样的生活化类比。"
      }
    },
    {
      id: "exp-finance",
      label: { en: "Bitcoin Explained", zh: "比特币科普" },
      text: {
        en: "Explain the concept of blockchain ledger and bitcoin mining in simple terms for beginners.",
        zh: "为初学者通俗讲解区块链账本与比特币挖矿的概念。"
      }
    }
  ],
  "avatar-spokesperson": [
    {
      id: "sales-new",
      label: { en: "New Release", zh: "新品首发" },
      text: {
        en: "Look at this brand new tech gadget in my hand! Today's launch gets an instant $50 off and a free 1-year warranty. Click below to buy now!",
        zh: "大家看我手上这款最新上市的科技好物！今天首发直降300元，限时赠送一年质保，赶快点击下方链接购买吧！"
      }
    },
    {
      id: "sales-flash",
      label: { en: "Flash Sale", zh: "限量秒杀" },
      text: {
        en: "Counting down the last 5 minutes! Lowest price online, limited to 50 orders, once gone it returns to full price! Don't wait, act now!",
        zh: "倒计时最后五分钟！全网最低价，限量五十单，抢完立马恢复原价！犹豫一秒就没有了，大家手速一定要快！"
      }
    }
  ],
  "documentary-montage": [
    {
      id: "doc-city",
      label: { en: "City at 4 AM", zh: "清晨四点的城市" },
      text: {
        en: "A dreamlike montage about coming home in the rain at 4 AM, using real stock footage, elegiac tone.",
        zh: "一个关于凌晨四点雨中归家的梦幻蒙太奇，仅使用真实纪录档案片段，需要一种挽歌般的基调。"
      }
    }
  ]
};

// OpenMontage Pipelines Config
const PIPELINES = {
  "animated-explainer": {
    name: { en: "Animated Explainer", zh: "动画解说" },
    desc: {
      en: "Multi-stage pipeline: writes educational script, generates visuals, synthesizes voice, and renders in Remotion.",
      zh: "多阶段流水线：撰写科普脚本、生成对应图像视觉、合成旁白配音并使用 Remotion 动画渲染。"
    },
    panels: ["text-prompts"],
    engines: "Imagen4 + Google TTS + Remotion"
  },
  "animation": {
    name: { en: "Flat Motion Animation", zh: "扁平动态图形" },
    desc: {
      en: "Typography and GSAP-driven motion graphics for SaaS product introductions.",
      zh: "以文字排版和 GSAP 动效驱动的动态图形视频，最适合 SaaS 产品发布介绍。"
    },
    panels: ["text-prompts"],
    engines: "GSAP + HyperFrames"
  },
  "avatar-spokesperson": {
    name: { en: "Avatar Spokesperson", zh: "数字人带货" },
    desc: {
      en: "Generates realistic, expressive talking head video from portrait image and text sales script.",
      zh: "结合主播肖像照片与文本，生成逼真、极富销售表现力的 AI 数字人带货视频。"
    },
    panels: ["avatar-settings", "text-prompts"],
    engines: "OmniHuman 1.5 + Volcengine Lip-Sync"
  },
  "cinematic": {
    name: { en: "Cinematic Trailer", zh: "电影级预告片" },
    desc: {
      en: "Generates cinematic storyboard frames and triggers high-fidelity text-to-video engines.",
      zh: "生成高水平电影分镜，并调用 Kling/Veo 视频模型制作电影画质的预告视频。"
    },
    panels: ["text-prompts"],
    engines: "Kling v3.0 / Google Veo 3.1"
  },
  "documentary-montage": {
    name: { en: "Documentary Montage", zh: "纪录片蒙太奇" },
    desc: {
      en: "CLIP-indexed retrieval from open databases (NASA, Wikimedia) to compile historical tone-poems.",
      zh: "从开源数据库（NASA、维基共享、Pexels）中根据提示词语义检索真实的纪录片空镜头并拼接剪辑。"
    },
    panels: ["text-prompts"],
    engines: "Archive.org + Wikimedia + FFmpeg"
  },
  "clip-factory": {
    name: { en: "Clip Factory", zh: "长视频剪切切片" },
    desc: {
      en: "Splits a long video into short, viral social media clips automatically.",
      zh: "自动将长视频进行精彩场景切片，提取出适合社交媒体分发的短视频片段。"
    },
    panels: ["media-sources"],
    engines: "WhisperX + SceneDetect + FFmpeg"
  },
  "screen-demo": {
    name: { en: "Screen Demo", zh: "产品录屏演示" },
    desc: {
      en: "Polishes raw computer screen recordings with dynamic zoom, layouts, and voice guidance.",
      zh: "对原始电脑录屏添加平滑的缩放、排版边框、鼠标轨迹高亮及旁白配音。"
    },
    panels: ["media-sources"],
    engines: "FFmpeg + Remotion Layouts"
  },
  "hybrid": {
    name: { en: "Hybrid Video", zh: "混合合成视频" },
    desc: {
      en: "Fuses live-action recordings with AI overlays and graphics enhancements.",
      zh: "将实拍录像与 AI 辅助图像视觉、特效进行图层融合与画中画合成。"
    },
    panels: ["media-sources"],
    engines: "Remotion Compositor + FFmpeg"
  },
  "localization-dub": {
    name: { en: "Localization & Dub", zh: "视频本地化配音" },
    desc: {
      en: "Translates speech, clones voiceover in target language, and burns-in subtitles.",
      zh: "翻译原视频语音，以相同的音色克隆合成目标语种配音，并自动烧录中英字幕。"
    },
    panels: ["media-sources"],
    engines: "WhisperX + GPT Translate + ElevenLabs"
  },
  "podcast-repurpose": {
    name: { en: "Podcast Repurpose", zh: "播客音频转视频" },
    desc: {
      en: "Transforms raw audio podcasts into short video formats with waveforms and dynamic subtitles.",
      zh: "为原始播客音频添加音频波形图、动态头像、产品贴图和逐词滚动字幕。"
    },
    panels: ["media-sources"],
    engines: "WhisperX + Waveform Render + Remotion"
  },
  "talking-head": {
    name: { en: "Talking Head", zh: "口播口型同步" },
    desc: {
      en: "Perfectly aligns custom host video mouth movements with a new voiceover track.",
      zh: "将已有的主播面部视频口型与全新的音频文件重新同步对齐。"
    },
    panels: ["media-sources"],
    engines: "Volcengine Lip-Sync"
  }
};

// Bilingual Dictionaries
const TRANSLATIONS = {
  en: {
    title: "OpenMontage Web Console",
    subtitle: "Industrial Agentic Video Production Console",
    balance: "Balance",
    controlPanelHeader: "Production Panel",
    pipelineLabel: "Production Pipeline",
    groupGenerated: "AI Generated & Explainers",
    groupMaterial: "Source Material & Archival",
    groupRepurpose: "Re-purpose & Localization",
    pipeExplainer: "Animated Explainer",
    pipeAnimation: "Flat Motion Animation",
    pipeAvatar: "Avatar Spokesperson",
    pipeCinematic: "Cinematic Trailer",
    pipeDocumentary: "Documentary Montage",
    pipeClipFactory: "Clip Factory",
    pipeScreenDemo: "Screen Demo",
    pipeHybrid: "Hybrid Video",
    pipeDub: "Localization & Dub",
    pipePodcast: "Podcast Repurpose",
    pipeTalkingHead: "Talking Head",
    promptLabel: "Script / Topic Brief",
    promptPlaceholder: "Describe the video topic, script or storyboard...",
    avatarLabel: "Choose Host Avatar",
    templateLabel: "Template:",
    voiceLabel: "Voice Tone",
    voiceFemaleSales: "Sales Female (High Energy)",
    voiceFemaleSweet: "Sweet Female",
    voiceMaleProfessional: "Professional Male",
    voiceEnglishFemale: "English Female",
    targetAudioLabel: "Target Audio URL",
    targetAudioDesc: "Provide the voiceover audio track URL to synchronize lips with.",
    sourceVideoLabel: "Source Avatar Video URL",
    sourceVideoDesc: "Provide the source video showing the host's face.",
    targetLangLabel: "Target Dub Language",
    advancedSettings: "Advanced Configuration",
    aspectRatioLabel: "Aspect Ratio",
    aspectRatio916: "9:16 Mobile",
    aspectRatio169: "16:9 Widescreen",
    aspectRatio11: "1:1 Square",
    qualityLabel: "Quality / Resolution",
    quality720: "720p HD",
    quality1080: "1080p Full HD",
    budgetLabel: "Budget Governance",
    budgetObserve: "Observe Only",
    budgetWarn: "Warn on Overrun",
    budgetCap: "Strict Cap ($5.00)",
    alignAudioLabel: "Forced Audio Lip-Sync Alignment",
    generateBtn: "Start Production Pipeline",
    activeGenerations: "Active Pipelines",
    noActiveTasks: "No active pipelines running. Submit a task to begin.",
    creativeGallery: "Project Outputs",
    filterAll: "All Outputs",
    filterImages: "Images",
    filterVideos: "Videos",
    noMasterpieces: "Your completed projects will appear here.",
    modalTitle: "Project Production Log",
    downloadBtn: "Download Video",
    useSettingsBtn: "Re-run Pipeline",
    tryLabel: "Try:",
    statusPending: "Pending",
    statusProcessing: "Processing",
    statusSuccess: "Success",
    statusFailed: "Failed",
    compilationPipeline: "OpenMontage Stage Director",
    stepResearch: "Research",
    stepScript: "Script",
    stepStoryboard: "Storyboard",
    stepAssets: "Asset Gen",
    stepEdit: "Timeline",
    stepRender: "Rendering",
    stepReview: "Quality Gate"
  },
  zh: {
    title: "OpenMontage Web 控制台",
    subtitle: "工业级代理化视频制作系统",
    balance: "账户余额",
    controlPanelHeader: "生产配置控制台",
    pipelineLabel: "视频生产流水线",
    groupGenerated: "AI 创意生成与解说",
    groupMaterial: "素材检索与后期加工",
    groupRepurpose: "视频重制与本地化",
    pipeExplainer: "动画解说 (Animated Explainer)",
    pipeAnimation: "扁平动态图形 (Animation)",
    pipeAvatar: "数字人带货 (Spokesperson)",
    pipeCinematic: "电影预告片 (Cinematic)",
    pipeDocumentary: "纪录片蒙太奇 (Montage)",
    pipeClipFactory: "长视频切片 (Clip Factory)",
    pipeScreenDemo: "产品录屏演示 (Screen Demo)",
    pipeHybrid: "混合合成视频 (Hybrid)",
    pipeDub: "视频配音本地化 (Dubbing)",
    pipePodcast: "播客重制 (Podcast)",
    pipeTalkingHead: "口播口型同步 (Talking Head)",
    promptLabel: "带货脚本 / 主题大纲",
    promptPlaceholder: "在此输入您的带货文案、解说大纲或画面分镜脚本...",
    avatarLabel: "选择带货主播人像",
    templateLabel: "话术模板:",
    voiceLabel: "主播配音音色",
    voiceFemaleSales: "带货女声 (高能量/激情)",
    voiceFemaleSweet: "亲和甜美型女声",
    voiceMaleProfessional: "专业男声 (沉稳/科技感)",
    voiceEnglishFemale: "外贸英语女声",
    targetAudioLabel: "配音音频 URL (目标音频)",
    targetAudioDesc: "提供您需要同步的主播配音音频 URL 链接。",
    sourceVideoLabel: "主播原始视频 URL (源视频)",
    sourceVideoDesc: "提供需要修改口型的原始主播面部视频 URL 链接。",
    targetLangLabel: "目标翻译语种",
    advancedSettings: "生产安全与通用设定",
    aspectRatioLabel: "画面比例",
    aspectRatio916: "9:16 手机短视频",
    aspectRatio169: "16:9 电脑宽屏",
    aspectRatio11: "1:1 正方形",
    qualityLabel: "清晰度 / 分辨率",
    quality720: "720p 高清",
    quality1080: "1080p 超清",
    budgetLabel: "预算防超限治理",
    budgetObserve: "仅跟踪记录",
    budgetWarn: "超出时预警",
    budgetCap: "硬性封顶 ($5.00)",
    alignAudioLabel: "强制进行人声口型对齐",
    generateBtn: "启动视频生产流水线",
    activeGenerations: "正在运行的流水线",
    noActiveTasks: "暂无运行中的流水线。在左侧配置并提交以开始！",
    creativeGallery: "项目渲染成果",
    filterAll: "全部渲染产出",
    filterImages: "图片",
    filterVideos: "视频",
    noMasterpieces: "您完成的项目视频将显示在这里。",
    modalTitle: "项目生产审计日志",
    downloadBtn: "下载视频成果",
    useSettingsBtn: "复制参数重跑",
    tryLabel: "推荐:",
    statusPending: "排队中",
    statusProcessing: "合成中",
    statusSuccess: "完成",
    statusFailed: "失败",
    compilationPipeline: "OpenMontage 阶段导演",
    stepResearch: "网络研究",
    stepScript: "剧本编写",
    stepStoryboard: "分镜场景",
    stepAssets: "资产生成",
    stepEdit: "时间线剪辑",
    stepRender: "合成渲染",
    stepReview: "质量把关"
  }
};

// Application State
let currentLang = "en"; // 'en' or 'zh'
let selectedAvatarId = "xiaomi"; // default selected preset avatar
let activeTasks = [];
let galleryItems = [];
let selectedTaskId = null; // tracking which task is active in stage director

// DOM Elements
const langToggleBtn = document.getElementById("lang-toggle");
const langText = document.getElementById("lang-text");
const pipelineSelect = document.getElementById("pipeline-select");
const modelDesc = document.getElementById("model-desc");
const promptInput = document.getElementById("prompt-input");
const suggestionsContainer = document.getElementById("suggestions-container");
const avatarSelectionGroup = document.getElementById("avatar-selection-group");
const avatarGridContainer = document.getElementById("avatar-grid-container");
const customAvatarUrl = document.getElementById("custom-avatar-url");
const templateChipsContainer = document.getElementById("template-chips-container");
const generatorForm = document.getElementById("generator-form");
const generateSubmit = document.getElementById("generate-submit");
const btnSpinner = document.getElementById("btn-spinner");
const activeTasksList = document.getElementById("active-tasks-list");
const galleryGrid = document.getElementById("gallery-grid");
const creditValue = document.getElementById("credit-value");
const refreshCredits = document.getElementById("refresh-credits");
const refreshIcon = document.getElementById("refresh-icon");

// Advanced settings elements
const advancedToggleBtn = document.getElementById("advanced-toggle-btn");
const advancedChevron = document.getElementById("advanced-chevron");
const advancedParamsPanel = document.getElementById("advanced-params-panel");

// Dynamic panels
const panelTextPrompts = document.getElementById("panel-text-prompts");
const panelAvatarSettings = document.getElementById("panel-avatar-settings");
const panelMediaSources = document.getElementById("panel-media-sources");
const groupTargetAudio = document.getElementById("group-target-audio");
const groupTargetLang = document.getElementById("group-target-lang");

const audioUrlInput = document.getElementById("audio-url-input");
const videoUrlInput = document.getElementById("video-url-input");
const dubLangSelect = document.getElementById("dub-lang-select");

// Modal Elements
const mediaModal = document.getElementById("media-modal");
const modalCloseBackdrop = document.getElementById("modal-close-backdrop");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalMediaContainer = document.getElementById("modal-media-container");
const modalPipelineVal = document.getElementById("modal-pipeline-val");
const modalModelVal = document.getElementById("modal-model-val");
const modalTaskIdVal = document.getElementById("modal-task-id-val");
const modalPromptText = document.getElementById("modal-prompt-text");
const modalDownloadBtn = document.getElementById("modal-download-btn");
const modalUsePromptBtn = document.getElementById("modal-use-prompt-btn");

// Initialize Application
window.addEventListener("DOMContentLoaded", () => {
  // Load preferred language
  const savedLang = localStorage.getItem("kie_ai_lang");
  if (savedLang === "en" || savedLang === "zh") {
    currentLang = savedLang;
  }
  
  // Translate UI
  updateLanguageUI();
  
  // Render Preset Avatars
  renderPresetAvatars();
  
  // Load gallery
  loadGallery();
  
  // Fetch credits balance
  fetchCredits();
  
  // Initial pipeline form render
  handlePipelineChange();
  
  // Initialize Lucide Icons
  lucide.createIcons();
  
  // Event Listeners
  langToggleBtn.addEventListener("click", toggleLanguage);
  pipelineSelect.addEventListener("change", handlePipelineChange);
  generatorForm.addEventListener("submit", handleFormSubmit);
  refreshCredits.addEventListener("click", fetchCredits);
  customAvatarUrl.addEventListener("input", handleCustomAvatarInput);
  
  // Advanced Toggle
  advancedToggleBtn.addEventListener("click", () => {
    const isHidden = advancedParamsPanel.classList.toggle("hidden");
    advancedToggleBtn.classList.toggle("open", !isHidden);
    advancedChevron.setAttribute("data-lucide", isHidden ? "chevron-down" : "chevron-up");
    lucide.createIcons();
  });
  
  // Gallery filters
  document.querySelectorAll(".filter-tab").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery(btn.dataset.filter);
    });
  });

  // Modal close handlers
  modalCloseBtn.addEventListener("click", closeModal);
  modalCloseBackdrop.addEventListener("click", closeModal);
});

// Switch Pipeline - Show / Hide Dynamic Panels
function handlePipelineChange() {
  const pipeKey = pipelineSelect.value;
  const config = PIPELINES[pipeKey];
  
  if (!config) return;
  
  // Update description
  modelDesc.textContent = config.desc[currentLang];
  
  // Hide all dynamic panels
  panelTextPrompts.classList.add("hidden");
  panelAvatarSettings.classList.add("hidden");
  panelMediaSources.classList.add("hidden");
  
  // Show required panels
  config.panels.forEach(p => {
    if (p === "text-prompts") panelTextPrompts.classList.remove("hidden");
    if (p === "avatar-settings") panelAvatarSettings.classList.remove("hidden");
    if (p === "media-sources") panelMediaSources.classList.remove("hidden");
  });
  
  // Sub-controls configuration depending on specific pipelines
  if (pipeKey === "localization-dub") {
    groupTargetAudio.classList.add("hidden");
    groupTargetLang.classList.remove("hidden");
  } else if (pipeKey === "talking-head") {
    groupTargetAudio.classList.remove("hidden");
    groupTargetLang.classList.add("hidden");
  } else {
    groupTargetAudio.classList.remove("hidden");
    groupTargetLang.classList.remove("hidden");
  }
  
  // Render templates
  renderScriptTemplates(pipeKey);
}

// Render predefined avatars
function renderPresetAvatars() {
  avatarGridContainer.innerHTML = "";
  PRESETS_AVATARS.forEach(avatar => {
    const card = document.createElement("div");
    card.className = `avatar-card ${avatar.id === selectedAvatarId ? 'active' : ''}`;
    card.dataset.id = avatar.id;
    card.title = avatar.name[currentLang];
    
    card.innerHTML = `
      <img src="${avatar.thumb}" alt="${avatar.name[currentLang]}" class="avatar-thumbnail">
    `;
    
    card.addEventListener("click", () => selectAvatar(avatar.id));
    avatarGridContainer.appendChild(card);
  });
}

// Select preset avatar
function selectAvatar(avatarId) {
  selectedAvatarId = avatarId;
  customAvatarUrl.value = "";
  
  document.querySelectorAll(".avatar-card").forEach(card => {
    card.classList.toggle("active", card.dataset.id === avatarId);
  });
}

// Handle custom avatar url pasting
function handleCustomAvatarInput() {
  if (customAvatarUrl.value.trim() !== "") {
    selectedAvatarId = null;
    document.querySelectorAll(".avatar-card").forEach(card => {
      card.classList.remove("active");
    });
  }
}

// Render script templates chips based on active pipeline
function renderScriptTemplates(pipeline) {
  templateChipsContainer.innerHTML = "";
  
  // Get script templates list or fall back to explainer
  const templates = SCRIPT_TEMPLATES[pipeline] || SCRIPT_TEMPLATES["animated-explainer"];
  
  templates.forEach(tmpl => {
    const chip = document.createElement("div");
    chip.className = "template-chip";
    chip.textContent = tmpl.label[currentLang];
    
    chip.addEventListener("click", () => {
      promptInput.value = tmpl.text[currentLang];
    });
    
    templateChipsContainer.appendChild(chip);
  });
}

// Toggle language
function toggleLanguage() {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("kie_ai_lang", currentLang);
  
  updateLanguageUI();
  renderPresetAvatars();
  handlePipelineChange();
  renderActiveTasks();
  renderGallery();
  updateStageDirectorUI(); // Refresh pipeline stepper headers
}

// Translate UI elements
function updateLanguageUI() {
  const dictionary = TRANSLATIONS[currentLang];
  langText.textContent = currentLang === "en" ? "中文" : "English";
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });
  
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dictionary[key]) {
      el.setAttribute("placeholder", dictionary[key]);
    }
  });
}

// Fetch Account Balance
async function fetchCredits() {
  refreshIcon.classList.add("spin");
  try {
    const res = await fetch("/api/credit");
    const data = await res.json();
    if (data.code === 200) {
      creditValue.textContent = typeof data.data === "number" ? data.data.toFixed(2) : data.data;
    } else {
      creditValue.textContent = "Error";
    }
  } catch (error) {
    console.error("Error loading credits:", error);
    creditValue.textContent = "Error";
  } finally {
    setTimeout(() => refreshIcon.classList.remove("spin"), 500);
  }
}

// Form Submit - Trigger Task Generation
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const pipeline = pipelineSelect.value;
  const prompt = promptInput.value.trim();
  const aspectRatio = document.querySelector('input[name="aspectRatio"]:checked').value;
  const quality = document.getElementById("quality-select").value;
  const budgetMode = document.getElementById("budget-select").value;
  
  // Validation depending on pipeline requirements
  let input = { pipeline, aspectRatio, quality, budgetMode };
  let model_id = "omnihuman-v1.5"; // default fallback for avatar spokesperson
  
  if (pipeline === "animated-explainer" || pipeline === "animation" || pipeline === "cinematic" || pipeline === "documentary-montage") {
    if (!prompt) return;
    input.prompt = prompt;
    
    // Select specific Kie.ai backend engine
    if (pipeline === "animated-explainer") model_id = "imagen4";
    if (pipeline === "animation") model_id = "ideogram-v3";
    if (pipeline === "cinematic") model_id = "kling-v3";
    if (pipeline === "documentary-montage") model_id = "grok-imagine";
  } else if (pipeline === "avatar-spokesperson") {
    if (!prompt) return;
    input.prompt = prompt;
    input.voice = document.getElementById("voice-select").value;
    model_id = "omnihuman-v1.5";
    
    if (selectedAvatarId) {
      const avatar = PRESETS_AVATARS.find(a => a.id === selectedAvatarId);
      input.avatarUrl = avatar ? avatar.full : "";
    } else {
      input.avatarUrl = customAvatarUrl.value.trim();
    }
  } else {
    // Media Source pipelines
    const videoUrl = videoUrlInput.value.trim();
    const audioUrl = audioUrlInput.value.trim();
    const dubLang = dubLangSelect.value;
    
    if (!videoUrl) return;
    input.videoUrl = videoUrl;
    
    if (pipeline === "localization-dub") {
      input.dubLang = dubLang;
      model_id = "volcengine/video-to-video-lip-sync"; // uses Volcengine translation/lip-sync
    } else if (pipeline === "talking-head") {
      input.audioUrl = audioUrl;
      model_id = "volcengine/video-to-video-lip-sync";
    } else {
      model_id = "kling-v3";
    }
  }
  
  // Disable button
  generateSubmit.disabled = true;
  btnSpinner.classList.remove("hidden");
  
  try {
    const res = await fetch("/api/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: model_id, input })
    });
    
    const result = await res.json();
    
    if (result.code === 200 && result.data && result.data.taskId) {
      // Clear inputs
      promptInput.value = "";
      customAvatarUrl.value = "";
      videoUrlInput.value = "";
      audioUrlInput.value = "";
      
      const taskId = result.data.taskId;
      addTaskToQueue(taskId, pipeline, model_id, prompt || `Pipeline run: ${pipeline}`);
    } else {
      alert(currentLang === "en" 
        ? `Generation Failed: ${result.msg || "Server returned error status"}`
        : `生成失败：${result.msg || "服务器返回了错误状态"}`
      );
    }
  } catch (error) {
    console.error("Error creating generation task:", error);
    alert(currentLang === "en" ? "Connection Error: Failed to start task." : "连接错误：任务启动失败。");
  } finally {
    generateSubmit.disabled = false;
    btnSpinner.classList.add("hidden");
  }
}

// Add task to tracking queue
function addTaskToQueue(taskId, pipeline, model, prompt) {
  const task = {
    taskId,
    pipeline,
    model,
    prompt,
    status: "pending",
    elapsed: 0,
    stage: "research", // Active OpenMontage compilation step
    intervalId: null
  };
  
  activeTasks.push(task);
  selectedTaskId = taskId; // auto-focus stepper on newest task
  renderActiveTasks();
  updateStageDirectorUI();
  
  // Start Polling & stage simulation
  task.intervalId = setInterval(() => {
    task.elapsed += 2;
    
    // Simulate pipeline stages progression based on elapsed seconds
    if (task.elapsed > 4 && task.stage === "research") task.stage = "script";
    else if (task.elapsed > 8 && task.stage === "script") task.stage = "storyboard";
    else if (task.elapsed > 12 && task.stage === "storyboard") task.stage = "assets";
    else if (task.elapsed > 18 && task.stage === "assets") task.stage = "edit";
    else if (task.elapsed > 24 && task.stage === "edit") task.stage = "render";
    else if (task.elapsed > 30 && task.stage === "render") task.stage = "review";
    
    pollTaskStatus(task);
  }, 2000);
}

// Poll status of a specific task
async function pollTaskStatus(task) {
  try {
    const res = await fetch(`/api/record-info?taskId=${task.taskId}`);
    const result = await res.json();
    
    if (result.code === 200 && result.data) {
      const taskData = result.data;
      const remoteStatus = taskData.status || taskData.state;
      
      if (remoteStatus === "success" || remoteStatus === "completed" || taskData.videoUrl || taskData.imageUrl) {
        clearInterval(task.intervalId);
        task.status = "success";
        task.stage = "success";
        
        const mediaUrl = taskData.videoUrl || taskData.imageUrl || (taskData.output ? taskData.output[0] : null);
        
        if (mediaUrl) {
          saveToGallery(task.taskId, task.pipeline, task.model, task.prompt, mediaUrl);
        }
        
        removeTaskFromQueue(task.taskId);
        fetchCredits();
      } else if (remoteStatus === "failed" || remoteStatus === "error") {
        clearInterval(task.intervalId);
        task.status = "failed";
        alert(currentLang === "en" ? `Pipeline task ${task.taskId} failed.` : `流水线任务 ${task.taskId} 失败。`);
        setTimeout(() => removeTaskFromQueue(task.taskId), 5000);
      } else if (remoteStatus === "processing" || remoteStatus === "running") {
        task.status = "processing";
        renderActiveTasks();
        if (selectedTaskId === task.taskId) {
          updateStageDirectorUI();
        }
      } else {
        task.status = "pending";
        renderActiveTasks();
      }
    }
  } catch (error) {
    console.error(`Error polling task ${task.taskId}:`, error);
  }
}

function removeTaskFromQueue(taskId) {
  activeTasks = activeTasks.filter(t => t.taskId !== taskId);
  if (selectedTaskId === taskId) {
    selectedTaskId = activeTasks.length > 0 ? activeTasks[0].taskId : null;
  }
  renderActiveTasks();
  updateStageDirectorUI();
}

// Render active queue list
function renderActiveTasks() {
  const listContainer = document.getElementById("active-tasks-list");
  
  if (activeTasks.length === 0) {
    const placeholderText = TRANSLATIONS[currentLang].noActiveTasks;
    listContainer.innerHTML = `
      <div class="empty-state">
        <i data-lucide="info"></i>
        <p>${placeholderText}</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  listContainer.innerHTML = "";
  
  activeTasks.forEach(task => {
    const card = document.createElement("div");
    // If selected/active, add highlighted style
    const isSelectedClass = task.taskId === selectedTaskId ? "border-focus" : "";
    card.className = `task-card ${isSelectedClass}`;
    card.style.cursor = "pointer";
    
    // Add click to focus Stage Director stepper
    card.addEventListener("click", () => {
      selectedTaskId = task.taskId;
      document.querySelectorAll(".task-card").forEach(c => c.classList.remove("border-focus"));
      card.classList.add("border-focus");
      updateStageDirectorUI();
    });
    
    const badgeKey = task.status === "pending" ? "statusPending" : (task.status === "processing" ? "statusProcessing" : (task.status === "success" ? "statusSuccess" : "statusFailed"));
    const badgeText = TRANSLATIONS[currentLang][badgeKey];
    
    // Capitalize pipeline friendly name
    const pipelineFriendlyName = PIPELINES[task.pipeline]?.name[currentLang] || task.pipeline;
    
    card.innerHTML = `
      <div class="task-info">
        <span class="task-model">${pipelineFriendlyName} • <span class="group-desc">${task.model}</span></span>
        <span class="task-prompt-preview" title="${task.prompt}">${task.prompt}</span>
        <span class="task-meta">ID: ${task.taskId} • Elapsed: ${task.elapsed}s</span>
      </div>
      <div class="task-status-area">
        <div class="status-badge ${task.status}">
          <i data-lucide="${task.status === 'processing' ? 'loader' : 'clock'}"></i>
          <span>${badgeText}</span>
        </div>
      </div>
    `;
    listContainer.appendChild(card);
  });
  
  lucide.createIcons();
}

// Update the visual OpenMontage Stage Director Stepper Nodes
function updateStageDirectorUI() {
  const steps = ["research", "script", "storyboard", "assets", "edit", "render", "review"];
  
  // If no task selected, grey out all stepper nodes
  if (!selectedTaskId) {
    steps.forEach(step => {
      const el = document.getElementById(`step-${step}`);
      if (el) el.className = "step-node";
    });
    // Grey out lines
    document.querySelectorAll(".step-line").forEach(line => line.className = "step-line");
    return;
  }
  
  const task = activeTasks.find(t => t.taskId === selectedTaskId);
  if (!task) return;
  
  const activeIndex = steps.indexOf(task.stage);
  
  steps.forEach((step, idx) => {
    const el = document.getElementById(`step-${step}`);
    if (!el) return;
    
    if (idx < activeIndex) {
      el.className = "step-node completed";
    } else if (idx === activeIndex) {
      el.className = "step-node active";
    } else {
      el.className = "step-node";
    }
  });
  
  // Update step connection lines
  const lines = document.querySelectorAll(".step-line");
  lines.forEach((line, idx) => {
    if (idx < activeIndex) {
      line.className = "step-line completed";
    } else {
      line.className = "step-line";
    }
  });
}

// Gallery Management (persisted in localStorage)
function saveToGallery(taskId, pipeline, model, prompt, mediaUrl) {
  const item = {
    taskId,
    pipeline,
    model,
    type: "video", // OpenMontage outputs compiled e-commerce videos
    prompt,
    mediaUrl,
    timestamp: Date.now()
  };
  
  galleryItems.unshift(item);
  localStorage.setItem("kie_ai_gallery", JSON.stringify(galleryItems));
  renderGallery();
  renderPipelineFilters();
}

function loadGallery() {
  const saved = localStorage.getItem("kie_ai_gallery");
  if (saved) {
    try {
      galleryItems = JSON.parse(saved);
    } catch (e) {
      galleryItems = [];
    }
  }
  renderGallery();
  renderPipelineFilters();
}

// Render dynamic tabs matching generated pipeline outputs
function renderPipelineFilters() {
  const container = document.getElementById("gallery-pipeline-filters");
  const activeFilter = document.querySelector(".filter-tab.active")?.dataset.filter || "all";
  
  container.innerHTML = `<button class="filter-tab ${activeFilter === 'all' ? 'active' : ''}" data-filter="all" data-i18n="filterAll">${TRANSLATIONS[currentLang].filterAll}</button>`;
  
  // Find all unique pipelines in generated list
  const uniquePipelines = [...new Set(galleryItems.map(item => item.pipeline))];
  
  uniquePipelines.forEach(pipe => {
    const config = PIPELINES[pipe];
    if (config) {
      const button = document.createElement("button");
      button.className = `filter-tab ${activeFilter === pipe ? 'active' : ''}`;
      button.dataset.filter = pipe;
      button.textContent = config.name[currentLang];
      
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        renderGallery(pipe);
      });
      container.appendChild(button);
    }
  });
}

function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";
  
  const filtered = galleryItems.filter(item => {
    if (filter === "all") return true;
    return item.pipeline === filter;
  });
  
  if (filtered.length === 0) {
    const placeholderText = TRANSLATIONS[currentLang].noMasterpieces;
    galleryGrid.innerHTML = `
      <div class="empty-state">
        <i data-lucide="image-off"></i>
        <p>${placeholderText}</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    
    // Add video indicator badge
    const badgeText = PIPELINES[item.pipeline]?.name[currentLang] || item.pipeline;
    card.innerHTML = `
      <div class="card-badge video">
        <i data-lucide="video"></i>
        <span>${badgeText}</span>
      </div>
    `;
    
    const video = document.createElement("video");
    video.src = item.mediaUrl;
    video.className = "card-media";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    card.addEventListener("mouseenter", () => video.play().catch(() => {}));
    card.addEventListener("mouseleave", () => video.pause());
    card.appendChild(video);
    
    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = `
      <div class="card-info">
        <span class="card-prompt">${item.prompt}</span>
        <span class="card-model">${item.model}</span>
      </div>
    `;
    card.appendChild(overlay);
    
    card.addEventListener("click", () => showMediaModal(item));
    galleryGrid.appendChild(card);
  });
  
  lucide.createIcons();
}

// Fullscreen Lightbox Modal Preview
function showMediaModal(item) {
  modalMediaContainer.innerHTML = "";
  
  const video = document.createElement("video");
  video.src = item.mediaUrl;
  video.controls = true;
  video.autoplay = true;
  modalMediaContainer.appendChild(video);
  
  modalPipelineVal.textContent = PIPELINES[item.pipeline]?.name[currentLang] || item.pipeline;
  modalModelVal.textContent = item.model;
  modalTaskIdVal.textContent = item.taskId;
  modalPromptText.textContent = item.prompt;
  
  // Download Action
  modalDownloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = item.mediaUrl;
    a.target = "_blank";
    a.download = `${item.pipeline}-${item.taskId}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  // Re-use Settings
  modalUsePromptBtn.onclick = () => {
    pipelineSelect.value = item.pipeline;
    handlePipelineChange();
    promptInput.value = item.prompt;
    modelSelect.value = item.model;
    closeModal();
  };
  
  mediaModal.classList.remove("hidden");
  lucide.createIcons();
}

function closeModal() {
  mediaModal.classList.add("hidden");
  modalMediaContainer.innerHTML = ""; // Stop playing videos
}
