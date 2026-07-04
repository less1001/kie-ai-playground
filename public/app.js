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

// E-commerce Script Templates
const SCRIPT_TEMPLATES = [
  {
    id: "new-product",
    label: { en: "New Release", zh: "新品首发" },
    text: {
      en: "Look at this brand new tech gadget in my hand! Today's launch gets an instant $50 off and a free 1-year warranty. Click below to buy now!",
      zh: "大家看我手上这款最新上市的科技好物！今天首发直降300元，限时赠送一年质保，赶快点击下方链接购买吧！"
    }
  },
  {
    id: "flash-sale",
    label: { en: "Flash Sale", zh: "限量秒杀" },
    text: {
      en: "Counting down the last 5 minutes! Lowest price online, limited to 50 orders, once gone it returns to full price! Don't wait, act now!",
      zh: "倒计时最后五分钟！全网最低价，限量五十单，抢完立马恢复原价！犹豫一秒就没有了，大家手速一定要快！"
    }
  },
  {
    id: "recommendation",
    label: { en: "Top Pick", zh: "爆款推荐" },
    text: {
      en: "Hey friends! I've personally used this absolute treasure of a product for 6 months. It's incredibly high-quality and practical. You won't regret this!",
      zh: "亲们，这款宝藏产品我自用了半年，强烈推荐！不仅质量超赞，而且非常实用，今天下单立享专属折扣，买它绝对不后悔！"
    }
  }
];

// Model Configurations
const MODELS = {
  image: [
    {
      id: "omnihuman-v1.5",
      name: "OmniHuman 1.5 (Portrait Video)",
      desc: {
        en: "Generates realistic, expressive talking head video from portrait image and text script.",
        zh: "结合主播肖像照片与文本，生成逼真、极富表现力的数字人口播视频。"
      }
    },
    {
      id: "sadtalker",
      name: "SadTalker (Image to Video)",
      desc: {
        en: "Classic image-driven digital human animation, highly efficient and stable lip movement.",
        zh: "经典的图像驱动数字人模型，生成速度快，口型动作稳定逼真。"
      }
    },
    {
      id: "wav2lip",
      name: "Wav2Lip (Lip Sync Generator)",
      desc: {
        en: "Speedy mouth movement generation matching the voiceover audio perfectly.",
        zh: "快速唇形生成模型，能够将任意人像嘴部动作完美贴合配音音频。"
      }
    }
  ],
  video: [
    {
      id: "volcengine/video-to-video-lip-sync",
      name: "Volcengine Lip-Sync (Video to Video)",
      desc: {
        en: "Volcengine high-fidelity video lip-sync. Aligns host video mouth movements with target audio track.",
        zh: "火山引擎高保真视频口型同步模型。将已录制的主播视频嘴部口型完美贴合新的音频轨道。"
      }
    }
  ]
};

