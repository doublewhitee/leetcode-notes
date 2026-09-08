---
icon: code
date: 2026-09-08
order: 17
category:
  - LeetCode
tag:
  - 字符串
  - 回溯
  - 深度优先搜索
star: true
sticky: true
---

# 17. 电话号码的字母组合

## 题目

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

数字到字母的映射如下（与电话按键相同）。注意 `1` 不对应任何字母。

```
2 -> abc
3 -> def
4 -> ghi
5 -> jkl
6 -> mno
7 -> pqrs
8 -> tuv
9 -> wxyz
```

**示例 1：**

> 输入：digits = "23"
> 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

**示例 2：**

> 输入：digits = ""
> 输出：[]

**示例 3：**

> 输入：digits = "2"
> 输出：["a","b","c"]

## 方法 1：回溯（深度优先搜索）

**思路：** 这是一道典型的回溯问题。我们把每个数字看作一层，对于每个数字对应的所有字母，依次尝试并递归进入下一层。当组合长度等于 `digits.length` 时，记录结果并回溯。

**关键点：**

1. 使用哈希表（或数组）建立数字到字母的映射
2. 输入为空字符串时，直接返回空数组
3. 回溯函数 `backtrack(index, path)`：`index` 表示当前处理的数字下标，`path` 表示当前已构建的字符组合
4. 当 `path.length === digits.length` 时，说明一个完整的组合已生成，加入结果集
5. 每次递归中，遍历当前数字对应的所有字母，依次选择后递归，再回溯撤销选择

```javascript
var letterCombinations = function(digits) {
  const res = [];
  if (!digits) return res;

  // 数字到字母的映射
  const map = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  // 回溯函数
  const backtrack = (index, path) => {
    // 组合长度等于 digits 长度，递归终止
    if (index === digits.length) {
      res.push(path.join(''));
      return;
    }
    // 获取当前数字对应的字母
    const letters = map[digits[index]];
    for (const letter of letters) {
      path.push(letter);
      backtrack(index + 1, path);
      path.pop(); // 回溯
    }
  };

  backtrack(0, []);
  return res;
};
```

时间复杂度：**`O(3ᵐ × 4ⁿ)`**，其中 `m` 是对应三个字母的数字个数，`n` 是对应四个字母的数字个数。
空间复杂度：**`O(m + n)`**，递归调用栈的深度，以及结果集占用的空间。

## 方法 2：队列（广度优先搜索）

**思路：** 使用队列实现广度优先搜索。初始时队列中只有一个空字符串，每处理一个数字，就把队列中每个已有组合分别拼接当前数字对应的所有字母，再放回队列。

**关键点：**

1. 队列初始化为 `['']`
2. 对每个数字，遍历当前队列的长度次，每次取出一个组合并拼接该数字对应的所有字母
3. 最终队列中剩下的就是所有完整的组合

```javascript
var letterCombinations = function(digits) {
  if (!digits) return [];

  const map = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  let queue = [''];

  for (const digit of digits) {
    const letters = map[+digit - 2];
    const next = [];
    while (queue.length) {
      const cur = queue.shift();
      for (const letter of letters) {
        next.push(cur + letter);
      }
    }
    queue = next;
  }
  return queue;
};
```

时间复杂度：**`O(3ᵐ × 4ⁿ)`**，与方法 1 相同。
空间复杂度：**`O(3ᵐ × 4ⁿ)`**，需要额外的队列空间存储所有组合。
