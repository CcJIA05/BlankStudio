import { useState, useRef, useEffect, useCallback } from "react";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import AdminToggle from "@/components/AdminToggle/AdminToggle";
import { projects as originalProjects, categoryNames, type Project } from "@/data/projects";
import { Plus, Edit3, Trash2, Save, Undo2, X } from "lucide-react";

const categories = ["all", "ui", "ux", "brand", "web", "mobile"];
const STORAGE_KEY = "blankstudio_projects";

function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return JSON.parse(JSON.stringify(originalProjects));
}

function saveProjects(data: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreProjects(): Project[] {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(originalProjects));
}

interface EditModalProps {
  project: Project | null;
  onSave: (p: Project) => void;
  onClose: () => void;
}

const categoryOptions: { value: Project["category"]; label: string }[] = [
  { value: "ui", label: "UI" },
  { value: "ux", label: "UX" },
  { value: "brand", label: "品牌" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "移动端" },
];

const emptyProject = (): Project => ({
  id: "new-" + Date.now(),
  title: "",
  category: "web",
  client: "",
  year: new Date().getFullYear(),
  description: "",
  overview: "",
  challenges: [""],
  solutions: [""],
  results: [{ metric: "", value: "" }],
  images: [{ src: "", alt: "" }],
  tags: [""],
});

