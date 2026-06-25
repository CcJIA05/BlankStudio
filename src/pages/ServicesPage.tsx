import { services } from '@/data/services';
import { Palette, Users, Sparkles, Globe, Smartphone, Box, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, typeof Palette> = {
  palette: Palette,
  users: Users,
  sparkles: Sparkles,
  globe: Globe,
  smartphone: Smartphone,
  box: Box,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark pt-24">
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
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="p-8 bg-gray-900 rounded-xl border border-gray-800 hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-800 pt-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-display font-bold text-white">
                        ¥{service.pricing[1].price.toLocaleString()}
                      </span>
                      <span className="text-gray-500">/{service.pricing[1].period}</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      基础套餐 ¥{service.pricing[0].price.toLocaleString()} | 完整套餐 ¥{service.pricing[2].price.toLocaleString()}
                    </p>
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
            准备好开始了吗？
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
    </div>
  );
}