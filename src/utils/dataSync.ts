const GIST_ID_KEY = "blankstudio_gist_id";
const SYNC_TOKEN_KEY = "blankstudio_sync_token";
const LAST_SYNC_KEY = "blankstudio_last_sync";

interface SyncData {
  projects?: unknown;
  services?: unknown;
  about?: unknown;
  contact?: unknown;
}

export async function getGistId(): Promise<string | null> {
  try {
    return localStorage.getItem(GIST_ID_KEY);
  } catch {
    return null;
  }
}

export async function setGistId(id: string): Promise<void> {
  localStorage.setItem(GIST_ID_KEY, id);
}

export async function getSyncToken(): Promise<string | null> {
  try {
    return localStorage.getItem(SYNC_TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export async function setSyncToken(token: string): Promise<void> {
  localStorage.setItem(SYNC_TOKEN_KEY, token);
}

export async function getLastSyncTime(): Promise<number | null> {
  try {
    const val = localStorage.getItem(LAST_SYNC_KEY);
    return val ? parseInt(val, 10) : null;
  } catch {
    return null;
  }
}

function setLastSyncTime(): void {
  localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
}

async function fetchGist(gistId: string, token: string): Promise<any> {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function updateGist(gistId: string, token: string, content: string): Promise<void> {
  await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        "blankstudio-data.json": {
          content,
        },
      },
    }),
  });
}

async function createGist(token: string, content: string): Promise<string> {
  const response = await fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: "BlankStudio website data",
      public: false,
      files: {
        "blankstudio-data.json": {
          content,
        },
      },
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.id;
}

export async function pushToCloud(data: SyncData): Promise<{ success: boolean; message: string }> {
  const token = await getSyncToken();
  if (!token) {
    return { success: false, message: "请先设置同步Token" };
  }

  try {
    const content = JSON.stringify(data, null, 2);
    let gistId = await getGistId();

    if (!gistId) {
      gistId = await createGist(token, content);
      await setGistId(gistId);
      setLastSyncTime();
      return { success: true, message: "已创建新的云端数据" };
    }

    await updateGist(gistId, token, content);
    setLastSyncTime();
    return { success: true, message: "数据已同步到云端" };
  } catch (error) {
    return { success: false, message: "同步失败，请检查Token是否正确" };
  }
}

export async function pullFromCloud(): Promise<{ success: boolean; data: SyncData | null; message: string }> {
  const token = await getSyncToken();
  const gistId = await getGistId();

  if (!token) {
    return { success: false, data: null, message: "请先设置同步Token" };
  }

  if (!gistId) {
    return { success: false, data: null, message: "请先推送一次数据创建云端存储" };
  }

  try {
    const gist = await fetchGist(gistId, token);
    const file = gist.files["blankstudio-data.json"];
    if (!file) {
      return { success: false, data: null, message: "云端数据文件不存在" };
    }

    const data = JSON.parse(file.content);
    setLastSyncTime();
    return { success: true, data, message: "已从云端获取最新数据" };
  } catch (error) {
    return { success: false, data: null, message: "获取失败，请检查网络和Token" };
  }
}

export async function deleteSyncToken(): Promise<void> {
  localStorage.removeItem(SYNC_TOKEN_KEY);
  localStorage.removeItem(GIST_ID_KEY);
}

export function loadAllLocalData(): SyncData {
  const data: SyncData = {};
  
  try {
    const projects = localStorage.getItem("blankstudio_projects");
    if (projects) data.projects = JSON.parse(projects);
  } catch {}

  try {
    const services = localStorage.getItem("blankstudio_services");
    if (services) data.services = JSON.parse(services);
  } catch {}

  try {
    const about = localStorage.getItem("blankstudio_about");
    if (about) data.about = JSON.parse(about);
  } catch {}

  try {
    const contact = localStorage.getItem("blankstudio_contact");
    if (contact) data.contact = JSON.parse(contact);
  } catch {}

  return data;
}

export function applySyncedData(data: SyncData): void {
  if (data.projects) {
    localStorage.setItem("blankstudio_projects", JSON.stringify(data.projects));
  }
  if (data.services) {
    localStorage.setItem("blankstudio_services", JSON.stringify(data.services));
  }
  if (data.about) {
    localStorage.setItem("blankstudio_about", JSON.stringify(data.about));
  }
  if (data.contact) {
    localStorage.setItem("blankstudio_contact", JSON.stringify(data.contact));
  }
}