// Bilingual Dictionaries
const TRANSLATIONS = {
  en: {
    title: "AI E-commerce Digital Human Studio",
    subtitle: "AI 数字人带货视频生成平台",
    balance: "Balance",
    tabImage: "Text to Avatar",
    tabVideo: "Video Lip-Sync",
    modelLabel: "AI Model",
    modelDesc: "Select the digital human generation model.",
    avatarLabel: "Choose Host Avatar",
    templateLabel: "Template:",
    promptLabel: "E-commerce Script",
    promptPlaceholder: "Enter your sales script here...",
    voiceLabel: "Voice Tone",
    voiceFemaleSalesFast: "Female Sales (High Energy)",
    voiceFemaleSweet: "Sweet & Friendly Female",
    voiceMaleProfessional: "Professional Explainer Male",
    voiceEnglishFemale: "English Host Female",
    targetAudioLabel: "Target Audio URL",
    targetAudioDesc: "Provide the voiceover audio track URL to synchronize lips with.",
    sourceVideoLabel: "Source Avatar Video URL",
    sourceVideoDesc: "Provide the source video showing the host's face.",
    advancedSettings: "Advanced Parameters",
    aspectRatioLabel: "Aspect Ratio",
    aspectRatio916: "9:16 Mobile",
    aspectRatio169: "16:9 Desktop",
    alignAudioLabel: "Forced Audio Lip-Sync Alignment",
    generateBtn: "Generate E-commerce Video",
    activeGenerations: "Active Generations",
    noActiveTasks: "No active generations. Submit a prompt to start!",
    creativeGallery: "Creative Gallery",
    filterAll: "All",
    filterImages: "Images",
    filterVideos: "Videos",
    noMasterpieces: "Your generated masterpieces will appear here.",
    modalTitle: "Masterpiece Preview",
    downloadBtn: "Download Video",
    useSettingsBtn: "Use Settings",
    tryLabel: "Try:",
    statusPending: "Pending",
    statusProcessing: "Processing",
    statusSuccess: "Success",
    statusFailed: "Failed"
  },
  zh: {
    title: "AI 数字人带货视频工作室",
    subtitle: "AI 数字人带货视频生成平台",
    balance: "账户余额",
    tabImage: "文本生成数字人",
    tabVideo: "视频口型同步",
    modelLabel: "AI 模型",
    modelDesc: "选择数字人生成或同步模型。",
    avatarLabel: "选择带货主播人像",
    templateLabel: "话术模板:",
    promptLabel: "带货文案脚本",
    promptPlaceholder: "在此输入您的带货文案或选择上方模板...",
    voiceLabel: "主播配音音色",
    voiceFemaleSalesFast: "带货女声 (高能量/激情)",
    voiceFemaleSweet: "亲和甜美型女声",
    voiceMaleProfessional: "专业男声 (沉稳/适合科技数码)",
    voiceEnglishFemale: "外贸英语女声",
    targetAudioLabel: "配音音频 URL (目标音频)",
    targetAudioDesc: "提供您需要同步的主播配音音频 URL 链接。",
    sourceVideoLabel: "主播原始视频 URL (源视频)",
    sourceVideoDesc: "提供需要修改口型的原始主播面部视频 URL 链接。",
    advancedSettings: "高级参数设定",
    aspectRatioLabel: "画面比例",
    aspectRatio916: "9:16 手机竖屏",
    aspectRatio169: "16:9 电脑横屏",
    alignAudioLabel: "强制进行人声口型对齐",
    generateBtn: "开始合成带货视频",
    activeGenerations: "正在合成队列",
    noActiveTasks: "暂无合成中的任务。在左侧配置并提交以开始！",
    creativeGallery: "作品画廊",
    filterAll: "全部",
    filterImages: "图片",
    filterVideos: "视频",
    noMasterpieces: "您生成的艺术作品将显示在这里。",
    modalTitle: "作品预览",
    downloadBtn: "下载视频",
    useSettingsBtn: "使用此配置",
    tryLabel: "推荐:",
    statusPending: "排队中",
    statusProcessing: "合成中",
    statusSuccess: "完成",
    statusFailed: "失败"
  }
};

// Application State
let currentLang = "en"; // 'en' or 'zh'
let activeTab = "image"; // 'image' or 'video'
let selectedAvatarId = "xiaomi"; // default selected preset avatar
let activeTasks = [];
let galleryItems = [];

// DOM Elements
const langToggleBtn = document.getElementById("lang-toggle");
const langText = document.getElementById("lang-text");
const tabImage = document.getElementById("tab-image");
const tabVideo = document.getElementById("tab-video");
const modelSelect = document.getElementById("model-select");
const modelDesc = document.getElementById("model-desc");
const avatarSelectionGroup = document.getElementById("avatar-selection-group");
const avatarGridContainer = document.getElementById("avatar-grid-container");
const customAvatarUrl = document.getElementById("custom-avatar-url");
const templateChipsContainer = document.getElementById("template-chips-container");
const promptInput = document.getElementById("prompt-input");
const voiceGroup = document.getElementById("voice-group");
const targetAudioGroup = document.getElementById("target-audio-group");
const audioUrlInput = document.getElementById("audio-url-input");
const sourceVideoGroup = document.getElementById("source-video-group");
const videoUrlInput = document.getElementById("video-url-input");
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

