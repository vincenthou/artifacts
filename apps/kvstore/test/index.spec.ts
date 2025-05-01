// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// 获取正确类型的Request
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

// 示例HTML内容
const sampleHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>测试页面</title>
</head>
<body>
  <h1>这是一个测试页面</h1>
  <p>用于测试Cloudflare Workers KV存储功能</p>
</body>
</html>
`;

describe('HTML Pages KV Store', () => {
  // 存储上传的页面ID，用于后续测试
  let pageId: string;

  // 单元测试风格 - 测试首页
  describe('首页', () => {
    it('访问首页应返回HTML使用说明 (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/');
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toContain('text/html');
      
      const text = await response.text();
      expect(text).toContain('HTML Pages KV Store');
      expect(text).toContain('API 使用说明');
    });
    
    it('访问首页应返回HTML使用说明 (集成测试风格)', async () => {
      const response = await SELF.fetch('https://example.com/');
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toContain('text/html');
      
      const text = await response.text();
      expect(text).toContain('HTML Pages KV Store');
      expect(text).toContain('API 使用说明');
    });
  });
  
  // 单元测试风格 - 测试上传功能
  describe('上传HTML页面', () => {
    it('应成功上传HTML页面并返回ID (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ html: sampleHtml })
      });
      
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(200);
      
      const data: any = await response.json();
      expect(data.success).toBe(true);
      expect(data.id).toBeDefined();
      expect(data.url).toContain(`/page/${data.id}`);
      
      // 保存ID用于后续测试
      pageId = data.id;
    });
    
    it('上传无效HTML内容应返回错误 (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ html: '' }) // 空HTML内容
      });
      
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(400);
      
      const data: any = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });
    
    it('应成功上传HTML页面并返回ID (集成测试风格)', async () => {
      const response = await SELF.fetch('https://example.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ html: sampleHtml })
      });
      
      expect(response.status).toBe(200);
      
      const data: any = await response.json();
      expect(data.success).toBe(true);
      expect(data.id).toBeDefined();
      expect(data.url).toContain(`/page/${data.id}`);
      
      // 如果pageId未设置，则使用此ID
      if (!pageId) {
        pageId = data.id;
      }
    });
  });
  
  // 单元测试风格 - 测试获取页面
  describe('获取HTML页面', () => {
    it('应成功获取已上传的HTML页面 (单元测试风格)', async () => {
      // 确保pageId已设置
      expect(pageId).toBeDefined();
      
      const request = new IncomingRequest(`http://example.com/page/${pageId}`);
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toContain('text/html');
      
      const html = await response.text();
      expect(html).toContain('测试页面');
      expect(html).toContain('用于测试Cloudflare Workers KV存储功能');
    });
    
    it('获取不存在的页面应返回404错误 (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/page/non-existent-id');
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(404);
      
      const data: any = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });
    
    it('应成功获取已上传的HTML页面 (集成测试风格)', async () => {
      // 确保pageId已设置
      expect(pageId).toBeDefined();
      
      const response = await SELF.fetch(`https://example.com/page/${pageId}`);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toContain('text/html');
      
      const html = await response.text();
      expect(html).toContain('测试页面');
      expect(html).toContain('用于测试Cloudflare Workers KV存储功能');
    });
  });
  
  // 单元测试风格 - 测试列出所有页面
  describe('列出所有页面', () => {
    it('应成功列出所有页面 (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/list');
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(200);
      
      const data: any = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.pages)).toBe(true);
      
      // 至少应该有一个页面（我们刚刚上传的）
      expect(data.pages.length).toBeGreaterThan(0);
      
      // 检查是否包含我们上传的页面
      const foundPage = data.pages.find((page: any) => page.id === pageId);
      expect(foundPage).toBeDefined();
      expect(foundPage.url).toContain(`/page/${pageId}`);
    });
    
    it('应成功列出所有页面 (集成测试风格)', async () => {
      const response = await SELF.fetch('https://example.com/list');
      
      expect(response.status).toBe(200);
      
      const data: any = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.pages)).toBe(true);
      
      // 至少应该有一个页面（我们刚刚上传的）
      expect(data.pages.length).toBeGreaterThan(0);
      
      // 检查是否包含我们上传的页面
      const foundPage = data.pages.find((page: any) => page.id === pageId);
      expect(foundPage).toBeDefined();
      expect(foundPage.url).toContain(`/page/${pageId}`);
    });
  });
  
  // 单元测试风格 - 测试删除页面
  describe('删除HTML页面', () => {
    it('应成功删除已上传的页面 (单元测试风格)', async () => {
      // 确保pageId已设置
      expect(pageId).toBeDefined();
      
      const request = new IncomingRequest(`http://example.com/page/${pageId}`, {
        method: 'DELETE'
      });
      
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(200);
      
      const data: any = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toContain('deleted');
      
      // 验证页面已被删除
      const getRequest = new IncomingRequest(`http://example.com/page/${pageId}`);
      const getCtx = createExecutionContext();
      const getResponse = await worker.fetch(getRequest, env, getCtx);
      await waitOnExecutionContext(getCtx);
      
      expect(getResponse.status).toBe(404);
    });
    
    it('删除不存在的页面应返回404错误 (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/page/non-existent-id', {
        method: 'DELETE'
      });
      
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(404);
      
      const data: any = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });
    
    it('应成功删除已上传的页面 (集成测试风格)', async () => {
      // 需要先上传一个新页面，因为之前的已被删除
      const uploadResponse = await SELF.fetch('https://example.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ html: sampleHtml })
      });
      
      const uploadData: any = await uploadResponse.json();
      const newPageId = uploadData.id;
      
      // 删除新上传的页面
      const deleteResponse = await SELF.fetch(`https://example.com/page/${newPageId}`, {
        method: 'DELETE'
      });
      
      expect(deleteResponse.status).toBe(200);
      
      const deleteData: any = await deleteResponse.json();
      expect(deleteData.success).toBe(true);
      expect(deleteData.message).toContain('deleted');
      
      // 验证页面已被删除
      const getResponse = await SELF.fetch(`https://example.com/page/${newPageId}`);
      expect(getResponse.status).toBe(404);
    });
  });
  
  // 测试无效路由
  describe('无效路由', () => {
    it('访问无效路由应返回404错误 (单元测试风格)', async () => {
      const request = new IncomingRequest('http://example.com/invalid-route');
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      
      expect(response.status).toBe(404);
      
      const data: any = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Not Found');
    });
    
    it('访问无效路由应返回404错误 (集成测试风格)', async () => {
      const response = await SELF.fetch('https://example.com/invalid-route');
      
      expect(response.status).toBe(404);
      
      const data: any = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Not Found');
    });
  });
});
