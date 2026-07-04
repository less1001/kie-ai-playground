// Model Configurations with Bilingual Suggestions
const MODELS = {
  image: [
    {
      id: "flux-2",
      name: "Flux-2 (Pro Image)",
      desc: {
        en: "Top-tier detailed image generator, excellent at text rendering and complex prompt adherence.",
        zh: "顶级图像生成器，在文字渲染和复杂提示词遵循方面表现优异。"
      },
      suggestions: {
        en: ["A cyber-punk coffee shop in the neon rain", "A hyper-detailed oil painting of an astronaut cat", "Steampunk laboratory with glowing plasma vials"],
        zh: ["霓虹雨中的赛博朋克咖啡馆", "宇航员猫的超精细油画", "摆放着发光等离子药瓶的蒸汽朋克实验室"]
      }
    },
    {
      id: "ideogram-v3",
      name: "Ideogram V3",
      desc: {
        en: "Superior typography capabilities. Perfect for posters, logos, and graphic designs.",
        zh: "卓越的排版和文字生成能力。非常适合制作海报、徽标和平面设计。"
      },
      suggestions: {
        en: ["Retro typography poster saying 'CREATE THE FUTURE'", "A glowing neon sign of a coffee mug", "Minimalist cover design with text 'THE VOID'"],
        zh: ["写有'CREATE THE FUTURE'的复古排版海报", "咖啡杯图案的发光霓虹灯牌", "印有文字'THE VOID'的极简风封面设计"]
      }
    },
    {
      id: "imagen4",
      name: "Google Imagen 4",
      desc: {
        en: "Google's latest visual model, highly realistic textures, lighting, and diverse compositions.",
        zh: "谷歌最新的图像生成模型，具备高度逼真的纹理、光效及多元的构图。"
      },
      suggestions: {
        en: ["Macro photo of a dragonfly covered in morning dew", "Cinematic shot of a medieval castle on a misty peak", "Modern living room with floor-to-ceiling glass windows"],
        zh: ["覆满晨露的蜻蜓微距照片", "云雾缭绕山巅之上的中世纪城堡电影镜头", "配有落地玻璃窗的现代客厅"]
      }
    },
    {
      id: "grok-imagine",
      name: "Grok Imagine Image",
      desc: {
        en: "Expressive artistic styles, high-contrast imagery, and creative lighting effects.",
        zh: "表现力丰富的艺术风格、高对比度画面以及创新的光影效果。"
      },
      suggestions: {
        en: ["Surreal dreamscape with floating islands", "Cybernetic raven perched on a computer server", "Impressionist painting of a bustling market at dusk"],
        zh: ["带有浮空岛的超现实梦境景象", "栖息在服务器上的赛博朋克渡鸦", "黄昏时分繁华集市的印象派画作"]
      }
    }
  ],
  video: [
    {
      id: "kling-v3",
      name: "Kling v3.0 (Advanced Video)",
      desc: {
        en: "State-of-the-art cinematic video generation with natural motion, sound effects, and multi-shot editing.",
        zh: "最先进的电影级视频生成，拥有自然运动、音效和多镜头剪辑。"
      },
      suggestions: {
        en: ["Camera pans around a futuristic spacecraft launching", "A majestic tiger walking through a neon rainforest", "First-person perspective flying through a stone canyon"],
        zh: ["镜头环绕一艘发射中的未来飞船移动", "一只雄伟的老虎穿行在霓虹雨林中", "穿过石头峡谷飞行的第一人称视角"]
      }
    },
    {
      id: "veo-v3.1",
      name: "Google Veo v3.1",
      desc: {
        en: "Ultra HD physics-aligned video generation. Native 9:16 and 4K capabilities.",
        zh: "符合物理规律的超高清视频生成。原生支持 9:16 和 4K 分辨率。"
      },
      suggestions: {
        en: ["Slow-motion splash of water in a crystalline bowl", "Time-lapse of a blooming cherry blossom tree", "Drone shot of ocean waves crashing on black volcanic sand"],
        zh: ["水晶碗中水花溅起的慢动作镜头", "樱花盛开的延时摄影", "海浪拍打黑色火山沙滩的无人机航拍"]
      }
    },
    {
      id: "wan-v2.7",
      name: "Wan v2.7 Video",
      desc: {
        en: "High quality-to-render speed ratio, excellent facial animation and realistic physics.",
        zh: "优异的画质渲染速度比，出色的面部动画和逼真的物理动态。"
      },
      suggestions: {
        en: ["A robot painting on a canvas in a sunlit art studio", "Golden retriever puppy chasing autumn leaves", "Melting ice sculpture revealing a glowing crystal heart"],
        zh: ["机器人在阳光明媚的画室里在画布上作画", "金毛幼犬追逐秋天落叶", "冰雕融化露出闪耀的水晶爱心"]
      }
    },
    {
      id: "bytedance-seedance-v1.5-pro",
      name: "Bytedance Seedance v1.5 Pro",
      desc: {
        en: "Smooth motion tracking and superb camera movements. Supports Image-to-Video.",
        zh: "平滑的动作跟踪和顶级的摄像机运动控制。支持图生视频。"
      },
      suggestions: {
        en: ["Detailed close-up of a clockwork mechanism turning", "Cinematic drone flyby of ancient Roman ruins", "Abstract ink droplets diffusing in water, slow motion"],
        zh: ["钟表发条机械结构咬合转动的特写", "古罗马废墟的电影级无人机飞越", "水里扩散的抽象墨滴，慢动作"]
      }
    }
  ]
};

