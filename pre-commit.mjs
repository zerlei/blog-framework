#!/usr/bin/env zx
import fs from 'fs';
// ./docs/.git/hooks/pre-commit  不要忘了 chomd +x
//
// #!/bin/bash
//
// if [[ "$GIT_SKIP_PRE_COMMIT_HOOK" == "1" ]]; then
//   echo "✅ second: Skipping pre-commit hook"
//   export GIT_SKIP_PRE_COMMIT_HOOK=0
//   exit 0
// fi
// export GIT_SKIP_PRE_COMMIT_HOOK=1
// ../pre-commit.mjs
// exit 0
console.log('pre-commit 开始执行');

// 从git中获取变动的文件信息
const gitfiles = await $`git status -s`;
const files = gitfiles.stdout.split('\n');
// # Git `status -s` 的输出格式解析
//
// `git status -s`（或 `git status --short`）会返回简洁的状态信息，输出由两列字符和文件名组成，格式如下：
//
// ## 基本格式
//
// ```
// XY PATH
// ```
//
// 其中：
// - **X** 表示暂存区（index）的状态
// - **Y** 表示工作区（working tree）的状态
// - **PATH** 是文件路径
//
// ## 可能的输出状态组合
//
// | 状态码 | 含义 |
// |--------|------|
// | ` ` (空格) | 无变化 |
// | `M` | 修改 (Modified) |
// | `A` | 添加 (Added) |
// | `D` | 删除 (Deleted) |
// | `R` | 重命名 (Renamed) |
// | `C` | 复制 (Copied) |
// | `U` | 更新但未合并 (Unmerged) |
// | `?` | 未跟踪 (Untracked) |
// | `!` | 忽略 (Ignored) |
//
// ## 常见输出示例
//
// 1. **新添加的未跟踪文件**：
//    ```
//    ?? file.txt
//    ```
//
// 2. **修改后已暂存**：
//    ```
//    M  file.txt
//    ```
//
// 3. **修改后未暂存**：
//    ```
//     M file.txt
//    ```
//
// 4. **修改后既暂存又工作区有修改**：
//    ```
//    MM file.txt
//    ```
//
// 5. **重命名文件**：
//    ```
//    R  old.txt -> new.txt
//    ```
//
// 6. **删除文件**：
//    ```
//    D  file.txt
//    ```
//
// 7. **冲突文件**：
//    ```
//    UU file.txt
//    ```
//
// ## 输出行数
//
// `git status -s` 会为每个有状态变化的文件输出一行，包括：
// - 已暂存的更改
// - 未暂存的更改
// - 未跟踪的文件
// - 冲突的文件
//
// ## 与其他命令的区别
//
// - 普通 `git status` 提供更详细的描述性输出
// - `-s` 选项提供机器更易解析的简洁格式
// - 每行长度固定为2字符状态+空格+文件名（重命名情况除外）
//
// 这种格式特别适合在脚本中处理Git状态变化。
let blogs_time_info = [];

const promises = files.map(async (item) => {
  //只需要 处理 .md 文件
  if (item.includes('.md')) {
    let items = item.split(' ').filter((item) => item !== '');
    switch (items[0]) {
      case 'A':
      case 'M':
      case 'D':
        blogs_time_info.push({
          op: items[0],
          name: items[1]
        });
        break;
      case 'R':
        blogs_time_info.push({
          op: 'D',
          name: items[1]
        });
        blogs_time_info.push({
          op: 'A',
          name: items[3]
        });
        break;
      default:
        break;
    }
  }
});
await Promise.all(promises);
//##### ⬇️ DEBUG INFO
console.log('blogs_time_info', blogs_time_info);
//##### ⬆️ DEBUG INFO

const commit_id = (await $`git rev-parse --short HEAD`).stdout.replace('\n', '');
fs.writeFileSync(`/tmp/blogs_time${commit_id}`, JSON.stringify(blogs_time_info), 'utf-8');

console.log('pre-commit 结束执行');
