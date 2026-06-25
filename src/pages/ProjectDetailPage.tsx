import { useParams, Link } from 'react-router-dom';
import { projects, categoryNames } from '@/data/projects';
import { ArrowLeft, CheckCircle, Target, Lightbulb } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">项目不存在</h2>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            返回作品集
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24">
      <section className="py-12 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回作品集
          </Link>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
                {categoryNames[project.category]}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                {project.title}
              </h1>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-900 rounded-xl">
                <div>
                  <div className="text-gray-500 text-sm mb-2">客户</div>
                  <div className="text-white font-medium">{project.client}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-2">年份</div>
                  <div className="text-white font-medium">{project.year}</div>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] bg-gray-900 rounded-xl overflow-hidden">
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-8">项目概述</h2>
          <p className="text-gray-400 leading-relaxed max-w-4xl">
            {project.overview}
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white">挑战</h2>
              </div>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-400">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white">解决方案</h2>
              </div>
              <ul className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-secondary font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-400">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">
            项目成果
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.map((result, index) => (
              <div
                key={index}
                className="text-center p-8 bg-dark rounded-xl border border-gray-800"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-display font-bold text-white mb-2">
                  {result.value}
                </div>
                <div className="text-gray-400">{result.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-12">设计展示</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="aspect-video bg-gray-900 rounded-xl overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            查看更多项目
          </Link>
        </div>
      </section>
    </div>
  );
}