---
icon: code
date: 2025-09-18
category:
  - LeetCode
tag:
  - 数学归纳
star: true
sticky: true
---

# 6. Z 字形变换

## 题目

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALXSHXRXNG" 行数为 3 时，排列如下：

> P _ A _ H _ N
> A P L S X X G
> Y _ X \_ R

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"PAHNAPLSXXGYXR"`。

请你实现这个将字符串进行指定行数变换的函数。

**示例 1：**

> 输入：s = "PAYPALXSHXRXNG", numRows = 3
> 输出："PAHNAPLSXXGYXR"

**示例 2：**

> 输入：s = "PAYPALXSHXRXNG", numRows = 4
> 输出："PXNALSXGYAHRPX"
> 解释：
> P \_ _ X _ _ N
> A _ L S _ X G
> Y A _ H \_ R
> P \_ \_ X

**示例 3：**

> 输入：s = "A", numRows = 1
> 输出："A"

## 方法 1：数学归纳

通过观察变化规律，可以发现，若`numRows`为`n`：

- 一次 Z 字形变换的循环为`2n - 2`
- 对于一次 Z 字形变换内，前 `n` 个数字一定是按照行数的 index 递增的
- 对于一次 Z 字形变换内，后 `n - 2` 个数字一定是按照行数的倒序递减，直到 index= 1 结束

```javascript
var convert = function (s, numRows) {
  if (numRows === 1 || s.length === 1) return s;

  // 定义一次 Z 字形变换的循环长度
  let loopStringCount = numRows + (numRows - 2);
  // 定义一个一维数组，存储每一行的字符结果
  let res = new Array(numRows).fill("");
  for (let i = 0; i < s.length; i++) {
    // 计算当前字符属于一次循环内的第几个
    const index = i === 0 ? 0 : i % loopStringCount;
    // 前 n 个数字直接放入对应的行中
    if (index < numRows) {
      res[index] += s[i];
    } else {
      // 计算剩余字符的相对位置
      const newIndex = (index + 1) % numRows;
      res[numRows - newIndex - 1] += s[i];
    }
  }
  return res.join("");
};
```

时间复杂度：**`O(n)`**
空间复杂度：**`O(n)`**
