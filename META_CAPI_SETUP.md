# Meta Conversions API (CAPI) 集成指南

本指南将帮助您设置 Meta Conversions API，使用 AWS Lambda 作为后端服务器。

## 📋 前置要求

1. Meta Business Manager 账户
2. Meta Pixel ID
3. Meta Conversions API Access Token
4. AWS 账户
5. AWS CLI 已配置

## 🔧 步骤 1: 获取 Meta 凭证

### 1.1 获取 Meta Pixel ID

1. 登录 [Meta Business Manager](https://business.facebook.com/)
2. 进入 **Events Manager**
3. 选择或创建您的 Pixel
4. 复制 **Pixel ID**（格式：15位数字）

### 1.2 获取 Conversions API Access Token

1. 在 Events Manager 中，选择您的 Pixel
2. 点击 **Settings** → **Conversions API**
3. 点击 **Generate Access Token**
4. 复制生成的 **Access Token**（保存好，只显示一次）

### 1.3 获取测试事件代码（可选，用于测试）

1. 在 Events Manager 中，点击 **Test Events**
2. 复制 **Test Event Code**

## 🚀 步骤 2: 部署 AWS Lambda 函数

### 2.1 创建 Lambda 函数

1. 登录 AWS Console
2. 进入 **Lambda** 服务
3. 点击 **Create function**
4. 选择 **Author from scratch**
5. 配置：
   - **Function name**: `meta-capi-handler`
   - **Runtime**: Node.js 20.x 或更高版本
   - **Architecture**: x86_64

### 2.2 上传代码

1. 将 `lambda/meta-capi-handler.js` 的内容复制到 Lambda 函数代码编辑器
2. 点击 **Deploy**

### 2.3 配置环境变量

在 Lambda 函数的 **Configuration** → **Environment variables** 中添加：

```
META_PIXEL_ID = 您的Pixel ID（例如：123456789012345）
META_ACCESS_TOKEN = 您的Access Token
META_TEST_EVENT_CODE = 您的测试事件代码（可选，测试时使用）
```

### 2.4 配置函数权限

1. 进入 **Configuration** → **Permissions**
2. 确保 Lambda 有执行权限（通常已自动创建）

## 🌐 步骤 3: 创建 API Gateway

### 3.1 创建 REST API

1. 进入 AWS **API Gateway** 服务
2. 点击 **Create API**
3. 选择 **REST API** → **Build**
4. 配置：
   - **API name**: `meta-capi-api`
   - **Endpoint Type**: Regional

### 3.2 创建资源和方法

1. 点击 **Actions** → **Create Resource**
   - **Resource Name**: `events`
   - **Resource Path**: `events`
2. 选择 `/events` 资源，点击 **Actions** → **Create Method**
   - 选择 **POST**
   - 设置：
     - **Integration type**: Lambda Function
     - **Lambda Function**: `meta-capi-handler`
     - 启用 **Lambda Proxy Integration**

### 3.3 配置 CORS

1. 选择 `/events` 资源
2. 点击 **Actions** → **Enable CORS**
3. 配置：
   - **Access-Control-Allow-Origin**: `*`（生产环境建议使用具体域名）
   - **Access-Control-Allow-Headers**: `Content-Type`
   - **Access-Control-Allow-Methods**: `POST, OPTIONS`
4. 点击 **Enable CORS and replace existing CORS headers**

### 3.4 部署 API

1. 点击 **Actions** → **Deploy API**
2. 选择或创建 **Deployment stage**: `prod`
3. 复制 **Invoke URL**（例如：`https://abc123.execute-api.us-east-1.amazonaws.com/prod`）

## 💻 步骤 4: 配置前端

### 4.1 更新环境变量

创建 `.env` 文件（或更新现有的）：

```env
VITE_META_CAPI_LAMBDA_URL=https://your-api-id.execute-api.region.amazonaws.com/prod/events
```

### 4.2 更新 Meta Pixel ID

在 `index.html` 中，将 `YOUR_PIXEL_ID` 替换为您的实际 Pixel ID：

```javascript
fbq('init', '123456789012345'); // 替换为您的 Pixel ID
```

### 4.3 在代码中使用

在 `src/App.tsx` 或其他组件中导入并使用：

```typescript
import { MetaEvents } from './utils/metaCAPI';

// 追踪按钮点击
const handleWhatsAppClick = () => {
  MetaEvents.whatsAppClick({
    content_name: 'WhatsApp Contact',
    currency: 'USD',
    value: 0
  });
  
  // 原有的跳转逻辑
  window.open('https://api.whatsapp.com/...', '_blank');
};

// 追踪下载按钮
const handleDownloadClick = (platform: 'iOS' | 'Android') => {
  MetaEvents.downloadClick(platform, {
    currency: 'USD',
    value: 0
  });
};
```

## 🧪 步骤 5: 测试

### 5.1 测试事件

1. 在 Meta Events Manager 中打开 **Test Events**
2. 在网站上进行操作（点击按钮、提交表单等）
3. 查看 Test Events 面板，应该能看到事件实时出现

### 5.2 查看 Lambda 日志

1. 在 AWS Lambda Console 中打开函数
2. 进入 **Monitor** → **View CloudWatch logs**
3. 查看日志确认事件是否成功发送到 Meta

## 📊 步骤 6: 验证数据

### 6.1 在 Meta Events Manager 中查看

1. 进入 **Events Manager** → **Test Events**
2. 确认事件显示为 **Server** 类型（表示来自 CAPI）
3. 检查事件数据是否正确

### 6.2 查看 Lambda 响应

检查 Lambda 函数返回的状态码和响应：
- `200`: 成功
- `500`: 错误（检查日志）

## 🔒 安全建议

1. **限制 API Gateway 访问**：
   - 使用 API Key 或 AWS Cognito
   - 限制来源 IP 地址

2. **保护 Access Token**：
   - 不要在前端代码中暴露 Access Token
   - 使用 AWS Secrets Manager 存储敏感信息

3. **HTTPS 必须**：
   - 确保所有 API 调用使用 HTTPS

## 📝 可用的事件类型

```typescript
// 页面浏览
MetaEvents.pageView();

// 按钮点击
MetaEvents.buttonClick('Get Started Button');

// WhatsApp 点击
MetaEvents.whatsAppClick();

// 下载按钮
MetaEvents.downloadClick('iOS');
MetaEvents.downloadClick('Android');

// 表单提交（带用户数据）
MetaEvents.formSubmit('Contact Form', {
  em: 'user@example.com', // 会自动哈希
  ph: '+1234567890' // 会自动哈希
});

// 自定义事件
MetaEvents.custom('CustomEventName', {
  em: 'user@example.com'
}, {
  currency: 'USD',
  value: 100
});
```

## 🐛 故障排除

### 问题：事件未出现在 Meta Events Manager

1. 检查 Lambda 环境变量是否正确
2. 查看 CloudWatch 日志
3. 确认 API Gateway 已部署
4. 检查前端是否正确调用 Lambda URL

### 问题：CORS 错误

1. 确认 API Gateway 已启用 CORS
2. 检查 CORS 配置是否正确
3. 确认前端域名在允许列表中

### 问题：401 或 403 错误

1. 检查 Access Token 是否有效
2. 确认 Pixel ID 正确
3. 验证 Access Token 权限

## 📚 参考资源

- [Meta Conversions API 文档](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [AWS Lambda 文档](https://docs.aws.amazon.com/lambda/)
- [API Gateway 文档](https://docs.aws.amazon.com/apigateway/)

