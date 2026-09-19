"use client";

import { useState } from "react";
import {
  ArrowRight,
  Clock,
  BookOpen,
  Heart,
  Activity,
  Salad,
  X,
  Sparkles,
  Search,
  Share2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HealthArticles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "All",
    "Cardiology",
    "Preventive Care",
    "Diet & Lifestyle",
    "Neurology",
  ];

  const articles = [
    {
      id: 1,
      title: "How to Keep Your Heart Healthy",
      subtitle: "5 simple daily steps for a stronger, resilient heart",
      category: "Cardiology",
      readTime: "4 min read",
      author: "Dr. Arvind Sethi",
      authorRole: "Senior Cardiologist",
      date: "May 14, 2024",
      featured: true,
      icon: Heart,
      desc: "Learn how daily 30-minute aerobic exercises, dietary salt reductions, and stress management drastically reduce cardiovascular disease risks.",
      fullContent: `Heart disease remains the leading lifestyle health risk globally. However, over 80% of premature heart attacks can be prevented with early habit adjustments:

1. Daily 30-minute brisk walk or cardio session to regulate blood pressure and vascular flexibility.
2. Mediterranean-inspired diet rich in leafy greens, unrefined nuts, and omega-3 fatty acids.
3. Regular screening for blood glucose, cholesterol, and lipid profiles after age 30.
4. Prioritizing 7-8 hours of restorative, deep sleep every night.
5. Avoiding active smoking and minimizing chronic daily stress through mindfulness.`,
    },
    {
      id: 2,
      title: "The Importance of Regular Checkups",
      subtitle: "Prevention is better than care: silent symptoms caught early",
      category: "Preventive Care",
      readTime: "5 min read",
      author: "Dr. Meera Vasudevan",
      authorRole: "Preventive Health Director",
      date: "Jun 02, 2024",
      featured: false,
      icon: Activity,
      desc: "Comprehensive annual full body health screenings catch hidden silent conditions like hypertension and early diabetes long before symptoms manifest.",
      fullContent: `Many severe medical conditions remain completely asymptomatic during early stages. Routine diagnostic panels empower doctors to intervene before organ damage occurs:

- Early Detection: Spot diabetes, liver enzyme shifts, and thyroid imbalances before they advance.
- Personalized Risk Map: Genetic profiling and family medical history audits tailored to you.
- Cost Savings: Preventive care costs a fraction of emergency hospitalizations.
- Peace of Mind: Comprehensive reassurance for you and your family every year.`,
    },
    {
      id: 3,
      title: "Nutrition for a Better Tomorrow",
      subtitle: "Eat right, live lighter: cellular-level nourishment",
      category: "Diet & Lifestyle",
      readTime: "3 min read",
      author: "Rohan Kapoor",
      authorRole: "Lead Clinical Nutritionist",
      date: "Jun 18, 2024",
      featured: false,
      icon: Salad,
      desc: "Fuel your body with anti-inflammatory whole foods, micronutrient balance, and proper hydration for sustained mental and physical vigor.",
      fullContent: `Optimal nutrition is the foundation of long-term cellular health, metabolic stability, and immune defense:

- Rainbow Plate Rule: Include vibrant multi-colored vegetables daily for varied phytonutrients.
- Hydration Standard: Drink 2.5 to 3 liters of clean water every day to flush cellular waste.
- Gut Microbiome: Ingest probiotic-rich yogurt, fermented foods, and high-fiber grains.
- Minimize Processed Sugars: Swap refined sugars with whole fruits and raw honey.`,
    },
    {
      id: 4,
      title: "Understanding Brain Fog & Fatigue",
      subtitle: "Neuro-wellness tips for high-stress professionals",
      category: "Neurology",
      readTime: "6 min read",
      author: "Dr. K. S. Ramanujam",
      authorRole: "Chief Neuro-Consultant",
      date: "Jul 01, 2024",
      featured: false,
      icon: BrainIcon,
      desc: "Persistent cognitive fatigue and focus dips can be corrected through circadian realignment and specialized neurological micro-habits.",
      fullContent: `Brain fog is rarely an isolated issue; it is usually an indicator of systemic sleep fragmentation, digital fatigue, or micro-nutrient deficiency:

- Morning Sun Exposure: Get 10 minutes of direct sunlight within an hour of waking.
- Screen Micro-breaks: Use the 20-20-20 rule to rest ocular and neural fatigue during long work sessions.
- Electrolyte Balance: Ensure adequate magnesium and B-complex vitamin intake.`,
    },
  ];

  function BrainIcon(props) {
    return (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    );
  }

  const filteredArticles = articles.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredArticles.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + filteredArticles.length) % filteredArticles.length,
    );
  };

  return (
    <section
      id="health-articles"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#EDF6FB]"
    >
      {/* ───── Dynamic Background Pattern & Floating Particles ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ha-orb ha-orb-1" />
        <div className="ha-orb ha-orb-2" />
        <div className="ha-orb ha-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
          }}
        />
        <span
          className="ha-sparkle"
          style={{ top: "14%", left: "7%", animationDelay: "0s" }}
        />
        <span
          className="ha-sparkle"
          style={{ top: "65%", left: "4%", animationDelay: "1.5s" }}
        />
        <span
          className="ha-sparkle"
          style={{ top: "22%", left: "92%", animationDelay: "2.1s" }}
        />
        <span
          className="ha-sparkle"
          style={{ top: "82%", left: "89%", animationDelay: "0.9s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* ───── Header Block ───── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C8952E] animate-pulse" />
              Doctor-Verified Medical Insights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3446] tracking-tight leading-tight">
              Health Articles &{" "}
              <span
                className="bg-clip-text text-transparent drop-shadow-sm"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)",
                }}
              >
                Awareness
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl font-normal leading-relaxed">
              Stay ahead with medical research, preventive guidelines, and
              wellness tips curated directly by our top consultants.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles, topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(0);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1D82A6]/25 text-xs text-[#0B3446] placeholder-slate-400 focus:outline-none focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* ───── Featured Article Hero (Glow Card) ───── */}
        {searchQuery === "" && activeCategory === "All" && (
          <div className="mb-12 relative p-[1.5px] rounded-[2.25rem] bg-gradient-to-r from-[#F59E0B]/50 via-[#1D82A6]/40 to-[#F59E0B]/50 shadow-[0_25px_50px_-12px_rgba(15,52,72,0.25)]">
            <div className="relative rounded-[calc(2.25rem-1.5px)] overflow-hidden bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-8 sm:p-10 lg:p-12 text-white">
              {/* Background Watermark Icon */}
              <div className="absolute -right-8 -bottom-10 pointer-events-none opacity-[0.08] text-white">
                <Heart className="w-96 h-96" />
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
              <div className="absolute -top-24 -right-16 w-80 h-80 bg-[#F6D98A]/20 rounded-full blur-[90px] pointer-events-none ha-glow" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6D98A]/20 border border-[#F6D98A]/40 text-[#FEF3C7] text-[11px] font-bold uppercase tracking-wider">
                      <TrendingUp className="w-3.5 h-3.5 text-[#F6D98A]" />{" "}
                      Featured Guide
                    </span>
                    <span className="text-xs text-slate-100/90 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#F6D98A]" />{" "}
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed font-normal max-w-2xl">
                    {featuredArticle.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F6D98A] font-bold">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {featuredArticle.author}
                        </div>
                        <div className="text-[10px] text-slate-100/80">
                          {featuredArticle.authorRole}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_30px_rgba(197,146,46,0.45)] hover:shadow-[0_16px_40px_rgba(197,146,46,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                      }}
                    >
                      <BookOpen className="w-4 h-4 text-[#3A2B0A]" />
                      <span>Read Full Spotlight Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Decorative Badge Column */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#F6D98A] to-[#C8952E] flex items-center justify-center text-[#0B3446] shadow-xl mb-3">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    100% Peer Verified
                  </div>
                  <p className="text-[11px] text-slate-100/90 mt-1 leading-relaxed">
                    Reviewed by accredited medical practitioners to ensure
                    maximum diagnostic accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ───── Category Navigation Tabs ───── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(0);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-[#0E526B] text-[#FEF3C7] border-[#0E526B] shadow-md -translate-y-0.5"
                  : "bg-white/80 text-slate-600 border-[#1D82A6]/20 hover:bg-white hover:text-[#0E526B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ───── 3D Arc / Curved Carousel Section ───── */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-slate-200">
            <p className="text-sm font-bold text-slate-600">
              No health articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setActiveIndex(0);
              }}
              className="mt-3 text-xs font-bold text-[#1D82A6] underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="relative py-10 my-4 perspective-1000">
            {/* Carousel Arc Container */}
            <div className="relative min-h-[460px] sm:min-h-[480px] flex items-center justify-center w-full overflow-visible">
              {filteredArticles.map((item, index) => {
                const Icon = item.icon;

                // Calculate distance relative to active card
                let offset = index - activeIndex;
                const total = filteredArticles.length;

                // Circular loop positioning for smooth transition
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;

                // 3D Arc Transforms
                const translateX = offset * 280; // horizontal separation
                const translateZ = -absOffset * 160; // depth arc curvature
                const rotateY = offset * -22; // perspective arc angle
                const scale = Math.max(1 - absOffset * 0.15, 0.75);
                const opacity = Math.max(1 - absOffset * 0.35, 0);

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIndex(index);
                      } else {
                        setSelectedArticle(item);
                      }
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex: 30 - absOffset * 10,
                      opacity: opacity,
                      pointerEvents: absOffset > 2 ? "none" : "auto",
                    }}
                    className={`absolute top-0 w-[300px] sm:w-[350px] rounded-3xl transition-all duration-700 ease-out cursor-pointer select-none ${
                      isCenter
                        ? "p-[2px] bg-gradient-to-br from-[#1D82A6] via-[#C8952E] to-[#0E526B] shadow-[0_20px_50px_rgba(14,82,107,0.35)]"
                        : "bg-white/80 border border-[#1D82A6]/20 shadow-md hover:border-[#1D82A6]/40"
                    }`}
                  >
                    <div className="h-full rounded-[calc(1.5rem-2px)] bg-white/95 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative">
                      {/* Very Light Background Watermark Icon */}
                      <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-[0.06] text-[#0E526B] group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-48 h-48" />
                      </div>

                      {/* Top Medical Badge Overlay on Active Card */}
                      {isCenter && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#C8952E] to-[#F6D98A] text-[#0B3446] text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-bl-xl shadow-sm z-10">
                          Verified Guide
                        </div>
                      )}

                      <div className="relative z-10">
                        {/* Category & Read Time */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-[10px] font-extrabold uppercase text-[#0E526B] bg-[#EBF5F8] px-3 py-1 rounded-full border border-[#1D82A6]/30">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#C8952E]" />{" "}
                            {item.readTime}
                          </span>
                        </div>

                        {/* Animated Icon Container */}
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 ${
                            isCenter
                              ? "bg-gradient-to-br from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-[#F6D98A] shadow-lg scale-110"
                              : "bg-[#EDF6FB] text-[#0E526B]"
                          }`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>

                        {/* Article Titles */}
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0B3446] leading-snug tracking-tight">
                          {item.title}
                        </h3>

                        <p className="text-xs font-semibold text-[#C8952E] mt-1.5">
                          {item.subtitle}
                        </p>

                        <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3 font-normal">
                          {item.desc}
                        </p>
                      </div>

                      {/* Author & Action Bar */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                        <div className="text-[11px] text-slate-500 font-medium">
                          By{" "}
                          <span className="font-bold text-[#0B3446]">
                            {item.author}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0E526B]">
                          <span>{isCenter ? "Read Article" : "View"}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C8952E]" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arc Navigation Controls */}
            {filteredArticles.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6 z-30 relative">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white text-[#0B3446] border border-[#1D82A6]/30 shadow-md hover:bg-[#0E526B] hover:text-white hover:border-[#0E526B] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                  aria-label="Previous article"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#1D82A6]/20">
                  {filteredArticles.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? "w-6 bg-[#0E526B]"
                          : "w-2 bg-[#1D82A6]/30 hover:bg-[#1D82A6]/60"
                      }`}
                      aria-label={`Go to article ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white text-[#0B3446] border border-[#1D82A6]/30 shadow-md hover:bg-[#0E526B] hover:text-white hover:border-[#0E526B] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                  aria-label="Next article"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ───── Article Reader Modal ───── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B3446]/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#1D82A6]/40 relative max-h-[90vh] overflow-y-auto overflow-hidden">
            {/* Very Light Background Icon inside Modal */}
            <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.04] text-[#0E526B]">
              {(() => {
                const ModalIcon = selectedArticle.icon;
                return <ModalIcon className="w-72 h-72" />;
              })()}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0B3446] hover:text-white text-slate-600 flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#1D82A6] mb-3">
                <BookOpen className="w-4 h-4 text-[#C8952E]" />
                <span className="uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span className="text-slate-500 font-normal">
                  {selectedArticle.readTime}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B3446] tracking-tight leading-snug">
                {selectedArticle.title}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-[#C8952E] mt-1 mb-4">
                {selectedArticle.subtitle}
              </p>

              {/* Author bar */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EDF6FB] border border-[#1D82A6]/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0E526B] text-[#F6D98A] flex items-center justify-center font-bold text-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B3446]">
                      {selectedArticle.author}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {selectedArticle.authorRole}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Article link copied to clipboard!")}
                    className="p-2 rounded-xl bg-white text-slate-600 hover:text-[#0E526B] border border-slate-200 transition-colors"
                    title="Share Article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Article Body */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                {selectedArticle.fullContent}
              </div>

              {/* Bottom Modal Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Verified Medical Content
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                  }}
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .ha-glow {
          animation: haGlowPulse 6s ease-in-out infinite;
        }
        @keyframes haGlowPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.08);
          }
        }

        .ha-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }
        .ha-orb-1 {
          width: 360px;
          height: 360px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: haFloat1 16s ease-in-out infinite;
        }
        .ha-orb-2 {
          width: 320px;
          height: 320px;
          top: 20%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.4;
          animation: haFloat2 20s ease-in-out infinite;
        }
        .ha-orb-3 {
          width: 280px;
          height: 280px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: haFloat3 18s ease-in-out infinite;
        }
        @keyframes haFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.08);
          }
        }
        @keyframes haFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
        @keyframes haFloat3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -35px) scale(1.05);
          }
        }
        .ha-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: haTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes haTwinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}