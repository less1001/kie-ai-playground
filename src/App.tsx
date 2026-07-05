import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Coins,
  Globe,
  FolderOpen,
  RefreshCw,
  UserCircle,
  FileText,
  Film,
  Mic,
  Settings,
  MonitorPlay,
  Wand2,
  Cpu,
  Download,
  Plus,
  VideoOff,
  Play,
  X,
  Repeat,
  Link as LinkIcon,
  UploadCloud,
  Clapperboard,
  Presentation,
  Languages,
  Scissors,
  Sparkles,
  Terminal,
  ShieldCheck,
  Sliders
} from 'lucide-react';

// ── Pipeline Definitions ──
interface ModelDef {
  id: string;
  name: string;
  desc: { en: string; zh: string };
}

interface PipelineDef {
  name: { en: string; zh: string };
  desc: { en: string; zh: string };
  icon: React.ReactNode;
  engines: string[];
  tag: { en: string; zh: string; type: string } | null;
  featured: boolean;
  model: string;
  models: ModelDef[];
  type: "creative" | "utility";
}

const PIPELINES: Record<string, PipelineDef> = {
  "avatar-spokesperson": {
    name: { en: "AI Spokesperson", zh: "AI 数字人带货" },
    desc: { en: "Generate a realistic talking-head video from a portrait and sales script. Perfect for e-commerce and product demos.", zh: "输入主播肖像和带货文案，自动生成逼真的 AI 数字人带货视频。" },
    icon: <UserCircle />,
    engines: ["OmniHuman 1.5", "Lip-Sync"],
    tag: { en: "Most Popular", zh: "最热门", type: "hot" },
    featured: true,
    model: "omnihuman-v1.5",
    models: [
      { id: "omnihuman-v1.5", name: "OmniHuman v1.5", desc: { en: "Realistic expressions and natural gestures (Recommended)", zh: "超逼真面部表情与动作（推荐）" } },
      { id: "seedance-v2.0", name: "Seedance v2.0", desc: { en: "Consistent body rendering and high frame rate", zh: "高保真身体姿态与高帧率" } }
    ],
    type: "creative"
  },
  "animated-explainer": {
    name: { en: "Animated Explainer", zh: "动画解说视频" },
    desc: { en: "Auto-generate educational explainer videos with AI voiceover, images, and Remotion animation rendering.", zh: "自动生成教育科普视频：AI 撰写脚本、生成配图、合成配音并渲染为动画。" },
    icon: <Presentation />,
    engines: ["Imagen4", "Google TTS", "Remotion"],
    tag: { en: "Popular", zh: "热门", type: "hot" },
    featured: true,
    model: "imagen4",
    models: [
      { id: "imagen4", name: "Google Imagen 4", desc: { en: "Educational and illustrative diagrams (Recommended)", zh: "适合学术说明与图形绘制（推荐）" } },
      { id: "flux-schnell", name: "Flux.1 Schnell", desc: { en: "High quality photorealistic illustrations", zh: "高质量写实图像与海报生成" } }
    ],
    type: "creative"
  },
  "cinematic": {
    name: { en: "Cinematic Trailer", zh: "电影预告片" },
    desc: { en: "Create stunning cinematic storyboards and render high-fidelity video with Kling or Veo engines.", zh: "自动生成电影级分镜脚本，调用 Kling/Veo 引擎渲染高画质预告片。" },
    icon: <Clapperboard />,
    engines: ["Kling v3", "Veo 3.1"],
    tag: { en: "New", zh: "新功能", type: "new" },
    featured: true,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "Highly dynamic action sequences (Recommended)", zh: "高动态动作镜头与光影效果（推荐）" } },
      { id: "veo-3.1", name: "Google Veo 3.1", desc: { en: "Cinematic depth, realistic lighting, and composition", zh: "电影级构图与景深深度" } }
    ],
    type: "creative"
  },
  "talking-head": {
    name: { en: "Lip-Sync Video", zh: "口型同步视频" },
    desc: { en: "Perfectly synchronize mouth movements in an existing presenter video with a new audio track.", zh: "将已有的主播视频口型与新音频精准同步对齐，实现完美口型匹配。" },
    icon: <Mic />,
    engines: ["Volcengine Lip-Sync"],
    tag: null,
    featured: false,
    model: "volcengine/video-to-video-lip-sync",
    models: [
      { id: "volcengine/video-to-video-lip-sync", name: "Volcengine Lip-Sync", desc: { en: "Speedy mouth-movement synthesis from video+audio", zh: "超快速口型动作匹配合成" } }
    ],
    type: "utility"
  },
  "localization-dub": {
    name: { en: "Video Dubbing", zh: "视频翻译配音" },
    desc: { en: "Translate speech, clone voice in target language, and burn in multilingual subtitles.", zh: "翻译视频语音，克隆音色生成目标语种配音，自动烧录双语字幕。" },
    icon: <Languages />,
    engines: ["WhisperX", "GPT", "ElevenLabs"],
    tag: null,
    featured: false,
    model: "volcengine/video-to-video-lip-sync",
    models: [
      { id: "volcengine/video-to-video-lip-sync", name: "Volcengine Lip-Sync", desc: { en: "Speedy mouth-movement synthesis from video+audio", zh: "超快速口型动作匹配合成" } }
    ],
    type: "utility"
  },
  "documentary-montage": {
    name: { en: "Documentary Montage", zh: "纪录片蒙太奇" },
    desc: { en: "CLIP-indexed retrieval from open databases to compile archival tone-poems and montages.", zh: "从开源数据库语义检索真实档案素材并自动拼接剪辑为纪录片。" },
    icon: <Film />,
    engines: ["Archive.org", "Wikimedia", "FFmpeg"],
    tag: null,
    featured: false,
    model: "grok-imagine",
    models: [
      { id: "grok-imagine", name: "Grok Imagine", desc: { en: "Creative montages with historical and cinematic styles", zh: "具有历史或纪实风格的创意合成" } }
    ],
    type: "creative"
  },
  "clip-factory": {
    name: { en: "Clip Factory", zh: "长视频智能切片" },
    desc: { en: "Automatically split long videos into viral short clips for social media distribution.", zh: "将长视频自动切片，提取精彩画面生成适合社交媒体的短视频。" },
    icon: <Scissors />,
    engines: ["WhisperX", "SceneDetect", "FFmpeg"],
    tag: null,
    featured: false,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "Intelligent cutting based on visual rhythm", zh: "基于画面节奏的智能镜头裁切" } }
    ],
    type: "utility"
  }
};

// ── Avatar Presets ──
interface AvatarDef {
  id: string;
  name: { en: string; zh: string };
  role: { en: string; zh: string };
  thumb: string;
  full: string;
}

