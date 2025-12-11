# 表单提交功能部署指南

本指南将帮助您设置表单提交功能，包括邮件发送和 Meta CAPI 转化追踪。

## 📋 功能说明

表单提交后会：
1. ✅ 保存表单数据到 DynamoDB 数据库
2. ✅ 发送邮件给管理员（包含用户提交的信息）
3. ✅ 发送确认邮件给用户
4. ✅ 发送 Meta CAPI Lead 转化事件

## 🔧 步骤 1: 创建 DynamoDB 表

### 1.1 创建表

1. 登录 [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. 点击 **Create table**
3. 配置：
   - **Table name**: `form-submissions`（或您喜欢的名称）
   - **Partition key**: `id` (String)
   - **Table settings**: 使用默认设置或自定义
4. 点击 **Create table**

### 1.2 配置 TTL（可选，用于自动清理）

1. 在表详情页面，点击 **Additional settings** 标签
2. 找到 **Time to Live (TTL)** 部分
3. 启用 TTL，**TTL attribute name**: `ttl`
4. 这样数据会在 90 天后自动删除

### 1.3 记录表名

记住表名，稍后在 Lambda 环境变量中需要使用。

## 🔧 步骤 2: 配置 AWS SES（Simple Email Service）

### 2.1 验证邮箱地址

1. 登录 [AWS SES Console](https://console.aws.amazon.com/ses/)
2. 选择 **Verified identities** → **Create identity**
3. 选择 **Email address**
4. 输入您要使用的发送邮箱（例如：`noreply@yourdomain.com`）
5. 点击 **Create identity**
6. 检查邮箱并点击验证链接

### 2.2 验证管理员邮箱

重复上述步骤，验证管理员接收邮箱（例如：`admin@yourdomain.com`）

### 2.3 请求生产访问权限（如果不在沙盒模式）

如果您的账户在 SES 沙盒模式中：
1. 进入 **Account dashboard**
2. 点击 **Request production access**
3. 填写申请表格
4. 等待 AWS 批准（通常 24 小时内）

## 🚀 步骤 3: 部署 Lambda 函数

### 3.1 创建 Lambda 函数

1. 登录 AWS Lambda Console
2. 点击 **Create function**
3. 选择 **Author from scratch**
4. 配置：
   - **Function name**: `form-submit-handler`
   - **Runtime**: Node.js 20.x 或更高版本
   - **Architecture**: x86_64

### 3.2 配置 Lambda 函数代码

1. 在 Lambda 函数代码编辑器中，将 `lambda/form-submit-handler.js` 的内容粘贴进去
2. 点击 **Deploy**

### 3.3 安装依赖（使用 Lambda Layers 或打包）

#### 方式 A: 使用 Lambda Layers（推荐）

1. 在本地创建依赖层：
```bash
mkdir -p lambda-layer/nodejs
cd lambda-layer/nodejs
npm init -y
npm install @aws-sdk/client-ses @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
cd ..
zip -r aws-sdk-layer.zip nodejs
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
npm install @aws-sdk/client-ses @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
zip -r function.zip form-submit-handler.js package.json node_modules/
```

2. 在 Lambda Console 中：
   - 选择 **Upload from** → **.zip file**
   - 上传 `function.zip`

### 3.4 配置环境变量

在 Lambda 函数的 **Configuration** → **Environment variables** 中添加：

```
META_PIXEL_ID = 您的Meta Pixel ID
META_ACCESS_TOKEN = 您的Meta Conversions API Access Token
META_TEST_EVENT_CODE = 您的测试事件代码（可选）
SES_REGION = us-east-1（或您的SES区域）
ADMIN_EMAIL = admin@yourdomain.com（管理员邮箱）
FROM_EMAIL = noreply@yourdomain.com（已验证的发送邮箱）
DYNAMODB_TABLE_NAME = form-submissions（DynamoDB表名）
AWS_REGION = us-east-1（AWS区域）

# 可选：联系方式配置（如果未设置，将使用默认值）
WHATSAPP_NUMBER = +86 19371138377（可选）
WHATSAPP_URL = https://api.whatsapp.com/send?phone=8619371138377&text=...（可选）
TIKTOK_USERNAME = @veryrich429（可选）
TIKTOK_URL = https://www.tiktok.com/@veryrich429（可选）
```

### 3.5 配置 IAM 权限

Lambda 函数需要 SES 发送邮件和 DynamoDB 写入权限：

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
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:GetItem"
      ],
      "Resource": "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/form-submissions"
    }
  ]
}
```

**注意**：将 `REGION` 和 `ACCOUNT_ID` 替换为您的实际值，或将 `form-submissions` 替换为您的表名。

### 3.6 配置超时时间

1. **Configuration** → **General configuration** → **Edit**
2. **Timeout**: 设置为 30 秒（建议）

## 🌐 步骤 4: 创建 Lambda Function URL

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

## 💻 步骤 5: 配置前端

### 5.1 更新环境变量

在项目根目录创建或更新 `.env` 文件：

```env
# Meta CAPI Lambda URL（已有的）
VITE_META_CAPI_LAMBDA_URL=https://your-capi-lambda-url.lambda-url.region.on.aws/

