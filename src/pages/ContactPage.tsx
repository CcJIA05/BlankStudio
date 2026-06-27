import { useState, useCallback, useEffect, useRef } from "react";
import ContactForm from "@/components/ContactForm/ContactForm";
import AdminToggle from "@/components/AdminToggle/AdminToggle";

import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ContactInfoItem {
  label: string;
  value: string;
  link: string | null;
}

interface SocialLink {
  name: string;
  url: string;
}

interface GuaranteeItem {
  title: string;
  desc: string;
}

interface ContactData {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
  guarantees: GuaranteeItem[];
}

const defaultData: ContactData = {
  contactInfo: [
    { label: "邮箱", value: "hello@blankstudio.cn", link: "mailto:hello@blankstudio.cn" },
    { label: "电话", value: "+86 138 0000 0000", link: "tel:+8613800000000" },
    { label: "地址", value: "广东 · 深圳", link: null },
    { label: "工作时间", value: "周一至周五 9:00-18:00", link: null },
  ],
  socialLinks: [
    { name: "Dribbble", url: "#" },
    { name: "Behance", url: "#" },
    { name: "站酷", url: "#" },
    { name: "LinkedIn", url: "#" },
  ],
  guarantees: [
    {
      title: "专业团队",
      desc: "拥有8年行业经验，服务80+客户，完成120+项目。",
    },
    {
      title: "快速响应",
      desc: "24小时内回复您的咨询，确保项目顺利推进。",
    },
    {
      title: "品质保证",
      desc: "每一个项目都经过严格的质量把控，确保交付品质。",
    },
  ],
};

const STORAGE_KEY = "blankstudio_contact";

const contactIcons = [Mail, Phone, MapPin, Clock];

function loadData(): ContactData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return JSON.parse(JSON.stringify(defaultData));
}

function restoreDefault(): ContactData {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(defaultData));
}

export default function ContactPage() {
  const [data, setData] = useState<ContactData>(loadData);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ContactData | null>(null);
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

  const updateContactInfo = (index: number, field: string, value: string) => {
    if (!draft) return;
    const nd = { ...draft, contactInfo: [...draft.contactInfo] };
    nd.contactInfo[index] = { ...nd.contactInfo[index], [field]: value };
    setDraft(nd);
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    if (!draft) return;
    const nd = { ...draft, socialLinks: [...draft.socialLinks] };
    nd.socialLinks[index] = { ...nd.socialLinks[index], [field]: value };
    setDraft(nd);
  };

  const updateGuarantee = (index: number, field: string, value: string) => {
    if (!draft) return;
    const nd = { ...draft, guarantees: [...draft.guarantees] };
    nd.guarantees[index] = { ...nd.guarantees[index], [field]: value };
    setDraft(nd);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-dark pt-24">
      <AdminToggle isEditing={editing} onEditModeChange={handleEditModeChange} />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
              联系我
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              让我们一起创造
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              无论您有什么设计需求，我都能帮助您实现。填写表单或通过以下方式联系我。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-display font-bold text-white mb-8">联系方式</h2>
                <div className="space-y-6">
                  {current.contactInfo.map((info, i) => {
                    const IconComponent = contactIcons[i];
                    return (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          {editing ? (
                            <div className="space-y-1">
                              <input
                                value={info.label}
                                onChange={(e) => updateContactInfo(i, "label", e.target.value)}
                                className="w-full text-gray-500 text-xs bg-transparent border-b border-primary/20 focus:outline-none"
                              />
                              <input
                                value={info.value}
                                onChange={(e) => updateContactInfo(i, "value", e.target.value)}
                                className="w-full text-white font-medium text-sm bg-transparent border-b border-primary/20 focus:outline-none"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="text-gray-500 text-sm mb-1">{info.label}</div>
                              {info.link ? (
                                <a
                                  href={info.link}
                                  className="text-white font-medium hover:text-primary transition-colors"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <span className="text-white font-medium">{info.value}</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12">
                  <h3 className="text-white font-medium mb-4">社交媒体</h3>
                  <div className="flex flex-wrap gap-4">
                    {current.socialLinks.map((link, i) => (
                      editing ? (
                        <div key={i} className="flex gap-1">
                          <input
                            value={link.name}
                            onChange={(e) => updateSocialLink(i, "name", e.target.value)}
                            className="w-20 px-2 py-2 bg-gray-800 border border-primary/20 rounded-lg text-sm text-white focus:outline-none"
                          />
                          <input
                            value={link.url}
                            onChange={(e) => updateSocialLink(i, "url", e.target.value)}
                            className="w-24 px-2 py-2 bg-gray-800 border border-primary/20 rounded-lg text-sm text-white focus:outline-none"
                          />
                        </div>
                      ) : (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-800 text-gray-400 text-sm rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                          {link.name}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-display font-bold text-white mb-8">发送消息</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {current.guarantees.map((item, i) => (
              <div key={item.title} className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✔</span>
                </div>
                {editing ? (
                  <div className="space-y-2">
                    <input
                      value={item.title}
                      onChange={(e) => updateGuarantee(i, "title", e.target.value)}
                      className="w-full text-center text-xl font-display font-semibold text-white bg-transparent border-b border-primary/20 focus:outline-none"
                    />
                    <textarea
                      value={item.desc}
                      onChange={(e) => updateGuarantee(i, "desc", e.target.value)}
                      rows={2}
                      className="w-full text-center text-gray-400 bg-transparent border border-primary/10 rounded-lg focus:outline-none focus:border-primary/30 resize-none text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-display font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              还不确定？先看看我的作品
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              浏览我的作品集，了解我过去的项目和设计风格。
            </p>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              查看作品集
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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