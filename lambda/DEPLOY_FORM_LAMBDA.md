# 快速部署表单提交 Lambda 函数

## 方法 1: 使用 Lambda Console（最简单）

1. **创建函数**：
   - 进入 Lambda Console
   - 创建新函数：`form-submit-handler`
   - Runtime: Node.js 20.x

2. **复制代码**：
   - 将 `form-submit-handler.js` 的内容复制到 Lambda 代码编辑器
   - 点击 **Deploy**

3. **安装依赖**：
   - 在代码编辑器中，点击 **Add package**
   - 搜索并添加 `@aws-sdk/client-ses`
   - 或使用下面的 CLI 方法

## 方法 2: 使用 AWS CLI 和 ZIP 上传

### 步骤 1: 准备部署包

```bash
# 在 lambda 目录下
cd lambda

# 创建 node_modules（如果还没有）
npm install @aws-sdk/client-ses

# 创建部署 ZIP
zip -r form-submit-handler.zip form-submit-handler.js package.json node_modules/
```

### 步骤 2: 创建 Lambda 函数

```bash
aws lambda create-function \
  --function-name form-submit-handler \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler form-submit-handler.handler \
  --zip-file fileb://form-submit-handler.zip \
  --timeout 30 \
  --memory-size 256
```

### 步骤 3: 配置环境变量

```bash
aws lambda update-function-configuration \
  --function-name form-submit-handler \
  --environment Variables="{
    META_PIXEL_ID=YOUR_PIXEL_ID,
    META_ACCESS_TOKEN=YOUR_ACCESS_TOKEN,
    SES_REGION=us-east-1,
    ADMIN_EMAIL=admin@yourdomain.com,
    FROM_EMAIL=noreply@yourdomain.com
  }"
```

### 步骤 4: 创建 Function URL

```bash
aws lambda create-function-url-config \
  --function-name form-submit-handler \
  --auth-type NONE \
  --cors '{
    "AllowOrigins": ["*"],
    "AllowMethods": ["GET", "POST", "OPTIONS"],
    "AllowHeaders": ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    "MaxAge": 86400
  }'
```

### 步骤 5: 获取 Function URL

```bash
aws lambda get-function-url-config \
  --function-name form-submit-handler
```

## 方法 3: 使用 Terraform（可选）

如果需要基础设施即代码，可以使用 Terraform 配置。

## ⚠️ 重要提示

1. **SES 权限**：确保 Lambda 执行角色有 SES 发送邮件权限
2. **邮箱验证**：FROM_EMAIL 和 ADMIN_EMAIL 必须在 SES 中验证
3. **CORS 配置**：确保 Lambda Function URL 的 CORS 已正确配置
4. **环境变量**：所有环境变量必须正确设置

## 🧪 测试 Lambda 函数

使用 curl 测试：

```bash
curl -X POST https://your-lambda-url.lambda-url.region.on.aws/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890"
  }'
```

应该返回：
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "emailSent": {
    "admin": true,
    "user": true
  },
  "metaCAPI": {
    "sent": true
  }
}
```

