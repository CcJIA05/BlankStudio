import Hero from '@/components/Hero/Hero';
import PortfolioCard from '@/components/PortfolioCard/PortfolioCard';
import { projects } from '@/data/projects';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = pageRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-black">
      <Hero />

      <section className="py-12 border-y border-white/5">
        <div className="overflow-hidden">
          <div className="marquee-track">
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">UI / UX DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">WEB DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">PPT DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">BRAND DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">UI / UX DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">WEB DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">PPT DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
            <span className="text-zinc-700 text-sm tracking-[0.3em] uppercase whitespace-nowrap mx-12">BRAND DESIGN</span>
            <span className="text-primary text-sm mx-4">◆</span>
          </div>
        </div>
      </section>

      <section id="work" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <span className="tag-pill text-xs text-zinc-500 tracking-[0.3em] uppercase mb-6">SELECTED WORK</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">精选作品</h2>
            </div>
            <Link
              to="/portfolio"
              className="link-underline text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={index % 2 === 1 ? 'md:mt-16' : ''}
              >
                <PortfolioCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-32 md:py-40 px-6 md:px-12 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12 md:gap-16">
            <div className="col-span-12 lg:col-span-5">
              <div className="reveal-left lg:sticky lg:top-32">
                <span className="tag-pill text-xs text-zinc-500 tracking-[0.3em] uppercase mb-6">ABOUT US</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">关于我们</h2>
                <div className="w-16 h-px bg-primary mb-8"></div>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  BlankStudio 是一家专注于数字产品体验设计的创意工作室。我们相信好的设计能够让想法产生真正的影响力。
                </p>
                <p className="text-zinc-500 text-base leading-relaxed mb-10">
                  从品牌视觉到产品界面，从PPT演示到网站设计，我们用专业的设计能力，帮助科技企业打造具有影响力的视觉表达。
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-4xl font-bold number-display mb-2">50+</div>
                    <div className="text-xs text-zinc-600 tracking-widest uppercase">Projects</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold number-display mb-2">30+</div>
                    <div className="text-xs text-zinc-600 tracking-widest uppercase">Clients</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold number-display mb-2">3</div>
                    <div className="text-xs text-zinc-600 tracking-widest uppercase">Years</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 space-y-6">
              <div className="reveal p-8 md:p-10 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <h3 className="text-lg font-semibold mb-8">我们擅长</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">
                    <span className="text-sm text-zinc-400">UI 设计</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">
                    <span className="text-sm text-zinc-400">Web 设计</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">
                    <span className="text-sm text-zinc-400">PPT 设计</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">
                    <span className="text-sm text-zinc-400">品牌设计</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal p-8 md:p-10 bg-zinc-900/50 border border-white/5 rounded-2xl" style={{ transitionDelay: '0.1s' }}>
                <h3 className="text-lg font-semibold mb-8">服务客户</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-zinc-900 rounded-xl flex items-center justify-center h-20">
                    <span className="text-zinc-600 text-sm font-medium">科技公司A</span>
                  </div>
                  <div className="p-5 bg-zinc-900 rounded-xl flex items-center justify-center h-20">
                    <span className="text-zinc-600 text-sm font-medium">互联网企业</span>
                  </div>
                  <div className="p-5 bg-zinc-900 rounded-xl flex items-center justify-center h-20">
                    <span className="text-zinc-600 text-sm font-medium">车企品牌</span>
                  </div>
                  <div className="p-5 bg-zinc-900 rounded-xl flex items-center justify-center h-20">
                    <span className="text-zinc-600 text-sm font-medium">金融科技</span>
                  </div>
                  <div className="p-5 bg-zinc-900 rounded-xl flex items-center justify-center h-20">
                    <span className="text-zinc-600 text-sm font-medium">教育平台</span>
                  </div>
                  <div className="p-5 bg-zinc-900 rounded-xl flex items-center justify-center h-20">
                    <span className="text-zinc-600 text-sm font-medium">医疗健康</span>
                  </div>
                </div>
              </div>

              <div className="reveal p-8 md:p-10 bg-zinc-900/50 border border-white/5 rounded-2xl" style={{ transitionDelay: '0.2s' }}>
                <h3 className="text-lg font-semibold mb-8">设计理念</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg font-bold">01</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">专业 Professional</span>
                      <p className="text-xs text-zinc-500 mt-1">以专业的设计能力，交付高质量的设计成果</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg font-bold">02</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">极简 Minimal</span>
                      <p className="text-xs text-zinc-500 mt-1">去掉多余的装饰，保留最核心的表达</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg font-bold">03</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">影响力 Impactful</span>
                      <p className="text-xs text-zinc-500 mt-1">让设计真正产生商业价值和影响力</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-20">
            <span className="tag-pill text-xs text-zinc-500 tracking-[0.3em] uppercase mb-6">OUR SERVICES</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">我们的服务</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800/30 rounded-3xl overflow-hidden border border-white/5">
            <div className="reveal p-10 bg-black group hover:bg-zinc-900/80 transition-all duration-700" style={{ transitionDelay: '0.1s' }}>
              <div className="w-14 h-14 mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">UI / UX 设计</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">以用户为中心的界面设计，打造极致的用户体验。</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• 移动端App设计</li>
                <li>• Web端界面设计</li>
                <li>• 用户体验优化</li>
                <li>• 交互原型设计</li>
              </ul>
            </div>

            <div className="reveal p-10 bg-black group hover:bg-zinc-900/80 transition-all duration-700" style={{ transitionDelay: '0.2s' }}>
              <div className="w-14 h-14 mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">网站设计</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">高端企业官网与产品网站，塑造品牌形象。</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• 企业官网设计</li>
                <li>• 产品网站设计</li>
                <li>• 活动专题页设计</li>
                <li>• 响应式适配</li>
              </ul>
            </div>

            <div className="reveal p-10 bg-black group hover:bg-zinc-900/80 transition-all duration-700" style={{ transitionDelay: '0.3s' }}>
              <div className="w-14 h-14 mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">PPT 设计</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">专业演示文稿设计，让演讲更有说服力。</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• 企业融资PPT</li>
                <li>• 产品发布PPT</li>
                <li>• 工作汇报PPT</li>
                <li>• 品牌宣讲PPT</li>
              </ul>
            </div>

            <div className="reveal p-10 bg-black group hover:bg-zinc-900/80 transition-all duration-700" style={{ transitionDelay: '0.4s' }}>
              <div className="w-14 h-14 mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"></div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">品牌设计</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">完整品牌视觉系统，建立独特品牌识别。</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>• Logo设计</li>
                <li>• VI视觉系统</li>
                <li>• 品牌手册</li>
                <li>• 物料设计</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 md:py-40 px-6 md:px-12 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-12 md:gap-16">
            <div className="col-span-12 lg:col-span-5">
              <div className="reveal-left">
                <span className="tag-pill text-xs text-zinc-500 tracking-[0.3em] uppercase mb-6">CONTACT</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">联系我们</h2>
                <div className="w-16 h-px bg-primary mb-8"></div>
                <p className="text-zinc-400 text-base leading-relaxed mb-12">
                  有项目想法？让我们一起让它产生影响力。
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-600 uppercase tracking-widest mb-1">Email</div>
                      <a href="mailto:hello@blankstudio.cn" className="text-sm hover:text-primary transition-colors">hello@blankstudio.cn</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-600 uppercase tracking-widest mb-1">Location</div>
                      <span className="text-sm">广东 · 深圳</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-600 uppercase tracking-widest mb-1">Working Hours</div>
                      <span className="text-sm">周一 - 周五, 9:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="reveal-right p-10 md:p-12 bg-zinc-900/50 border border-white/5 rounded-3xl" style={{ transitionDelay: '0.2s' }}>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-zinc-600 uppercase tracking-widest mb-3 block">姓名</label>
                      <input type="text" className="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:border-primary/30 transition-colors" placeholder="您的姓名" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-600 uppercase tracking-widest mb-3 block">邮箱</label>
                      <input type="email" className="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:border-primary/30 transition-colors" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-600 uppercase tracking-widest mb-3 block">项目类型</label>
                    <select className="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/30 transition-colors appearance-none">
                      <option value="" className="bg-black">选择服务类型</option>
                      <option value="ui" className="bg-black">UI / UX 设计</option>
                      <option value="web" className="bg-black">网站设计</option>
                      <option value="ppt" className="bg-black">PPT 设计</option>
                      <option value="brand" className="bg-black">品牌设计</option>
                      <option value="other" className="bg-black">其他</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-600 uppercase tracking-widest mb-3 block">项目描述</label>
                    <textarea rows={5} className="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:border-primary/30 transition-colors resize-none" placeholder="简单描述一下您的项目需求..."></textarea>
                  </div>

                  <button type="submit" className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black text-sm font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(124,92,252,0.4)]">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      发送消息
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
