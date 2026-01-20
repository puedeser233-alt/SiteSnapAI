"use client";

import { useState, useEffect } from "react";
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
  CreditCard,
  Globe,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";
import { translations, Language } from "@/lib/translations";

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

// Contact email (hidden by default)
const CONTACT_EMAIL = "sergioesquesi@gmail.com";

// App base URL
// App base URL - Use production URL in production, localhost in development
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sitesnap-app.vercel.app";

export default function Home() {
  // Default to English - this is the primary language
  const [lang, setLang] = useState<Language>('en');
  const [showEmail, setShowEmail] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Read language from URL on mount - only change if explicitly set to 'es'
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    // Only switch to Spanish if explicitly requested, otherwise stay in English
    if (urlLang === 'es') {
      setLang('es');
    }
    // Mark as hydrated so we know the client-side code has run
    setIsHydrated(true);
  }, []);

  const t = translations[lang];

  // Generate app URL with language parameter - always use current lang state
  const getAppUrl = (path: string = '/login') => `${APP_URL}${path}?lang=${lang}`;

  // Toggle language
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', url.toString());
  };

  // Pain point icons
  const painIcons = [Smartphone, CreditCard, Shield];
  const painColors = [
    { color: "text-red-400", bg: "bg-red-500/10" },
    { color: "text-orange-400", bg: "bg-orange-500/10" },
    { color: "text-yellow-400", bg: "bg-yellow-500/10" }
  ];

  // Step icons
  const stepIcons = [Camera, Sparkles, Cloud];
  const stepColors = ["from-blue-500 to-blue-600", "from-cyan-500 to-cyan-600", "from-green-500 to-green-600"];

  // Feature icons
  const featureIcons = [MapPin, FolderOpen, Cloud, Sparkles, WifiOff, Users];

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
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-white transition-colors">{t.nav.faq}</a>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
              title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{lang.toUpperCase()}</span>
            </button>

            <a href={getAppUrl('/login')} className="hidden sm:block text-sm text-gray-300 hover:text-white transition-colors">
              {t.nav.signIn}
            </a>
            <a href={getAppUrl('/login')} className="btn-gradient text-sm !py-3 !px-6">
              {t.nav.tryFree}
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
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-space)] leading-tight mb-6"
            >
              {t.hero.title}{" "}
              <span className="gradient-text">{t.hero.titleHighlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <a
                href={getAppUrl('/login')}
                className="btn-gradient text-lg flex items-center gap-2"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-it-works"
                className="btn-outline text-lg"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-6"
            >
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-[#030712] flex items-center justify-center text-xs font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-400">{t.hero.trusted}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a href="#pain-points" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
              <span className="text-sm mb-2">{t.hero.scrollHint}</span>
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
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">{t.painPoints.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.painPoints.title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t.painPoints.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.painPoints.items.map((pain, i) => {
              const Icon = painIcons[i];
              return (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="glass-card p-8 text-center"
                >
                  <div className={`w-16 h-16 ${painColors[i].bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-8 h-8 ${painColors[i].color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{pain.title}</h3>
                  <p className="text-gray-400">{pain.description}</p>
                </motion.div>
              );
            })}
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
            <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4">{t.howItWorks.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.howItWorks.title}
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

            {t.howItWorks.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative z-10 text-center"
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stepColors[i]} flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              );
            })}
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
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">{t.features.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.features.title}
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.features.items.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="feature-card glass-card p-8 hover:border-blue-500/50 transition-colors cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
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
            <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4">{t.comparison.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.comparison.title}
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
                  <th className="p-6 text-gray-400 font-medium">{t.comparison.headers.feature}</th>
                  <th className="p-6 text-gray-400 font-medium text-center">CompanyCam</th>
                  <th className="p-6 text-gray-400 font-medium text-center">{t.comparison.headers.phoneGallery}</th>
                  <th className="p-6 font-bold text-center">
                    <span className="gradient-text">SiteSnap AI</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.rows.map((row, i) => (
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
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">{t.pricing.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.pricing.title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
              {t.pricing.subtitle}
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
              <h3 className="text-xl font-bold mb-2">{t.pricing.plans.free.name}</h3>
              <p className="text-gray-400 mb-6">{t.pricing.plans.free.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{t.pricing.plans.free.price}</span>
                <span className="text-gray-500">{t.pricing.plans.free.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.plans.free.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={getAppUrl('/login')} className="btn-outline w-full block text-center">{t.pricing.plans.free.cta}</a>
            </motion.div>

            {/* Pro Plan - POPULAR */}
            <motion.div variants={scaleIn} className="glass-card p-8 pricing-popular">
              <h3 className="text-xl font-bold mb-2">{t.pricing.plans.pro.name}</h3>
              <p className="text-gray-400 mb-6">{t.pricing.plans.pro.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">{t.pricing.plans.pro.price}</span>
                <span className="text-gray-500">{t.pricing.plans.pro.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.plans.pro.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={getAppUrl('/login')} className="btn-gradient w-full block text-center">{t.pricing.plans.pro.cta}</a>
            </motion.div>

            {/* Team Plan */}
            <motion.div variants={scaleIn} className="glass-card p-8">
              <h3 className="text-xl font-bold mb-2">{t.pricing.plans.team.name}</h3>
              <p className="text-gray-400 mb-6">{t.pricing.plans.team.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{t.pricing.plans.team.price}</span>
                <span className="text-gray-500">{t.pricing.plans.team.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.plans.team.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={getAppUrl('/login')} className="btn-outline w-full block text-center">{t.pricing.plans.team.cta}</a>
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
            <motion.p variants={fadeInUp} className="text-cyan-400 font-medium mb-4">{t.testimonials.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.testimonials.title}
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.testimonials.items.map((testimonial, i) => (
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
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
            <motion.p variants={fadeInUp} className="text-blue-400 font-medium mb-4">{t.faq.label}</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space)] mb-6">
              {t.faq.title}
            </motion.h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {t.faq.items.map((faq, i) => (
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
                {t.finalCta.title} <span className="gradient-text">{t.finalCta.titleHighlight}</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                {t.finalCta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={getAppUrl('/login')} className="btn-gradient text-lg flex items-center gap-2">
                  {t.finalCta.cta}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#pricing" className="btn-outline text-lg">
                  {t.finalCta.ctaSecondary}
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
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t.footer.product}</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">{t.nav.faq}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">{t.footer.cookies}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t.footer.contact}</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <button
                    onClick={() => setShowEmail(!showEmail)}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {showEmail ? CONTACT_EMAIL : t.footer.clickToReveal}
                    {showEmail ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </li>
                <li>{t.footer.location}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SiteSnap AI. {t.footer.copyright}
            </p>
            <p className="text-sm text-gray-500">
              {t.footer.madeWith}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