const AVATARS: AvatarDef[] = [
  { id: "xiaomi", name: { en: "Sophie", zh: "小米" }, role: { en: "Beauty & Fashion", zh: "美妆服饰" }, thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80" },
  { id: "xiaomei", name: { en: "Emma", zh: "小美" }, role: { en: "Lifestyle", zh: "生活百货" }, thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80" },
  { id: "daqiang", name: { en: "James", zh: "大强" }, role: { en: "Tech & Digital", zh: "数码科技" }, thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80" },
  { id: "lisa", name: { en: "Lisa", zh: "丽萨" }, role: { en: "English Sales", zh: "外贸英文" }, thumb: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80", full: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80" }
];

// ── Voice Presets ──
interface VoiceDef {
  id: string;
  name: { en: string; zh: string };
  desc: { en: string; zh: string };
  emoji: string;
}

const VOICES: VoiceDef[] = [
  { id: "female-sales", name: { en: "Sales Queen", zh: "带货女王" }, desc: { en: "High energy, enthusiastic", zh: "高能量激情风格" }, emoji: "👩‍💼" },
  { id: "female-sweet", name: { en: "Sweet & Warm", zh: "亲和甜美" }, desc: { en: "Friendly, approachable", zh: "友好温暖型" }, emoji: "💁‍♀️" },
  { id: "male-pro", name: { en: "Professional", zh: "专业男声" }, desc: { en: "Calm, authoritative", zh: "沉稳权威型" }, emoji: "👨‍💻" }
];

// ── Script Templates ──
interface TemplateDef {
  label: { en: string; zh: string };
  text: { en: string; zh: string };
}

const TEMPLATES: Record<string, TemplateDef[]> = {
  "avatar-spokesperson": [
    { label: { en: "🔥 New Launch", zh: "🔥 新品首发" }, text: { en: "Look at this brand new tech gadget! Today's launch exclusive — $50 off instantly plus a free 1-year warranty. Click below to grab yours before they're gone!", zh: "家人们看我手上这款最新上市的科技好物！今天首发专享直降300元，限时赠送一年质保！赶快点击下方链接购买，手慢无！" } },
    { label: { en: "⚡ Flash Sale", zh: "⚡ 限量秒杀" }, text: { en: "Last 5 minutes! This is the absolute lowest price online — only 50 units left. Once they're gone, it's back to full price. Don't miss this!", zh: "倒计时最后五分钟！全网最低价限量五十单，抢完立马恢复原价！犹豫一秒就没有了，家人们手速一定要快！" } }
  ],
  "animated-explainer": [
    { label: { en: "🧠 AI Explainer", zh: "🧠 AI科普" }, text: { en: "Explain how neural networks learn in 60 seconds, using everyday analogies like training a puppy.", zh: "用60秒通俗解释神经网络是如何学习的，使用像训练小狗一样的生活化类比。" } },
    { label: { en: "₿ Bitcoin 101", zh: "₿ 比特币入门" }, text: { en: "Explain blockchain and bitcoin mining in simple terms for complete beginners.", zh: "为完全零基础的小白通俗讲解区块链账本与比特币挖矿的原理。" } }
  ],
  "cinematic": [
    { label: { en: "🎬 Sci-Fi Trailer", zh: "🎬 科幻预告" }, text: { en: "A dystopian future where AI has taken control. Neon-lit cyberpunk cityscape. The last human programmer must hack the master control unit.", zh: "一个AI统治的反乌托邦未来。霓虹闪烁的赛博朋克城市。最后一位人类程序员必须入侵中央控制台。" } }
  ]
};

// ── Playbooks (Orchestrator Art Styles) ──
const PLAYBOOKS = [
  { id: "clean-professional", name: "Clean Professional (专业商务)", desc: "Simple lower-thirds, steady transitions, high text legibility." },
  { id: "flat-motion-graphics", name: "Flat Motion Graphics (扁平动效)", desc: "Bounce physics, kinetic text highlight, colorful vector frames." },
  { id: "minimalist-diagram", name: "Minimalist Diagram (极简图表)", desc: "Dark blueprints, outline icons, smooth mathematical grids." }
];

// ── App Translations ──
const I18N = {
  en: {
    navCreate: "AI Generator", navProjects: "My Works",
    selectModel: "Select AI Model",
    uploadLocalImage: "Upload Local Image",
    selectAvatar: "Select Presenter / Reference Image", customAvatarPlaceholder: "Or paste custom image URL...",
    scriptTitle: "Prompt & Script", scriptPlaceholder: "Write your generation prompt, script content, or paste a URL...",
    mediaTitle: "Source Media", videoUrlLabel: "Video URL", audioUrlLabel: "Audio Track URL (Optional)", dubLangLabel: "Target Language",
    voiceTitle: "Voice & Audio",
    settingsTitle: "Output Settings", ratioLabel: "Ratio", qualityLabel: "Quality",
    previewTitle: "Visual Canvas", previewNoAvatar: "No reference image selected", previewEta: "~2-5 min",
    generateBtn: "Run EP Pipeline", downloadBtn: "Download Video", createAnother: "Create Another",
    generatingTitle: "Generating...", generatingDesc: "The AI pipeline is running",
    stageResearch: "Research", stageScript: "Script", stageStoryboard: "Storyboard", stageAssets: "Assets", stageRender: "Render", stageReview: "QA",
    myProjectsTitle: "My Creations", myProjectsSub: "All your generated media assets in one place",
    noProjects: "No creations yet", noProjectsDesc: "Create your first AI video to see it here", createFirst: "Start Generating",
    modalEngine: "Engine", modalDate: "Date", modalScript: "Script", rerunBtn: "Re-run Settings",
    uploadingStatus: "Uploading...",
    activeCreationBadge: "Reference Image",
    sidebarToolsHeader: "AI Tools Gallery",
    
    // Orchestrator Specifics
    epSettingsTitle: "EP Orchestration Config",
    policyLabel: "Checkpoint Policy",
    policyGuided: "Guided (Manual Review)",
    policyAuto: "Autopilot (Fully Automatic)",
    budgetLabel: "Budget Cap (USD)",
    playbookLabel: "Select Playbook Style",
    checkpointPrompt: "CHECKPOINT REVIEW REQUIRED",
    checkpointScriptLabel: "Review & Edit Script Draft:",
    approveContinue: "Approve & Continue",
    sendBack: "Send Back for Re-draft",
    consoleTitle: "EP Live Orchestration Console",
    activeNodeBrief: "Briefing",
    activeNodeScript: "Scripting",
    activeNodeScene: "Scene Planning",
    activeNodeAssets: "Assets Gen",
    activeNodeEdit: "Edit Prep",
    activeNodeRender: "Rendering",
    
    // Pipeline specific labels
    refVideoLabel: "Reference Video Input (URL/File)",
    refVideoHelp: "Optional video to extract pacing, script structure, and dynamic timing.",
    explainerStyleLabel: "Illustration Art Style",
    voiceAccentLabel: "Voiceover Accent",
    cinematicCameraLabel: "Camera Motion Control",
    cinematicSFXLabel: "Atmospheric SFX Level",
    cinematicBGMLabel: "BGM Soundtrack Theme",
    lipsyncAlignLabel: "Mouth Sync Mode",
    dubSourceLang: "Source Language",
    dubTargetLang: "Target Language",
    dubCloneVoice: "Clone Speaker Voice",
    montageKeywords: "Montage Keywords / Context",
    montageDatabase: "Archival Libraries",
    montageMusicMood: "Montage BGM Mood",
    clipDurationLabel: "Target Slice Length",
    clipFocusLabel: "Clips Highlight Focus",
    utilityConsoleTitle: "Task Processing Console",
    utilityConsoleDesc: "Console idle. Click run button to initiate processing logs.",
    activeNodeUpload: "Upload Media",
    activeNodeProcess: "Extract & Process",
    activeNodeOutput: "Compose & Render"
  },
  zh: {
    navCreate: "AI 创作", navProjects: "我的作品",
    selectModel: "选择生成模型",
    uploadLocalImage: "上传本地图片",
    selectAvatar: "选择数字人主播 / 智能参考图", customAvatarPlaceholder: "或粘贴自定义图像 URL...",
    scriptTitle: "提示词与脚本", scriptPlaceholder: "输入您的视频生成描述词、脚本大纲、带货文案或参考网页...",
    mediaTitle: "源素材", videoUrlLabel: "源视频 URL", audioUrlLabel: "源音频 URL（可选）", dubLangLabel: "目标翻译语言",
    voiceTitle: "配音音色",
    settingsTitle: "输出设置", ratioLabel: "画面比例", qualityLabel: "清晰度",
    previewTitle: "视觉画布 (Canvas)", previewNoAvatar: "未选择参考图", previewEta: "约2-5分钟",
    generateBtn: "运行智能导演流水线", downloadBtn: "下载视频", createAnother: "重新生成",
    generatingTitle: "视频正在生成中...", generatingDesc: "AI 引擎正在全力运转中",
    stageResearch: "研究", stageScript: "脚本", stageStoryboard: "分镜", stageAssets: "资产", stageRender: "渲染", stageReview: "质检",
    myProjectsTitle: "我的作品库", myProjectsSub: "您所有生成的 AI 作品都在这里",
    noProjects: "暂无作品", noProjectsDesc: "开始您的第一步创作，生成精彩视频", createFirst: "去生成",
    modalEngine: "渲染引擎", modalDate: "创作日期", modalScript: "提示词脚本", rerunBtn: "复用参数",
    uploadingStatus: "上传中...",
    activeCreationBadge: "参考图",
    sidebarToolsHeader: "AI 工具箱",

    // Orchestrator Specifics
    epSettingsTitle: "导演制片人配置 (Orchestration)",
    policyLabel: "审核策略 (Checkpoint Policy)",
    policyGuided: "Guided (人工节点审核)",
    policyAuto: "Autopilot (全自动生成)",
    budgetLabel: "最大预算上限 (美元)",
    playbookLabel: "排版与视觉编排剧本 (Playbook)",
    checkpointPrompt: "智能导演节点待审核",
    checkpointScriptLabel: "请评审并直接修改文案剧本：",
    approveContinue: "批准并进到下一步",
    sendBack: "退回并重新起草",
    consoleTitle: "智能导演（Executive Producer）控制台",
    activeNodeBrief: "立项 Brief",
    activeNodeScript: "文案 Script",
    activeNodeScene: "分镜 Scene",
    activeNodeAssets: "素材 Assets",
    activeNodeEdit: "剪辑 Edit",
    activeNodeRender: "合成 Render",

    // Pipeline specific labels
    refVideoLabel: "参考借鉴视频 (URL或本地文件)",
    refVideoHelp: "提供参考视频，AI 智能体将拆解其文案结构、分镜节奏并应用到新视频中。",
    explainerStyleLabel: "科普图文画面风格",
    voiceAccentLabel: "配音朗读口音",
    cinematicCameraLabel: "电影镜头运动控制",
    cinematicSFXLabel: "氛围音效强弱",
    cinematicBGMLabel: "背景音乐感情基调",
    lipsyncAlignLabel: "口型对齐精细度",
    dubSourceLang: "原始视频语种",
    dubTargetLang: "翻译目标语种",
    dubCloneVoice: "克隆主讲人原声音色",
    montageKeywords: "检索素材关键字",
    montageDatabase: "归档历史数据库",
    montageMusicMood: "音乐背景基调",
    clipDurationLabel: "切片单段目标长度",
    clipFocusLabel: "精彩镜头提取权重",
    utilityConsoleTitle: "任务处理控制台",
    utilityConsoleDesc: "控制台空闲。请点击下方按钮启动分析与对齐日志。",
    activeNodeUpload: "素材上传",
    activeNodeProcess: "提取分析对齐",
    activeNodeOutput: "合成渲染导出"
  }
};

interface GalleryItem {
  taskId: string;
  pipeline: string;
  model: string;
  prompt: string;
  mediaUrl: string;
  timestamp: number;
}

interface LogEntry {
  time: string;
  director: string;
  text: string;
  type?: 'info' | 'warning' | 'normal';
}

export default function App() {
  const [lang, setLang] = useState<"en" | "zh">(() => {
    return (localStorage.getItem("om_lang") as "en" | "zh") || "en";
  });

  const [currentView, setCurrentView] = useState<"create" | "projects">("create");
  const [selectedPipeline, setSelectedPipeline] = useState<string>("avatar-spokesperson");

  // ── Global Customization parameters per pipeline ──
  const [selectedPlaybook, setSelectedPlaybook] = useState<string>("clean-professional");
  const [checkpointPolicy, setCheckpointPolicy] = useState<"guided" | "autopilot">("guided");
  const [budgetCap, setBudgetCap] = useState<number>(2.00);

  // Spokesperson configs
  const [globalReferenceImage, setGlobalReferenceImage] = useState<string>(
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
  );
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>("xiaomi");
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>("");
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>("female-sales");
  const [script, setScript] = useState<string>("");

  // Explainer configs
  const [explainerRefVideo, setExplainerRefVideo] = useState<string>("");
  const [explainerStyle, setExplainerStyle] = useState<string>("flat-vector");
  const [explainerAccent, setExplainerAccent] = useState<string>("us-en");

  // Cinematic configs
  const [cinematicCamera, setCinematicCamera] = useState<number>(2); // 1-Static, 2-Pan, 3-Zoom, 4-Orbit
  const [cinematicSFX, setCinematicSFX] = useState<number>(3); // 1-5
  const [cinematicBGM, setCinematicBGM] = useState<string>("epic");

  // Lip Sync / Dub / Clip / Screen configs
  const [sourceVideoUrl, setSourceVideoUrl] = useState<string>("");
  const [sourceAudioUrl, setSourceAudioUrl] = useState<string>("");
  const [lipsyncAlign, setLipsyncAlign] = useState<string>("standard");
  const [dubSource, setDubSource] = useState<string>("en");
  const [dubTarget, setDubTarget] = useState<string>("zh");
  const [dubClone, setDubClone] = useState<boolean>(true);

  // Documentary configs
  const [montageKeywords, setMontageKeywords] = useState<string>("");
  const [montageArchives, setMontageArchives] = useState<string[]>(["nasa", "archive"]);
  const [montageBGM, setMontageBGM] = useState<string>("melancholy");

  // Clip Factory configs
  const [clipDuration, setClipDuration] = useState<number>(30);
  const [clipFocus, setClipFocus] = useState<string>("speech");

  // Quality & Ratio
  const [ratio, setRatio] = useState<string>("9:16");
  const [quality, setQuality] = useState<string>("1080p");
  const [selectedModelId, setSelectedModelId] = useState<string>("omnihuman-v1.5");

  // Uploading state
  const [uploading, setUploading] = useState<boolean>(false);

  // ── Agentic Workflow Execution Simulation States ──
  const [activeTask, setActiveTask] = useState<{
    taskId: string;
    pipeline: string;
    model: string;
    prompt: string;
    step: 'brief' | 'scripting' | 'scene_plan' | 'assets' | 'edit' | 'rendering' | 'checkpoint' | 'completed';
    checkpointStage?: 'script' | 'scene';
  } | null>(null);

  const [consoleLogs, setConsoleLogs] = useState<LogEntry[]>([]);
  const [checkpointDraft, setCheckpointDraft] = useState<string>("");
  const [latestMediaResult, setLatestMediaResult] = useState<string | null>(null);

  // Local creations gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    return JSON.parse(localStorage.getItem("om_gallery") || "[]");
  });

  // Modal project details
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);

  const t = I18N[lang];

  // TanStack Query for credits
  const { data: credits, refetch: refetchCredits } = useQuery({
    queryKey: ["credits"],
    queryFn: async () => {
      const res = await fetch("/api/credit");
      const result = await res.json();
      if (result.code === 200) {
        return typeof result.data === "number" ? result.data.toFixed(2) : result.data;
      }
      throw new Error("Failed to fetch credits balance");
    },
    refetchInterval: 30000
  });

  // Reset or initialize fields when pipeline changes
  useEffect(() => {
    if (selectedPipeline) {
      const pipe = PIPELINES[selectedPipeline];
      if (pipe && pipe.models.length > 0) {
        setSelectedModelId(pipe.models[0].id);
      } else {
        setSelectedModelId("");
      }
      // Pick template script if any
      const tmpl = TEMPLATES[selectedPipeline];
      if (tmpl && tmpl.length > 0) {
        setScript(tmpl[0].text[lang]);
      } else {
        setScript("");
      }
      // Reset result
      setLatestMediaResult(null);
    }
  }, [selectedPipeline, lang]);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "zh" : "en";
    setLang(nextLang);
    localStorage.setItem("om_lang", nextLang);
  };

  // Safe append to logs terminal
  const addLog = (director: string, text: string, type: 'info' | 'warning' | 'normal' = 'normal') => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, { time, director, text, type }]);
  };

  // Image Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const result = await res.json();

      if (res.ok && result.code === 200 && result.url) {
        setCustomAvatarUrl(result.url);
        setGlobalReferenceImage(result.url);
        setSelectedAvatarId(null);
        setLatestMediaResult(null);
      } else {
        alert(lang === "en" ? `Upload failed: ${result.error || "Unknown"}` : `上传失败: ${result.error || "未知原因"}`);
      }
    } catch (err) {
      console.error(err);
      alert(lang === "en" ? "Upload connection error" : "上传网络错误");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Run Pipeline — Triggers the Agent Orchestrator Simulation
  const handleGenerate = async () => {
    if (!selectedPipeline) return;
    const pipe = PIPELINES[selectedPipeline];
    if (!pipe) return;

    let payloadPrompt = "";
    let payloadInput: Record<string, any> = {
      pipeline: selectedPipeline,
      playbook: selectedPlaybook,
      aspectRatio: ratio,
      quality,
      budgetCap
    };

    // Construct custom parameters based on selected pipeline
    if (selectedPipeline === "avatar-spokesperson") {
      if (!script.trim()) {
        alert(lang === "en" ? "Please enter a sales script." : "请输入口播文案脚本。");
        return;
      }
      payloadPrompt = script.trim();
      payloadInput.avatarUrl = globalReferenceImage;
      payloadInput.voice = selectedVoiceId;
    } else if (selectedPipeline === "animated-explainer") {
      if (!script.trim()) {
        alert(lang === "en" ? "Please enter explanation topic." : "请输入科普说明大纲。");
        return;
      }
      payloadPrompt = script.trim();
      payloadInput.refVideo = explainerRefVideo.trim();
      payloadInput.artStyle = explainerStyle;
      payloadInput.accent = explainerAccent;
    } else if (selectedPipeline === "cinematic") {
      if (!script.trim()) {
        alert(lang === "en" ? "Please enter storyboard prompt." : "请输入分镜大纲/视频描述。");
        return;
      }
      payloadPrompt = script.trim();
      payloadInput.camera = cinematicCamera;
      payloadInput.sfx = cinematicSFX;
      payloadInput.bgm = cinematicBGM;
    } else if (selectedPipeline === "talking-head") {
      if (!sourceVideoUrl.trim() || !sourceAudioUrl.trim()) {
        alert(lang === "en" ? "Please provide both Video and Audio source URLs." : "请提供对齐视频与音频的源 URL。");
        return;
      }
      payloadPrompt = `Sync: ${sourceVideoUrl} + ${sourceAudioUrl}`;
      payloadInput.video_url = sourceVideoUrl.trim();
      payloadInput.audio_url = sourceAudioUrl.trim();
      payloadInput.alignMode = lipsyncAlign;
    } else if (selectedPipeline === "localization-dub") {
      if (!sourceVideoUrl.trim()) {
        alert(lang === "en" ? "Please provide source video URL." : "请提供源视频 URL。");
        return;
      }
      payloadPrompt = `Dub: ${sourceVideoUrl} from ${dubSource} to ${dubTarget}`;
      payloadInput.video_url = sourceVideoUrl.trim();
      payloadInput.sourceLang = dubSource;
      payloadInput.targetLang = dubTarget;
      payloadInput.cloneVoice = dubClone;
    } else if (selectedPipeline === "documentary-montage") {
      if (!montageKeywords.trim()) {
        alert(lang === "en" ? "Please enter query keywords." : "请输入检索素材的关键字。");
        return;
      }
      payloadPrompt = montageKeywords.trim();
      payloadInput.archives = montageArchives;
      payloadInput.bgm = montageBGM;
    } else if (selectedPipeline === "clip-factory") {
      if (!sourceVideoUrl.trim()) {
        alert(lang === "en" ? "Please provide source video URL." : "请提供长视频源 URL。");
        return;
      }
      payloadPrompt = `Cuts: ${sourceVideoUrl} (${clipDuration}s)`;
      payloadInput.video_url = sourceVideoUrl.trim();
      payloadInput.duration = clipDuration;
      payloadInput.focus = clipFocus;
    }

    setLatestMediaResult(null);
    setConsoleLogs([]);

    // 1. Initialise the creation task on Cloudflare proxy
    try {
      if (pipe.type === "creative") {
        addLog("EP-Orchestrator", `Initializing creative pipeline: ${pipe.name[lang]}...`, "info");
      } else {
        addLog("EP-Orchestrator", `Initializing utility task: ${pipe.name[lang]}...`, "info");
      }
      
      const res = await fetch("/api/create-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModelId || pipe.model, input: payloadInput })
      });
      const result = await res.json();

      if (result.code === 200 && result.data && result.data.taskId) {
        const tId = result.data.taskId;

        // 2. Start simulation logs
        setActiveTask({
          taskId: tId,
          pipeline: selectedPipeline,
          model: selectedModelId || pipe.model,
          prompt: payloadPrompt,
          step: "brief"
        });

        if (pipe.type === "creative") {
          // Creative workflow path with checkpoints
          setTimeout(() => {
            addLog("EP-Orchestrator", `Loaded playbook: [${selectedPlaybook}]`, "info");
            addLog("Idea-Director", `Analyzing proposal idea. Allocating budget: $${budgetCap.toFixed(2)} USD...`);
          }, 1000);

          setTimeout(() => {
            addLog("Idea-Director", `Drafting proposal brief. Visual schema matched to ratio: ${ratio}.`, "info");
            addLog("Script-Director", `Generating dialogue script sequence matching target rhythm...`);
          }, 3000);

          setTimeout(() => {
            const draftText = lang === "en"
              ? `[Scene 1] Narration: Welcome to this segment! Let us explore the core values. (Visual: Zoom in on main subject)\n[Scene 2] Narration: Notice how this aligns with modern design standards. (Visual: Text transition flat motion)`
              : `[场景 1] 旁白：欢迎来到本次视频！接下来让我们共同探讨其中的核心秘密。(画面: 镜头推进对焦主讲人)\n[场景 2] 旁白：注意到这些参数是如何完美对齐的吗？(画面: 动态排版文本缩放弹出)`;

            setCheckpointDraft(draftText);
            
            if (checkpointPolicy === "guided") {
              // Pause at Guided Checkpoint
              setActiveTask(prev => prev ? { ...prev, step: "checkpoint", checkpointStage: "script" } : null);
              addLog("Script-Director", `Draft written. Paused for human approval check.`, "warning");
            } else {
              // Autopilot passes directly
              addLog("Script-Director", `Approved draft via Autopilot.`, "info");
              proceedToAssets(tId, payloadPrompt, selectedModelId || pipe.model);
            }
          }, 6000);

        } else {
          // Utility workflow path (No checkpoints, direct autopilot)
          setTimeout(() => {
            addLog("Media-Director", `Reading source media tracks. Resolving video wrapper...`, "info");
          }, 1000);

          setTimeout(() => {
            setActiveTask(prev => prev ? { ...prev, step: "scripting" } : null);
            if (selectedPipeline === "talking-head") {
              addLog("Align-Director", `Analyzing video facial anchors and aligning mouth coordinates to audio envelope...`);
            } else if (selectedPipeline === "localization-dub") {
              addLog("Translate-Director", `Extracting vocal speech, transcribing, and running GPT translation...`);
              addLog("Clone-Director", `Extracting speaker audio features to train voice cloning model...`, "info");
            } else {
              addLog("Slice-Director", `Analyzing visual flow variance and Whisper transcript timestamps...`);
            }
          }, 3000);

          setTimeout(() => {
            setActiveTask(prev => prev ? { ...prev, step: "rendering" } : null);
            addLog("Compose-Director", `Blending audio alignment track and re-encoding final video via FFmpeg...`);
          }, 5500);

          setTimeout(() => {
            startPoller(tId, payloadPrompt, selectedModelId || pipe.model);
          }, 7000);
        }

      } else {
        alert(lang === "en" ? `Error: ${result.msg || "Unknown"}` : `错误: ${result.msg || "未知错误"}`);
      }
    } catch (err) {
      console.error(err);
      addLog("EP-Orchestrator", "Connection error failed to contact API", "warning");
    }
  };

  // Guided Checkpoint Approved
  const handleApproveCheckpoint = () => {
    if (!activeTask) return;
    addLog("EP-Orchestrator", `Human approved checkpoint draft! Script customized and locked.`, "info");
    
    // Transition past checkpoint
    proceedToAssets(activeTask.taskId, activeTask.prompt, activeTask.model);
  };

  // Post Checkpoint progress
  const proceedToAssets = (tId: string, payloadPrompt: string, modelId: string) => {
    setActiveTask(prev => prev ? { ...prev, step: "assets" } : null);
    addLog("Scene-Director", `Synthesizing storyboard blueprints...`);
    addLog("Asset-Director", `Triggering cloud media asset generators...`);
    
    setTimeout(() => {
      addLog("Asset-Director", `Assets fully generated and compiled in local asset_manifest.`, "info");
      addLog("Edit-Director", `Calculating scene transitions. Preparing rendering commands...`);
    }, 2000);

    setTimeout(() => {
      setActiveTask(prev => prev ? { ...prev, step: "rendering" } : null);
      addLog("Compose-Director", `Rendering canvas timeline using Remotion composer...`);
      addLog("Compose-Director", `Progress: 12% ... 48% ... 85% ... 100%`, "info");
    }, 4500);

    // Poll status from server to retrieve the actual Kie video url
    setTimeout(() => {
      startPoller(tId, payloadPrompt, modelId);
    }, 6000);
  };

  const startPoller = (tId: string, promptText: string, modelId: string) => {
    const poller = setInterval(async () => {
      try {
        const res = await fetch(`/api/record-info?taskId=${tId}`);
        const result = await res.json();
        
        if (result.code === 200 && result.data) {
          const d = result.data;
          const status = d.status || d.state;

          if (status === "success" || status === "completed" || d.videoUrl || d.imageUrl) {
            clearInterval(poller);
            const mediaUrl = d.videoUrl || d.imageUrl || (d.output ? d.output[0] : null) || "";

            addLog("Publish-Director", `Orchestration complete! Video successfully rendered and quality checked.`, "info");

            const newItem: GalleryItem = {
              taskId: tId,
              pipeline: selectedPipeline,
              model: modelId,
              prompt: promptText,
              mediaUrl,
              timestamp: Date.now()
            };

            const updatedGallery = [newItem, ...gallery];
            setGallery(updatedGallery);
            localStorage.setItem("om_gallery", JSON.stringify(updatedGallery));

            setLatestMediaResult(mediaUrl);
            setActiveTask(null);
            refetchCredits();
          } else if (status === "failed" || status === "error") {
            clearInterval(poller);
            addLog("EP-Orchestrator", `Execution aborted. Cloud engine returned error.`, "warning");
            alert(lang === "en" ? "Generation failed." : "生成失败。");
            setActiveTask(null);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000);
  };

  // Re-run project
  const handleRerunProject = (item: GalleryItem) => {
    setSelectedProject(null);
    setCurrentView("create");
    setSelectedPipeline(item.pipeline);
    setScript(item.prompt);
    setSelectedModelId(item.model);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ═══════════════════════ TOP BAR ═══════════════════════ */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand" onClick={() => setCurrentView("create")}>
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#brandGrad)" />
                <path d="M8 12L11 15L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="brandGrad" x1="2" y1="2" x2="22" y2="22">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">OpenMontage</span>
            <span className="brand-tag">Studio</span>
          </div>
        </div>

        <div className="view-toggles">
          <button
            className={`view-toggle-btn ${currentView === "create" ? "active" : ""}`}
            onClick={() => setCurrentView("create")}
          >
            <Sparkles />
            <span>{t.navCreate}</span>
          </button>
          <button
            className={`view-toggle-btn ${currentView === "projects" ? "active" : ""}`}
            onClick={() => setCurrentView("projects")}
          >
            <FolderOpen />
            <span>{t.navProjects}</span>
          </button>
        </div>

        <div className="topbar-right">
          <div className="credit-pill">
            <Coins />
            <span>{credits || "--"}</span>
            <button className="icon-btn" onClick={() => refetchCredits()} title="Refresh">
              <RefreshCw />
            </button>
          </div>
          <button className="lang-btn" onClick={toggleLanguage}>
            <Globe />
            <span>{lang === "en" ? "中文" : "English"}</span>
          </button>
        </div>
      </header>

      {/* ── VIEW: AI GENERATOR (3-Column Workspace) ── */}
      {currentView === "create" && (
        <div className="workspace-layout">
          {/* 1. Left Sidebar: Pipelines Menu */}
          <aside className="sidebar-nav">
            <div className="sidebar-title">{t.sidebarToolsHeader}</div>
            {Object.entries(PIPELINES).map(([key, pipe]) => (
              <button
                key={key}
                className={`sidebar-item ${selectedPipeline === key ? "active" : ""}`}
                onClick={() => setSelectedPipeline(key)}
              >
                {pipe.icon}
                <span>{pipe.name[lang]}</span>
                {pipe.tag && (
                  <span className="sidebar-item-badge">{pipe.tag[lang]}</span>
                )}
              </button>
            ))}
          </aside>

          {/* 2. Middle Panel: Options Configurations */}
          <main className="control-panel">
            {/* Model Selection */}
            <div className="config-section">
              <h3 className="section-title">
                <Cpu /> <span>{t.selectModel}</span>
              </h3>
              <div className="input-group">
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                >
                  {PIPELINES[selectedPipeline]?.models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="model-help-text">
                {PIPELINES[selectedPipeline]?.models.find(m => m.id === selectedModelId)?.desc[lang]}
              </p>
            </div>

            {/* ════ PIPELINE SPECIFIC CUSTOM INPUTS ════ */}

            {/* A. AI Spokesperson Panel */}
            {selectedPipeline === "avatar-spokesperson" && (
              <>
                <div className="config-section animate-fade-in">
                  <h3 className="section-title">
                    <UserCircle /> <span>{t.selectAvatar}</span>
                  </h3>
                  <div className="avatar-showcase">
                    {AVATARS.map((av) => (
                      <div
                        key={av.id}
                        className={`avatar-card ${av.id === selectedAvatarId ? "selected" : ""}`}
                        onClick={() => {
                          setSelectedAvatarId(av.id);
                          setGlobalReferenceImage(av.full);
                          setCustomAvatarUrl("");
                          setLatestMediaResult(null);
                        }}
                      >
                        <img src={av.thumb} alt={av.name[lang]} />
                        <div className="avatar-label">
                          {av.name[lang]}<br />
                          <small style={{ opacity: 0.6 }}>{av.role[lang]}</small>
                        </div>
                        <div className="avatar-check">
                          <Plus style={{ transform: "rotate(45deg)", color: "#fff" }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="custom-avatar-row">
                    <LinkIcon />
                    <input
                      type="url"
                      placeholder={t.customAvatarPlaceholder}
                      value={customAvatarUrl}
                      onChange={(e) => {
                        setCustomAvatarUrl(e.target.value);
                        setGlobalReferenceImage(e.target.value);
                        if (e.target.value.trim()) {
                          setSelectedAvatarId(null);
                          setLatestMediaResult(null);
                        }
                      }}
                    />
                  </div>

                  <div className="custom-avatar-upload-row" style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <label className="upload-btn" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "8px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                      <UploadCloud style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
                      <span>{t.uploadLocalImage}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                    </label>
                    {uploading && (
                      <div className="upload-status" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                        <div className="btn-loader" style={{ width: "12px", height: "12px", borderWidth: "1.5px" }} />
                        <span>{t.uploadingStatus}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <FileText /> <span>{t.scriptTitle}</span>
                  </h3>
                  <div className="template-chips">
                    {TEMPLATES["avatar-spokesperson"].map((tmpl, idx) => (
                      <button key={idx} className="script-chip" onClick={() => setScript(tmpl.text[lang])}>
                        {tmpl.label[lang]}
                      </button>
                    ))}
                  </div>
                  <div className="script-editor">
                    <textarea
                      value={script}
                      placeholder={t.scriptPlaceholder}
                      onChange={(e) => setScript(e.target.value)}
                    />
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Mic /> <span>{t.voiceTitle}</span>
                  </h3>
                  <div className="voice-cards">
                    {VOICES.map((v) => (
                      <div
                        key={v.id}
                        className={`voice-card ${v.id === selectedVoiceId ? "selected" : ""}`}
                        onClick={() => setSelectedVoiceId(v.id)}
                      >
                        <div className="voice-avatar">{v.emoji}</div>
                        <div className="voice-info">
                          <div className="voice-name">{v.name[lang]}</div>
                          <div className="voice-desc">{v.desc[lang]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* B. Animated Explainer Panel */}
            {selectedPipeline === "animated-explainer" && (
              <>
                <div className="config-section animate-fade-in">
                  <h3 className="section-title">
                    <Film /> <span>{t.refVideoLabel}</span>
                  </h3>
                  <div className="input-group">
                    <input
                      type="url"
                      placeholder="https://example.com/reference-short.mp4"
                      value={explainerRefVideo}
                      onChange={(e) => setExplainerRefVideo(e.target.value)}
                    />
                  </div>
                  <p className="model-help-text">{t.refVideoHelp}</p>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <FileText /> <span>{t.scriptTitle}</span>
                  </h3>
                  <div className="template-chips">
                    {TEMPLATES["animated-explainer"].map((tmpl, idx) => (
                      <button key={idx} className="script-chip" onClick={() => setScript(tmpl.text[lang])}>
                        {tmpl.label[lang]}
                      </button>
                    ))}
                  </div>
                  <div className="script-editor">
                    <textarea
                      value={script}
                      placeholder={t.scriptPlaceholder}
                      onChange={(e) => setScript(e.target.value)}
                    />
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Sliders /> <span>{t.explainerStyleLabel}</span>
                  </h3>
                  <div className="input-group">
                    <select value={explainerStyle} onChange={(e) => setExplainerStyle(e.target.value)}>
                      <option value="flat-vector">Flat Vector Motion Graphics (扁平插画)</option>
                      <option value="cartoon-vector">Classic Cartoon Illustrations (卡通插图)</option>
                      <option value="outline-diagram">Outline Blueprint Diagrams (白描工程图)</option>
                    </select>
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Mic /> <span>{t.voiceAccentLabel}</span>
                  </h3>
                  <div className="input-group">
                    <select value={explainerAccent} onChange={(e) => setExplainerAccent(e.target.value)}>
                      <option value="us-en">US English Accent (美式口音)</option>
                      <option value="gb-en">British English Accent (英式口音)</option>
                      <option value="zh-cn">Mandarin Standard Chinese (普通话标准)</option>
                      <option value="zh-canton">Cantonese Chinese (粤语配音)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* C. Cinematic Trailer Panel */}
            {selectedPipeline === "cinematic" && (
              <>
                <div className="config-section animate-fade-in">
                  <h3 className="section-title">
                    <FileText /> <span>{t.scriptTitle}</span>
                  </h3>
                  <div className="template-chips">
                    {TEMPLATES["cinematic"].map((tmpl, idx) => (
                      <button key={idx} className="script-chip" onClick={() => setScript(tmpl.text[lang])}>
                        {tmpl.label[lang]}
                      </button>
                    ))}
                  </div>
                  <div className="script-editor">
                    <textarea
                      value={script}
                      placeholder={t.scriptPlaceholder}
                      onChange={(e) => setScript(e.target.value)}
                    />
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Sliders /> <span>{t.cinematicCameraLabel}</span>
                  </h3>
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>Camera Action</span>
                      <span className="val">
                        {cinematicCamera === 1 ? "Static (固定机位)" :
                         cinematicCamera === 2 ? "Pan / Tilt (摇镜头)" :
                         cinematicCamera === 3 ? "Zoom In (推镜头)" : "Orbit Zoom (环绕)"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={cinematicCamera}
                      onChange={(e) => setCinematicCamera(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Sparkles /> <span>{t.cinematicSFXLabel}</span>
                  </h3>
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>Intensity Level</span>
                      <span className="val">{cinematicSFX} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={cinematicSFX}
                      onChange={(e) => setCinematicSFX(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Mic /> <span>{t.cinematicBGMLabel}</span>
                  </h3>
                  <div className="input-group">
                    <select value={cinematicBGM} onChange={(e) => setCinematicBGM(e.target.value)}>
                      <option value="epic">Epic Cinematic Orchestral (史诗交响)</option>
                      <option value="synthwave">Retro Cyberpunk Synthwave (赛博电子)</option>
                      <option value="melancholy">Solitary Dark Ambient (暗黑氛围)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* D. Lip Sync Panel */}
            {selectedPipeline === "talking-head" && (
              <div className="config-section animate-fade-in">
                <h3 className="section-title">
                  <Film /> <span>{t.mediaTitle}</span>
                </h3>
                <div className="input-group">
                  <label>{t.videoUrlLabel}</label>
                  <input
                    type="url"
                    placeholder="https://example.com/talking-person.mp4"
                    value={sourceVideoUrl}
                    onChange={(e) => setSourceVideoUrl(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>{t.audioUrlLabel}</label>
                  <input
                    type="url"
                    placeholder="https://example.com/new-speech-track.mp3"
                    value={sourceAudioUrl}
                    onChange={(e) => setSourceAudioUrl(e.target.value)}
                  />
                </div>
                <div className="input-group" style={{ marginTop: "12px" }}>
                  <label>{t.lipsyncAlignLabel}</label>
                  <select value={lipsyncAlign} onChange={(e) => setLipsyncAlign(e.target.value)}>
                    <option value="standard">Standard Lip-Sync (口型匹配精度)</option>
                    <option value="expressive">High-Fidelity Expressive (高保真表达)</option>
                  </select>
                </div>
              </div>
            )}

            {/* E. Video Dubbing Panel */}
            {selectedPipeline === "localization-dub" && (
              <div className="config-section animate-fade-in">
                <h3 className="section-title">
                  <Film /> <span>{t.mediaTitle}</span>
                </h3>
                <div className="input-group">
                  <label>{t.videoUrlLabel}</label>
                  <input
                    type="url"
                    placeholder="https://example.com/english-podcast.mp4"
                    value={sourceVideoUrl}
                    onChange={(e) => setSourceVideoUrl(e.target.value)}
                  />
                </div>
                <div className="settings-row" style={{ marginTop: "12px" }}>
                  <div className="setting-item" style={{ flex: 1 }}>
                    <label>{t.dubSourceLang}</label>
                    <select value={dubSource} onChange={(e) => setDubSource(e.target.value)}>
                      <option value="en">English (英语)</option>
                      <option value="zh">Chinese (中文)</option>
                      <option value="ja">Japanese (日语)</option>
                    </select>
                  </div>
                  <div className="setting-item" style={{ flex: 1 }}>
                    <label>{t.dubTargetLang}</label>
                    <select value={dubTarget} onChange={(e) => setDubTarget(e.target.value)}>
                      <option value="zh">Chinese (中文)</option>
                      <option value="en">English (英语)</option>
                      <option value="ja">Japanese (日语)</option>
                      <option value="es">Spanish (西班牙语)</option>
                    </select>
                  </div>
                </div>
                <div className="checkbox-group" style={{ marginTop: "16px" }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dubClone}
                      onChange={(e) => setDubClone(e.target.checked)}
                    />
                    <span>{t.dubCloneVoice}</span>
                  </label>
                </div>
              </div>
            )}

            {/* F. Documentary Montage Panel */}
            {selectedPipeline === "documentary-montage" && (
              <>
                <div className="config-section animate-fade-in">
                  <h3 className="section-title">
                    <FileText /> <span>{t.montageKeywords}</span>
                  </h3>
                  <div className="script-editor">
                    <textarea
                      value={montageKeywords}
                      placeholder="e.g. Apollo 11 Saturn V moon launch, historical footage..."
                      onChange={(e) => setMontageKeywords(e.target.value)}
                    />
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <FolderOpen /> <span>{t.montageDatabase}</span>
                  </h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={montageArchives.includes("nasa")}
                        onChange={(e) => {
                          if (e.target.checked) setMontageArchives([...montageArchives, "nasa"]);
                          else setMontageArchives(montageArchives.filter(x => x !== "nasa"));
                        }}
                      />
                      <span>NASA Video Archive</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={montageArchives.includes("archive")}
                        onChange={(e) => {
                          if (e.target.checked) setMontageArchives([...montageArchives, "archive"]);
                          else setMontageArchives(montageArchives.filter(x => x !== "archive"));
                        }}
                      />
                      <span>Internet Archive (Archive.org)</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={montageArchives.includes("wikimedia")}
                        onChange={(e) => {
                          if (e.target.checked) setMontageArchives([...montageArchives, "wikimedia"]);
                          else setMontageArchives(montageArchives.filter(x => x !== "wikimedia"));
                        }}
                      />
                      <span>Wikimedia Commons</span>
                    </label>
                  </div>
                </div>

                <div className="config-section">
                  <h3 className="section-title">
                    <Mic /> <span>{t.montageMusicMood}</span>
                  </h3>
                  <div className="input-group">
                    <select value={montageBGM} onChange={(e) => setMontageBGM(e.target.value)}>
                      <option value="melancholy">Elegiac & Contemplative (挽歌与沉思)</option>
                      <option value="heroic">Historical & Inspiring (波澜壮阔历史感)</option>
                      <option value="silent">No Background Music (无伴奏纯画外音)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* G. Clip Factory Panel */}
            {selectedPipeline === "clip-factory" && (
              <div className="config-section animate-fade-in">
                <h3 className="section-title">
                  <Film /> <span>{t.mediaTitle}</span>
                </h3>
                <div className="input-group">
                  <label>{t.videoUrlLabel}</label>
                  <input
                    type="url"
                    placeholder="https://example.com/long-interview.mp4"
                    value={sourceVideoUrl}
                    onChange={(e) => setSourceVideoUrl(e.target.value)}
                  />
                </div>

                <div className="settings-row" style={{ marginTop: "12px" }}>
                  <div className="setting-item" style={{ flex: 1 }}>
                    <label>{t.clipDurationLabel}</label>
                    <select value={clipDuration} onChange={(e) => setClipDuration(Number(e.target.value))}>
                      <option value={15}>15 Seconds</option>
                      <option value={30}>30 Seconds</option>
                      <option value={60}>60 Seconds</option>
                    </select>
                  </div>
                  <div className="setting-item" style={{ flex: 1 }}>
                    <label>{t.clipFocusLabel}</label>
                    <select value={clipFocus} onChange={(e) => setClipFocus(e.target.value)}>
                      <option value="speech">Speech Highlights (金句逻辑)</option>
                      <option value="humor">Humorous/Funny Beats (幽默瞬间)</option>
                      <option value="visual">High Visual Action (大动态视觉)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}


            {/* ════ EXECUTIVE PRODUCER SETTINGS ════ */}
            <div className="config-section">
              <h3 className="section-title">
                <ShieldCheck /> <span>{t.epSettingsTitle}</span>
              </h3>
              
              <div className="input-group">
                <label>{t.policyLabel}</label>
                <select
                  value={checkpointPolicy}
                  onChange={(e) => setCheckpointPolicy(e.target.value as "guided" | "autopilot")}
                >
                  <option value="guided">{t.policyGuided}</option>
                  <option value="autopilot">{t.policyAuto}</option>
                </select>
              </div>

              <div className="input-group" style={{ marginTop: "10px" }}>
                <label>{t.playbookLabel}</label>
                <select
                  value={selectedPlaybook}
                  className="playbook-select"
                  onChange={(e) => setSelectedPlaybook(e.target.value)}
                >
                  {PLAYBOOKS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <p className="model-help-text" style={{ fontSize: "0.68rem" }}>
                  {PLAYBOOKS.find(p => p.id === selectedPlaybook)?.desc}
                </p>
              </div>

              <div className="input-group" style={{ marginTop: "10px" }}>
                <label style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{t.budgetLabel}</span>
                  <span style={{ color: "var(--accent-hover)", fontFamily: "var(--font-mono)" }}>
                    ${budgetCap.toFixed(2)} USD
                  </span>
                </label>
                <select
                  value={budgetCap}
                  onChange={(e) => setBudgetCap(Number(e.target.value))}
                >
                  <option value={0.50}>$0.50 USD</option>
                  <option value={1.00}>$1.00 USD</option>
                  <option value={2.00}>$2.00 USD</option>
                  <option value={5.00}>$5.00 USD</option>
                </select>
              </div>
            </div>

            {/* Output Settings */}
            <div className="config-section">
              <h3 className="section-title">
                <Settings /> <span>{t.settingsTitle}</span>
              </h3>
              <div className="settings-row">
                <div className="setting-item">
                  <label>{t.ratioLabel}</label>
                  <div className="ratio-pills">
                    {["16:9", "9:16", "1:1"].map((r) => (
                      <button
                        key={r}
                        className={`ratio-pill ${r === ratio ? "active" : ""}`}
                        onClick={() => setRatio(r)}
                      >
                        <span className={`ratio-icon r${r.replace(":", "")}`} />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="setting-item">
                  <label>{t.qualityLabel}</label>
                  <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </select>
                </div>
              </div>
            </div>
          </main>

          {/* 3. Right Panel: Dynamic Live Preview Canvas & Console / Checkpoints */}
          <section className="canvas-panel">
            <div className="preview-header">
              <h3>
                <MonitorPlay /> <span>{t.previewTitle}</span>
              </h3>
            </div>

            {/* Visual Canvas Block */}
            <div className="preview-viewport" style={{ flex: 1, maxHeight: "none", minHeight: "260px" }}>
              {activeTask && activeTask.step === "checkpoint" ? (
                /* Interactive Checkpoint Panel */
                <div className="checkpoint-panel">
                  <div className="checkpoint-header">
                    <span className="checkpoint-badge">{t.checkpointPrompt}</span>
                    <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      Stage: {activeTask.checkpointStage?.toUpperCase()}
                    </span>
                  </div>
                  <div className="checkpoint-editor">
                    <label>{t.checkpointScriptLabel}</label>
                    <textarea
                      value={checkpointDraft}
                      onChange={(e) => setCheckpointDraft(e.target.value)}
                    />
                  </div>
                  <div className="checkpoint-actions">
                    <button className="checkpoint-btn approve" onClick={handleApproveCheckpoint}>
                      <ShieldCheck style={{ width: "14px", height: "14px" }} />
                      <span>{t.approveContinue}</span>
                    </button>
                    <button
                      className="checkpoint-btn reject"
                      onClick={() => {
                        addLog("Script-Director", "Dialogue draft rejected. Generating new draft version...", "warning");
                        setTimeout(() => {
                          setCheckpointDraft(
                            lang === "en"
                              ? `[Scene 1] Refined: Today we review a revolutionary design. (Visual: Zoom center)\n[Scene 2] Refined: Notice the sleek responsive interface.`
                              : `[场景 1] 优化：今天我们来探讨一项颠覆性的产品设计。(画面: 聚焦主体)\n[场景 2] 优化：注意到这套极简流线型设计的美感了吗？`
                          );
                          addLog("Script-Director", "Dialogue redrafted successfully.", "info");
                        }, 2000);
                      }}
                    >
                      <Repeat style={{ width: "14px", height: "14px" }} />
                      <span>{t.sendBack}</span>
                    </button>
                  </div>
                </div>
              ) : activeTask ? (
                /* Generating status overlaying canvas */
                <div className="gen-progress-panel">
                  <div className="gen-animation">
                    <div className="gen-ring" />
                    <div className="gen-ring ring2" />
                    <div className="gen-ring ring3" />
                    <Cpu className="gen-icon animate-pulse" />
                  </div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "4px" }}>
                    {t.generatingTitle}
                  </h4>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                    {t.generatingDesc}
                  </p>

                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    <span>Running: {activeTask.step.toUpperCase()}</span>
                  </div>
                </div>
              ) : latestMediaResult ? (
                /* Completed video output */
                <div className="result-viewport" style={{ width: "100%", padding: "10px" }}>
                  <div className="result-player">
                    <video id="result-video" src={latestMediaResult} controls autoPlay />
                  </div>
                  <div className="result-actions">
                    <button
                      className="result-btn primary"
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = latestMediaResult;
                        a.download = `openmontage-video-${Date.now()}`;
                        a.target = "_blank";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      <Download /> <span>{t.downloadBtn}</span>
                    </button>
                    <button className="result-btn" onClick={() => setLatestMediaResult(null)}>
                      <Plus /> <span>{t.createAnother}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Default reference image / avatar preview */
                <div className="preview-avatar-container">
                  {selectedPipeline === "avatar-spokesperson" && globalReferenceImage ? (
                    <>
                      <img src={globalReferenceImage} alt="Reference Preview" />
                      <div className="project-badge" style={{ top: "10px", left: "10px" }}>
                        {t.activeCreationBadge}
                      </div>
                    </>
                  ) : (
                    <div className="preview-no-avatar">
                      <Wand2 />
                      <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        {PIPELINES[selectedPipeline]?.name[lang]}
                      </span>
                      <small style={{ fontSize: "0.7rem", color: "var(--text-muted)", maxWidth: "240px" }}>
                        {PIPELINES[selectedPipeline]?.desc[lang]}
                      </small>
                    </div>
                  )}
                  {script && selectedPipeline === "avatar-spokesperson" && (
                    <div className="preview-script-overlay">
                      <p>{script}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pipeline Flow Node Indicators */}
            {PIPELINES[selectedPipeline]?.type === "creative" ? (
              <div className="flow-diagram">
                <span className={`flow-node ${activeTask?.step === "brief" ? "active" : activeTask ? "completed" : ""}`}>
                  {t.activeNodeBrief}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "scripting" || activeTask?.step === "checkpoint" ? "active" : activeTask && activeTask.step !== "brief" ? "completed" : ""}`}>
                  {t.activeNodeScript}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "scene_plan" ? "active" : activeTask && !["brief", "scripting", "checkpoint"].includes(activeTask.step) ? "completed" : ""}`}>
                  {t.activeNodeScene}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "assets" ? "active" : activeTask && ["edit", "rendering"].includes(activeTask.step) ? "completed" : ""}`}>
                  {t.activeNodeAssets}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "edit" ? "active" : activeTask && ["rendering"].includes(activeTask.step) ? "completed" : ""}`}>
                  {t.activeNodeEdit}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "rendering" ? "active" : ""}`}>
                  {t.activeNodeRender}
                </span>
              </div>
            ) : (
              <div className="flow-diagram">
                <span className={`flow-node ${activeTask?.step === "brief" ? "active" : activeTask ? "completed" : ""}`}>
                  {t.activeNodeUpload}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "scripting" || activeTask?.step === "checkpoint" ? "active" : activeTask && activeTask.step !== "brief" ? "completed" : ""}`}>
                  {t.activeNodeProcess}
                </span>
                <span className="flow-arrow">→</span>
                <span className={`flow-node ${activeTask?.step === "rendering" ? "active" : ""}`}>
                  {t.activeNodeOutput}
                </span>
              </div>
            )}

            {/* Live Terminal Console logs displaying agentic traces */}
            <div className="terminal-console">
              <div className="terminal-header">
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Terminal style={{ width: "12px", height: "12px" }} />
                  <span>
                    {PIPELINES[selectedPipeline]?.type === "creative" ? t.consoleTitle : t.utilityConsoleTitle}
                  </span>
                </span>
                <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                  {PIPELINES[selectedPipeline]?.type === "creative" ? "EP_MODE: EXECUTIVE" : "UTILITY_MODE: PIPED"}
                </span>
              </div>
              <div className="terminal-body">
                {consoleLogs.length === 0 ? (
                  <div style={{ color: "var(--text-muted)", fontSize: "0.68rem", textAlign: "center", padding: "40px 0" }}>
                    {PIPELINES[selectedPipeline]?.type === "creative" 
                      ? (lang === "en" ? "Console idle. Click Run Pipeline to initiate AI Orchestrator logs." : "制片控制台空闲。点击按钮启动 AI 导演日志。")
                      : t.utilityConsoleDesc}
                  </div>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <div key={idx} className="log-entry">
                      <span className="log-time">[{log.time}]</span>
                      <span className="log-director">&lt;{log.director}&gt;</span>
                      <span className={`log-text ${log.type || ""}`}>{log.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              className="generate-btn"
              onClick={handleGenerate}
              disabled={!!activeTask || uploading}
            >
              <Wand2 />
              <span>
                {PIPELINES[selectedPipeline]?.type === "creative"
                  ? t.generateBtn
                  : (selectedPipeline === "talking-head" 
                      ? (lang === "en" ? "Start Lip-Sync" : "开始口型同步")
                      : selectedPipeline === "localization-dub"
                      ? (lang === "en" ? "Start Dubbing" : "开始翻译配音")
                      : (lang === "en" ? "Start Clipping" : "开始智能切片"))}
              </span>
            </button>
          </section>
        </div>
      )}

      {/* ── VIEW: MY CREATIONS GALLERY ── */}
      {currentView === "projects" && (
        <div className="gallery-layout">
          <div className="projects-header">
            <h2>{t.myProjectsTitle}</h2>
            <p className="step-subtitle">{t.myProjectsSub}</p>
          </div>

          <div className="gallery-grid">
            {gallery.length === 0 ? (
              <div className="empty-projects">
                <VideoOff />
                <h3>{t.noProjects}</h3>
                <p>{t.noProjectsDesc}</p>
                <button className="create-first-btn" onClick={() => setCurrentView("create")}>
                  <Plus /> <span>{t.createFirst}</span>
                </button>
              </div>
            ) : (
              gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="project-card"
                  onClick={() => setSelectedProject(item)}
                >
                  <div className="project-thumb">
                    {item.mediaUrl && (
                      <video
                        src={item.mediaUrl}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                    )}
                    <div className="play-overlay">
                      <div className="play-overlay-circle">
                        <Play fill="#fff" />
                      </div>
                    </div>
                    <div className="project-badge">
                      {PIPELINES[item.pipeline]?.name[lang] || item.pipeline}
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-title">{item.prompt}</div>
                    <div className="project-date">
                      {new Date(item.timestamp).toLocaleDateString()} · {item.model}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════ LIGHTBOX MODAL ═══════════════════════ */}
      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)} />
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X />
            </button>
            <div className="modal-body">
              <div className="modal-player">
                <video src={selectedProject.mediaUrl} controls autoPlay />
              </div>
              <div className="modal-meta-panel">
                <h3>{PIPELINES[selectedProject.pipeline]?.name[lang] || selectedProject.pipeline}</h3>
                <div className="modal-meta-row">
                  <span className="meta-label">{t.modalEngine}</span>
                  <span className="meta-val">{selectedProject.model}</span>
                </div>
                <div className="modal-meta-row">
                  <span className="meta-label">Task ID</span>
                  <span className="meta-val mono">{selectedProject.taskId}</span>
                </div>
                <div className="modal-meta-row">
                  <span className="meta-label">{t.modalDate}</span>
                  <span className="meta-val">
                    {new Date(selectedProject.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="modal-script-box">
                  <span className="meta-label">{t.modalScript}</span>
                  <p>{selectedProject.prompt}</p>
                </div>
                <div className="modal-actions">
                  <button
                    className="result-btn primary"
                    onClick={() => {
                      if (selectedProject.mediaUrl) {
                        const a = document.createElement("a");
                        a.href = selectedProject.mediaUrl;
                        a.download = `${selectedProject.pipeline}-${selectedProject.taskId}`;
                        a.target = "_blank";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }
                    }}
                  >
                    <Download /> <span>{t.downloadBtn}</span>
                  </button>
                  <button className="result-btn" onClick={() => handleRerunProject(selectedProject)}>
                    <Repeat /> <span>{t.rerunBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
