import { useState, type FormEvent } from 'react';
import { Send, Check } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', projectType: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            姓名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            placeholder="请输入您的姓名"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            邮箱
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            placeholder="请输入您的邮箱"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
          项目类型
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
        >
          <option value="">请选择项目类型</option>
          <option value="ui">UI设计</option>
          <option value="ux">UX设计</option>
          <option value="brand">品牌设计</option>
          <option value="web">Web设计</option>
          <option value="mobile">移动端设计</option>
          <option value="other">其他</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          项目描述
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="请简要描述您的项目需求..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitted}
        className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          isSubmitted
            ? 'bg-secondary text-white'
            : 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02]'
        }`}
      >
        {isSubmitted ? (
          <>
            <Check className="w-5 h-5" />
            发送成功！
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            发送消息
          </>
        )}
      </button>
    </form>
  );
}