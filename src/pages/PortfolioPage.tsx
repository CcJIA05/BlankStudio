import { useState } from 'react';
import PortfolioCard from '@/components/PortfolioCard/PortfolioCard';
import { projects, categoryNames } from '@/data/projects';

const categories = ['all', 'ui', 'ux', 'brand', 'web', 'mobile'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark pt-24">
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

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category === 'all' ? '全部' : categoryNames[category]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PortfolioCard project={project} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-500">暂无该分类的项目</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}