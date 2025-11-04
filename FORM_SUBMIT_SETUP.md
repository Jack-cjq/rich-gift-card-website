# 表单提交功能部署指南

本指南将帮助您设置表单提交功能，包括邮件发送和 Meta CAPI 转化追踪。

## 📋 功能说明

表单提交后会：
1. ✅ 发送邮件给管理员（包含用户提交的信息）
2. ✅ 发送确认邮件给用户
3. ✅ 发送 Meta CAPI Lead 转化事件

## 🔧 步骤 1: 配置 AWS SES（Simple Email Service）

### 1.1 验证邮箱地址

1. 登录 [AWS SES Console](https://console.aws.amazon.com/ses/)
2. 选择 **Verified identities** → **Create identity**
3. 选择 **Email address**
4. 输入您要使用的发送邮箱（例如：`noreply@yourdomain.com`）
5. 点击 **Create identity**
6. 检查邮箱并点击验证链接

### 1.2 验证管理员邮箱

重复上述步骤，验证管理员接收邮箱（例如：`admin@yourdomain.com`）

### 1.3 请求生产访问权限（如果不在沙盒模式）

如果您的账户在 SES 沙盒模式中：
1. 进入 **Account dashboard**
2. 点击 **Request production access**
3. 填写申请表格
4. 等待 AWS 批准（通常 24 小时内）

## 🚀 步骤 2: 部署 Lambda 函数

### 2.1 创建 Lambda 函数

1. 登录 AWS Lambda Console
2. 点击 **Create function**
3. 选择 **Author from scratch**
4. 配置：
   - **Function name**: `form-submit-handler`
   - **Runtime**: Node.js 20.x 或更高版本
   - **Architecture**: x86_64

### 2.2 配置 Lambda 函数代码

1. 在 Lambda 函数代码编辑器中，将 `lambda/form-submit-handler.js` 的内容粘贴进去
2. 点击 **Deploy**

### 2.3 安装依赖（使用 Lambda Layers 或打包）

#### 方式 A: 使用 Lambda Layers（推荐）

1. 在本地创建依赖层：
```bash
mkdir -p lambda-layer/nodejs
cd lambda-layer/nodejs
npm init -y
npm install @aws-sdk/client-ses
cd ..
zip -r ses-layer.zip nodejs
```

2. 在 Lambda Console 中：
   - 进入 **Layers** → **Create layer**
   - 上传 `ses-layer.zip`
   - 记录 Layer ARN

3. 在 Lambda 函数中：
   - **Configuration** → **Layers** → **Add layer**
   - 选择您创建的 layer

#### 方式 B: 打包上传（简单方式）

1. 在本地创建部署包：
```bash
cd lambda
npm install @aws-sdk/client-ses
zip -r function.zip form-submit-handler.js package.json node_modules/
```

2. 在 Lambda Console 中：
   - 选择 **Upload from** → **.zip file**
   - 上传 `function.zip`

### 2.4 配置环境变量

在 Lambda 函数的 **Configuration** → **Environment variables** 中添加：

```
META_PIXEL_ID = 您的Meta Pixel ID
META_ACCESS_TOKEN = 您的Meta Conversions API Access Token
META_TEST_EVENT_CODE = 您的测试事件代码（可选）
SES_REGION = us-east-1（或您的SES区域）
ADMIN_EMAIL = admin@yourdomain.com（管理员邮箱）
FROM_EMAIL = noreply@yourdomain.com（已验证的发送邮箱）
```

### 2.5 配置 IAM 权限

Lambda 函数需要 SES 发送邮件权限：

1. 进入 **Configuration** → **Permissions**
2. 点击执行角色
3. 在 IAM Console 中添加策略：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2.6 配置超时时间

1. **Configuration** → **General configuration** → **Edit**
2. **Timeout**: 设置为 30 秒（建议）

## 🌐 步骤 3: 创建 Lambda Function URL

1. 在 Lambda 函数页面，点击 **Configuration** → **Function URL**
2. 点击 **Create function URL**
3. 配置：
   - **Auth type**: `NONE`（公开访问）
   - **CORS**: 启用，并配置：
     - **Allow origin**: `*`（或您的域名）
     - **Allow methods**: `GET, POST, OPTIONS`
     - **Allow headers**: `Content-Type, Authorization, X-Requested-With, Accept, Origin`
     - **Max age**: `86400`
4. 点击 **Save**
5. 复制 **Function URL**

## 💻 步骤 4: 配置前端

### 4.1 更新环境变量

在项目根目录创建或更新 `.env` 文件：

```env
# Meta CAPI Lambda URL（已有的）
VITE_META_CAPI_LAMBDA_URL=https://your-capi-lambda-url.lambda-url.region.on.aws/

# Form Submit Lambda URL（新增）
VITE_FORM_SUBMIT_LAMBDA_URL=https://your-form-lambda-url.lambda-url.region.on.aws/
```

### 4.2 验证表单已集成

表单已自动集成到首页的联系表单部分。

## 🧪 步骤 5: 测试

### 5.1 测试表单提交

1. 访问网站首页
2. 滚动到"联系我们"部分
3. 填写表单并提交
4. 检查：
   - ✅ 表单提交成功提示
   - ✅ 管理员邮箱收到邮件
   - ✅ 用户邮箱收到确认邮件

### 5.2 验证 Meta CAPI 事件

1. 在 Meta Events Manager 中打开 **Test Events**
2. 提交表单
3. 应该看到 `Lead` 事件出现

### 5.3 查看 Lambda 日志

1. 在 Lambda Console 中打开函数
2. 进入 **Monitor** → **View CloudWatch logs**
3. 查看日志确认邮件发送和 Meta CAPI 事件是否成功

## 📧 邮件模板

### 管理员邮件内容

包含：
- 用户姓名
- 用户邮箱
- 用户电话
- 提交时间

### 用户确认邮件内容

包含：
- 感谢信息
- 提示团队会尽快联系
- 其他联系方式（WhatsApp等）

## 🔒 安全建议

1. **验证邮箱格式**：前端和后端都验证邮箱格式
2. **防止垃圾邮件**：可以考虑添加验证码（reCAPTCHA）
3. **限制请求频率**：在 Lambda 中添加速率限制
4. **HTTPS 必须**：确保所有 API 调用使用 HTTPS

## 🐛 故障排除

### 问题：邮件发送失败

1. 检查 SES 邮箱是否已验证
2. 检查 Lambda IAM 权限是否正确
3. 查看 CloudWatch Logs 中的错误信息
4. 确认 SES 账户不在沙盒模式（或已请求生产访问）

### 问题：Meta CAPI 事件未发送

1. 检查环境变量是否正确
2. 查看 Lambda 日志
3. 确认 Meta Access Token 有效

### 问题：表单提交失败

1. 检查 Lambda Function URL 是否正确
2. 确认 CORS 配置正确
3. 查看浏览器控制台错误信息

## 📝 Lambda 函数代码结构

```
lambda/
├── form-submit-handler.js    # Lambda 函数代码
└── package.json              # 依赖配置
```

## 📚 参考资源

- [AWS SES 文档](https://docs.aws.amazon.com/ses/)
- [AWS Lambda 文档](https://docs.aws.amazon.com/lambda/)
- [Meta Conversions API 文档](https://developers.facebook.com/docs/marketing-api/conversions-api)

