import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Coins,
  Globe,
  PlusCircle,
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
  Monitor,
  Layers,
  Podcast
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
  sections: string[];
  featured: boolean;
  model: string;
  models: ModelDef[];
}

const PIPELINES: Record<string, PipelineDef> = {
  "avatar-spokesperson": {
    name: { en: "AI Spokesperson", zh: "AI 数字人带货" },
    desc: { en: "Generate a realistic talking-head video from a portrait and sales script. Perfect for e-commerce and product demos.", zh: "输入主播肖像和带货文案，自动生成逼真的 AI 数字人带货视频。" },
    icon: <UserCircle />,
    engines: ["OmniHuman 1.5", "Lip-Sync"],
    tag: { en: "Most Popular", zh: "最热门", type: "hot" },
    sections: ["avatar", "script", "voice"],
    featured: true,
    model: "omnihuman-v1.5",
    models: [
      { id: "omnihuman-v1.5", name: "OmniHuman v1.5", desc: { en: "Realistic expressions and natural gestures (Recommended)", zh: "超逼真面部表情与动作（推荐）" } },
      { id: "seedance-v2.0", name: "Seedance v2.0", desc: { en: "Consistent body rendering and high frame rate", zh: "高保真身体姿态与高帧率" } },
      { id: "volcengine/video-to-video-lip-sync", name: "Volcengine Lip-Sync", desc: { en: "Speedy mouth-movement synthesis from video+audio", zh: "超快速口型动作匹配合成" } }
    ]
  },
  "animated-explainer": {
    name: { en: "Animated Explainer", zh: "动画解说视频" },
    desc: { en: "Auto-generate educational explainer videos with AI voiceover, images, and Remotion animation rendering.", zh: "自动生成教育科普视频：AI 撰写脚本、生成配图、合成配音并渲染为动画。" },
    icon: <Presentation />,
    engines: ["Imagen4", "Google TTS", "Remotion"],
    tag: { en: "Popular", zh: "热门", type: "hot" },
    sections: ["script"],
    featured: true,
    model: "imagen4",
    models: [
      { id: "imagen4", name: "Google Imagen 4", desc: { en: "Educational and illustrative diagrams (Recommended)", zh: "适合学术说明与图形绘制（推荐）" } },
      { id: "flux-schnell", name: "Flux.1 Schnell", desc: { en: "High quality photorealistic illustrations", zh: "高质量写实图像与海报生成" } }
    ]
  },
  "cinematic": {
    name: { en: "Cinematic Trailer", zh: "电影预告片" },
    desc: { en: "Create stunning cinematic storyboards and render high-fidelity video with Kling or Veo engines.", zh: "自动生成电影级分镜脚本，调用 Kling/Veo 引擎渲染高画质预告片。" },
    icon: <Clapperboard />,
    engines: ["Kling v3", "Veo 3.1"],
    tag: { en: "New", zh: "新功能", type: "new" },
    sections: ["script"],
    featured: true,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "Highly dynamic action sequences (Recommended)", zh: "高动态动作镜头与光影效果（推荐）" } },
      { id: "veo-3.1", name: "Google Veo 3.1", desc: { en: "Cinematic depth, realistic lighting, and composition", zh: "电影级构图与景深深度" } },
      { id: "wan-v2.7", name: "Alibaba Wan 2.7", desc: { en: "Excellent visual layout and prompt adherence", zh: "阿里开源模型，文字排版遵从度好" } }
    ]
  },
  "talking-head": {
    name: { en: "Lip-Sync Video", zh: "口型同步视频" },
    desc: { en: "Perfectly synchronize mouth movements in an existing presenter video with a new audio track.", zh: "将已有的主播视频口型与新音频精准同步对齐，实现完美口型匹配。" },
    icon: <Mic />,
    engines: ["Volcengine Lip-Sync"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "volcengine/video-to-video-lip-sync",
    models: [
      { id: "volcengine/video-to-video-lip-sync", name: "Volcengine Lip-Sync", desc: { en: "Speedy mouth-movement synthesis from video+audio", zh: "超快速口型动作匹配合成" } }
    ]
  },
  "localization-dub": {
    name: { en: "Video Dubbing", zh: "视频翻译配音" },
    desc: { en: "Translate speech, clone voice in target language, and burn in multilingual subtitles.", zh: "翻译视频语音，克隆音色生成目标语种配音，自动烧录双语字幕。" },
    icon: <Languages />,
    engines: ["WhisperX", "GPT", "ElevenLabs"],
    tag: null,
    sections: ["media-dub"],
    featured: false,
    model: "volcengine/video-to-video-lip-sync",
    models: [
      { id: "volcengine/video-to-video-lip-sync", name: "Volcengine Lip-Sync", desc: { en: "Speedy mouth-movement synthesis from video+audio", zh: "超快速口型动作匹配合成" } }
    ]
  },
  "documentary-montage": {
    name: { en: "Documentary Montage", zh: "纪录片蒙太奇" },
    desc: { en: "CLIP-indexed retrieval from open databases to compile archival tone-poems and montages.", zh: "从开源数据库语义检索真实档案素材并自动拼接剪辑为纪录片。" },
    icon: <Film />,
    engines: ["Archive.org", "Wikimedia", "FFmpeg"],
    tag: null,
    sections: ["script"],
    featured: false,
    model: "grok-imagine",
    models: [
      { id: "grok-imagine", name: "Grok Imagine", desc: { en: "Creative montages with historical and cinematic styles", zh: "具有历史或纪实风格的创意合成" } }
    ]
  },
  "clip-factory": {
    name: { en: "Clip Factory", zh: "长视频智能切片" },
    desc: { en: "Automatically split long videos into viral short clips for social media distribution.", zh: "将长视频自动切片，提取精彩画面生成适合社交媒体的短视频。" },
    icon: <Scissors />,
    engines: ["WhisperX", "SceneDetect", "FFmpeg"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "Intelligent cutting based on visual rhythm", zh: "基于画面节奏的智能镜头裁切" } }
    ]
  },
  "animation": {
    name: { en: "Motion Graphics", zh: "动态图形视频" },
    desc: { en: "Generate typography-driven GSAP motion graphics for SaaS and product launches.", zh: "生成以文字排版驱动的动态图形视频，适合 SaaS 产品发布。" },
    icon: <Sparkles />,
    engines: ["GSAP", "HyperFrames"],
    tag: null,
    sections: ["script"],
    featured: false,
    model: "ideogram-v3",
    models: [
      { id: "ideogram-v3", name: "Ideogram v3.0", desc: { en: "Typography design and flat motion layouts", zh: "排版文字与平面扁平化图形设计" } }
    ]
  },
  "screen-demo": {
    name: { en: "Screen Demo", zh: "录屏演示增强" },
    desc: { en: "Polish raw screen recordings with dynamic zoom, cursor highlights, and AI voiceover.", zh: "为原始录屏添加平滑缩放、鼠标高亮、边框排版及 AI 配音讲解。" },
    icon: <Monitor />,
    engines: ["FFmpeg", "Remotion"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "Screen details enhancement", zh: "增强画面细节并生成画外讲解" } }
    ]
  },
  "hybrid": {
    name: { en: "Hybrid Video", zh: "混合合成视频" },
    desc: { en: "Fuse live-action footage with AI-generated overlays and graphics enhancements.", zh: "将实拍录像与 AI 视觉特效进行图层融合与画中画合成。" },
    icon: <Layers />,
    engines: ["Remotion", "FFmpeg"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "High fidelity layer blending", zh: "高质量多图层智能画中画融合" } }
    ]
  },
  "podcast-repurpose": {
    name: { en: "Podcast to Video", zh: "播客转视频" },
    desc: { en: "Transform audio podcasts into short video formats with waveforms and dynamic subtitles.", zh: "为播客音频添加波形图、动态字幕和头像动画，转换为短视频。" },
    icon: <Podcast />,
    engines: ["WhisperX", "Waveform", "Remotion"],
    tag: null,
    sections: ["media"],
    featured: false,
    model: "kling-v3",
    models: [
      { id: "kling-v3", name: "Kling v3.0", desc: { en: "Generates high quality video elements for audio podcast", zh: "基于音频波形生成高质量视频辅助画面" } }
    ]
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
  { id: "male-pro", name: { en: "Professional", zh: "专业男声" }, desc: { en: "Calm, authoritative", zh: "沉稳权威型" }, emoji: "👨‍💻" },
  { id: "en-female", name: { en: "English Female", zh: "英文女声" }, desc: { en: "Clear, international", zh: "国际化英语发音" }, emoji: "🌍" }
];

