import { useState, useCallback, useEffect, useRef } from "react";
import AdminToggle from "@/components/AdminToggle/AdminToggle";

import { services as origServices, type Service } from "@/data/services";
import { Palette, Users, Sparkles, Globe, Smartphone, Box, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap: Record<string, typeof Palette> = {
  palette: Palette,
  users: Users,
  sparkles: Sparkles,
  globe: Globe,
  smartphone: Smartphone,
  box: Box,
};

const STORAGE_KEY = "blankstudio_services";

function loadData(): Service[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return JSON.parse(JSON.stringify(origServices));
}

function restoreDefault(): Service[] {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(origServices));
}

export default function ServicesPage() {
  const [data, setData] = useState<Service[]>(loadData);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Service[] | null>(null);
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

  const updateService = (index: number, field: string, value: unknown) => {
    if (!draft) return;
    const nd = [...draft];
    nd[index] = { ...nd[index], [field]: value };
    setDraft(nd);
  };

  const updateFeature = (serviceIndex: number, featIndex: number, value: string) => {
    if (!draft) return;
    const nd = [...draft];
    const features = [...nd[serviceIndex].features];
    features[featIndex] = value;
    nd[serviceIndex] = { ...nd[serviceIndex], features };
    setDraft(nd);
  };

  const updatePricing = (serviceIndex: number, priceIndex: number, field: string, value: string) => {
    if (!draft) return;
    const nd = [...draft];
    const pricing = [...nd[serviceIndex].pricing];
    pricing[priceIndex] = {
      ...pricing[priceIndex],
      [field]: field === "price" ? Number(value) : value,
    };
    nd[serviceIndex] = { ...nd[serviceIndex], pricing };
    setDraft(nd);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-dark pt-24">
      <AdminToggle isEditing={editing} onEditModeChange={handleEditModeChange} />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
              服务
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              我的服务
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              提供全方位的设计服务，帮助您打造出色的数字产品和品牌形象。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {current.map((service, si) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  {editing ? (
                    <input
                      value={service.title}
                      onChange={(e) => updateService(si, "title", e.target.value)}
                      className="w-full text-xl font-display font-semibold text-white mb-3 bg-transparent border-b border-primary/20 focus:outline-none"
                    />
                  ) : (
                    <h3 className="text-xl font-display font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                  )}
                  {editing ? (
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(si, "description", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 mb-6 bg-black/50 border border-primary/20 rounded-lg text-gray-400 text-sm focus:outline-none focus:border-primary/50 resize-none"
                    />
                  ) : (
                    <p className="text-gray-400 mb-6">{service.description}</p>
                  )}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {editing ? (
                          <input
                            value={feature}
                            onChange={(e) => updateFeature(si, fi, e.target.value)}
                            className="flex-1 bg-transparent border-b border-primary/10 focus:outline-none text-sm"
                          />
                        ) : (
                          feature
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-800 pt-6">
                    {editing ? (
                      <div className="space-y-2">
                        {service.pricing.map((p, pi) => (
                          <div key={pi} className="flex items-center gap-2 text-xs">
                            <input
                              value={p.package}
                              onChange={(e) => updatePricing(si, pi, "package", e.target.value)}
                              className="w-20 bg-transparent border-b border-primary/10 focus:outline-none text-gray-400"
                            />
                            <span className="text-gray-600">¥</span>
                            <input
                              type="number"
                              value={p.price}
                              onChange={(e) => updatePricing(si, pi, "price", e.target.value)}
                              className="w-20 bg-transparent border-b border-primary/10 focus:outline-none text-white text-right"
                            />
                            <span className="text-gray-600">/ {p.period}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-display font-bold text-white">
                            ¥{service.pricing[1].price.toLocaleString()}
                          </span>
                          <span className="text-gray-500">/{service.pricing[1].period}</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          基础套餐 ¥{service.pricing[0].price.toLocaleString()} | 完整套餐 ¥{service.pricing[2].price.toLocaleString()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            准备好了吗？
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            无论您有什么设计需求，我都能帮助您实现。让我们一起创造出色的数字体验。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              联系我
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 border border-gray-600 text-white font-medium rounded-lg hover:border-white hover:bg-white/5 transition-all"
            >
              查看作品集
            </Link>
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