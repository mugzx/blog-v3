---
title: 为你的每一次 Commit 添加 SSH 签名
description: 探索如何配置 SSH 签名，确保每次提交的身份验证，并解决常见的配置问题。
date: 2025-09-13 11:30:35
updated: 2025-12-10 02:59:07
categories: [代码]
tags: [SSH]
references:
  - title: 生成新的 SSH 密钥并将其添加到 ssh-agent - GitHub 文档
    link: https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
---

我最近在配置 GPG 签名，这样可以在以后的每一次 Commit 中验证身份，同时在旁边显示 Verified 小徽标。

## 生成密钥

生成新密钥。

:copy{lang="bash" code="ssh-keygen -t ed25519 -C 'example@example.com'"}

如果和现在的 SSH 认证密钥冲突，就需要另外指定文件的名称。

:copy{lang="bash" code="ssh-keygen -t ed25519 -C 'example@example.com' -f ~/.ssh/id_ed25519_signing"}

### 配置签名

创建允许的签名者配置文件，并复制输出的签名公钥内容。

:copy{lang="bash" code="touch ~/.ssh/allowed_signers"}
:copy{lang="bash" code="cat ~/.ssh/id_ed25519_signing.pub"}

把 `<allowed_signers>` 修改成类似于`example@example.com ssh-ed25519 公钥`的内容形式。

:copy{lang="bash" code="echo '<allowed_signers>' >> ~/.ssh/allowed_signers"}
:copy{lang="bash" code="sed -i 's/\r$//' ~/.ssh/allowed_signers"}

Windows 与 Unix 换行符的风格不同，你可能还需要在 VS Code 等编辑器中手动修改文件的行尾序列或者使用 sed 命令修改。

### 全局启用

:copy{prompt="使用 SSH 密钥作为签名格式" lang="bash" code="git config --global gpg.format ssh"}
:copy{prompt="私钥文件的路径" lang="bash" code="git config --global user.signingkey ~/.ssh/id_ed25519_signing"}
:copy{prompt="签名者配置文件的路径" lang="bash" code="git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers"}
:copy{prompt="自动签名提交" lang="bash" code="git config --global commit.gpgsign true"}

现在前往 [SSH and GPG keys](https://github.com/settings/keys) 继续配置；点击 **New SSH key**，类型选择 `Signing Key`，添加名称和公钥。

### 配置完成

:copy{lang="bash" code="git config --list"}
:copy{lang="bash" code="git log --show-signature -1"}

最后可以用这两条 git 命令再检查一遍即可。

::alert
提示 `Good "git" signature...` 即为验证成功。
::

## GPG 签名

你问我开头提到的配置 GPG 签名去哪了？

::quote
#icon
🫠
#default
被搞崩了。
::
