"use client";

import { useState } from "react";
import { ArrowRight, Clock, BookOpen, Heart, Activity, Salad, X } from "lucide-react";

export default function HealthArticles() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "How to Keep Your Heart Healthy",
      subtitle: "5 simple steps for a stronger heart",
      category: "Cardiology & Wellness",
      readTime: "4 min read",
      icon: Heart,
      desc: "Learn how daily 30-minute aerobic exercises, dietary salt reductions, and stress management drastically reduce cardiovascular disease risks.",
      fullContent: `
        Heart disease remains the leading lifestyle health risk globally. However, over 80% of premature heart attacks can be prevented with early habit adjustments:
        
        1. Daily 30-minute brisk walk or cardio session to regulate blood pressure.
        2. Mediterranean-inspired diet rich in leafy greens, nuts, and omega-3 fatty acids.
        3. Regular screening for blood glucose, cholesterol, and lipid profiles after age 30.
        4. Prioritizing 7-8 hours of sound restorative sleep every night.
        5. Avoiding active smoking and limiting alcohol intake.
      `,
    },
    {
      id: 2,
      title: "The Importance of Regular Checkups",
      subtitle: "Prevention is better than care",
      category: "Preventive Care",
      readTime: "5 min read",
      icon: Activity,
      desc: "Comprehensive annual full body health screenings catch hidden silent conditions like hypertension and diabetes long before symptoms manifest.",
      fullContent: `
        Many severe medical conditions remain completely asymptomatic during early stages. Routine diagnostic panels empower doctors to intervene before organ damage occurs:
        
        • Early Detection: Spot diabetes, liver enzyme shifts, and thyroid imbalances early.
        • Personalized Risk Map: Genetic profiling and family medical history audits.
        • Cost Savings: Preventive care costs less than emergency hospitalizations.
        • Peace of Mind: Comprehensive reassurance for you and your family.
      `,
    },
    {
      id: 3,
      title: "Nutrition for a Better Tomorrow",
      subtitle: "Eat right, live lighter",
      category: "Diet & Lifestyle",
      readTime: "3 min read",
      icon: Salad,
      desc: "Fuel your body with anti-inflammatory whole foods, micronutrient balance, and proper hydration for sustained mental and physical vigor.",
      fullContent: `
        Optimal nutrition is the foundation of long-term cellular health and immunity:
        
        • Rainbow Plate Rule: Include vibrant multi-colored vegetables daily.
        • Hydration Standard: Drink 2.5 to 3 liters of clean water every day.
        • Gut Microbiome: Ingest probiotic-rich yogurt, fermented foods, and fiber.
        • Minimize Processed Sugars: Swap refined sugars with whole fruits and natural honey.
      `,
    },
  ];

  return (
    <section id="health-articles" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#1D82A6]/30 pb-6">
          <div>
            <span className="text-xs font-bold text-[#1D82A6] uppercase tracking-widest block mb-1">
              Stay Informed
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-extrabold text-[#0E526B]">
              Health Articles & Awareness
            </h2>
          </div>

          <a
            href="#health-articles"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1D82A6] hover:text-[#F59E0B] transition-colors group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Visual Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="gold-card-frame rounded-2xl bg-white overflow-hidden p-6 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Category & Read Time Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase text-[#0E526B] bg-[#EBF5F8] px-2.5 py-1 rounded-full border border-[#1D82A6]/30">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#F59E0B]" /> {item.readTime}
                    </span>
                  </div>

                  {/* Visual Header */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0E526B] text-[#F59E0B] flex items-center justify-center mb-4 group-hover:bg-[#1D82A6] group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif-apollo text-xl font-bold text-[#0E526B] group-hover:text-[#1D82A6] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#F59E0B] mt-1">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E526B]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6] relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#1D82A6] mb-2">
              <BookOpen className="w-4 h-4 text-[#F59E0B]" /> {selectedArticle.category} • {selectedArticle.readTime}
            </div>

            <h3 className="font-serif-apollo text-2xl sm:text-3xl font-extrabold text-[#0E526B]">
              {selectedArticle.title}
            </h3>
            <p className="text-sm font-semibold text-[#F59E0B] mt-1 mb-6">
              {selectedArticle.subtitle}
            </p>

            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-line bg-[#EBF5F8] p-5 rounded-2xl border border-[#1D82A6]/20">
              {selectedArticle.fullContent}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#0E526B] text-[#FEF3C7] hover:bg-[#1D82A6]"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
