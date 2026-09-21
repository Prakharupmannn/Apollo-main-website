"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  BookOpen,
  Calculator,
  Activity,
  Award,
  Clock,
  UserCheck,
  Bookmark,
  ChevronRight,
  Droplets,
  HeartPulse,
  Sparkles,
  Calendar,
  CheckCircle2,
  FileText,
  Filter,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  X,
  Share2,
  Check,
  Newspaper,
  Radio,
  Siren,
  TrendingUp,
  Stethoscope,
  Zap,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";
import healthData from "./healthLibraryData.json";

/* ───────────── Static helpers (outside component) ───────────── */

const goldStyle = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

const A_Z_CONDITIONS = [
  { name: "Dry Eye Syndrome (MGD)", dept: "Ophthalmology", desc: "Schirmer tear test analysis and tear film hydration therapy." },
  { name: "Endobronchial Ultrasound (EBUS)", dept: "Pulmonology", desc: "Minimally invasive diagnostic technology for lung biopsy and TB/cancer staging." },
  { name: "Giant Bullae & Bullectomy", dept: "Thoracic Surgery", desc: "Surgical removal of dilated air sacs to restore vital breathing capacity." },
  { name: "Pediatric Urinary Tract Infection (UTI)", dept: "Pediatric Nephrology", desc: "Specialist evaluation and DMSA scan testing for child kidney protection." },
  { name: "Winter Hypertension & Cardiac Care", dept: "Cardiology", desc: "24/7 STEMI Cath Lab standby and arterial blood pressure management." },
  { name: "Winter Joint & Knee Osteoarthritis", dept: "Ortho & Joint", desc: "Robotic joint replacement and hyaluronic intra-articular therapy." },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Turns **bold** markers inside article text into real bold text
const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-bold text-[#0B3446]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );

export default function HealthLibraryPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [contentType, setContentType] = useState("all"); // 'all' | 'blog' | 'news'
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [activeTab, setActiveTab] = useState("articles"); // 'articles' | 'news' | 'calculators' | 'az-directory'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);

  // BMI Calculator state
  const [bmiData, setBmiData] = useState({ weight: 70, height: 170 });
  const [bmiResult, setBmiResult] = useState(null);

  // Water Hydration state
  const [waterData, setWaterData] = useState({ weight: 65, activity: "moderate" });
  const [waterResult, setWaterResult] = useState(null);

  // Heart Screener State
  const [heartCheck, setHeartCheck] = useState({ age: "30-45", smoking: "no", exercise: "regular", bp: "normal" });
  const [heartRisk, setHeartRisk] = useState(null);

  const categories = healthData.categories;
  const articles = healthData.articles;

  // "Apollo News & Events" tab always shows news only
  const effectiveType = activeTab === "news" ? "news" : contentType;

  // Filtered articles list based on search, category & content type
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
      const matchesType = effectiveType === "all" || art.type === effectiveType;
      const queryLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        art.title.toLowerCase().includes(queryLower) ||
        art.excerpt.toLowerCase().includes(queryLower) ||
        art.category.toLowerCase().includes(queryLower) ||
        art.author.toLowerCase().includes(queryLower) ||
        art.tags.some((t) => t.toLowerCase().includes(queryLower));

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [articles, selectedCategory, effectiveType, searchQuery]);

  // Separate news items
  const newsItems = useMemo(() => {
    return articles.filter((a) => a.type === "news");
  }, [articles]);

  const savedArticles = useMemo(
    () => articles.filter((a) => bookmarkedIds.includes(a.id)),
    [articles, bookmarkedIds]
  );

  const featuredArticle = filteredArticles[0];
  const restArticles = filteredArticles.slice(1);

  const availableLetters = useMemo(
    () => new Set(A_Z_CONDITIONS.map((c) => c.name[0].toUpperCase())),
    []
  );

  const visibleConditions = useMemo(
    () =>
      activeLetter
        ? A_Z_CONDITIONS.filter((c) => c.name[0].toUpperCase() === activeLetter)
        : A_Z_CONDITIONS,
    [activeLetter]
  );

  const hasActiveFilters =
    !!searchQuery || selectedCategory !== "All" || (activeTab === "articles" && contentType !== "all");

  // Close article modal on ESC + lock background scroll while open
  useEffect(() => {
    if (!selectedArticle) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedArticle(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedArticle]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setContentType("all");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab !== "articles" && activeTab !== "news") setActiveTab("articles");
    const el = document.getElementById("hl-results");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Calculate BMI
  const calculateBmi = (e) => {
    e.preventDefault();
    const hInMeters = bmiData.height / 100;
    const score = Number((bmiData.weight / (hInMeters * hInMeters)).toFixed(1));
    let category = "";
    let color = "";
    let tip = "";

    // (fixed: previous range left a gap between 24.9 and 25)
    if (score < 18.5) {
      category = "Underweight";
      color = "text-amber-600 bg-amber-50 border-amber-200";
      tip = "Consider consulting our clinical nutritionist to build a healthy calorie-dense meal plan.";
    } else if (score < 25) {
      category = "Optimal / Healthy Weight";
      color = "text-emerald-700 bg-emerald-50 border-emerald-200";
      tip = "Excellent! Maintain your balanced diet and aim for 150 minutes of weekly moderate exercise.";
    } else if (score < 30) {
      category = "Overweight";
      color = "text-amber-700 bg-amber-50 border-amber-200";
      tip = "Incorporating daily 30-min aerobic activity & reducing processed carbs can help reach optimal weight.";
    } else {
      category = "Obese";
      color = "text-rose-700 bg-rose-50 border-rose-200";
      tip = "Schedule a comprehensive metabolic assessment with Apollo Preventive Health department.";
    }

    setBmiResult({ score, category, color, tip });
  };

  // Calculate Water intake
  const calculateWater = (e) => {
    e.preventDefault();
    let baseLiters = Number((waterData.weight * 0.033).toFixed(1));
    if (waterData.activity === "high") baseLiters = Number((baseLiters + 0.7).toFixed(1));
    const glasses = Math.round(baseLiters * 4);
    setWaterResult({ liters: baseLiters.toFixed(1), glasses });
  };

  // Calculate Heart Risk
  const evaluateHeartRisk = (e) => {
    e.preventDefault();
    let points = 0;
    if (heartCheck.age === "45-60") points += 1;
    if (heartCheck.age === "60+") points += 2;
    if (heartCheck.smoking === "yes") points += 2;
    if (heartCheck.exercise === "sedentary") points += 2;
    if (heartCheck.bp === "high") points += 2;

    if (points <= 1) {
      setHeartRisk({
        level: "Low Risk",
        meter: 1,
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-300",
        desc: "Your cardiovascular risk profile appears low based on selected parameters. Maintain active lifestyle and routine annual checkups.",
      });
    } else if (points <= 3) {
      setHeartRisk({
        level: "Moderate Risk",
        meter: 2,
        badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
        desc: "You have mild elevation in risk factors. We recommend a lipid profile test and blood pressure monitoring.",
      });
    } else {
      setHeartRisk({
        level: "Elevated Risk",
        meter: 3,
        badgeColor: "bg-rose-50 text-rose-800 border-rose-300",
        desc: "Multiple risk markers detected. We strongly suggest booking a Comprehensive Apollo Cardiac Health Checkup.",
      });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribedSuccess(true);
    }
  };

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      // clipboard may be blocked; still show feedback
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  /* ───────────── Card renderers ───────────── */

  const renderCard = (art, i) => {
    const isBookmarked = bookmarkedIds.includes(art.id);
    const isNews = art.type === "news";

    return (
      <article
        key={art.id}
        onClick={() => setSelectedArticle(art)}
        style={{ animationDelay: `${i * 70}ms` }}
        className="hl-rise group relative p-[1.5px] rounded-[1.75rem] cursor-pointer bg-gradient-to-br from-[#1D82A6]/50 via-white to-[#C8952E]/60 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-[0_25px_55px_rgba(10,95,122,0.3)] hover:-translate-y-2 transition-all duration-300"
      >
        <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white overflow-hidden flex flex-col justify-between">
          <div>
            {/* Image Header */}
            <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]">
              <img
                src={art.image}
                alt={art.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/80 via-[#0B3446]/10 to-transparent" />

              <span
                className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${
                  isNews
                    ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white"
                    : "bg-gradient-to-l from-[#C8952E] to-[#F6D98A] text-[#0B3446]"
                }`}
              >
                {isNews ? <Radio className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                {isNews ? "Apollo News" : art.category}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(art.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/85 backdrop-blur-md text-slate-700 hover:text-[#C8952E] hover:bg-white hover:scale-110 transition-all shadow-md cursor-pointer"
                aria-label="Bookmark article"
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-[#C8952E] text-[#C8952E]" : ""}`}
                />
              </button>

              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-[10px] font-bold text-white">
                <Clock className="w-3 h-3 text-[#F6D98A]" />
                {art.readTime}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#1D82A6]" />
                <span>{art.date}</span>
              </div>

              <h3 className="font-serif-apollo text-lg font-extrabold text-[#0B3446] group-hover:text-[#1D82A6] transition-colors line-clamp-2 mb-3 leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {art.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {art.tags.slice(0, 2).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Author Tag */}
          <div className="px-6 pb-5 pt-4 mx-0 border-t border-slate-100 bg-gradient-to-r from-[#EDF6FB]/70 to-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center shadow-md shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold text-[#0B3446] truncate">{art.author}</div>
                <div className="text-[10px] text-slate-500 truncate">{art.authorRole}</div>
              </div>
            </div>

            <span
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-[11px] font-extrabold text-[#3A2B0A] shadow-md group-hover:shadow-lg transition-all shrink-0"
              style={goldStyle}
            >
              Read
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    );
  };

  const renderFeatured = (art) => {
    const isNews = art.type === "news";
    const isBookmarked = bookmarkedIds.includes(art.id);

    return (
      <article
        key={art.id}
        onClick={() => setSelectedArticle(art)}
        className="hl-rise hl-shimmer group relative p-[1.5px] rounded-[2rem] cursor-pointer bg-gradient-to-r from-[#1D82A6] via-[#F6D98A] to-[#C8952E] shadow-[0_25px_60px_rgba(10,95,122,0.28)] hover:shadow-[0_35px_75px_rgba(10,95,122,0.38)] transition-shadow duration-300"
      >
        <div className="rounded-[calc(2rem-1.5px)] bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[260px] md:min-h-[380px] bg-gradient-to-br from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] overflow-hidden">
            <img
              src={art.image}
              alt={art.title}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/75 via-[#0B3446]/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0B3446]/25" />

            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-gradient-to-l from-[#C8952E] to-[#F6D98A] text-[#0B3446] text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg">
              <TrendingUp className="w-3.5 h-3.5" />
              Featured Story
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(art.id);
              }}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/85 backdrop-blur-md text-slate-700 hover:text-[#C8952E] hover:bg-white hover:scale-110 transition-all shadow-md cursor-pointer"
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-[#C8952E] text-[#C8952E]" : ""}`} />
            </button>
          </div>

          {/* Content */}
          <div className="relative p-7 sm:p-10 flex flex-col justify-center overflow-hidden">
            <HeartPulse className="absolute -right-8 -bottom-8 w-64 h-64 opacity-[0.05] text-[#0E526B] pointer-events-none -rotate-12" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    isNews
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/25"
                  }`}
                >
                  {isNews ? "Apollo News" : art.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-[#1D82A6]" />
                  {art.readTime}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-semibold text-slate-500">{art.date}</span>
              </div>

              <h3 className="font-serif-apollo text-2xl sm:text-3xl font-extrabold text-[#0B3446] leading-tight group-hover:text-[#1D82A6] transition-colors mb-4">
                {art.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 mb-5">{art.excerpt}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {art.tags.slice(0, 3).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center shadow-md">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#0B3446]">{art.author}</div>
                    <div className="text-[11px] text-slate-500">{art.authorRole}</div>
                  </div>
                </div>

                <span
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md group-hover:shadow-xl group-hover:-translate-y-0.5 transition-all duration-300"
                  style={goldStyle}
                >
                  Read Full Story
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white">
      {/* ───── Scoped animations ───── */}
      <style jsx>{`
        @keyframes hlMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hl-marquee {
          display: flex;
          width: max-content;
          animation: hlMarquee 50s linear infinite;
        }
        .hl-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes hlRise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hl-rise {
          animation: hlRise 0.55s ease-out backwards;
        }
        @keyframes hlFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hl-fade {
          animation: hlFade 0.3s ease-out;
        }
        @keyframes hlPop {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .hl-pop {
          animation: hlPop 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes hlShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hl-shimmer {
          background-size: 200% 200%;
          animation: hlShimmer 6s ease infinite, hlRise 0.55s ease-out backwards;
        }
        .hl-orb {
          position: absolute;
          border-radius: 9999px;
        }
        .hl-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -120px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: hlFloat1 16s ease-in-out infinite;
        }
        .hl-orb-2 {
          width: 340px;
          height: 340px;
          top: 35%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.5;
          animation: hlFloat2 20s ease-in-out infinite;
        }
        .hl-orb-3 {
          width: 300px;
          height: 300px;
          bottom: 5%;
          left: 20%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.45;
          animation: hlFloat1 18s ease-in-out infinite;
        }
        @keyframes hlFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes hlFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        .hl-noscroll {
          scrollbar-width: none;
        }
        .hl-noscroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* ───── Ambient page background ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hl-orb hl-orb-1" />
        <div className="hl-orb hl-orb-2" />
        <div className="hl-orb hl-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 80% 55% at 50% 30%, black 15%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 30%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ───── Top Live Ticker Banner ───── */}
        <div className="bg-gradient-to-r from-[#0B3446] via-[#0E526B] to-[#0B3446] text-white py-2.5 px-4 overflow-hidden border-b border-[#C8952E]/50 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-[10px] tracking-wider uppercase shrink-0 shadow-[0_0_18px_rgba(244,63,94,0.55)]">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>APOLLO LIVE NEWS</span>
            </div>
            <div className="overflow-hidden w-full text-xs text-slate-100 font-medium [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
              <div className="hl-marquee">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center shrink-0 whitespace-nowrap">
                    {healthData.newsTicker.map((item, idx) => (
                      <span key={`${copy}-${idx}`} className="flex items-center">
                        <span>{item}</span>
                        <span className="mx-6 text-[#F6D98A]">◆</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ───── Hero Header Section ───── */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8 mb-10">
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/80 via-[#1D82A6]/40 to-[#C8952E]/80 shadow-[0_30px_70px_rgba(10,95,122,0.35)]">
            <div className="relative rounded-[calc(2rem-1.5px)] overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-8 sm:p-12 lg:p-14 text-white">
              {/* decor */}
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F6D98A]/25 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-28 -left-24 w-96 h-96 rounded-full bg-[#0B3446]/40 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
              <HeartPulse className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.07] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                    <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                    <span>Official Apollo Hospitals Jabalpur Health Portal</span>
                  </div>

                  <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                    Health Information, Medical Blogs &{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                      }}
                    >
                      Apollo News
                    </span>
                  </h1>

                  <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                    Access real-time medical updates, technology launches like EBUS Pulmonary Diagnostics, insurance TPA guides, and doctor-reviewed health articles curated directly from Apollo Hospitals Jabalpur.
                  </p>

                  {/* Global Search Bar */}
                  <form
                    onSubmit={handleSearchSubmit}
                    className="relative max-w-2xl rounded-2xl bg-white/95 backdrop-blur-xl p-2 flex items-center border-2 border-white/40 focus-within:border-[#F6D98A] focus-within:ring-4 focus-within:ring-[#F6D98A]/25 shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all"
                  >
                    <Search className="w-5 h-5 text-[#0E526B] ml-3 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (activeTab !== "articles" && activeTab !== "news") setActiveTab("articles");
                      }}
                      placeholder="Search blogs, EBUS tech, TPA cashless insurance, joint pain, flu..."
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 mr-1 cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-[#3A2B0A] font-extrabold text-xs hover:shadow-lg hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer"
                      style={goldStyle}
                    >
                      Search
                    </button>
                  </form>

                  {/* Popular searches */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-[#FEF3C7]/90 font-bold">Popular:</span>
                    {["EBUS", "Insurance", "Joint Pain", "Heart", "Flu"].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => {
                          setSearchQuery(chip);
                          if (activeTab !== "articles" && activeTab !== "news") setActiveTab("articles");
                        }}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#F6D98A] hover:text-[#0B3446] border border-white/25 hover:border-[#F6D98A] backdrop-blur-sm font-semibold transition-all cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Quick Metrics Bar */}
                  <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-100">
                    {[
                      { icon: ShieldCheck, text: "100% Doctor Reviewed", color: "text-emerald-300" },
                      { icon: Newspaper, text: "Official Apollo News", color: "text-[#F6D98A]" },
                      { icon: Calculator, text: "Health Calculators", color: "text-cyan-200" },
                      { icon: UserCheck, text: "Specialist Consultation", color: "text-rose-200" },
                    ].map((m, i) => {
                      const MIcon = m.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-all"
                        >
                          <MIcon className={`w-4 h-4 shrink-0 ${m.color}`} />
                          <span className="font-semibold">{m.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right floating stat cards */}
                <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
                  {[
                    { icon: BookOpen, value: articles.length, label: "Health Articles" },
                    { icon: Newspaper, value: newsItems.length, label: "Apollo News & Events" },
                    { icon: Award, value: categories.length - 1, label: "Medical Categories" },
                  ].map((s, i) => {
                    const SIcon = s.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 hover:-translate-x-1 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F6D98A] to-[#C8952E] text-[#0B3446] flex items-center justify-center shadow-md shrink-0">
                          <SIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <div
                            className="text-3xl font-black bg-clip-text text-transparent leading-none"
                            style={{ backgroundImage: "linear-gradient(90deg, #F6D98A, #FFFFFF)" }}
                          >
                            {s.value}
                          </div>
                          <div className="text-xs font-semibold text-slate-100/90 mt-1">{s.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Navigation Tabs Bar ───── */}
        <div id="hl-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 scroll-mt-32">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/40 via-[#C8952E]/50 to-[#1D82A6]/40 shadow-lg">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white/90 backdrop-blur-xl p-2 flex items-center justify-between gap-3 overflow-x-auto hl-noscroll">
              <div className="flex items-center gap-1.5 shrink-0">
                {[
                  { id: "articles", label: "Medical Blogs & News", icon: BookOpen, count: articles.length },
                  { id: "news", label: "Apollo News & Events", icon: Newspaper, count: newsItems.length },
                  { id: "calculators", label: "Health Calculators", icon: Calculator },
                  { id: "az-directory", label: "A-Z Directory", icon: FileText },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                          : "text-[#0E526B] hover:bg-[#EDF6FB]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#F6D98A]" : "text-[#1D82A6]"}`} />
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isActive ? "bg-[#F6D98A] text-[#0B3446]" : "bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldStyle}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Doctor Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* ───── TAB CONTENT 1: ARTICLES & BLOGS & NEWS ───── */}
        {(activeTab === "articles" || activeTab === "news") && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 hl-fade">
            {/* Filter Bar */}
            <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-white to-[#C8952E]/40 shadow-md">
              <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-4 sm:p-5 flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 hl-noscroll">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0E526B] flex items-center gap-1.5 shrink-0 mr-1">
                      <Filter className="w-3.5 h-3.5 text-[#C8952E]" /> Category
                    </span>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] shadow-md ring-2 ring-[#F6D98A]/60"
                            : "bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/15 hover:bg-white hover:border-[#1D82A6]/40 hover:-translate-y-0.5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Type Selector Toggle (hidden on the News tab) */}
                  {activeTab === "articles" && (
                    <div className="flex items-center gap-1 bg-[#EDF6FB] p-1 rounded-xl shrink-0 border border-[#1D82A6]/15">
                      {[
                        { id: "all", label: "All" },
                        { id: "blog", label: "Blogs" },
                        { id: "news", label: "Apollo News" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setContentType(t.id)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                            contentType === t.id
                              ? "bg-white text-[#0E526B] shadow-sm ring-1 ring-[#C8952E]/40"
                              : "text-slate-500 hover:text-[#0E526B]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-3 border-t border-slate-100">
                  <span>
                    Showing{" "}
                    <span className="text-[#0E526B] font-black">{filteredArticles.length}</span> of{" "}
                    {activeTab === "news" ? newsItems.length : articles.length} results
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 text-[#0E526B] hover:text-[#C8952E] font-extrabold transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Clear filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main results column */}
              <div className="lg:col-span-9 space-y-8">
                {filteredArticles.length > 0 ? (
                  <>
                    {featuredArticle && renderFeatured(featuredArticle)}

                    {restArticles.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {restArticles.map((art, i) => renderCard(art, i))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 px-6 bg-white rounded-3xl border border-[#1D82A6]/20 shadow-lg">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0B3446]">No content matched your query</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-5">
                      Try searching for terms like "EBUS", "Insurance", "Winter Heart", or "Joint Pain".
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-3 rounded-full text-[#3A2B0A] text-xs font-extrabold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                      style={goldStyle}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-28 space-y-6">
                  {/* Emergency card */}
                  <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-br from-red-500 via-red-600 to-[#0E526B] shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
                    <div className="relative rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-5 text-white">
                      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-red-400/40 blur-2xl pointer-events-none" />
                      <span className="absolute top-5 right-5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400" />
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg mb-3">
                        <Siren className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-extrabold text-base leading-snug">24/7 Emergency Care</h4>
                      <p className="text-[11px] text-slate-100/90 mt-1 leading-relaxed">
                        Critical care, trauma & ambulance service always on standby.
                      </p>
                      <a
                        href="tel:1066"
                        className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/25 hover:bg-red-600 border border-red-300/40 text-red-100 hover:text-white text-xs font-extrabold transition-all"
                      >
                        <Zap className="w-4 h-4" />
                        Call 1066
                      </a>
                    </div>
                  </div>

                  {/* Latest Apollo News */}
                  <div className="rounded-3xl bg-white border border-[#1D82A6]/15 shadow-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#1D82A6] to-[#C8952E]" />
                      <h4 className="text-sm font-extrabold text-[#0B3446]">Latest Apollo News</h4>
                    </div>
                    <div className="space-y-3">
                      {newsItems.slice(0, 3).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => setSelectedArticle(n)}
                          className="group w-full text-left p-3 rounded-2xl bg-[#EDF6FB]/70 border border-[#1D82A6]/10 hover:bg-white hover:border-[#1D82A6]/40 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="text-[10px] font-bold text-[#C8952E] mb-1">{n.date}</div>
                          <div className="text-xs font-bold text-[#0B3446] leading-snug line-clamp-2 group-hover:text-[#1D82A6] transition-colors">
                            {n.title}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Saved Articles */}
                  <div className="rounded-3xl bg-white border border-[#1D82A6]/15 shadow-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#1D82A6] to-[#C8952E]" />
                        <h4 className="text-sm font-extrabold text-[#0B3446]">Saved Articles</h4>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                        {savedArticles.length}
                      </span>
                    </div>
                    {savedArticles.length === 0 ? (
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Tap the bookmark icon on any article to save it here for later.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {savedArticles.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-[#EDF6FB]/70 border border-[#1D82A6]/10"
                          >
                            <button
                              onClick={() => setSelectedArticle(s)}
                              className="flex-1 text-left text-[11px] font-bold text-[#0B3446] leading-snug line-clamp-2 hover:text-[#1D82A6] cursor-pointer"
                            >
                              {s.title}
                            </button>
                            <button
                              onClick={() => toggleBookmark(s.id)}
                              className="p-1 rounded-full hover:bg-white text-slate-400 hover:text-rose-500 cursor-pointer shrink-0"
                              aria-label="Remove bookmark"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Consult CTA */}
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-5 text-white shadow-lg border border-[#F6D98A]/40">
                    <Sparkles className="absolute -right-2 -top-2 w-20 h-20 text-white/10" />
                    <h4 className="relative font-extrabold text-base leading-snug">Need Expert Advice?</h4>
                    <p className="relative text-[11px] text-slate-100/90 mt-1 mb-4 leading-relaxed">
                      Talk to an Apollo Jabalpur specialist about what you just read.
                    </p>
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="relative w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                      style={goldStyle}
                    >
                      Consult Specialist
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* ───── TAB CONTENT 2: CALCULATORS ───── */}
        {activeTab === "calculators" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 hl-fade">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C8952E] animate-pulse" />
                Preventive Care Tools
              </span>
              <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446] tracking-tight">
                Interactive Health &{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)" }}
                >
                  Wellness Calculators
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3">
                Empower your preventive care routine with instant, medically referenced health assessment tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tool 1: BMI Calculator */}
              <div className="hl-rise relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/60 via-white/40 to-[#C8952E]/60 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
                <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white overflow-hidden flex flex-col">
                  <div className="relative bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-6 text-white overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#F6D98A]/25 blur-2xl" />
                    <div className="relative flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F6D98A] to-[#C8952E] text-[#0B3446] flex items-center justify-center shadow-lg">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif-apollo text-lg font-extrabold">Body Mass Index (BMI)</h3>
                        <p className="text-[11px] text-slate-100/90">WHO Standard Weight Profiler</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <form onSubmit={calculateBmi} className="space-y-5 text-xs">
                      <div>
                        <div className="flex justify-between items-center font-bold text-slate-700 mb-2">
                          <span>Weight</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-black">
                            {bmiData.weight} kg
                          </span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="160"
                          value={bmiData.weight}
                          onChange={(e) => setBmiData({ ...bmiData, weight: Number(e.target.value) })}
                          className="w-full accent-[#1D82A6] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center font-bold text-slate-700 mb-2">
                          <span>Height</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-black">
                            {bmiData.height} cm
                          </span>
                        </div>
                        <input
                          type="range"
                          min="120"
                          max="220"
                          value={bmiData.height}
                          onChange={(e) => setBmiData({ ...bmiData, height: Number(e.target.value) })}
                          className="w-full accent-[#1D82A6] cursor-pointer"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-[#3A2B0A] font-extrabold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                        style={goldStyle}
                      >
                        Calculate BMI
                      </button>
                    </form>

                    {bmiResult && (
                      <div className={`hl-pop mt-6 p-4 rounded-2xl border text-xs space-y-3 ${bmiResult.color}`}>
                        <div className="flex justify-between items-center font-bold">
                          <span>Your BMI Score</span>
                          <span className="text-3xl font-serif-apollo font-black">{bmiResult.score.toFixed(1)}</span>
                        </div>

                        {/* Gauge */}
                        <div className="relative pt-2">
                          <div className="flex h-2.5 rounded-full overflow-hidden">
                            <div className="bg-amber-400" style={{ width: "14%" }} />
                            <div className="bg-emerald-500" style={{ width: "26%" }} />
                            <div className="bg-amber-500" style={{ width: "20%" }} />
                            <div className="bg-rose-500" style={{ width: "40%" }} />
                          </div>
                          <span
                            className="absolute top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#0B3446] shadow-md transition-all duration-500"
                            style={{
                              left: `${Math.min(98, Math.max(2, ((bmiResult.score - 15) / 25) * 100))}%`,
                            }}
                          />
                        </div>

                        <div className="font-black uppercase tracking-wider">{bmiResult.category}</div>
                        <p className="text-[11px] leading-relaxed text-slate-700">{bmiResult.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tool 2: Water Intake Calculator */}
              <div
                className="hl-rise relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/60 via-white/40 to-[#C8952E]/60 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: "90ms" }}
              >
                <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white overflow-hidden flex flex-col">
                  <div className="relative bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-6 text-white overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-300/30 blur-2xl" />
                    <div className="relative flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F6D98A] to-[#C8952E] text-[#0B3446] flex items-center justify-center shadow-lg">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif-apollo text-lg font-extrabold">Daily Water Intake</h3>
                        <p className="text-[11px] text-slate-100/90">Hydration Needs Calculator</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <form onSubmit={calculateWater} className="space-y-5 text-xs">
                      <div>
                        <div className="flex justify-between items-center font-bold text-slate-700 mb-2">
                          <span>Body Weight</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-black">
                            {waterData.weight} kg
                          </span>
                        </div>
                        <input
                          type="range"
                          min="35"
                          max="140"
                          value={waterData.weight}
                          onChange={(e) => setWaterData({ ...waterData, weight: Number(e.target.value) })}
                          className="w-full accent-cyan-600 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-2">Daily Physical Activity Level</label>
                        <select
                          value={waterData.activity}
                          onChange={(e) => setWaterData({ ...waterData, activity: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl border border-[#1D82A6]/25 bg-[#EDF6FB]/60 text-xs font-bold text-[#0B3446] focus:outline-none focus:ring-2 focus:ring-[#1D82A6]/40"
                        >
                          <option value="sedentary">Sedentary (Indoor Office)</option>
                          <option value="moderate">Moderate (30-45 mins exercise)</option>
                          <option value="high">High (Heavy workout/Outdoor)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] font-extrabold hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-md cursor-pointer"
                      >
                        Calculate Daily Target
                      </button>
                    </form>

                    {waterResult && (
                      <div className="hl-pop mt-6 p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs space-y-3 text-cyan-950">
                        <div className="flex justify-between items-center font-bold">
                          <span>Recommended Target</span>
                          <span className="text-2xl font-serif-apollo font-black text-cyan-700">
                            {waterResult.liters} L
                            <span className="text-[11px] font-bold text-cyan-800"> / day</span>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from({ length: Math.min(waterResult.glasses, 16) }).map((_, i) => (
                            <Droplets key={i} className="w-4 h-4 text-cyan-500" />
                          ))}
                        </div>
                        <div className="text-[11px] font-semibold text-cyan-800">
                          Equivalent to approximately{" "}
                          <span className="font-black text-cyan-900">{waterResult.glasses} standard glasses</span>{" "}
                          (250ml) per day.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tool 3: Heart Risk Screener */}
              <div
                className="hl-rise relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/60 via-white/40 to-[#C8952E]/60 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: "180ms" }}
              >
                <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white overflow-hidden flex flex-col">
                  <div className="relative bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-6 text-white overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-rose-300/30 blur-2xl" />
                    <div className="relative flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F6D98A] to-[#C8952E] text-[#0B3446] flex items-center justify-center shadow-lg">
                        <HeartPulse className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif-apollo text-lg font-extrabold">Heart Risk Checklist</h3>
                        <p className="text-[11px] text-slate-100/90">Quick Cardiac Health Assessment</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <form onSubmit={evaluateHeartRisk} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Age Range</label>
                          <select
                            value={heartCheck.age}
                            onChange={(e) => setHeartCheck({ ...heartCheck, age: e.target.value })}
                            className="w-full px-2.5 py-2.5 rounded-xl border border-[#1D82A6]/25 text-xs font-bold text-[#0B3446] bg-[#EDF6FB]/60 focus:outline-none focus:ring-2 focus:ring-[#1D82A6]/40"
                          >
                            <option value="under30">Under 30</option>
                            <option value="30-45">30 - 45 yrs</option>
                            <option value="45-60">45 - 60 yrs</option>
                            <option value="60+">60+ yrs</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Smoking Habit</label>
                          <select
                            value={heartCheck.smoking}
                            onChange={(e) => setHeartCheck({ ...heartCheck, smoking: e.target.value })}
                            className="w-full px-2.5 py-2.5 rounded-xl border border-[#1D82A6]/25 text-xs font-bold text-[#0B3446] bg-[#EDF6FB]/60 focus:outline-none focus:ring-2 focus:ring-[#1D82A6]/40"
                          >
                            <option value="no">Non-Smoker</option>
                            <option value="yes">Smoker / Tobacco</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Exercise Habit</label>
                          <select
                            value={heartCheck.exercise}
                            onChange={(e) => setHeartCheck({ ...heartCheck, exercise: e.target.value })}
                            className="w-full px-2.5 py-2.5 rounded-xl border border-[#1D82A6]/25 text-xs font-bold text-[#0B3446] bg-[#EDF6FB]/60 focus:outline-none focus:ring-2 focus:ring-[#1D82A6]/40"
                          >
                            <option value="regular">Regular Workout</option>
                            <option value="sedentary">Little / No Workout</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Blood Pressure</label>
                          <select
                            value={heartCheck.bp}
                            onChange={(e) => setHeartCheck({ ...heartCheck, bp: e.target.value })}
                            className="w-full px-2.5 py-2.5 rounded-xl border border-[#1D82A6]/25 text-xs font-bold text-[#0B3446] bg-[#EDF6FB]/60 focus:outline-none focus:ring-2 focus:ring-[#1D82A6]/40"
                          >
                            <option value="normal">Normal (&lt;120/80)</option>
                            <option value="high">Elevated / High</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-md mt-2 cursor-pointer"
                      >
                        Evaluate Risk Profile
                      </button>
                    </form>

                    {heartRisk && (
                      <div className={`hl-pop mt-6 p-4 rounded-2xl border text-xs space-y-3 ${heartRisk.badgeColor}`}>
                        <div className="flex justify-between items-center font-bold">
                          <span>Summary Rating</span>
                          <span className="font-serif-apollo text-sm font-black uppercase">{heartRisk.level}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3].map((seg) => (
                            <span
                              key={seg}
                              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                                seg <= heartRisk.meter
                                  ? seg === 1
                                    ? "bg-emerald-500"
                                    : seg === 2
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                                  : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[11px] leading-relaxed">{heartRisk.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed flex items-start justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1D82A6] shrink-0 mt-0.5" />
              These tools are for general awareness only and are not a medical diagnosis. Please consult an Apollo specialist for a personalised assessment.
            </p>
          </section>
        )}

        {/* ───── TAB CONTENT 3: A-Z CONDITIONS DIRECTORY ───── */}
        {activeTab === "az-directory" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 hl-fade">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-4">
                <FileText className="w-3.5 h-3.5 text-[#C8952E]" />
                Conditions & Treatments
              </span>
              <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446] tracking-tight">
                A-Z Medical{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)" }}
                >
                  Conditions Directory
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3">
                Browse common health conditions, symptoms, and corresponding Apollo Jabalpur specialized departments.
              </p>
            </div>

            {/* Alphabet strip */}
            <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/40 via-[#C8952E]/50 to-[#1D82A6]/40 shadow-md">
              <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-3 sm:p-4 flex flex-wrap items-center justify-center gap-1.5">
                <button
                  onClick={() => setActiveLetter(null)}
                  className={`px-4 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeLetter === null
                      ? "bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] shadow-md"
                      : "bg-[#EDF6FB] text-[#0E526B] hover:bg-white border border-[#1D82A6]/20"
                  }`}
                >
                  All
                </button>
                {ALPHABET.map((letter) => {
                  const enabled = availableLetters.has(letter);
                  const isActive = activeLetter === letter;
                  return (
                    <button
                      key={letter}
                      disabled={!enabled}
                      onClick={() => setActiveLetter(isActive ? null : letter)}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                        isActive
                          ? "text-[#3A2B0A] shadow-md scale-110"
                          : enabled
                          ? "bg-[#EDF6FB] text-[#0E526B] hover:bg-white hover:-translate-y-0.5 border border-[#1D82A6]/25 cursor-pointer"
                          : "bg-slate-50 text-slate-300 cursor-not-allowed"
                      }`}
                      style={isActive ? goldStyle : undefined}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleConditions.map((cond, idx) => (
                <div
                  key={cond.name}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className="hl-rise group relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/50 via-white to-[#C8952E]/60 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-full rounded-[calc(1.75rem-1.5px)] bg-white p-6 overflow-hidden flex flex-col">
                    <span className="absolute -right-3 -bottom-8 text-[8rem] font-black leading-none text-[#0E526B]/[0.06] font-serif-apollo pointer-events-none select-none">
                      {cond.name[0]}
                    </span>

                    <div className="relative flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] shadow-sm">
                        {cond.dept}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#EDF6FB] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#F6D98A] group-hover:to-[#C8952E] transition-all">
                        <ChevronRight className="w-4 h-4 text-[#0E526B] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    <h4 className="relative font-serif-apollo text-base font-extrabold text-[#0B3446] mb-2 group-hover:text-[#1D82A6] transition-colors leading-snug">
                      {cond.name}
                    </h4>
                    <p className="relative text-xs text-slate-600 leading-relaxed mb-5 flex-1">{cond.desc}</p>
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="relative self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer"
                      style={goldStyle}
                    >
                      Consult Department Specialist
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleConditions.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#1D82A6]/20 shadow-md">
                <p className="text-sm font-bold text-[#0B3446]">No conditions listed under this letter yet.</p>
              </div>
            )}
          </section>
        )}

        {/* ───── Newsletter Banner ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="hl-shimmer relative p-[2px] rounded-[2.25rem] bg-gradient-to-r from-[#1D82A6] via-[#F6D98A] to-[#C8952E] shadow-[0_25px_60px_rgba(10,95,122,0.35)]">
            <div className="relative rounded-[calc(2.25rem-2px)] overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-[#F6D98A]/20 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              <HeartPulse className="absolute -right-8 -bottom-10 w-72 h-72 opacity-[0.07] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-xl text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-[11px] font-extrabold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6D98A]" />
                  Monthly Newsletter
                </span>
                <h3 className="font-serif-apollo text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                  Subscribe to{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 60%, #C8952E 100%)" }}
                  >
                    Apollo Monthly Health Digest
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed">
                  Get official Apollo JBP Hospitals health updates, EBUS technology news, and medical advice delivered straight to your inbox once a month.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="relative z-10 w-full lg:w-auto flex-1 max-w-md">
                {subscribedSuccess ? (
                  <div className="hl-pop p-5 rounded-2xl bg-emerald-500/20 border border-emerald-300/60 backdrop-blur-md text-emerald-100 text-xs font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-400/30 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-emerald-200" />
                    </div>
                    <span>Thank you for subscribing! Check your email for health updates.</span>
                  </div>
                ) : (
                  <div className="flex items-center bg-white/95 backdrop-blur-xl rounded-full p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-white/50 focus-within:ring-4 focus-within:ring-[#F6D98A]/40 transition-all">
                    <input
                      type="email"
                      required
                      value={subscribedEmail}
                      onChange={(e) => setSubscribedEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full text-[#3A2B0A] font-extrabold text-xs shrink-0 hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      style={goldStyle}
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Appointment Modal Trigger */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* ───── ARTICLE READER MODAL (DETAILED BLOG & NEWS VIEWER) ───── */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#062A3A]/80 backdrop-blur-md hl-fade"
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="hl-pop relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white shadow-[0_40px_90px_rgba(0,0,0,0.5)] border border-[#F6D98A]/70"
          >
            {/* Sticky close button */}
            <div className="sticky top-0 z-30 h-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white hover:scale-110 text-[#0B3446] shadow-lg transition-all cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header image with title overlay */}
            <div className="relative h-60 sm:h-80 bg-gradient-to-br from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446] via-[#0B3446]/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${
                      selectedArticle.type === "news"
                        ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white"
                        : "bg-gradient-to-l from-[#C8952E] to-[#F6D98A] text-[#0B3446]"
                    }`}
                  >
                    {selectedArticle.type === "news" ? "Apollo News" : selectedArticle.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white/90 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25">
                    <Clock className="w-3 h-3 text-[#F6D98A]" />
                    {selectedArticle.readTime}
                  </span>
                </div>
                <h2 className="font-serif-apollo text-xl sm:text-3xl font-black text-white leading-tight drop-shadow-lg">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              {/* Author strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#EDF6FB] to-white border border-[#1D82A6]/20 mb-8 text-xs text-[#0E526B]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center shadow-md shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[#0B3446]">Reviewed by {selectedArticle.author}</div>
                    <div className="text-[11px] text-slate-500">
                      {selectedArticle.authorRole} • Published {selectedArticle.date}
                    </div>
                  </div>
                </div>

                <button
                  onClick={copyArticleLink}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-xs font-extrabold hover:bg-[#EDF6FB] border border-[#1D82A6]/25 shadow-sm transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5 text-[#1D82A6]" />
                  )}
                  <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                </button>
              </div>

              {/* Article body */}
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed mb-8">
                {selectedArticle.content.map((paragraph, pIdx) => {
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={pIdx}
                        className="flex items-center gap-2.5 font-serif-apollo text-lg font-extrabold text-[#0B3446] pt-3"
                      >
                        <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#1D82A6] to-[#C8952E]" />
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <div
                        key={pIdx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#EDF6FB]/70 border border-[#1D82A6]/10"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#1D82A6] shrink-0 mt-0.5" />
                        <span>{renderInline(paragraph.replace("- ", ""))}</span>
                      </div>
                    );
                  }
                  const numbered = paragraph.match(/^(\d+)\.\s+(.*)$/);
                  if (numbered) {
                    return (
                      <div
                        key={pIdx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#EDF6FB]/70 border border-[#1D82A6]/10"
                      >
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black text-[#3A2B0A] shrink-0 shadow-sm"
                          style={goldStyle}
                        >
                          {numbered[1]}
                        </span>
                        <span>{renderInline(numbered[2])}</span>
                      </div>
                    );
                  }
                  return <p key={pIdx}>{renderInline(paragraph)}</p>;
                })}
              </div>

              {/* Tags footer */}
              <div className="pt-5 pb-6 flex flex-wrap items-center gap-2 border-t border-slate-100">
                <span className="text-xs font-extrabold text-[#0E526B]">Related Tags:</span>
                {selectedArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setIsAppointmentModalOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[#3A2B0A] font-extrabold text-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                  style={goldStyle}
                >
                  Book Appointment for this Specialty
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/25 font-extrabold text-xs hover:bg-white hover:shadow-md transition-all cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}