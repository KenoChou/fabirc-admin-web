# Fabirc Admin Web (MVP)

React + TypeScript + Vite 搭建的内部管理平台前端 MVP。

## 功能覆盖

- 登录页：调用 `POST /api/v1/authentication/token` 获取 token。
- 主机资源列表/筛选：调用 `POST /api/v1/compute/resource/host/collect`。
- 主机监控详情：调用 `POST /api/v1/compute/resource/host/monitor/collect` 并通过 ECharts 展示。
- 预占管理：
  - 预占：`POST /api/v1/compute/resource/reserve/notify`
  - 释放：`POST /api/v1/compute/resource/reserve/release`（二次确认）
- 开通管理：
  - 开通：`POST /api/v1/compute/resource/host/open`
  - 查询：`POST /api/v1/compute/resource/host/open/query`
- 订单状态更新：`POST /api/v1/compute/resource/host/order/update`（二次确认）
- 管理员运维工具页：`/gpu/**`（仅 admin 可见）。
- 基础权限：`admin / normal`。

## 环境变量

复制并修改环境变量：

```bash
cp .env.example .env
```

`.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## 启动与构建

```bash
npm install
npm run dev
npm run build
npm run lint
```

## 鉴权与错误处理说明

- 使用 Zustand 存储 token / role / username。
- Axios 请求拦截器：当请求路径是 `/api/v1/compute/**` 时自动注入 `Bearer token`。
- Axios 响应拦截器：
  - 401 自动清理登录态并跳转 `/login`。
  - 其它错误统一使用 `antd` message 提示。
- 页面统一提供 loading / empty / retry 状态。

## 联调建议

1. 后端 CORS 放开前端域名（默认 `http://localhost:5173`）。
2. 登录接口返回格式建议：

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "token": "...",
    "role": "admin",
    "username": "alice"
  }
}
```

3. 若后端暂不返回 `role`，前端会使用登录表单角色作为兜底（便于演示权限）。

## 目录结构

见 `src/`：

- `router`：路由与守卫
- `layouts`：应用布局
- `pages`：业务页面
- `api`：Axios 与模块化接口
- `store`：登录态存储
- `components`：通用组件
- `types`：接口类型