// Bilingual Dictionaries
const TRANSLATIONS = {
  en: {
    title: "Kie AI Creative Studio",
    subtitle: "Professional Image & Video Workspace",
    balance: "Balance",
    tabImage: "Image Generation",
    tabVideo: "Video Generation",
    modelLabel: "Model",
    modelDesc: "Select the AI engine for your task.",
    promptLabel: "Prompt Description",
    promptPlaceholder: "Describe what you want to create in vivid detail...",
    aspectRatioLabel: "Aspect Ratio",
    aspectRatio169: "16:9 Landscape",
    aspectRatio916: "9:16 Vertical",
    aspectRatio11: "1:1 Square",
    sourceImageLabel: "Source Image URL (Optional)",
    sourceImageDesc: "Provide an image URL for Image-to-Video models.",
    advancedSettings: "Advanced Settings",
    durationLabel: "Duration",
    duration5: "5 Seconds",
    duration10: "10 Seconds",
    qualityLabel: "Quality / Resolution",
    quality720: "720p HD",
    quality1080: "1080p Full HD",
    generateBtn: "Generate Media",
    activeGenerations: "Active Generations",
    noActiveTasks: "No active generations. Submit a prompt to start!",
    creativeGallery: "Creative Gallery",
    filterAll: "All",
    filterImages: "Images",
    filterVideos: "Videos",
    noMasterpieces: "Your generated masterpieces will appear here.",
    modalTitle: "Masterpiece Preview",
    downloadBtn: "Download Media",
    useSettingsBtn: "Use Settings",
    tryLabel: "Try:",
    statusPending: "Pending",
    statusProcessing: "Processing",
    statusSuccess: "Success",
    statusFailed: "Failed"
  },
  zh: {
    title: "Kie AI 创意工作室",
    subtitle: "专业级图像与视频工作台",
    balance: "账户余额",
    tabImage: "图像生成",
    tabVideo: "视频生成",
    modelLabel: "AI 模型",
    modelDesc: "选择用于当前任务的 AI 引擎。",
    promptLabel: "提示词描述",
    promptPlaceholder: "请生动、详细地描述您想要创建的画面...",
    aspectRatioLabel: "画面比例",
    aspectRatio169: "16:9 宽屏",
    aspectRatio916: "9:16 竖屏",
    aspectRatio11: "1:1 正方形",
    sourceImageLabel: "源图片 URL (可选)",
    sourceImageDesc: "为“图生视频”模型提供参考图片链接。",
    advancedSettings: "高级设置",
    durationLabel: "视频时长",
    duration5: "5 秒",
    duration10: "10 秒",
    qualityLabel: "清晰度 / 分辨率",
    quality720: "720p 高清",
    quality1080: "1080p 超清",
    generateBtn: "开始生成",
    activeGenerations: "正在生成",
    noActiveTasks: "暂无生成中的任务。提交提示词以开始！",
    creativeGallery: "创作画廊",
    filterAll: "全部",
    filterImages: "图片",
    filterVideos: "视频",
    noMasterpieces: "您生成的艺术作品将显示在这里。",
    modalTitle: "作品预览",
    downloadBtn: "下载媒体",
    useSettingsBtn: "使用此配置",
    tryLabel: "推荐:",
    statusPending: "排队中",
    statusProcessing: "生成中",
    statusSuccess: "成功",
    statusFailed: "失败"
  }
};

