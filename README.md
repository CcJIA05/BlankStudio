# BlankStudio - 使用指南

## 项目简介

BlankStudio 是一个个人设计工作室作品集网站，用于展示 UI/UX 设计作品、服务和专业能力。

- 框架：React 18 + TypeScript
- 构建工具：Vite
- 样式：Tailwind CSS
- 路由：React Router v6
- 部署：GitHub Pages

仓库地址：https://github.com/CcJIA05/BlankStudio.git

---

## 第一步：拉取代码

1. 打开 Codex 应用
2. 在对话框中输入：

    请帮我克隆 https://github.com/CcJIA05/BlankStudio.git 到本地

Codex 会自动执行 git clone，把代码下载到你的电脑。

---

## 第二步：安装依赖

对 Codex 说：

    请帮我安装项目依赖并启动开发服务器

Codex 会自动执行 pnpm install 安装所有依赖包，然后启动 Vite 开发服务器。

---

## 第三步：预览网站

服务器启动后，Codex 内置浏览器会自动打开 http://localhost:5173/BlankStudio/ ，你就可以预览网站了。

页面路由：

| 路径 | 内容 |
|------|------|
| / | 首页 |
| /about | 关于我 |
| /portfolio | 作品集 |
| /portfolio/:id | 作品详情 |
| /services | 服务 |
| /contact | 联系 |

---

## 第四步：编辑网站内容（无需改代码）

网站内置了密码保护的编辑功能，不需要懂代码就能修改内容。

### 作品集页面（/portfolio）

1. 点击页面上方的 **管理作品集** 按钮
2. 输入密码：**000822**，点击确认
3. 验证通过后，点击 **编辑作品** 进入编辑模式
4. 每张作品卡片悬停时，右上角出现编辑和删除图标
5. 点击 **添加作品** 可以新建作品
6. 点击 **一键恢复** 可以重置到原始数据
7. 编辑完成后点 **完成编辑**

编辑弹窗支持修改：标题、分类、客户、年份、简介、概述、挑战、解决方案、成果、图片、标签

### 关于 / 服务 / 联系页面

1. 在页面任意位置 **连续点击鼠标 5 次**（在 1.5 秒内）
2. 弹出密码输入框，输入 **000822**
3. 页面上出现 **编辑文字内容** 按钮，点击进入编辑
4. 所有文字变为可编辑的输入框
5. 底部工具栏：**[保存] [取消] [一键恢复]**

> 注意：修改后的内容会保存在浏览器的 localStorage 中，清除浏览器数据会丢失。如果想永久保存，可以对 Codex 说：请帮我把修改后的内容写回源代码文件

---

## 常见问题

### 页面显示乱码？

按 Ctrl + Shift + R 硬刷新浏览器，或对 Codex 说：

    页面中文显示乱码，请帮我检查

### 服务器启动失败？

    开发服务器启动失败，请帮我重新启动

---

## 项目结构速查

BlankStudio/
  index.html          # 入口 HTML
  src/
    main.tsx          # React 入口
    App.tsx           # 路由配置
    components/       # 组件
    pages/            # 页面
    data/             # 数据（作品、服务、技能）
    hooks/            # 自定义 Hook
    contexts/         # 认证上下文
  vite.config.ts      # Vite 配置
  tailwind.config.js  # 样式配置
  package.json        # 项目配置

---

## 常用的 Codex 指令

| 你想做什么 | 对 Codex 这样说 |
|----------|-----------|
| 拉取代码 | 请帮我克隆 https://github.com/CcJIA05/BlankStudio.git 到本地 |
| 启动项目 | 请帮我安装依赖并启动开发服务器 |
| 修改页面内容 | 请帮我修改 XXX 页面的文字为 YYY |
| 添加新功能 | 我想在网站上添加 XXX 功能 |
| 修改颜色样式 | 请帮我把主颜色改为 XXX |
| 修复 bug | 页面出现 XXX 问题，请帮我修复 |
| 部署到 GitHub | 请帮我部署到 GitHub Pages |
