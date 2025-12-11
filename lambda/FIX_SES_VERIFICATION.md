# 修复 SES 邮箱验证错误

## 错误信息

```
Email address is not verified. The following identities failed the check in region US-EAST-1: www.itgiftcard01@163.com
```

## 问题原因

AWS SES 要求所有用于发送邮件的邮箱地址必须先验证。错误提示显示 `www.itgiftcard01@163.com` 这个邮箱地址在 SES 中未验证。

## 解决方案

### 方法 1: 验证邮箱地址（推荐）

1. **登录 AWS SES Console**
   - 访问 [AWS SES Console](https://console.aws.amazon.com/ses/)
   - 确保选择正确的区域（US-EAST-1）

2. **验证 FROM_EMAIL**
   - 进入 **Verified identities** → **Create identity**
   - 选择 **Email address**
   - 输入您的发送邮箱：`www.itgiftcard01@163.com`
   - 点击 **Create identity**

3. **检查邮箱并验证**
   - 打开邮箱 `www.itgiftcard01@163.com`
   - 查找来自 AWS 的验证邮件
   - 点击邮件中的验证链接

4. **验证 ADMIN_EMAIL**
   - 如果管理员邮箱也不同，重复上述步骤验证管理员邮箱

5. **等待验证完成**
   - 验证通常需要几分钟
   - 在 SES Console 中检查状态显示为 "Verified"

### 方法 2: 使用已验证的邮箱

如果 `www.itgiftcard01@163.com` 无法验证，可以：

1. **使用其他已验证的邮箱**
   - 在 SES Console 中查看已验证的邮箱列表
   - 更新 Lambda 环境变量 `FROM_EMAIL` 为已验证的邮箱

2. **验证域名（推荐用于生产环境）**
   - 在 SES Console 中验证整个域名（如 `yourdomain.com`）
   - 这样该域名下的所有邮箱都可以使用

## 更新 Lambda 环境变量

验证邮箱后，确保 Lambda 函数的环境变量正确：

1. 进入 Lambda Console
2. 选择 `form-submit-handler` 函数
3. 进入 **Configuration** → **Environment variables**
4. 确认以下变量：
   ```
   FROM_EMAIL = www.itgiftcard01@163.com（必须是已验证的邮箱）
   ADMIN_EMAIL = admin@yourdomain.com（必须是已验证的邮箱）
   ```

## 验证修复

1. **在 SES Console 中确认**
   - 进入 **Verified identities**
   - 确认 `www.itgiftcard01@163.com` 状态为 "Verified"

2. **测试表单提交**
   - 提交测试表单
   - 应该不再出现验证错误

## 常见问题

### Q: 邮箱已验证但还报错？

**问题：** 错误信息显示 `www.itgiftcard01@163.com` 未验证，但 SES Console 中显示 `itgiftcard01@163.com` 已验证。

**原因：** 邮箱地址不匹配！
- ✅ 已验证：`itgiftcard01@163.com`（没有 `www.` 前缀）
- ❌ Lambda 中使用：`www.itgiftcard01@163.com`（有 `www.` 前缀）

**解决方案：**
1. 进入 Lambda Console
2. 选择 `form-submit-handler` 函数
3. **Configuration** → **Environment variables**
4. 修改 `FROM_EMAIL` 环境变量：
   - 从：`www.itgiftcard01@163.com`
   - 改为：`itgiftcard01@163.com`
5. 点击 **Save**
6. 重新测试表单提交

**注意：** `www.` 前缀在邮箱地址中是有意义的，`www.itgiftcard01@163.com` 和 `itgiftcard01@163.com` 是两个不同的邮箱地址。

### Q: 163 邮箱收不到验证邮件？

A: 163 邮箱可能将 AWS 邮件标记为垃圾邮件。检查：
- 垃圾邮件文件夹
- 邮箱设置中的拦截规则
- 考虑使用其他邮箱服务（如 Gmail、Outlook）或使用已验证的域名邮箱

### Q: 需要验证每个邮箱吗？

A: 
- 如果使用单个邮箱地址，需要验证每个邮箱
- 如果验证了整个域名，该域名下的所有邮箱都可以使用（推荐）

### Q: 沙盒模式限制？

A: 如果账户在 SES 沙盒模式：
- 只能发送给已验证的邮箱地址
- 需要申请生产访问权限才能发送给任意邮箱

## 生产环境最佳实践

1. **验证域名**（而不是单个邮箱）
   - 可以发送任意 `@yourdomain.com` 邮箱
   - 更灵活，便于管理

2. **申请生产访问**
   - 在 SES Console 中申请生产访问权限
   - 可以发送给任意邮箱地址

3. **配置 SPF 和 DKIM**
   - 提高邮件送达率
   - 减少被标记为垃圾邮件的风险

