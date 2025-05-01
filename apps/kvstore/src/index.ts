/**
 * Cloudflare Worker for storing and serving static HTML pages from KV storage
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * This worker allows you to:
 * 1. Upload HTML content via POST to /upload
 * 2. Retrieve HTML content via GET to /page/:id
 * 3. List all stored pages via GET to /list
 * 4. Delete a page via DELETE to /page/:id
 */

const INTRO_HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>HTML Pages KV Store</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        h1 { border-bottom: 1px solid #eee; padding-bottom: 10px; }
      </style>
    </head>
    <body>
      <h1>HTML Pages KV Store</h1>
      <p>这是一个使用Cloudflare Workers KV存储HTML页面的简单应用。</p>
      
      <h2>API 使用说明:</h2>
      <h3>上传HTML页面</h3>
      <pre>POST /upload
Content-Type: application/json

{
"html": "&lt;!DOCTYPE html&gt;&lt;html&gt;...&lt;/html&gt;"
}</pre>
      
      <h3>获取HTML页面</h3>
      <pre>GET /page/:id</pre>
      
      <h3>列出所有页面</h3>
      <pre>GET /list</pre>
      
      <h3>删除页面</h3>
      <pre>DELETE /page/:id</pre>
    </body>
  </html>
`;

export interface Env {
  HTML_PAGES: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // 处理首页请求，显示简单的使用说明
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(INTRO_HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // 上传HTML页面
    if (request.method === "POST" && url.pathname === "/upload") {
      try {
        const data = await request.json() as { html: string };
        const { html } = data;

        if (!html || typeof html !== "string") {
          return new Response(JSON.stringify({
            success: false,
            error: "Invalid HTML content"
          }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        const id = crypto.randomUUID();
        await env.HTML_PAGES.put(id, html);

        return new Response(JSON.stringify({
          success: true,
          id: id,
          url: `${url.origin}/page/${id}`
        }), { 
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
          success: false,
          error: "Failed to process request"
        }), { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // 获取HTML页面
    if (request.method === "GET" && url.pathname.startsWith("/page/")) {
      const id = url.pathname.split("/page/")[1];
      if (!id) {
        return new Response(JSON.stringify({
          success: false,
          error: "Invalid page ID"
        }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      const html = await env.HTML_PAGES.get(id);

      if (!html) {
        return new Response(JSON.stringify({
          success: false,
          error: "Page not found"
        }), { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // 列出所有页面
    if (request.method === "GET" && url.pathname === "/list") {
      const list = await env.HTML_PAGES.list();
      
      return new Response(JSON.stringify({
        success: true,
        pages: list.keys.map(key => ({
          id: key.name,
          url: `${url.origin}/page/${key.name}`
        }))
      }), { 
        headers: { "Content-Type": "application/json" }
      });
    }

    // 删除页面
    if (request.method === "DELETE" && url.pathname.startsWith("/page/")) {
      const id = url.pathname.split("/page/")[1];
      if (!id) {
        return new Response(JSON.stringify({
          success: false,
          error: "Invalid page ID"
        }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      // 检查页面是否存在
      const exists = await env.HTML_PAGES.get(id);
      if (!exists) {
        return new Response(JSON.stringify({
          success: false,
          error: "Page not found"
        }), { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }

      await env.HTML_PAGES.delete(id);
      
      return new Response(JSON.stringify({
        success: true,
        message: "Page deleted successfully"
      }), { 
        headers: { "Content-Type": "application/json" }
      });
    }

    // 处理未匹配的路由
    return new Response(JSON.stringify({
      success: false,
      error: "Not Found"
    }), { 
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  },
} satisfies ExportedHandler<Env>;
