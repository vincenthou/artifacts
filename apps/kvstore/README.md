# HTML Pages KV Store

这是一个使用Cloudflare Workers和KV存储来保存和检索静态HTML页面的应用。

## 功能特点

- 上传HTML页面到KV存储
- 通过唯一ID检索HTML页面
- 列出所有存储的页面
- 删除指定的页面

## 安装与配置

### 前提条件

- Node.js 16.17.0 或更高版本
- Cloudflare账户

### 安装步骤

1. 克隆此仓库
2. 安装依赖：
   ```bash
   npm install
   ```
3. 创建KV命名空间：
   ```bash
   npx wrangler kv namespace create HTML_PAGES
   ```
4. 更新`wrangler.jsonc`文件中的KV命名空间ID：
   ```json
   "kv_namespaces": [
     {
       "binding": "HTML_PAGES",
       "id": "<YOUR_KV_NAMESPACE_ID>"
     }
   ]
   ```

## 本地开发

```bash
npm run dev
```

## 部署

```bash
npm run deploy
```

## API使用说明

### 上传HTML页面

```
POST /upload
Content-Type: application/json

{
  "html": "<!DOCTYPE html><html>...</html>"
}
```

响应：

```json
{
  "success": true,
  "id": "生成的唯一ID",
  "url": "访问页面的URL"
}
```

### 获取HTML页面

```
GET /page/:id
```

### 列出所有页面

```
GET /list
```

响应：

```json
{
  "success": true,
  "pages": [
    {
      "id": "页面ID",
      "url": "页面URL"
    },
    ...
  ]
}
```

### 删除页面

```
DELETE /page/:id
```

响应：

```json
{
  "success": true,
  "message": "Page deleted successfully"
}
```

## 注意事项

- 确保在部署前已正确配置KV命名空间ID
- HTML内容大小限制为25MB（Cloudflare KV的限制）
- 此应用仅用于存储静态HTML页面，不支持动态内容