function EditModal({ project, onSave, onClose }: EditModalProps) {
  const isNew = !project;
  const [form, setForm] = useState<Project>(
    project ? JSON.parse(JSON.stringify(project)) : emptyProject()
  );

  const update = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (field: string, index: number, value: string) => {
    setForm((prev) => {
      const arr = [...(prev as unknown as Record<string, string[]>)[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: string) => {
    setForm((prev) => {
      const arr = [...(prev as unknown as Record<string, string[]>)[field], ""];
      return { ...prev, [field]: arr };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setForm((prev) => {
      const arr = (prev as unknown as Record<string, string[]>)[field].filter(
        (_, i) => i !== index
      );
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  };

  const updateResult = (
    index: number,
    key: "metric" | "value",
    value: string
  ) => {
    setForm((prev) => {
      const results = [...prev.results];
      results[index] = { ...results[index], [key]: value };
      return { ...prev, results };
    });
  };

  const addResult = () => {
    setForm((prev) => ({
      ...prev,
      results: [...prev.results, { metric: "", value: "" }],
    }));
  };

  const removeResult = (index: number) => {
    setForm((prev) => ({
      ...prev,
      results: prev.results.length > 1
        ? prev.results.filter((_, i) => i !== index)
        : [{ metric: "", value: "" }],
    }));
  };

  const updateImage = (
    index: number,
    key: "src" | "alt",
    value: string
  ) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[index] = { ...images[index], [key]: value };
      return { ...prev, images };
    });
  };

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { src: "", alt: "" }],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.length > 1
        ? prev.images.filter((_, i) => i !== index)
        : [{ src: "", alt: "" }],
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center p-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-2xl my-8 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-8">
          {isNew ? "添加作品" : "编辑作品"}
        </h3>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">
                标题 *
              </label>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">
                客户
              </label>
              <input
                value={form.client}
                onChange={(e) => update("client", e.target.value)}
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">
                分类
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  update("category", e.target.value as Project["category"])
                }
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">
                年份
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => update("year", Number(e.target.value))}
                className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">
              简介
            </label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">
              概述
            </label>
            <textarea
              value={form.overview}
              onChange={(e) => update("overview", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                挑战
              </label>
              <button
                onClick={() => addArrayItem("challenges")}
                className="text-xs text-primary hover:text-primary-light"
              >
                + 添加
              </button>
            </div>
            {form.challenges.map((c, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={c}
                  onChange={(e) => updateArrayItem("challenges", i, e.target.value)}
                  className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <button
                  onClick={() => removeArrayItem("challenges", i)}
                  className="px-2 text-zinc-600 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                解决方案
              </label>
              <button
                onClick={() => addArrayItem("solutions")}
                className="text-xs text-primary hover:text-primary-light"
              >
                + 添加
              </button>
            </div>
            {form.solutions.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={s}
                  onChange={(e) =>
                    updateArrayItem("solutions", i, e.target.value)
                  }
                  className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <button
                  onClick={() => removeArrayItem("solutions", i)}
                  className="px-2 text-zinc-600 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                结果
              </label>
              <button
                onClick={addResult}
                className="text-xs text-primary hover:text-primary-light"
              >
                + 添加
              </button>
            </div>
            {form.results.map((r, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={r.metric}
                  onChange={(e) => updateResult(i, "metric", e.target.value)}
                  placeholder="指标"
                  className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <input
                  value={r.value}
                  onChange={(e) => updateResult(i, "value", e.target.value)}
                  placeholder="值"
                  className="w-24 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <button
                  onClick={() => removeResult(i)}
                  className="px-2 text-zinc-600 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                图片
              </label>
              <button
                onClick={addImage}
                className="text-xs text-primary hover:text-primary-light"
              >
                + 添加
              </button>
            </div>
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={img.src}
                  onChange={(e) => updateImage(i, "src", e.target.value)}
                  placeholder="图片 URL"
                  className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <input
                  value={img.alt}
                  onChange={(e) => updateImage(i, "alt", e.target.value)}
                  placeholder="alt"
                  className="w-32 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="px-2 text-zinc-600 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                标签
              </label>
              <button
                onClick={() => addArrayItem("tags")}
                className="text-xs text-primary hover:text-primary-light"
              >
                + 添加
              </button>
            </div>
            {form.tags.map((t, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={t}
                  onChange={(e) => updateArrayItem("tags", i, e.target.value)}
                  className="flex-1 px-3 py-2 bg-black border border-white/10 rounded-lg text-sm text-white focus:border-primary/50 focus:outline-none"
                />
                <button
                  onClick={() => removeArrayItem("tags", i)}
                  className="px-2 text-zinc-600 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
          <button
            onClick={handleSubmit}
            disabled={!form.title.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            保存
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-zinc-400 rounded-xl hover:text-white hover:border-white/20 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [projectsData, setProjectsData] = useState<Project[]>(loadProjects);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleEditModeChange = useCallback((isEditing: boolean) => {
    if (isEditing) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
      setShowModal(false);
      setEditTarget(null);
    }
  }, []);

  const filtered = activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const handleSave = (p: Project) => {
    let updated: Project[];
    const exists = projectsData.find((x) => x.id === p.id);
    if (exists) {
      updated = projectsData.map((x) => (x.id === p.id ? p : x));
    } else {
      updated = [...projectsData, p];
    }
    setProjectsData(updated);
    saveProjects(updated);
    setShowModal(false);
    setEditTarget(null);
  };

  const handleDelete = (id: string) => {
    const updated = projectsData.filter((p) => p.id !== id);
    setProjectsData(updated);
    saveProjects(updated);
  };

  const handleRestore = () => {
    const original = restoreProjects();
    setProjectsData(original);
  };

  const openEdit = (p: Project) => {
    setEditTarget(p);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditTarget(null);
    setShowModal(true);
  };

  useEffect(() => {
    if (!isEditMode) return;
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
  }, [isEditMode, filtered]);

  return (
    <div ref={pageRef} className="min-h-screen bg-dark pt-24">
      <AdminToggle isEditing={isEditMode} onEditModeChange={handleEditModeChange} />
      {showModal && (
        <EditModal
          project={editTarget}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTarget(null); }}
        />
      )}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
              作品集
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              我的设计作品
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              探索我多年来的设计项目，了解我如何将创意转化为出色的数字体验。
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                {category === "all"
                  ? "全部"
                  : categoryNames[category] || category}
              </button>
            ))}

            {isEditMode && (
              <>
                <div className="w-px h-6 bg-white/10 mx-2" />
                <button
                  onClick={openAdd}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-full hover:bg-emerald-500 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  添加作品
                </button>
                <button
                  onClick={handleRestore}
                  className="flex items-center gap-1.5 px-4 py-2 border border-amber-500/30 text-amber-400 text-xs rounded-full hover:bg-amber-500/10 transition-all"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  一键恢复
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                className="animate-slide-up relative group/project"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PortfolioCard project={project} />
                {isEditMode && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/project:opacity-100 transition-opacity z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEdit(project);
                      }}
                      className="w-8 h-8 bg-zinc-800/90 backdrop-blur rounded-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-primary/80 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm("确定删除这件作品吗？")) handleDelete(project.id);
                      }}
                      className="w-8 h-8 bg-zinc-800/90 backdrop-blur rounded-lg flex items-center justify-center text-zinc-300 hover:text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-500">暂无该分类的项目</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}