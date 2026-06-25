import { skills, skillCategories } from '@/data/skills';

export default function SkillRadar() {
  const designSkills = skills.filter((s) => s.category === 'design');
  const toolSkills = skills.filter((s) => s.category === 'tools');
  const softSkills = skills.filter((s) => s.category === 'soft');

  const renderSkillBar = (skillList: typeof skills, category: string) => (
    <div className="mb-6">
      <h4 className="text-white font-medium mb-4">{skillCategories[category as keyof typeof skillCategories]}</h4>
      <div className="space-y-3">
        {skillList.map((skill) => (
          <div key={skill.name} className="group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400 text-sm">{skill.name}</span>
              <span className="text-gray-500 text-xs">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {renderSkillBar(designSkills, 'design')}
      {renderSkillBar(toolSkills, 'tools')}
      {renderSkillBar(softSkills, 'soft')}
    </div>
  );
}