# Form Submit Lambda URL（新增）
VITE_FORM_SUBMIT_LAMBDA_URL=https://your-form-lambda-url.lambda-url.region.on.aws/
```

### 5.2 验证表单已集成

表单已自动集成到首页的联系表单部分。

## 🧪 步骤 6: 测试

### 6.1 测试表单提交

1. 访问网站首页
2. 滚动到"联系我们"部分
3. 填写表单并提交
4. 检查：
   - ✅ 表单提交成功提示
   - ✅ 管理员邮箱收到邮件
   - ✅ 用户邮箱收到确认邮件

### 6.2 验证 Meta CAPI 事件

1. 在 Meta Events Manager 中打开 **Test Events**
2. 提交表单
3. 应该看到 `Lead` 事件出现

### 6.3 查看 Lambda 日志

1. 在 Lambda Console 中打开函数
2. 进入 **Monitor** → **View CloudWatch logs**
3. 查看日志确认邮件发送和 Meta CAPI 事件是否成功

### 6.4 验证数据库存储

1. 在 DynamoDB Console 中打开您的表
2. 点击 **Explore table items**
3. 应该能看到刚刚提交的表单数据
4. 检查数据包含：id, name, email, phone, timestamp, status 等字段

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
- **Connect With Us** 部分，包含：
  - WhatsApp 联系方式（可点击链接）
  - TikTok 账号（可点击链接）
- 其他服务信息

## 🔒 安全建议

1. **验证邮箱格式**：前端和后端都验证邮箱格式
2. **防止垃圾邮件**：可以考虑添加验证码（reCAPTCHA）
3. **限制请求频率**：在 Lambda 中添加速率限制
4. **HTTPS 必须**：确保所有 API 调用使用 HTTPS

## 🐛 故障排除

### 问题：邮件发送失败 - "Email address is not verified"

**错误信息示例：**
```
Email address is not verified. The following identities failed the check in region US-EAST-1: your-email@example.com
```

**解决方案：**

1. **验证邮箱地址**：
   - 登录 [AWS SES Console](https://console.aws.amazon.com/ses/)
   - 进入 **Verified identities** → **Create identity**
   - 选择 **Email address**，输入需要验证的邮箱
   - 检查邮箱并点击验证链接

2. **检查 Lambda 环境变量**：
   - 确认 `FROM_EMAIL` 和 `ADMIN_EMAIL` 都是已验证的邮箱
   - 在 SES Console 中确认这些邮箱状态为 "Verified"

3. **常见问题**：
   - **邮箱地址不匹配**：如果错误显示 `www.itgiftcard01@163.com` 未验证，但 SES 中显示 `itgiftcard01@163.com` 已验证，说明 Lambda 环境变量中的邮箱地址与已验证的不一致。需要修改 `FROM_EMAIL` 环境变量，去掉 `www.` 前缀。
   - 某些邮箱服务（如 163 邮箱）可能将验证邮件标记为垃圾邮件，建议检查垃圾邮件文件夹
   - 或使用已验证的域名邮箱（更推荐）

**详细修复指南：** 查看 `lambda/FIX_SES_VERIFICATION.md`

### 问题：其他邮件发送错误

1. 检查 Lambda IAM 权限是否正确（SES SendEmail 权限）
2. 查看 CloudWatch Logs 中的详细错误信息
3. 确认 SES 账户不在沙盒模式（或已请求生产访问）
4. 检查 FROM_EMAIL 和 ADMIN_EMAIL 环境变量是否正确设置

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

