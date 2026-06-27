import { useState, useCallback, useEffect, useRef } from "react";
import SkillRadar from "@/components/SkillRadar/SkillRadar";
import AdminToggle from "@/components/AdminToggle/AdminToggle";

import { achievements as origAchievements, testimonials as origTestimonials } from "@/data/skills";
import { Quote, Award, Users, Clock, Trophy } from "lucide-react";

const achievementIcons = [Clock, Award, Users, Trophy];

const STORAGE_KEY = "blankstudio_about";

interface AboutData {
  intro: string[];
  achievements: typeof origAchievements;
  testimonials: typeof origTestimonials;
}

const defaultData: AboutData = {
  intro: [
    "我是一名资深UI/UX设计师，拥有8年的行业经验。在这段时间里，我有幸参与了120+项目，服务了80+客户，涵盖电商、金融、健康、教育等多个领域。",
    "我的设计理念是：好的设计不仅要美观，更要能够解决问题、创造价值。我相信，每一个设计决策都应基于用户需求和商业目标，通过深入的研究和分析，设计出真正满足用户需求的解决方案。",
    "在工作中，我注重细节，追求完美。优秀的设计来自于对细节的关注和对品质的追求。同时，我也非常重视团队协作，善于与产品经理、开发人员沟通，确保设计方案能够顺利落地。",
  ],
  achievements: origAchievements,
  testimonials: origTestimonials,
};

function loadData(): AboutData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return JSON.parse(JSON.stringify(defaultData));
}

function restoreDefault(): AboutData {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(defaultData));
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData>(loadData);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<AboutData | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const els = pageRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleEditModeChange = useCallback((isEditingMode: boolean) => {
    if (isEditingMode) {
      setDraft(JSON.parse(JSON.stringify(data)));
      setEditing(true);
    } else {
      setDraft(null);
      setEditing(false);
    }
  }, [data]);

  const handleSave = useCallback(() => {
    if (!draft) return;
    setData(draft);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setDraft(null);
    setEditing(false);
  }, [draft]);

  const handleRestore = useCallback(() => {
    const original = restoreDefault();
    setData(original);
    setDraft(original);
  }, []);

  const current = editing && draft ? draft : data;

  const updateIntro = (index: number, value: string) => {
    if (!draft) return;
    const newIntro = [...draft.intro];
    newIntro[index] = value;
    setDraft({ ...draft, intro: newIntro });
  };

  const updateAchievement = (
    index: number,
    field: "label" | "value" | "suffix",
    val: string
  ) => {
    if (!draft) return;
    const ach = [...draft.achievements];
    ach[index] = { ...ach[index], [field]: val };
    setDraft({ ...draft, achievements: ach });
  };

  const updateTestimonial = (
    index: number,
    field: "content" | "author" | "role" | "company",
    val: string
  ) => {
    if (!draft) return;
    const tms = [...draft.testimonials];
    tms[index] = { ...tms[index], [field]: val };
    setDraft({ ...draft, testimonials: tms });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-dark pt-24">
      <AdminToggle isEditing={editing} onEditModeChange={handleEditModeChange} />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center">
                  <div className="w-full h-full bg-dark rounded-lg flex items-center justify-center border border-gray-700">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-6xl font-display font-bold text-primary">D</span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        Designer
                      </h3>
                      <p className="text-gray-400">UI/UX设计师 | 品牌设计师</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 bg-primary rounded-xl text-white">
                <div className="text-4xl font-display font-bold">8+</div>
                <div className="text-sm opacity-80">年设计经验</div>
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
                关于我
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                用设计创造
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  有意义的体验
                </span>
              </h1>

              {current.intro.map((text, i) => (
                <div key={i} className="relative group/intro">
                  {editing ? (
                    <textarea
                      value={text}
                      onChange={(e) => updateIntro(i, e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 mb-6 bg-zinc-900/50 border border-primary/20 rounded-xl text-gray-400 leading-relaxed text-sm focus:outline-none focus:border-primary/50 resize-none"
                    />
                  ) : (
                    <p className="text-gray-400 mb-6 leading-relaxed">{text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
              成就数据
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              专业成就
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              多年积累的专业经验和成果，为您的项目提供可靠保障。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {current.achievements.map((item, index) => {
              const IconComponent = achievementIcons[index];
              return (
                <div
                  key={item.label}
                  className="text-center p-8 bg-dark rounded-xl border border-gray-800 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  {editing ? (
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <input
                          value={item.value}
                          onChange={(e) => updateAchievement(index, "value", e.target.value)}
                          className="w-16 text-center text-5xl font-display font-bold text-white bg-transparent border-b border-primary/30 focus:outline-none"
                        />
                        <input
                          value={item.suffix}
                          onChange={(e) => updateAchievement(index, "suffix", e.target.value)}
                          className="w-16 text-center text-3xl text-primary bg-transparent border-b border-primary/30 focus:outline-none"
                        />
                      </div>
                      <input
                        value={item.label}
                        onChange={(e) => updateAchievement(index, "label", e.target.value)}
                        className="w-full text-center text-gray-400 bg-transparent border-b border-primary/20 focus:outline-none text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="text-5xl font-display font-bold text-white mb-2">
                        {item.value}
                        <span className="text-primary text-3xl">{item.suffix}</span>
                      </div>
                      <div className="text-gray-400">{item.label}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
              专业技能
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              技能专长
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              全面的设计技能和工具掌握，确保为您提供高质量的设计服务。
            </p>
          </div>

          <SkillRadar />
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
              客户评价
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              他们怎么说
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              来自客户的真实评价，是我最好的名片。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {current.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-dark rounded-xl border border-gray-800"
              >
                <Quote className="w-10 h-10 text-primary mb-6" />
                {editing ? (
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => updateTestimonial(index, "content", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 mb-6 bg-zinc-900/50 border border-primary/20 rounded-lg text-gray-300 leading-relaxed text-sm focus:outline-none focus:border-primary/50 resize-none"
                  />
                ) : (
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-display font-bold">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    {editing ? (
                      <div className="space-y-1">
                        <input
                          value={testimonial.author}
                          onChange={(e) => updateTestimonial(index, "author", e.target.value)}
                          className="w-full text-white font-medium bg-transparent border-b border-primary/20 focus:outline-none text-sm"
                        />
                        <input
                          value={`${testimonial.role} @ ${testimonial.company}`}
                          onChange={(e) => {
                            const parts = e.target.value.split(" @ ");
                            if (parts.length === 2) {
                              const nd = { ...draft! };
                              nd.testimonials[index].role = parts[0];
                              nd.testimonials[index].company = parts[1];
                              setDraft(nd);
                            }
                          }}
                          className="w-full text-gray-500 text-xs bg-transparent border-b border-primary/20 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="text-white font-medium">{testimonial.author}</div>
                        <div className="text-gray-500 text-sm">
                          {testimonial.role} @ {testimonial.company}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editing && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-zinc-900/95 backdrop-blur-xl border border-primary/30 rounded-xl shadow-lg">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-all"
          >
            保存修改
          </button>
          <button
            onClick={handleRestore}
            className="px-4 py-2 border border-amber-500/30 text-amber-400 text-xs rounded-lg hover:bg-amber-500/10 transition-all"
          >
            恢复默认
          </button>
        </div>
      )}
    </div>
  );
}