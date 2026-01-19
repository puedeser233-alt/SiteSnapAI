"use client";

import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Cloud,
  Sparkles,
  Shield,
  Zap,
  Check,
  Star,
  ArrowRight,
  ChevronDown,
  Smartphone,
  FolderOpen,
  Clock,
  WifiOff,
  Users,
  CreditCard
} from "lucide-react";
import Image from "next/image";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Home() {
  return (
    <main className="aurora-bg min-h-screen relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="grid-pattern fixed inset-0 pointer-events-none" />

      {/* ========== NAVIGATION ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#030712]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-space)]">SiteSnap AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Funciones</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Cómo Funciona</a>
            <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="http://localhost:3001/login" className="hidden sm:block text-sm text-gray-300 hover:text-white transition-colors">
              Iniciar Sesión
            </a>
            <a href="http://localhost:3001/login" className="btn-gradient text-sm !py-3 !px-6">
              Prueba Gratis
            </a>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Impulsado por Inteligencia Artificial</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-space)] leading-tight mb-6"
            >
              Organiza tus fotos de obra.{" "}
              <span className="gradient-text">Automáticamente.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              Captura fotos con <strong className="text-white">GPS y fecha irrefutable</strong>.
              Se organizan solas en <strong className="text-cyan-400">TU Google Drive</strong>.
              Evidencia legal instantánea para técnicos, instaladores y contratistas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <a href="http://localhost:3001/login" className="btn-gradient text-lg flex items-center gap-2 animate-pulse-glow">
                10 Pruebas Gratis
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-it-works" className="btn-outline text-lg">
                Ver Demo
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Sin tarjeta requerida</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                <span>Tus datos en TU nube</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Activo en 2 minutos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Mockup */}
          <motion.div
            className="mt-16 relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card p-4 md:p-8">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-10 relative overflow-hidden">
                {/* Mock App UI */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-500 text-sm ml-4">SiteSnap AI — Dashboard</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Photo Cards */}
                  {[
                    { name: "Instalación_Cuadro_Eléctrico.jpg", time: "Hace 5 min", location: "Calle Mayor 24, Madrid" },
                    { name: "Cableado_Terminado_OK.jpg", time: "Hace 12 min", location: "Calle Mayor 24, Madrid" },
                    { name: "Firma_Cliente_Conforme.jpg", time: "Hace 15 min", location: "Calle Mayor 24, Madrid" },
                  ].map((photo, i) => (
                    <motion.div
                      key={i}
                      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-900/50 to-cyan-900/30 rounded-lg mb-3 flex items-center justify-center">
                        <Camera className="w-10 h-10 text-blue-400/50" />
                      </div>
                      <p className="text-sm font-medium text-white truncate">{photo.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{photo.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-cyan-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{photo.location}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -right-4 top-1/4 glass-card px-4 py-3 flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Foto subida</p>
                <p className="text-xs text-gray-500">a Google Drive</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div
              className="absolute -left-4 bottom-1/4 glass-card px-4 py-3 flex items-center gap-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">GPS Verificado</p>
                <p className="text-xs text-gray-500">40.4168° N, 3.7038° W</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a href="#pain-points" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <span className="text-sm mb-2">Descubre más</span>
              <ChevronDown className="w-6 h-6 animate-scroll" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== PAIN POINTS SECTION ========== */}
      <section id="pain-points" className="section px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">EL PROBLEMA</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              ¿Te suena familiar?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              El 67% de los técnicos de campo pierden más de 2 horas semanales organizando fotos de trabajo.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Smartphone,
                title: "El Caos del Carrete",
                description: "Fotos de instalaciones mezcladas con selfies y memes. Encontrar una imagen específica es buscar una aguja en un pajar.",
                color: "text-red-400",
                bg: "bg-red-500/10"
              },
              {
                icon: CreditCard,
                title: "Suscripciones Abusivas",
                description: "CompanyCam cobra $30/usuario/mes Y almacena TUS fotos en SU nube. Si cancelas, adiós a tu historial.",
                color: "text-orange-400",
                bg: "bg-orange-500/10"
              },
              {
                icon: Shield,
                title: "Disputas Sin Pruebas",
                description: "'El técnico nunca vino' — sin GPS ni timestamp verificable, pierdes facturas y reputación.",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10"
              }
            ].map((pain, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="glass-card p-8 text-center"
              >
                <div className={`w-16 h-16 ${pain.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <pain.icon className={`w-8 h-8 ${pain.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{pain.title}</h3>
                <p className="text-gray-400">{pain.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section id="how-it-works" className="section px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4">LA SOLUCIÓN</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              Tan simple como 1, 2, 3
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 -translate-y-1/2 z-0" />

            {[
              {
                step: "1",
                icon: Camera,
                title: "Captura",
                description: "Toma la foto con la app. GPS, fecha y hora se añaden automáticamente.",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2",
                icon: Sparkles,
                title: "IA Organiza",
                description: "La IA nombra el archivo y lo clasifica en la carpeta correcta del proyecto.",
                color: "from-cyan-500 to-cyan-600"
              },
              {
                step: "3",
                icon: Cloud,
                title: "Sube a TU Drive",
                description: "Se sincroniza instantáneamente con tu Google Drive o Dropbox. Tuyo para siempre.",
                color: "from-green-500 to-green-600"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative z-10 text-center"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="section px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">CARACTERÍSTICAS</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              Todo lo que necesitas. Nada más.
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: MapPin,
                title: "Watermark GPS Automático",
                description: "Coordenadas, dirección, fecha y hora grabados permanentemente en cada foto. Prueba irrefutable."
              },
              {
                icon: FolderOpen,
                title: "Organización Inteligente",
                description: "Selecciona el proyecto antes de fotografiar. Todo se ordena solo: /Cliente/Proyecto/Fase/"
              },
              {
                icon: Cloud,
                title: "BYOS: TU Almacenamiento",
                description: "Tus fotos van directas a TU Google Drive o Dropbox. Sin intermediarios. Sin secuestro de datos."
              },
              {
                icon: Sparkles,
                title: "IA que Nombra Archivos",
                description: "'Cuadro_Electrico_Instalado.jpg' en vez de 'IMG_4892.jpg'. La IA entiende qué fotografías."
              },
              {
                icon: WifiOff,
                title: "Funciona Sin Conexión",
                description: "Toma fotos en sótanos sin cobertura. Se sincronizan cuando recuperas señal."
              },
              {
                icon: Users,
                title: "Equipos Sincronizados",
                description: "Varios técnicos pueden documentar el mismo proyecto. Todo centralizado, sin duplicados."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="feature-card glass-card p-8 hover:border-blue-500/50 transition-colors cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== COMPARISON SECTION ========== */}
      <section className="section px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4">COMPARATIVA</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              ¿Por qué SiteSnap AI?
            </motion.h2>
          </motion.div>

          <motion.div
            className="glass-card overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 text-gray-400 font-medium">Característica</th>
                  <th className="p-6 text-gray-400 font-medium text-center">CompanyCam</th>
                  <th className="p-6 text-gray-400 font-medium text-center">Galería móvil</th>
                  <th className="p-6 font-bold text-center">
                    <span className="gradient-text">SiteSnap AI</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Precio", competitor1: "$30/mes/usuario", competitor2: "Gratis", us: "Desde 29€/mes" },
                  { feature: "Almacenamiento", competitor1: "Propietario (silo)", competitor2: "Tu dispositivo", us: "TU Google Drive" },
                  { feature: "Organización", competitor1: "Automática", competitor2: "Manual ❌", us: "Automática + IA" },
                  { feature: "GPS / Timestamp", competitor1: "✅", competitor2: "Editable ⚠️", us: "✅ Irrefutable" },
                  { feature: "Soberanía de datos", competitor1: "❌ Pierdes al cancelar", competitor2: "✅", us: "✅ Siempre tuyos" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium">{row.feature}</td>
                    <td className="p-6 text-center text-gray-400">{row.competitor1}</td>
                    <td className="p-6 text-center text-gray-400">{row.competitor2}</td>
                    <td className="p-6 text-center text-cyan-400 font-medium">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ========== PRICING SECTION ========== */}
      <section id="pricing" className="section px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">PRECIOS</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              Simple y transparente
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
              Sin costes ocultos de almacenamiento. Sin sorpresas.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Free Plan */}
            <motion.div variants={scaleIn} className="glass-card p-8">
              <h3 className="text-xl font-bold mb-2">Gratis</h3>
              <p className="text-gray-400 mb-6">Para probar la app</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">0€</span>
                <span className="text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["10 usos IA/mes", "3 proyectos", "Watermark GPS", "Google Drive"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="http://localhost:3001/login" className="btn-outline w-full block text-center">Empezar Gratis</a>
            </motion.div>

            {/* Pro Plan - POPULAR */}
            <motion.div variants={scaleIn} className="glass-card p-8 pricing-popular">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">Para profesionales</p>
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">29€</span>
                <span className="text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "50 usos IA/mes",
                  "Proyectos ilimitados",
                  "IA naming automático",
                  "Modo offline",
                  "Exportar a PDF"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="http://localhost:3001/login" className="btn-gradient w-full block text-center">Suscribirse</a>
            </motion.div>

            {/* Team Plan */}
            <motion.div variants={scaleIn} className="glass-card p-8">
              <h3 className="text-xl font-bold mb-2">Equipo</h3>
              <p className="text-gray-400 mb-6">Hasta 5 usuarios</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">79€</span>
                <span className="text-gray-500">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "100 usos IA/mes",
                  "5 usuarios incluidos",
                  "Dashboard de admin",
                  "Reportes PDF",
                  "Onboarding dedicado"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="http://localhost:3001/login" className="btn-outline w-full block text-center">Suscribirse</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="section px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4">TESTIMONIOS</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              Lo que dicen nuestros usuarios
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Carlos Martínez",
                role: "Electricista autónomo",
                quote: "Antes perdía 3 horas cada viernes organizando fotos. Ahora las tomo y me olvido. Están todas ordenadas en mi Drive.",
                avatar: "CM"
              },
              {
                name: "Laura Sánchez",
                role: "Jefa de equipo instalaciones",
                quote: "Un cliente nos acusó de no haber ido a su casa. Le envié la foto con GPS y hora. Factura cobrada. SiteSnap se pagó solo.",
                avatar: "LS"
              },
              {
                name: "Miguel Ángel Ruiz",
                role: "Técnico climatización",
                quote: "Probé CompanyCam pero era carísimo. Aquí pago 9€ y encima las fotos son mías para siempre. Sin comparación.",
                avatar: "MR"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="testimonial-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="faq" className="section px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">FAQ</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              Preguntas frecuentes
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                q: "¿Dónde se guardan mis fotos?",
                a: "Tus fotos se guardan directamente en TU Google Drive o Dropbox. SiteSnap AI nunca almacena tus imágenes en nuestros servidores. Tú mantienes el control total de tus datos."
              },
              {
                q: "¿Puedo usar SiteSnap AI sin conexión?",
                a: "Sí. Puedes tomar fotos sin conexión y se subirán automáticamente cuando recuperes la cobertura. Perfecto para sótanos, naves industriales o zonas rurales."
              },
              {
                q: "¿Qué pasa si cancelo mi suscripción?",
                a: "Tus fotos permanecen en tu Google Drive para siempre. A diferencia de otras apps, no pierdes acceso a tu trabajo. Es TU almacenamiento, no el nuestro."
              },
              {
                q: "¿El watermark GPS es realmente irrefutable?",
                a: "Sí. Las coordenadas, fecha y hora se graban permanentemente en la imagen en el momento de la captura. Esto es admitido como evidencia en disputas comerciales y legales."
              },
              {
                q: "¿Funciona en iPhone y Android?",
                a: "Sí. SiteSnap AI es una Progressive Web App (PWA) que funciona en cualquier smartphone moderno, sin necesidad de descargar nada de la App Store o Play Store."
              }
            ].map((faq, i) => (
              <motion.details
                key={i}
                variants={fadeInUp}
                className="glass-card group"
              >
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-medium text-lg hover:text-cyan-400 transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-400">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="section px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/30 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
                Empieza a organizar tus fotos <span className="gradient-text">hoy mismo</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                10 pruebas gratis. Sin tarjeta. Cancela cuando quieras. Tus fotos siempre tuyas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="http://localhost:3001/login" className="btn-gradient text-lg flex items-center gap-2">
                  Crear cuenta gratis
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#pricing" className="btn-outline text-lg">
                  Ver precios
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold font-[family-name:var(--font-space)]">SiteSnap AI</span>
              </div>
              <p className="text-gray-500 text-sm">
                Organiza tus fotos de obra automáticamente. Evidencia GPS irrefutable.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>hola@sitesnap.ai</li>
                <li>Madrid, España</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SiteSnap AI. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-500">
              Hecho con 💙 en España
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
