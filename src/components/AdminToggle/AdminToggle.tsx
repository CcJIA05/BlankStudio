import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, LogOut, Lock, Cloud } from "lucide-react";
import SyncModal from "@/components/SyncModal/SyncModal";

interface AdminToggleProps {
  isEditing?: boolean;
  onEditModeChange?: (editing: boolean) => void;
}

export default function AdminToggle({ isEditing, onEditModeChange }: AdminToggleProps) {
  const { isAuthenticated, openPasswordModal, logout } = useAuth();
  const [showSyncModal, setShowSyncModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <button
        onClick={openPasswordModal}
        className="fixed bottom-8 right-8 z-[70] flex items-center gap-2 px-4 py-2.5 bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-xs text-zinc-500 rounded-xl hover:border-primary/40 hover:text-primary transition-all shadow-lg"
      >
        <Lock className="w-3.5 h-3.5" />
        管理员登录
      </button>
    );
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[70] flex items-center gap-2 px-3 py-2 bg-zinc-900/90 backdrop-blur-xl border border-primary/30 rounded-xl shadow-lg">
        {isEditing !== undefined && onEditModeChange && (
          <button
            onClick={() => onEditModeChange(!isEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              isEditing
                ? "bg-primary text-white"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            {isEditing ? "完成编辑" : "编辑模式"}
          </button>
        )}
        <button
          onClick={() => setShowSyncModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-blue-400 transition-colors"
        >
          <Cloud className="w-3.5 h-3.5" />
          云端同步
        </button>
        <div className="w-px h-4 bg-white/10" />
        <button
          onClick={logout}
          className="flex items-center gap-1 px-2 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <LogOut className="w-3 h-3" />
          退出
        </button>
      </div>

      <SyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
      />
    </>
  );
}