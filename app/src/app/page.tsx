"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  FolderOpen,
  Settings,
  MapPin,
  Clock,
  Check,
  X,
  Plus,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
  Cloud,
  Wifi,
  WifiOff,
  User,
  Globe
} from "lucide-react";
import { appTranslations, AppLanguage, getStoredLanguage, setStoredLanguage, getLanguageFromUrl } from "@/lib/translations";

// Types
interface Project {
  id: string;
  name: string;
  client: string;
  photoCount: number;
  lastUpdated: Date;
}

interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    address?: string;
  } | null;
  projectId: string;
}

// Tabs
type TabType = "projects" | "capture" | "settings";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Instalación Eléctrica",
      client: "García Martínez",
      photoCount: 12,
      lastUpdated: new Date(),
    },
    {
      id: "2",
      name: "Reparación Climatización",
      client: "Oficinas Centro",
      photoCount: 8,
      lastUpdated: new Date(Date.now() - 86400000),
    },
  ]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Language state
  const [lang, setLang] = useState<AppLanguage>('en');

  // Initialize language from URL or localStorage
  useEffect(() => {
    const urlLang = getLanguageFromUrl();
    if (urlLang) {
      setLang(urlLang);
      setStoredLanguage(urlLang);
    } else {
      setLang(getStoredLanguage());
    }
  }, []);

  const t = appTranslations[lang];

  // Toggle language
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    setStoredLanguage(newLang);
  };

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.log("GPS error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCapturing(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("No se pudo acceder a la cámara");
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
    setCapturedImage(null);
  }, []);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0);

    // Add watermark
    const now = new Date();
    const dateStr = now.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const timeStr = now.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    // Watermark background
    const watermarkHeight = 80;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, canvas.height - watermarkHeight, canvas.width, watermarkHeight);

    // Watermark text
    ctx.fillStyle = "white";
    ctx.font = "bold 24px system-ui";

    // Date and time
    ctx.fillText(`📅 ${dateStr}  🕐 ${timeStr}`, 20, canvas.height - 50);

    // GPS coordinates
    if (currentLocation) {
      ctx.fillText(
        `📍 ${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`,
        20,
        canvas.height - 20
      );
    }

    // Project name (if selected)
    if (selectedProject) {
      ctx.textAlign = "right";
      ctx.fillText(`🏗️ ${selectedProject.name}`, canvas.width - 20, canvas.height - 35);
    }

    // Get data URL
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
  }, [currentLocation, selectedProject]);

  // Save photo
  const savePhoto = useCallback(() => {
    if (!capturedImage || !selectedProject) return;

    const newPhoto: CapturedPhoto = {
      id: Date.now().toString(),
      dataUrl: capturedImage,
      timestamp: new Date(),
      location: currentLocation,
      projectId: selectedProject.id,
    };

    setPhotos(prev => [newPhoto, ...prev]);

    // Update project photo count
    setProjects(prev => prev.map(p =>
      p.id === selectedProject.id
        ? { ...p, photoCount: p.photoCount + 1, lastUpdated: new Date() }
        : p
    ));

    setCapturedImage(null);

    // Show success feedback
    // In production, this would upload to Google Drive
    console.log("Photo saved:", newPhoto);
  }, [capturedImage, currentLocation, selectedProject]);

  // Render Projects Tab
  const renderProjectsTab = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="safe-area-top px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">SiteSnap AI</h1>
            <p className="text-sm text-gray-400">{t.projects.title}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs"
            >
              <Globe className="w-3 h-3" />
              {lang.toUpperCase()}
            </button>
            {isOnline ? (
              <div className="gps-badge">
                <Wifi className="w-4 h-4" />
                Online
              </div>
            ) : (
              <div className="gps-badge !bg-yellow-500/20 !border-yellow-500/40 !text-yellow-500">
                <WifiOff className="w-4 h-4" />
                Offline
              </div>
            )}
          </div>
        </div>
      </header>

      {/* GPS Status */}
      {currentLocation && (
        <div className="px-4 py-2">
          <div className="gps-badge">
            <MapPin className="w-4 h-4" />
            GPS: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex items-center justify-between py-4">
          <h2 className="font-semibold text-gray-300">{t.projects.title}</h2>
          <button className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t.projects.newProject}
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              className="project-card w-full text-left"
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedProject(project);
                setActiveTab("capture");
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-400">{project.client}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {project.photoCount} {t.projects.photos}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.lastUpdated.toLocaleDateString(lang === 'es' ? "es-ES" : "en-US")}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recent Photos */}
        {photos.length > 0 && (
          <>
            <h2 className="font-semibold text-gray-300 mt-8 mb-4">Fotos Recientes</h2>
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(0, 6).map((photo) => (
                <div key={photo.id} className="photo-thumb">
                  <img src={photo.dataUrl} alt="Captura" />
                  <div className="watermark-overlay">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      GPS ✓
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Render Capture Tab
  const renderCaptureTab = () => (
    <div className="flex flex-col h-full">
      {!isCapturing ? (
        <>
          {/* Header */}
          <header className="safe-area-top px-4 pt-4 pb-2">
            <h1 className="text-2xl font-bold">{t.camera.title}</h1>
            {selectedProject ? (
              <p className="text-sm text-cyan-400">📁 {selectedProject.name}</p>
            ) : (
              <p className="text-sm text-yellow-400">⚠️ {t.camera.selectProject}</p>
            )}
          </header>

          {/* Select Project Prompt */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
            {selectedProject ? (
              <>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                  <Camera className="w-16 h-16 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center">{lang === 'es' ? 'Listo para capturar' : 'Ready to capture'}</h2>
                <p className="text-gray-400 text-center mb-8">
                  {lang === 'es'
                    ? <>Las fotos se guardarán en <strong>{selectedProject.name}</strong> con GPS y fecha automáticos.</>
                    : <>Photos will be saved to <strong>{selectedProject.name}</strong> with automatic GPS and date.</>}
                </p>
                <button
                  className="btn-primary text-lg flex items-center gap-3"
                  onClick={startCamera}
                >
                  <Camera className="w-6 h-6" />
                  {lang === 'es' ? 'Abrir Cámara' : 'Open Camera'}
                </button>
              </>
            ) : (
              <>
                <div className="w-32 h-32 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                  <FolderOpen className="w-16 h-16 text-yellow-400" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center">{t.camera.selectProject}</h2>
                <p className="text-gray-400 text-center mb-8">
                  {lang === 'es'
                    ? 'Elige un proyecto en la pestaña "Proyectos" para empezar a capturar fotos.'
                    : 'Choose a project in the "Projects" tab to start capturing photos.'}
                </p>
                <button
                  className="btn-secondary text-lg"
                  onClick={() => setActiveTab("projects")}
                >
                  {lang === 'es' ? 'Ver Proyectos' : 'View Projects'}
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        /* Camera Viewfinder */
        <div className="viewfinder">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Captured Image Preview */}
          <AnimatePresence>
            {capturedImage && (
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  src={capturedImage}
                  alt="Captura"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Camera UI Overlay */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {/* Top Bar */}
            <div className="safe-area-top p-4 flex items-center justify-between pointer-events-auto">
              <button
                className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
                onClick={stopCamera}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="gps-badge">
                <MapPin className="w-4 h-4" />
                GPS Activo
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-auto p-6 safe-area-bottom">
              {!capturedImage ? (
                <div className="flex items-center justify-center">
                  <button
                    className="btn-capture animate-pulse-ring pointer-events-auto"
                    onClick={capturePhoto}
                  >
                    <Camera className="w-10 h-10 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-8 pointer-events-auto">
                  <button
                    className="w-16 h-16 rounded-full bg-red-500/80 flex items-center justify-center"
                    onClick={() => setCapturedImage(null)}
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50"
                    onClick={savePhoto}
                  >
                    <Check className="w-10 h-10" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas for Watermarking */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );

  // Render Settings Tab
  const renderSettingsTab = () => (
    <div className="flex flex-col h-full">
      <header className="safe-area-top px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold">{t.settings.title}</h1>
        <p className="text-sm text-gray-400">{lang === 'es' ? 'Tu cuenta y preferencias' : 'Your account and preferences'}</p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Account Section */}
        <div className="py-4">
          <h2 className="font-semibold text-gray-300 mb-4">{t.settings.account}</h2>
          <div className="glass-card p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <User className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{lang === 'es' ? 'Usuario Demo' : 'Demo User'}</p>
                <p className="text-sm text-gray-400">demo@sitesnap.ai</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Language Setting */}
        <div className="py-4">
          <h2 className="font-semibold text-gray-300 mb-4">{t.settings.language}</h2>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>{lang === 'es' ? t.settings.spanish : t.settings.english}</span>
              </div>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors"
              >
                {lang === 'es' ? 'Change to English' : 'Cambiar a Español'}
              </button>
            </div>
          </div>
        </div>

        {/* Cloud Storage */}
        <div className="py-4">
          <h2 className="font-semibold text-gray-300 mb-4">{t.settings.storage}</h2>
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-blue-400" />
                <span>Google Drive</span>
              </div>
              <span className="text-green-400 text-sm">{t.settings.connected} ✓</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{lang === 'es' ? 'Carpeta raíz' : 'Root folder'}</span>
              <span>/SiteSnap/{lang === 'es' ? 'Obras' : 'Projects'}</span>
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div className="py-4">
          <h2 className="font-semibold text-gray-300 mb-4">{lang === 'es' ? 'Funciones IA' : 'AI Features'}</h2>
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Auto-naming</span>
              </div>
              <div className="w-12 h-7 rounded-full bg-cyan-500 relative">
                <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white" />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {lang === 'es'
                ? 'La IA analiza cada foto y sugiere un nombre descriptivo automáticamente.'
                : 'AI analyzes each photo and automatically suggests a descriptive name.'}
            </p>
          </div>
        </div>

        {/* Subscription Plans - For Testing */}
        <div className="py-4">
          <h2 className="font-semibold text-gray-300 mb-4">{t.plans.title}</h2>
          <div className="space-y-3">
            {/* Pro Plan */}
            <button
              className="glass-card p-4 w-full text-left hover:border-cyan-500/50 transition-colors"
              onClick={async () => {
                try {
                  const res = await fetch('/api/stripe/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || 'price_1SrP2qPOgpg5E6rHwKsz2Gs7',
                      userId: 'demo-user-123',
                      email: 'demo@sitesnap.ai',
                    }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert('Error: ' + JSON.stringify(data));
                  }
                } catch (err) {
                  alert(lang === 'es' ? 'Error conectando con Stripe' : 'Error connecting with Stripe');
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{t.plans.proPlan.name}</h3>
                  <p className="text-sm text-gray-400">{t.plans.proPlan.features[0]}, {lang === 'es' ? 'proyectos ilimitados' : 'unlimited projects'}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">{t.plans.proPlan.price}</p>
                  <p className="text-xs text-gray-500">{t.plans.proPlan.period}</p>
                </div>
              </div>
            </button>

            {/* Team Plan */}
            <button
              className="glass-card p-4 w-full text-left hover:border-purple-500/50 transition-colors"
              onClick={async () => {
                try {
                  const res = await fetch('/api/stripe/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM || 'price_1SrP5MPOgpg5E6rHgKovSXZZ',
                      userId: 'demo-user-123',
                      email: 'demo@sitesnap.ai',
                    }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert('Error: ' + JSON.stringify(data));
                  }
                } catch (err) {
                  alert(lang === 'es' ? 'Error conectando con Stripe' : 'Error connecting with Stripe');
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{t.plans.teamPlan.name}</h3>
                  <p className="text-sm text-gray-400">{t.plans.teamPlan.features[0]}, {t.plans.teamPlan.features[1]}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">{t.plans.teamPlan.price}</p>
                  <p className="text-xs text-gray-500">{t.plans.teamPlan.period}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="py-4">
          <div className="text-center text-gray-500 text-sm">
            <p>SiteSnap AI v1.0.0</p>
            <p className="mt-1">{lang === 'es' ? 'Hecho con 💙 en España' : 'Made with 💙 in Spain'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#030712]">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              className="h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {renderProjectsTab()}
            </motion.div>
          )}
          {activeTab === "capture" && (
            <motion.div
              key="capture"
              className="h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {renderCaptureTab()}
            </motion.div>
          )}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              className="h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderSettingsTab()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {!isCapturing && (
        <nav className="bottom-nav">
          <div className="flex items-center justify-around">
            <button
              className={`nav-item ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <FolderOpen className="w-6 h-6" />
              <span>{t.tabs.projects}</span>
            </button>
            <button
              className={`nav-item ${activeTab === "capture" ? "active" : ""}`}
              onClick={() => setActiveTab("capture")}
            >
              <Camera className="w-6 h-6" />
              <span>{t.tabs.camera}</span>
            </button>
            <button
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-6 h-6" />
              <span>{t.tabs.settings}</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