// Application State
let currentLang = "en"; // 'en' or 'zh'
let activeTab = "image"; // 'image' or 'video'
let activeTasks = [];
let galleryItems = [];

// DOM Elements
const langToggleBtn = document.getElementById("lang-toggle");
const langText = document.getElementById("lang-text");
const tabImage = document.getElementById("tab-image");
const tabVideo = document.getElementById("tab-video");
const modelSelect = document.getElementById("model-select");
const modelDesc = document.getElementById("model-desc");
const promptInput = document.getElementById("prompt-input");
const suggestionsContainer = document.getElementById("suggestions-container");
const sourceImageGroup = document.getElementById("source-image-group");
const imageUrlInput = document.getElementById("image-url-input");
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
const paramDurationGroup = document.getElementById("param-duration-group");

// Modal Elements
const mediaModal = document.getElementById("media-modal");
const modalCloseBackdrop = document.getElementById("modal-close-backdrop");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalMediaContainer = document.getElementById("modal-media-container");
const modalTitle = document.getElementById("modal-title");
const modalModelVal = document.getElementById("modal-model-val");
const modalTaskIdVal = document.getElementById("modal-task-id-val");
const modalPromptText = document.getElementById("modal-prompt-text");
const modalDownloadBtn = document.getElementById("modal-download-btn");
const modalUsePromptBtn = document.getElementById("modal-use-prompt-btn");

// Initialize Application
window.addEventListener("DOMContentLoaded", () => {
  // Load preferred language from localStorage if exists
  const savedLang = localStorage.getItem("kie_ai_lang");
  if (savedLang === "en" || savedLang === "zh") {
    currentLang = savedLang;
  }
  
  // Set Lang UI Text and Run Translate
  updateLanguageUI();
  
  // Load gallery from localStorage
  loadGallery();
  
  // Set initial models
  updateModelDropdown();
  
  // Fetch credits
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

// Switch language
function toggleLanguage() {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("kie_ai_lang", currentLang);
  
  updateLanguageUI();
  handleModelChange(); // Refresh suggestions and model description
  renderActiveTasks();  // Refresh active task status badge translations
  renderGallery();      // Refresh gallery empty state translation
}

// Translate UI elements using translation dictionary
function updateLanguageUI() {
  const dictionary = TRANSLATIONS[currentLang];
  
  // Toggle button indicator text
  langText.textContent = currentLang === "en" ? "中文" : "English";
  
  // Translate nodes with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });
  
  // Translate placeholders with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dictionary[key]) {
      el.setAttribute("placeholder", dictionary[key]);
    }
  });
}

// Switch between Image and Video tabs
function switchTab(type) {
  if (activeTab === type) return;
  
  activeTab = type;
  
  if (type === "image") {
    tabImage.classList.add("active");
    tabVideo.classList.remove("active");
    sourceImageGroup.classList.add("hidden");
    imageUrlInput.value = "";
    paramDurationGroup.classList.add("hidden");
  } else {
    tabVideo.classList.add("active");
    tabImage.classList.remove("active");
    sourceImageGroup.classList.remove("hidden");
    paramDurationGroup.classList.remove("hidden");
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
    // Set localized model description
    modelDesc.textContent = model.desc[currentLang];
    
    // Update Prompt Suggestions Chips
    suggestionsContainer.innerHTML = "";
    const list = model.suggestions[currentLang];
    list.forEach(suggestion => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.textContent = suggestion;
      chip.title = suggestion;
      chip.addEventListener("click", () => {
        promptInput.value = suggestion;
      });
      suggestionsContainer.appendChild(chip);
    });
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
  const quality = document.getElementById("quality-select").value;
  const imageUrl = imageUrlInput.value.trim();
  const duration = parseInt(document.getElementById("duration-select").value, 10);
  
  if (!prompt) return;
  
  // Disable button & show spinner
  generateSubmit.disabled = true;
  btnSpinner.classList.remove("hidden");
  
  // Prepare input block
  const input = { prompt, aspectRatio, quality };
  if (activeTab === "video") {
    input.duration = duration;
    if (imageUrl) {
      input.imageUrl = imageUrl;
    }
  }
  
  try {
    const res = await fetch("/api/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, input })
    });
    
    const result = await res.json();
    
    if (result.code === 200 && result.data && result.data.taskId) {
      promptInput.value = "";
      imageUrlInput.value = "";
      
      const taskId = result.data.taskId;
      addTaskToQueue(taskId, model, activeTab, prompt);
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
