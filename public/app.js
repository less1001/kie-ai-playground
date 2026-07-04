// Model Configurations
const MODELS = {
  image: [
    {
      id: "flux-2",
      name: "Flux-2 (Pro Image)",
      desc: "Top-tier detailed image generator, excellent at text rendering and complex prompt adherence.",
      suggestions: ["A cyber-punk coffee shop in the neon rain", "A hyper-detailed oil painting of an astronaut cat", "Steampunk laboratory with glowing plasma vials"]
    },
    {
      id: "ideogram-v3",
      name: "Ideogram V3",
      desc: "Superior typography capabilities. Perfect for posters, logos, and graphic designs.",
      suggestions: ["Retro typography poster saying 'CREATE THE FUTURE'", "A glowing neon sign of a coffee mug", "Minimalist cover design with text 'THE VOID'"]
    },
    {
      id: "imagen4",
      name: "Google Imagen 4",
      desc: "Google's latest visual model, highly realistic textures, lighting, and diverse compositions.",
      suggestions: ["Macro photo of a dragonfly covered in morning dew", "Cinematic shot of a medieval castle on a misty peak", "Modern living room with floor-to-ceiling glass windows"]
    },
    {
      id: "grok-imagine",
      name: "Grok Imagine Image",
      desc: "Expressive artistic styles, high-contrast imagery, and creative lighting effects.",
      suggestions: ["Surreal dreamscape with floating islands", "Cybernetic raven perched on a computer server", "Impressionist painting of a bustling market at dusk"]
    }
  ],
  video: [
    {
      id: "kling-v3",
      name: "Kling v3.0 (Advanced Video)",
      desc: "State-of-the-art cinematic video generation with natural motion, sound effects, and multi-shot editing.",
      suggestions: ["Camera pans around a futuristic spacecraft launching", "A majestic tiger walking through a neon rainforest", "First-person perspective flying through a stone canyon"]
    },
    {
      id: "veo-v3.1",
      name: "Google Veo v3.1",
      desc: "Ultra HD physics-aligned video generation. Native 9:16 and 4K capabilities.",
      suggestions: ["Slow-motion splash of water in a crystalline bowl", "Time-lapse of a blooming cherry blossom tree", "Drone shot of ocean waves crashing on black volcanic sand"]
    },
    {
      id: "wan-v2.7",
      name: "Wan v2.7 Video",
      desc: "High quality-to-render speed ratio, excellent facial animation and realistic physics.",
      suggestions: ["A robot painting on a canvas in a sunlit art studio", "Golden retriever puppy chasing autumn leaves", "Melting ice sculpture revealing a glowing crystal heart"]
    },
    {
      id: "bytedance-seedance-v1.5-pro",
      name: "Bytedance Seedance v1.5 Pro",
      desc: "Smooth motion tracking and superb camera movements (pan, zoom, orbit). Supports Image-to-Video.",
      suggestions: ["Detailed close-up of a clockwork mechanism turning", "Cinematic drone flyby of ancient Roman ruins", "Abstract ink droplets diffusing in water, slow motion"]
    }
  ]
};

// Application State
let activeTab = "image"; // 'image' or 'video'
let activeTasks = [];
let galleryItems = [];

// DOM Elements
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
  // Load gallery from localStorage
  loadGallery();
  
  // Set initial models
  updateModelDropdown();
  
  // Fetch credits
  fetchCredits();
  
  // Initialize Lucide Icons
  lucide.createIcons();
  
  // Event Listeners
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
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery(btn.dataset.filter);
    });
  });

  // Modal close handlers
  modalCloseBtn.addEventListener("click", closeModal);
  modalCloseBackdrop.addEventListener("click", closeModal);
});

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
    modelDesc.textContent = model.desc;
    
    // Update Prompt Suggestions
    suggestionsContainer.innerHTML = "";
    model.suggestions.forEach(suggestion => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.textContent = suggestion;
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
      // Clear form inputs except model configs
      promptInput.value = "";
      imageUrlInput.value = "";
      
      // Register task in the queue
      const taskId = result.data.taskId;
      addTaskToQueue(taskId, model, activeTab, prompt);
    } else {
      alert(`Generation Failed: ${result.msg || "Server returned error status"}`);
    }
  } catch (error) {
    console.error("Error creating generation task:", error);
    alert("Connection Error: Failed to start task.");
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
      const remoteStatus = taskData.status || taskData.state; // handles typical status keys
      
      // Map remote states to pending/processing/success/failed
      if (remoteStatus === "success" || remoteStatus === "completed" || taskData.videoUrl || taskData.imageUrl) {
        clearInterval(task.intervalId);
        task.status = "success";
        
        // Extract media URL
        const mediaUrl = taskData.videoUrl || taskData.imageUrl || (taskData.output ? taskData.output[0] : null);
        
        if (mediaUrl) {
          saveToGallery(task.taskId, task.model, task.type, task.prompt, mediaUrl);
        }
        
        removeTaskFromQueue(task.taskId);
        fetchCredits(); // update credit balance
      } else if (remoteStatus === "failed" || remoteStatus === "error") {
        clearInterval(task.intervalId);
        task.status = "failed";
        alert(`Task ${task.taskId} failed.`);
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
    listContainer.innerHTML = `
      <div class="empty-state">
        <i data-lucide="info"></i>
        <p>No active generations. Submit a prompt to start!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  listContainer.innerHTML = "";
  
  activeTasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";
    
    const iconClass = task.status === "processing" ? "task-loader-icon" : "";
    const badgeText = task.status === "processing" ? "Processing" : (task.status === "pending" ? "Pending" : task.status);
    
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
    galleryGrid.innerHTML = `
      <div class="empty-state">
        <i data-lucide="image-off"></i>
        <p>No masterpieces found matching the filter.</p>
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
      // Play on hover
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
    
    // Details overlay
    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = `
      <div class="card-info">
        <span class="card-prompt">${item.prompt}</span>
        <span class="card-model">${item.model}</span>
      </div>
    `;
    card.appendChild(overlay);
    
    // Open modal on click
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
  
  modalTitle.textContent = `${item.type === "video" ? "Video" : "Image"} Masterpiece`;
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