// ── Script Templates ──
interface TemplateDef {
  label: { en: string; zh: string };
  text: { en: string; zh: string };
}

const TEMPLATES: Record<string, TemplateDef[]> = {
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

// ── App Translations ──
const I18N = {
  en: {
    navCreate: "Create", navProjects: "My Projects",
    step1: "Choose Template", step2: "Configure", step3: "Preview & Generate",
    chooseTemplateTitle: "What would you like to create?",
    chooseTemplateSub: "Select a production pipeline to get started",
    backBtn: "Back", newVideoBtn: "Create New Video",
    selectModel: "Select AI Model",
    uploadLocalImage: "Upload Local Image",
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
    modalEngine: "Engine", modalDate: "Date", modalScript: "Script", rerunBtn: "Re-run",
    uploadingStatus: "Uploading image..."
  },
  zh: {
    navCreate: "创建视频", navProjects: "我的项目",
    step1: "选择模板", step2: "配置参数", step3: "预览并生成",
    chooseTemplateTitle: "您想创建什么类型的视频？",
    chooseTemplateSub: "选择一条视频生产流水线以开始",
    backBtn: "返回", newVideoBtn: "创建新视频",
    selectModel: "选择生成模型",
    uploadLocalImage: "上传本地图片",
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
    modalEngine: "渲染引擎", modalDate: "创建日期", modalScript: "脚本内容", rerunBtn: "重新运行",
    uploadingStatus: "正在上传图片..."
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

export default function App() {
  const [lang, setLang] = useState<"en" | "zh">(() => {
    return (localStorage.getItem("om_lang") as "en" | "zh") || "en";
  });

  const [currentView, setCurrentView] = useState<"create" | "projects">("create");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);

  // Form parameters
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>("xiaomi");
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>("");
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>("female-sales");
  const [script, setScript] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [dubLang, setDubLang] = useState<string>("zh");
  const [ratio, setRatio] = useState<string>("9:16");
  const [quality, setQuality] = useState<string>("1080p");
  const [selectedModelId, setSelectedModelId] = useState<string>("");

  // Uploading state
  const [uploading, setUploading] = useState<boolean>(false);

  // Active generating task
  const [activeTask, setActiveTask] = useState<{
    taskId: string;
    pipeline: string;
    model: string;
    prompt: string;
    elapsed: number;
    stageIndex: number;
  } | null>(null);

  // local project database
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    return JSON.parse(localStorage.getItem("om_gallery") || "[]");
  });

  // Modal project details
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);

  const t = I18N[lang];

  // TanStack Query for credits balance polling
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

  // Keep track of active generation polling
  const activeTaskRef = useRef<typeof activeTask>(null);
  activeTaskRef.current = activeTask;

  useEffect(() => {
    if (!activeTask) return;



    const interval = setInterval(async () => {
      const current = activeTaskRef.current;
      if (!current) {
        clearInterval(interval);
        return;
      }

      const nextElapsed = current.elapsed + 2;
      let nextStageIndex = current.stageIndex;

      if (nextElapsed > 4 && nextStageIndex === 0) nextStageIndex = 1;
      else if (nextElapsed > 8 && nextStageIndex === 1) nextStageIndex = 2;
      else if (nextElapsed > 14 && nextStageIndex === 2) nextStageIndex = 3;
      else if (nextElapsed > 22 && nextStageIndex === 3) nextStageIndex = 4;
      else if (nextElapsed > 30 && nextStageIndex === 4) nextStageIndex = 5;

      setActiveTask({
        ...current,
        elapsed: nextElapsed,
        stageIndex: nextStageIndex
      });

      // Poll status
      try {
        const res = await fetch(`/api/record-info?taskId=${current.taskId}`);
        const result = await res.json();
        if (result.code === 200 && result.data) {
          const d = result.data;
          const status = d.status || d.state;

          if (status === "success" || status === "completed" || d.videoUrl || d.imageUrl) {
            clearInterval(interval);
            const mediaUrl = d.videoUrl || d.imageUrl || (d.output ? d.output[0] : null) || "";
            
            // Add to gallery
            const newItem: GalleryItem = {
              taskId: current.taskId,
              pipeline: current.pipeline,
              model: current.model,
              prompt: current.prompt,
              mediaUrl,
              timestamp: Date.now()
            };

            const updatedGallery = [newItem, ...gallery];
            setGallery(updatedGallery);
            localStorage.setItem("om_gallery", JSON.stringify(updatedGallery));

            setActiveTask(null);
            setCurrentStep(3); // Result view
            
            // Trigger video load
            setTimeout(() => {
              const video = document.getElementById("result-video") as HTMLVideoElement;
              if (video) {
                video.src = mediaUrl;
                video.load();
              }
            }, 100);

            refetchCredits();
          } else if (status === "failed" || status === "error") {
            clearInterval(interval);
            alert(lang === "en" ? "Generation failed." : "生成失败。");
            setActiveTask(null);
            setCurrentStep(1);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTask, gallery, lang, refetchCredits]);

  // Set initial model options when selected pipeline changes
  useEffect(() => {
    if (selectedPipeline) {
      const pipe = PIPELINES[selectedPipeline];
      if (pipe && pipe.models.length > 0) {
        setSelectedModelId(pipe.models[0].id);
      } else {
        setSelectedModelId("");
      }
    }
  }, [selectedPipeline]);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "zh" : "en";
    setLang(nextLang);
    localStorage.setItem("om_lang", nextLang);
  };

  const handleSelectPipeline = (key: string) => {
    setSelectedPipeline(key);
    setCurrentStep(2);
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
        // Set the custom URL (served under avatar.agentok.top securely)
        setCustomAvatarUrl(result.url);
        setSelectedAvatarId(null); // Deselect presets
      } else {
        alert(lang === "en" ? `Upload failed: ${result.error || "Unknown"}` : `上传失败: ${result.error || "未知原因"}`);
      }
    } catch (err) {
      console.error(err);
      alert(lang === "en" ? "Upload connection error" : "上传网络错误");
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset file uploader
    }
  };

  // Generate Task Submit
  const handleGenerate = async () => {
    if (!selectedPipeline) return;
    const pipe = PIPELINES[selectedPipeline];
    if (!pipe) return;

    let input: Record<string, any> = {
      pipeline: selectedPipeline,
      aspectRatio: ratio,
      quality
    };

    if (pipe.sections.includes("script") || pipe.sections.includes("avatar")) {
      if (!script.trim()) {
        alert(lang === "en" ? "Please enter a script." : "请输入脚本内容。");
        return;
      }
      input.prompt = script.trim();
    }

    if (pipe.sections.includes("avatar")) {
      input.voice = selectedVoiceId;
      if (selectedAvatarId) {
        const av = AVATARS.find(a => a.id === selectedAvatarId);
        input.avatarUrl = av ? av.full : "";
      } else {
        input.avatarUrl = customAvatarUrl.trim();
      }
    }

    if (pipe.sections.includes("media") || pipe.sections.includes("media-dub")) {
      if (!videoUrl.trim()) {
        alert(lang === "en" ? "Please provide a source video URL." : "请提供源视频 URL。");
        return;
      }
      input.video_url = videoUrl.trim();
      if (pipe.sections.includes("media-dub")) {
        input.dubLang = dubLang;
      } else {
        input.audio_url = audioUrl.trim();
      }
    }

    const modelToUse = selectedModelId || pipe.model;

    // Trigger api
    try {
      const res = await fetch("/api/create-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: modelToUse, input })
      });
      const result = await res.json();

      if (result.code === 200 && result.data && result.data.taskId) {
        // Start Step 3 progress
        setActiveTask({
          taskId: result.data.taskId,
          pipeline: selectedPipeline,
          model: modelToUse,
          prompt: script || `Pipeline: ${pipe.name[lang]}`,
          elapsed: 0,
          stageIndex: 0
        });
        setCurrentStep(3);
      } else {
        alert(lang === "en" ? `Error: ${result.msg || "Unknown"}` : `错误: ${result.msg || "未知错误"}`);
      }
    } catch (err) {
      console.error(err);
      alert(lang === "en" ? "Connection error" : "连接服务器错误");
    }
  };

  const getPreviewAvatarUrl = () => {
    if (customAvatarUrl) return customAvatarUrl;
    if (selectedAvatarId) {
      const av = AVATARS.find(a => a.id === selectedAvatarId);
      return av ? av.full : "";
    }
    return "";
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Re-run project
  const handleRerunProject = (item: GalleryItem) => {
    setSelectedProject(null);
    setCurrentView("create");
    setSelectedPipeline(item.pipeline);
    setCurrentStep(2);
    setScript(item.prompt);
  };

  return (
    <div>
      {/* ═══════════════════════ TOP NAV BAR ═══════════════════════ */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

        <nav className="topbar-center">
          <button
            className={`nav-tab ${currentView === "create" ? "active" : ""}`}
            onClick={() => {
              setCurrentView("create");
              goToStep(1);
            }}
          >
            <PlusCircle /> <span>{t.navCreate}</span>
          </button>
          <button
            className={`nav-tab ${currentView === "projects" ? "active" : ""}`}
            onClick={() => setCurrentView("projects")}
          >
            <FolderOpen /> <span>{t.navProjects}</span>
          </button>
        </nav>

        <div className="topbar-right">
          <div className="credit-pill">
            <Coins />
            <span>{credits || "--"}</span>
            <button className="icon-btn" onClick={() => refetchCredits()} title="Refresh">
              <RefreshCw />
            </button>
          </div>
          <button className="lang-btn" onClick={toggleLanguage}>
            <Globe /> <span>{lang === "en" ? "中文" : "English"}</span>
          </button>
        </div>
      </header>

      {/* ═══════════════════════ MAIN CONTENT ═══════════════════════ */}
      <main className="main-content">
        {/* ── VIEW: CREATE ── */}
        {currentView === "create" && (
          <div className="view active">
            {/* Step Indicator Bar */}
            <div className="step-bar">
              <div className={`step-indicator ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}>
                <div className="step-dot">1</div>
                <span>{t.step1}</span>
              </div>
              <div className={`step-line ${currentStep > 1 ? "completed" : ""}`} />
              <div className={`step-indicator ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}>
                <div className="step-dot">2</div>
                <span>{t.step2}</span>
              </div>
              <div className={`step-line ${currentStep > 2 ? "completed" : ""}`} />
              <div className={`step-indicator ${currentStep === 3 ? "active" : ""}`}>
                <div className="step-dot">3</div>
                <span>{t.step3}</span>
              </div>
            </div>

            {/* ════════ STEP 1: Choose Template ════════ */}
            {currentStep === 1 && (
              <section className="wizard-step active">
                <div className="step-header">
                  <h2>{t.chooseTemplateTitle}</h2>
                  <p className="step-subtitle">{t.chooseTemplateSub}</p>
                </div>

                <div className="template-grid">
                  {Object.entries(PIPELINES).map(([key, pipe]) => (
                    <div
                      key={key}
                      className={`template-card ${pipe.featured ? "featured" : ""}`}
                      onClick={() => handleSelectPipeline(key)}
                    >
                      <div className="card-visual">
                        <div className="card-visual-bg" style={{ background: "radial-gradient(circle at 50% 80%, var(--accent-glow), transparent 70%)" }} />
                        {pipe.icon}
                      </div>
                      <div className="card-body">
                        {pipe.tag && (
                          <div className={`card-tag ${pipe.tag.type}`}>{pipe.tag[lang]}</div>
                        )}
                        <h3 className="card-title">{pipe.name[lang]}</h3>
                        <p className="card-desc">{pipe.desc[lang]}</p>
                        <div className="card-engines">
                          {pipe.engines.map((e, idx) => (
                            <span key={idx} className="engine-tag">{e}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ════════ STEP 2: Configure ════════ */}
            {currentStep === 2 && selectedPipeline && (
              <section className="wizard-step active">
                <button className="back-btn" onClick={() => goToStep(1)}>
                  <i data-lucide="arrow-left" /> <span>{t.backBtn}</span>
                </button>

                <div className="config-layout">
                  {/* Left: Configuration Panel */}
                  <div className="config-panel">
                    <div className="config-header">
                      <div className="config-pipeline-badge">
                        <Clapperboard />
                        <span>{PIPELINES[selectedPipeline]?.name[lang]}</span>
                      </div>
                    </div>

                    {/* Model Selection */}
                    <div className="config-section">
                      <h3 className="section-title">
                        <Cpu /> <span>{t.selectModel}</span>
                      </h3>
                      <div className="input-group">
                        <select
                          id="model-select"
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

                    {/* Avatar Section */}
                    {PIPELINES[selectedPipeline]?.sections.includes("avatar") && (
                      <div className="config-section">
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
                                setCustomAvatarUrl(""); // clear custom
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

                        {/* Upload local image securely & bind to KV */}
                        <div className="custom-avatar-row">
                          <LinkIcon />
                          <input
                            type="url"
                            placeholder={t.customAvatarPlaceholder}
                            value={customAvatarUrl}
                            onChange={(e) => {
                              setCustomAvatarUrl(e.target.value);
                              if (e.target.value.trim()) setSelectedAvatarId(null);
                            }}
                          />
                        </div>

                        <div className="custom-avatar-upload-row" style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
                          <label className="upload-btn" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "10px", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
                            <UploadCloud style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
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
                            <div className="upload-status" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                              <div className="btn-loader" style={{ width: "14px", height: "14px", borderWidth: "1.5px" }} />
                              <span>{t.uploadingStatus}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Script / Prompt Section */}
                    {(PIPELINES[selectedPipeline]?.sections.includes("script") ||
                      PIPELINES[selectedPipeline]?.sections.includes("avatar")) && (
                      <div className="config-section">
                        <h3 className="section-title">
                          <FileText /> <span>{t.scriptTitle}</span>
                        </h3>
                        <div className="template-chips">
                          {(TEMPLATES[selectedPipeline] || TEMPLATES["animated-explainer"] || []).map((tmpl, idx) => (
                            <button
                              key={idx}
                              className="script-chip"
                              onClick={() => {
                                setScript(tmpl.text[lang]);
                              }}
                            >
                              {tmpl.label[lang]}
                            </button>
                          ))}
                        </div>
                        <div className="script-editor">
                          <textarea
                            value={script}
                            rows={6}
                            placeholder={t.scriptPlaceholder}
                            onChange={(e) => setScript(e.target.value)}
                          />
                          <div className="script-toolbar">
                            <span className="char-count">{script.length} / 5000</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Media Source Section */}
                    {(PIPELINES[selectedPipeline]?.sections.includes("media") ||
                      PIPELINES[selectedPipeline]?.sections.includes("media-dub")) && (
                      <div className="config-section">
                        <h3 className="section-title">
                          <Film /> <span>{t.mediaTitle}</span>
                        </h3>
                        <div className="input-group">
                          <label>{t.videoUrlLabel}</label>
                          <input
                            type="url"
                            placeholder="https://example.com/source-video.mp4"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                          />
                        </div>
                        {!PIPELINES[selectedPipeline]?.sections.includes("media-dub") && (
                          <div className="input-group">
                            <label>{t.audioUrlLabel}</label>
                            <input
                              type="url"
                              placeholder="https://example.com/voiceover.mp3"
                              value={audioUrl}
                              onChange={(e) => setAudioUrl(e.target.value)}
                            />
                          </div>
                        )}
                        {PIPELINES[selectedPipeline]?.sections.includes("media-dub") && (
                          <div className="input-group">
                            <label>{t.dubLangLabel}</label>
                            <select value={dubLang} onChange={(e) => setDubLang(e.target.value)}>
                              <option value="zh">中文 Chinese</option>
                              <option value="en">English</option>
                              <option value="ja">日本語 Japanese</option>
                              <option value="ko">한국어 Korean</option>
                              <option value="es">Español Spanish</option>
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Voice Section */}
                    {PIPELINES[selectedPipeline]?.sections.includes("voice") && (
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
                    )}

                    {/* Settings Row */}
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
                  </div>

                  {/* Right: Live Preview Panel */}
                  <div className="preview-panel">
                    <div className="preview-header">
                      <h3>
                        <MonitorPlay /> <span>{t.previewTitle}</span>
                      </h3>
                    </div>
                    <div className="preview-viewport">
                      <div className="preview-avatar-container">
                        {getPreviewAvatarUrl() ? (
                          <img
                            src={getPreviewAvatarUrl()}
                            className="visible"
                            alt="Preview"
                          />
                        ) : (
                          <div className="preview-no-avatar">
                            <UserCircle />
                            <span>{t.previewNoAvatar}</span>
                          </div>
                        )}
                      </div>
                      {script && (
                        <div className="preview-script-overlay">
                          <p>{script}</p>
                        </div>
                      )}
                    </div>
                    <div className="preview-meta">
                      <div className="meta-chip">
                        <span>{ratio}</span>
                      </div>
                      <div className="meta-chip">
                        <span>
                          {PIPELINES[selectedPipeline]?.models.find(m => m.id === selectedModelId)?.name || PIPELINES[selectedPipeline]?.engines[0]}
                        </span>
                      </div>
                      <div className="meta-chip">
                        <span>{t.previewEta}</span>
                      </div>
                    </div>
                    <button className="generate-btn" onClick={handleGenerate}>
                      <Wand2 />
                      <span>{t.generateBtn}</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ════════ STEP 3: Generating / Result ════════ */}
            {currentStep === 3 && (
              <section className="wizard-step active">
                <button className="back-btn" onClick={() => goToStep(1)}>
                  <Plus /> <span>{t.newVideoBtn}</span>
                </button>

                <div className="generation-center">
                  {/* Generating State */}
                  {activeTask && (
                    <div className="gen-progress">
                      <div className="gen-animation">
                        <div className="gen-ring" />
                        <div className="gen-ring ring2" />
                        <div className="gen-ring ring3" />
                        <Cpu className="gen-icon" />
                      </div>
                      <h2>{t.generatingTitle}</h2>
                      <p className="gen-status">{t.generatingDesc}</p>

                      <div className="stage-progress">
                        <div className="stage-track">
                          <div
                            className="stage-fill"
                            style={{ width: `${((activeTask.stageIndex + 1) / 6) * 100}%` }}
                          />
                        </div>
                        <div className="stage-labels">
                          {["research", "script", "storyboard", "assets", "render", "review"].map((s, idx) => (
                            <span
                              key={s}
                              className={`stage-label ${
                                idx < activeTask.stageIndex
                                  ? "completed"
                                  : idx === activeTask.stageIndex
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {I18N[lang][`stage${s.charAt(0).toUpperCase() + s.slice(1)}` as keyof typeof I18N['zh']]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="gen-meta">
                        <span className="gen-elapsed">{formatTime(activeTask.elapsed)}</span>
                        <span className="gen-task-id">ID: {activeTask.taskId}</span>
                      </div>
                    </div>
                  )}

                  {/* Result State */}
                  {!activeTask && (
                    <div className="gen-result">
                      <div className="result-player">
                        <video id="result-video" controls />
                      </div>
                      <div className="result-actions">
                        <button
                          className="result-btn primary"
                          onClick={() => {
                            const video = document.getElementById("result-video") as HTMLVideoElement;
                            if (video?.src) {
                              const a = document.createElement("a");
                              a.href = video.src;
                              a.download = `video-${Date.now()}`;
                              a.target = "_blank";
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                            }
                          }}
                        >
                          <Download /> <span>{t.downloadBtn}</span>
                        </button>
                        <button className="result-btn" onClick={() => goToStep(1)}>
                          <Plus /> <span>{t.createAnother}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── VIEW: MY PROJECTS ── */}
        {currentView === "projects" && (
          <div className="view active">
            <div className="projects-header">
              <h2>{t.myProjectsTitle}</h2>
              <p className="step-subtitle">{t.myProjectsSub}</p>
            </div>

            <div className="projects-grid">
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
      </main>

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

  function goToStep(step: number) {
    setCurrentStep(step);
  }
}
