---
title: 用 Rclone+FFmpeg 代替臃肿的上传工具
description: PicGO 和 PicList 虽然配置简单容易上手，但却是用 Electron 开发的。我嫌弃臃肿因此并不怎么想用。
date: 2026-05-06 17:02:31
updated: 2026-05-06 17:02:31
categories: [代码]
tags: [图床, Rclone, FFmpeg]
---

## Rclone

输入 `rclone config`{lang="bash"} 后开始。

```sh [~/.config/rclone/rclone.conf]
[mu-s4]
type = s3
provider = Other
access_key_id = 看不见
secret_access_key = 看不见
endpoint = https://s3.bitiful.net
```

这是我的 Rclone 配置，在完成之后就是这样的。

## FFmpeg

FFmpeg 是一个非常强大的媒体处理工具，理论上，可以将它和 Rclone 一起搭配，制作成一个简易的图片上传脚本。

```sh [~/Pictures/image.sh]
#!/bin/bash

# 配置
OUTPUT_DIR="./output"  # 本地输出目录
RCLONE_REMOTE="bitiful:mu-s4"  # Rclone 远程路径

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 让用户输入图片文件名
echo "请输入图片文件名："
read -r INPUT_FILE

# 检查文件是否存在
if [ ! -f "$INPUT_FILE" ]; then
    echo "错误：文件 '$INPUT_FILE' 不存在！"
    exit 1
fi

# 获取当前年份和日期
YEAR=$(date +"%Y")
DATETIME=$(date +"%m%d")
OUTPUT_FILE="$OUTPUT_DIR/${DATETIME}.avif"

# 理论上可以再加点硬件参数加速处理
echo "转换中: $INPUT_FILE -> $OUTPUT_FILE"
ffmpeg -i "$INPUT_FILE" -vf "crop=iw:iw/2" -c:v libaom-av1 -pix_fmt yuv420p "$OUTPUT_FILE"

# 检查转换是否成功
if [ $? -eq 0 ]; then
    echo "转换成功!"

    # 上传到云端（按年份分类）
    echo "正在上传到 rclone: ${RCLONE_REMOTE}/${YEAR}/"
    rclone copy "$OUTPUT_FILE" "${RCLONE_REMOTE}/${YEAR}/"

    if [ $? -eq 0 ]; then
        echo "上传成功! 路径: ${RCLONE_REMOTE}/${YEAR}/${DATETIME}.avif"
    else
        echo "上传失败!"
        exit 1
    fi
else
    echo "转换失败!"
    exit 1
fi
```

本人懒得研究 Shell 脚本🫠，所以让 AI 根据我的需求代写了一个，实测可用。
