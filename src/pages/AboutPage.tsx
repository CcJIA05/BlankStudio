import SkillRadar from '@/components/SkillRadar/SkillRadar';
import { achievements, testimonials } from '@/data/skills';
import { Quote, Award, Users, Clock, Trophy } from 'lucide-react';

const achievementIcons = [Clock, Award, Users, Trophy];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark pt-24">
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
              <p className="text-gray-400 mb-6 leading-relaxed">
                我是一名资深UI/UX设计师，拥有8年的行业经验。在这段时间里，我有幸参与了120+项目，服务了80+客户，涵盖电商、金融、健康、教育等多个领域。
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                我的设计理念是：好的设计不仅要美观，更要能够解决问题、创造价值。我相信，每一个设计决策都应该基于用户需求和商业目标，通过深入的研究和分析，设计出真正满足用户需求的解决方案。
              </p>
              <p className="text-gray-400 leading-relaxed">
                在工作中，我注重细节，追求完美。我相信，优秀的设计来自于对细节的关注和对品质的追求。同时，我也非常重视团队协作，善于与产品经理、开发人员沟通，确保设计方案能够顺利落地。
              </p>
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
            {achievements.map((item, index) => {
              const IconComponent = achievementIcons[index];
              return (
                <div
                  key={item.label}
                  className="text-center p-8 bg-dark rounded-xl border border-gray-800 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-5xl font-display font-bold text-white mb-2">
                    {item.value}
                    <span className="text-primary text-3xl">{item.suffix}</span>
                  </div>
                  <div className="text-gray-400">{item.label}</div>
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
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-dark rounded-xl border border-gray-800"
              >
                <Quote className="w-10 h-10 text-primary mb-6" />
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-display font-bold">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}