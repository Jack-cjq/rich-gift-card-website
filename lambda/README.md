# Meta CAPI Lambda 函数部署说明

## 快速部署步骤

### 1. 创建 Lambda 函数

在 AWS Lambda Console 中：

1. 创建新函数，选择 **Node.js 20.x** 运行时
2. 将 `meta-capi-handler.js` 的代码复制到函数代码编辑器
3. 点击 **Deploy**

### 2. 配置环境变量

在 Lambda 函数的 **Configuration** → **Environment variables** 中添加：

```
META_PIXEL_ID = 您的Pixel ID
META_ACCESS_TOKEN = 您的Access Token
META_TEST_EVENT_CODE = 您的测试代码（可选）
```

### 3. 设置超时时间

在 **Configuration** → **General configuration** → **Edit**：
- **Timeout**: 设置为 30 秒（建议）

### 4. 创建 API Gateway

1. 创建 REST API
2. 创建 `/events` 资源
3. 创建 **POST** 方法，连接到 Lambda 函数
4. 启用 CORS
5. 部署 API 并复制 **Invoke URL**

### 5. 配置前端

在项目根目录创建 `.env` 文件：

```env
VITE_META_CAPI_LAMBDA_URL=https://your-api-id.execute-api.region.amazonaws.com/prod/events
```

### 6. 测试

1. 在 Meta Events Manager 中打开 Test Events
2. 在网站上触发事件
3. 查看事件是否出现在 Test Events 面板

## 使用 AWS CLI 部署（可选）

```bash
# 打包函数
zip -r function.zip meta-capi-handler.js

# 创建函数
aws lambda create-function \
  --function-name meta-capi-handler \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip

# 更新环境变量
aws lambda update-function-configuration \
  --function-name meta-capi-handler \
  --environment Variables="{META_PIXEL_ID=YOUR_PIXEL_ID,META_ACCESS_TOKEN=YOUR_TOKEN}"
```

## 故障排除

- 查看 CloudWatch Logs 检查错误
- 确认环境变量已正确设置
- 验证 API Gateway 已启用 CORS
- 检查 Lambda 执行角色权限

