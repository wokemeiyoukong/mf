#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 上传gitee脚本

if [ -n "$1" ]
then
  git s
  git a
  git cm  "$1"
else
  echo 'forget commit message'
  exit 1
fi
  git ps


