import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, X } from "lucide-react";

export default function PasswordModal() {
  const { showPasswordModal, closePasswordModal, login } = useAuth();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  if (!showPasswordModal) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = login(input);
    if (!success) {
      setError("密码错误，请重试");
      setInput("");
    }
  };

  const handleClose = () => {
    setInput("");
    setError("");
    closePasswordModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-sm animate-fade-in-up shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
          <Lock className="w-6 h-6 text-primary" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">管理员验证</h3>
        <p className="text-sm text-zinc-400 mb-6">请输入密码以进入编辑模式</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            autoFocus
            placeholder="请输入密码"
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 transition-colors text-center tracking-widest text-lg"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={!input}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            确认
          </button>
        </form>
      </div>
    </div>
  );
}
