import ContactForm from '@/components/ContactForm/ContactForm';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const contactInfo = [
  { icon: Mail, label: '邮箱', value: 'hello@designer.com', link: 'mailto:hello@designer.com' },
  { icon: Phone, label: '电话', value: '+86 138 0000 0000', link: 'tel:+8613800000000' },
  { icon: MapPin, label: '地址', value: '北京市朝阳区设计大厦', link: null },
  { icon: Clock, label: '工作时间', value: '周一至周五 9:00-18:00', link: null },
];

const socialLinks = [
  { name: 'Dribbble', url: '#' },
  { name: 'Behance', url: '#' },
  { name: '站酷', url: '#' },
  { name: 'LinkedIn', url: '#' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark pt-24">
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
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
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
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-white font-medium mb-4">社交媒体</h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-gray-400 text-sm rounded-lg hover:bg-primary hover:text-white transition-all"
                      >
                        {link.name}
                      </a>
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
            {[
              {
                title: '专业团队',
                desc: '拥有8年行业经验，服务80+客户，完成120+项目。',
              },
              {
                title: '快速响应',
                desc: '24小时内回复您的咨询，确保项目顺利推进。',
              },
              {
                title: '品质保证',
                desc: '每一个项目都经过严格的质量把控，确保交付品质。',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
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
    </div>
  );
}