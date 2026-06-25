import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { categoryNames } from '@/data/projects';
import { useEffect, useRef } from 'react';

interface PortfolioCardProps {
  project: Project;
  index?: number;
}

export default function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categoryLabel = categoryNames[project.category] || project.category;

  return (
    <Link
      to={`/portfolio/${project.id}`}
      className="group relative block"
    >
      <div
        ref={cardRef}
        className="reveal project-card relative rounded-2xl overflow-hidden bg-zinc-900"
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        <div className="aspect-[4/3] overflow-hidden relative rounded-2xl">
          <img
            src={project.images[0].src}
            alt={project.images[0].alt}
            className="card-img w-full h-full object-cover rounded-2xl"
          />
          <div className="card-overlay rounded-2xl" />
          <div className="card-info">
            <span className="text-xs text-primary tracking-widest uppercase mb-3 block">{categoryLabel}</span>
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-zinc-400">{project.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
