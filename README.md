# BlankStudio - 个人设计工作室作品集网站

## 项目简介

BlankStudio 是一个现代化的个人设计工作室作品集网站，用于展示 UI/UX 设计作品、服务和专业能力。

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS 3
- **路由**: React Router v6
- **图标**: Lucide React
- **部署**: GitHub Pages

---

## 快速开始

### 前置条件

- Node.js >= 20.x
- pnpm >= 8.x

### 1. 克隆项目

```bash
git clone https://github.com/CcJIA05/BlankStudio.git
cd BlankStudio
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm run dev
```

访问 http://localhost:5173/BlankStudio/ 预览网站。

### 4. 构建生产版本

```bash
pnpm run build
```

构建产物输出到 `dist/` 目录。

### 5. 预览生产版本

```bash
pnpm run preview
```

---

## 页面路由

| 路径 | 内容 | 说明 |
|------|------|------|
| `/` | 首页 | Hero、精选作品、关于、服务、联系 |
| `/about` | 关于我 | 个人介绍、成就、评价、技能雷达 |
| `/portfolio` | 作品集 | 作品列表、分类筛选、编辑功能 |
| `/portfolio/:id` | 作品详情 | 单个作品的详细展示 |
| `/services` | 服务 | 服务项目介绍 |
| `/contact` | 联系 | 联系方式、表单、保障 |

---

## 管理员功能

网站内置密码保护的编辑功能，无需代码即可修改内容。

### 登录

1. 点击页面右下角 **管理员登录** 按钮
2. 输入密码：`000822`
3. 登录后显示：编辑模式、云端同步、退出按钮

### 编辑模式

登录后点击 **编辑模式** 进入编辑状态：
- 所有文本内容变为可编辑输入框
- 底部出现 **保存修改** 和 **恢复默认** 按钮
- 点击 **完成编辑** 退出编辑模式

### 云端同步

点击 **云端同步** 按钮：
- **推送到云端**: 将本地修改上传到 GitHub Gist
- **从云端拉取**: 同步云端数据到本地（会覆盖本地修改）

#### 配置同步 Token

1. 登录后在浏览器控制台执行：
```javascript
localStorage.setItem('blankstudio_sync_token', '你的GitHub Personal Access Token')
```

2. Token 需要具有 `gist` 权限

---

## 测试用例

### 功能测试清单

| 测试项 | 测试步骤 | 预期结果 |
|--------|----------|----------|
| 首页加载 | 访问 `/` | 页面正常显示，无白屏 |
| 导航切换 | 点击各导航项 | URL 和内容正确切换 |
| 管理员登录 | 点击登录按钮，输入密码 | 登录成功，显示编辑按钮 |
| 编辑模式 | 点击编辑模式 | 内容变为可编辑状态 |
| 保存修改 | 修改内容后点击保存 | 修改保存到 localStorage |
| 恢复默认 | 点击恢复默认 | 内容恢复为初始状态 |
| 云端同步弹窗 | 点击云端同步 | 弹窗正常弹出 |
| 作品集编辑 | 在作品页进入编辑模式 | 可添加/编辑/删除作品 |
| 云端推送 | 点击推送到云端 | 数据上传成功提示 |
| 云端拉取 | 点击从云端拉取 | 数据同步成功，页面刷新 |

### 响应式测试

| 设备 | 分辨率 | 测试项 |
|------|--------|--------|
| 桌面端 | >= 1024px | 完整布局、hover 效果 |
| 平板 | 768px - 1023px | 布局自适应 |
| 移动端 | < 768px | 移动端菜单、触摸交互 |

---

## 编译验证

### TypeScript 检查

```bash
pnpm run build
```

确保无编译错误。

### ESLint 检查

```bash
pnpm run lint
```

确保代码符合规范。

---

## 项目结构

```
BlankStudio/
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages 自动部署
├── src/
│   ├── components/         # 公共组件
│   │   ├── AdminToggle/    # 管理员控制按钮
│   │   ├── ContactForm/    # 联系表单
│   │   ├── EditToolbar/    # 编辑工具栏
│   │   ├── Footer/         # 页脚
│   │   ├── Header/         # 导航头部
│   │   ├── Hero/           # 首页主视觉
│   │   ├── PasswordModal/  # 密码弹窗
│   │   ├── PortfolioCard/  # 作品卡片
│   │   ├── SkillRadar/     # 技能雷达图
│   │   └── SyncModal/      # 云端同步弹窗
│   ├── contexts/           # React Context
│   │   └── AuthContext.tsx # 认证状态管理
│   ├── data/               # 静态数据
│   │   ├── projects.ts     # 作品数据
│   │   ├── services.ts     # 服务数据
│   │   └── skills.ts       # 技能数据
│   ├── hooks/              # 自定义 Hook
│   │   ├── useClickAuth.ts # 点击认证（兼容旧版本）
│   │   └── useScroll.ts    # 滚动监听
│   ├── pages/              # 页面组件
│   │   ├── AboutPage.tsx   # 关于页
│   │   ├── ContactPage.tsx # 联系页
│   │   ├── HomePage.tsx    # 首页
│   │   ├── PortfolioPage.tsx # 作品集页
│   │   ├── ProjectDetailPage.tsx # 作品详情页
│   │   └── ServicesPage.tsx # 服务页
│   ├── utils/              # 工具函数
│   │   ├── dataSync.ts     # 云端同步逻辑
│   │   └── logoUtils.ts    # Logo 工具
│   ├── App.tsx             # 路由配置
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── .gitignore              # Git 忽略配置
├── index.html              # HTML 入口
├── package.json            # 项目配置
├── pnpm-lock.yaml          # 依赖锁定
├── vite.config.ts          # Vite 配置
├── tailwind.config.js      # Tailwind 配置
├── postcss.config.js       # PostCSS 配置
└── tsconfig.json           # TypeScript 配置
```

---

## 部署说明

### GitHub Pages 自动部署

项目配置了 GitHub Actions，推送代码到 `main` 分支后自动部署：

1. 确保 `package.json` 中 `homepage` 字段正确
2. 推送代码到 GitHub
3. GitHub Actions 自动构建并部署到 GitHub Pages

### 手动部署

```bash
pnpm run deploy
```

---

## 技术特性

- **响应式设计**: 适配桌面端和移动端
- **滚动动画**: IntersectionObserver 实现滚动触发动画
- **暗色主题**: 统一的深色视觉风格
- **数据持久化**: localStorage 本地存储
- **云端同步**: GitHub Gist API 多设备数据同步
- **权限控制**: 密码保护的管理员功能

---

## 常见问题

### Q: 页面显示乱码？
A: 按 Ctrl + Shift + R 硬刷新浏览器，或检查字符编码。

### Q: 编辑功能不生效？
A: 确保已登录管理员账号，检查浏览器 localStorage 是否被禁用。

### Q: 云端同步失败？
A: 检查 GitHub Token 是否正确配置，确保网络正常。

### Q: 开发服务器启动失败？
A: 确保 Node.js >= 20，尝试重新安装依赖：`pnpm install`。

---

## 许可证

MIT License
