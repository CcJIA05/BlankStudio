import { Save, X, Undo2 } from "lucide-react";

interface EditToolbarProps {
  onSave: () => void;
  onCancel: () => void;
  onRestore: () => void;
}

export default function EditToolbar({
  onSave,
  onCancel,
  onRestore,
}: EditToolbarProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-6 py-3 bg-zinc-900/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl shadow-primary/10 animate-fade-in-up">
      <div className="flex items-center gap-1.5 mr-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-zinc-400 tracking-wider">编辑模式</span>
      </div>
      <div className="w-px h-5 bg-white/10" />
      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-medium rounded-xl hover:bg-primary/90 transition-all"
      >
        <Save className="w-3.5 h-3.5" />
        保存
      </button>
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 px-4 py-2 border border-white/10 text-zinc-400 text-xs rounded-xl hover:text-white hover:border-white/20 transition-all"
      >
        <X className="w-3.5 h-3.5" />
        取消
      </button>
      <button
        onClick={onRestore}
        className="flex items-center gap-1.5 px-4 py-2 border border-amber-500/20 text-amber-400 text-xs rounded-xl hover:bg-amber-500/10 transition-all"
      >
        <Undo2 className="w-3.5 h-3.5" />
        一键恢复
      </button>
    </div>
  );
}
