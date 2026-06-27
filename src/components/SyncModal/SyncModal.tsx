import { useState, useEffect } from "react";
import {
  Cloud,
  Upload,
  Download,
  X,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  getLastSyncTime,
  pushToCloud,
  pullFromCloud,
  loadAllLocalData,
  applySyncedData,
} from "@/utils/dataSync";

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated?: () => void;
}

export default function SyncModal({ isOpen, onClose, onDataUpdated }: SyncModalProps) {
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadLastSync();
    }
  }, [isOpen]);

  async function loadLastSync() {
    const time = await getLastSyncTime();
    if (time) {
      setLastSync(new Date(time).toLocaleString("zh-CN"));
    } else {
      setLastSync(null);
    }
  }

  function showStatus(type: "success" | "error" | "info", message: string) {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: "" }), 3000);
  }

  async function handlePush() {
    setLoading(true);
    const data = loadAllLocalData();
    const result = await pushToCloud(data);
    setLoading(false);
    if (result.success) {
      showStatus("success", result.message);
      loadLastSync();
    } else {
      showStatus("error", result.message);
    }
  }

  async function handlePull() {
    if (!confirm("确定要从云端同步数据吗？本地修改将被覆盖。")) return;
    setLoading(true);
    const result = await pullFromCloud();
    setLoading(false);
    if (result.success && result.data) {
      applySyncedData(result.data);
      showStatus("success", result.message);
      loadLastSync();
      onDataUpdated?.();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      showStatus("error", result.message);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-sm animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <Cloud className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">云端同步</h3>
            <p className="text-sm text-zinc-400">多设备数据同步</p>
          </div>
        </div>

        {status.type && (
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-6 ${
              status.type === "success"
                ? "bg-emerald-500/10 text-emerald-400"
                : status.type === "error"
                ? "bg-red-500/10 text-red-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : status.type === "error" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span className="text-sm">{status.message}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">上次同步</span>
            <span className="text-zinc-500">{lastSync || "从未同步"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePush}
              disabled={loading}
              className="flex flex-col items-center gap-2 px-4 py-4 bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 rounded-xl hover:bg-emerald-600/30 transition-all disabled:opacity-50"
            >
              <Upload className="w-5 h-5" />
              <span className="text-xs font-medium">推送到云端</span>
              <span className="text-xs text-emerald-600/60">上传本地数据</span>
            </button>
            <button
              onClick={handlePull}
              disabled={loading}
              className="flex flex-col items-center gap-2 px-4 py-4 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span className="text-xs font-medium">从云端拉取</span>
              <span className="text-xs text-blue-600/60">覆盖本地数据</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}