// Modal Elements
const mediaModal = document.getElementById("media-modal");
const modalCloseBackdrop = document.getElementById("modal-close-backdrop");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalMediaContainer = document.getElementById("modal-media-container");
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
  
  // Render Script Templates
  renderScriptTemplates();
  
  // Load gallery
  loadGallery();
  
  // Set initial models
  updateModelDropdown();
  
  // Fetch credits balance
  fetchCredits();
  
  // Initialize Lucide Icons
  lucide.createIcons();
  
  // Event Listeners
  langToggleBtn.addEventListener("click", toggleLanguage);
  tabImage.addEventListener("click", () => switchTab("image"));
  tabVideo.addEventListener("click", () => switchTab("video"));
  modelSelect.addEventListener("change", handleModelChange);
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
  customAvatarUrl.value = ""; // clear custom URL
  
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

// Render script templates chips
function renderScriptTemplates() {
  templateChipsContainer.innerHTML = "";
  SCRIPT_TEMPLATES.forEach(tmpl => {
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
  renderScriptTemplates();
  handleModelChange();
  renderActiveTasks();
  renderGallery();
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

// Switch Tab (Text to Avatar vs. Video Lip Sync)
function switchTab(type) {
  if (activeTab === type) return;
  activeTab = type;
  
  if (type === "image") {
    // Text to Avatar
    tabImage.classList.add("active");
    tabVideo.classList.remove("active");
    
    avatarSelectionGroup.classList.remove("hidden");
    voiceGroup.classList.remove("hidden");
    
    targetAudioGroup.classList.add("hidden");
    sourceVideoGroup.classList.add("hidden");
  } else {
    // Video Lip Sync
    tabVideo.classList.add("active");
    tabImage.classList.remove("active");
    
    avatarSelectionGroup.classList.add("hidden");
    voiceGroup.classList.add("hidden");
    
    targetAudioGroup.classList.remove("hidden");
    sourceVideoGroup.classList.remove("hidden");
  }
  
  updateModelDropdown();
}

// Update model select options depending on the active tab
function updateModelDropdown() {
  const models = MODELS[activeTab];
  modelSelect.innerHTML = "";
  
  models.forEach(model => {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = model.name;
    modelSelect.appendChild(option);
  });
  
  handleModelChange();
}

// Handle model change to update prompt suggestions and descriptions
function handleModelChange() {
  const modelId = modelSelect.value;
  const models = MODELS[activeTab];
  const model = models.find(m => m.id === modelId);
  
  if (model) {
    modelDesc.textContent = model.desc[currentLang];
  }
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
  
  const model = modelSelect.value;
  const prompt = promptInput.value.trim();
  const aspectRatio = document.querySelector('input[name="aspectRatio"]:checked').value;
  
  if (!prompt) return;
  
  // Disable button & show spinner
  generateSubmit.disabled = true;
  btnSpinner.classList.remove("hidden");
  
  // Prepare input block depending on active tab
  const input = {};
  
  if (activeTab === "image") {
    // Text to Avatar
    input.prompt = prompt;
    input.voice = document.getElementById("voice-select").value;
    input.aspectRatio = aspectRatio;
    
    // Avatar portrait source
    if (selectedAvatarId) {
      const avatar = PRESETS_AVATARS.find(a => a.id === selectedAvatarId);
      input.avatarUrl = avatar ? avatar.full : "";
    } else {
      input.avatarUrl = customAvatarUrl.value.trim();
    }
  } else {
    // Video Lip Sync
    input.video_url = videoUrlInput.value.trim();
    input.audio_url = audioUrlInput.value.trim();
    input.align_audio = document.getElementById("align-audio-check").checked;
  }
  
  try {
    const res = await fetch("/api/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, input })
    });
    
    const result = await res.json();
    
    if (result.code === 200 && result.data && result.data.taskId) {
      // Clear inputs
      promptInput.value = "";
      customAvatarUrl.value = "";
      videoUrlInput.value = "";
      audioUrlInput.value = "";
      
      const taskId = result.data.taskId;
      addTaskToQueue(taskId, model, "video", prompt || `Lip-sync task for video`);
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
function addTaskToQueue(taskId, model, type, prompt) {
  const task = {
    taskId,
    model,
    type,
    prompt,
    status: "pending",
    elapsed: 0,
    intervalId: null
  };
  
  activeTasks.push(task);
  renderActiveTasks();
  
  // Start Polling
  task.intervalId = setInterval(() => {
    task.elapsed += 2;
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
        
        const mediaUrl = taskData.videoUrl || taskData.imageUrl || (taskData.output ? taskData.output[0] : null);
        
        if (mediaUrl) {
          saveToGallery(task.taskId, task.model, task.type, task.prompt, mediaUrl);
        }
        
        removeTaskFromQueue(task.taskId);
        fetchCredits();
      } else if (remoteStatus === "failed" || remoteStatus === "error") {
        clearInterval(task.intervalId);
        task.status = "failed";
        alert(currentLang === "en" ? `Task ${task.taskId} failed.` : `任务 ${task.taskId} 运行失败。`);
        setTimeout(() => removeTaskFromQueue(task.taskId), 5000);
      } else if (remoteStatus === "processing" || remoteStatus === "running") {
        task.status = "processing";
        renderActiveTasks();
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
  renderActiveTasks();
}

// Render active queue
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
    card.className = "task-card";
    
    const badgeKey = task.status === "pending" ? "statusPending" : (task.status === "processing" ? "statusProcessing" : (task.status === "success" ? "statusSuccess" : "statusFailed"));
    const badgeText = TRANSLATIONS[currentLang][badgeKey];
    
    card.innerHTML = `
      <div class="task-info">
        <span class="task-model">${task.model}</span>
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

// Gallery Management (persisted in localStorage)
function saveToGallery(taskId, model, type, prompt, mediaUrl) {
  const item = {
    taskId,
    model,
    type,
    prompt,
    mediaUrl,
    timestamp: Date.now()
  };
  
  galleryItems.unshift(item);
  localStorage.setItem("kie_ai_gallery", JSON.stringify(galleryItems));
  renderGallery();
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
}

function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";
  
  const filtered = galleryItems.filter(item => {
    if (filter === "all") return true;
    if (filter === "images") return item.type === "image";
    if (filter === "videos") return item.type === "video";
    return true;
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
    
    const badgeIcon = item.type === "video" ? "video" : "image";
    const badgeText = item.type === "video" ? "VIDEO" : "IMAGE";
    
    card.innerHTML = `
      <div class="card-badge ${item.type}">
        <i data-lucide="${badgeIcon}"></i>
        <span>${badgeText}</span>
      </div>
    `;
    
    // Media preview in card
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.mediaUrl;
      video.className = "card-media";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      card.addEventListener("mouseenter", () => video.play().catch(() => {}));
      card.addEventListener("mouseleave", () => video.pause());
      card.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.mediaUrl;
      img.alt = item.prompt;
      img.className = "card-media";
      card.appendChild(img);
    }
    
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

// Fullscreen Modal Preview
function showMediaModal(item) {
  modalMediaContainer.innerHTML = "";
  
  if (item.type === "video") {
    const video = document.createElement("video");
    video.src = item.mediaUrl;
    video.controls = true;
    video.autoplay = true;
    modalMediaContainer.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = item.mediaUrl;
    img.alt = item.prompt;
    modalMediaContainer.appendChild(img);
  }
  
  modalModelVal.textContent = item.model;
  modalTaskIdVal.textContent = item.taskId;
  modalPromptText.textContent = item.prompt;
  
  // Download Action
  modalDownloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = item.mediaUrl;
    a.target = "_blank";
    a.download = `${item.type}-${item.taskId}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  // Re-use Settings
  modalUsePromptBtn.onclick = () => {
    switchTab(item.type);
    promptInput.value = item.prompt;
    modelSelect.value = item.model;
    handleModelChange();
    closeModal();
  };
  
  mediaModal.classList.remove("hidden");
  lucide.createIcons();
}

function closeModal() {
  mediaModal.classList.add("hidden");
  modalMediaContainer.innerHTML = ""; // Stop playing videos
}
