---
icon: code
date: 2025-09-19
category:
  - LeetCode
tag:
  - 暴力解法
  - 数学
star: true
sticky: true
---

# 7. 整数反转

## 题目

给你一个 `32` 位的有符号整数 `x` ，返回将 `x` 中的数字部分反转后的结果。

如果反转后整数超过 `32` 位的有符号整数的范围 `[−2^31,  2^31 − 1]` ，就返回 `0`。

**假设环境不允许存储 64 位整数（有符号或无符号）。**

**示例 1：**

> 输入：x = 123
> 输出：321

**示例 2：**

> 输入：x = -123
> 输出：-321

**示例 3：**

> 输入：x = 120
> 输出：21

**示例 4：**

> 输入：x = 0
> 输出：0

## 方法 1：暴力解法

一个比较简单考虑到的解法是，将数字转成字符串，反转之后再改成数字型就可以实现了。

```javascript
var reverse = function (x) {
  const MAX_NUM = Math.pow(2, 31) - 1;
  const MIN_NUM = -Math.pow(2, 31);

  let str = x.toString();
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === "-") res = "-" + res;
    else res += str[i];
  }
  res = Number(res);
  if (res < MIN_NUM || res > MAX_NUM) return 0;
  return res;
};
```

时间复杂度：**`O(log(x))`**，翻转的次数即 `x` 十进制的位数。
空间复杂度：**`O(1)`**

简化版写法：

```javascript
var reverse = function (x) {
  const MAX_NUM = Math.pow(2, 31) - 1;
  const MIN_NUM = -Math.pow(2, 31);
  let res = parseInt(x.toString().split("").reverse().join(""));
  if (x < 0) res = -res;
  return res > MAX_NUM || res < MIN_NUM ? 0 : y;
};
```

## 方法 2：数学

记 `rev` 为翻转后的数字，为完成翻转，我们可以重复「弹出」`x` 的末尾数字，将其「推入」`rev` 的末尾，直至 `x` 为 0。

```javascript
var reverse = function (x) {
  let rev = 0;
  while (x !== 0) {
    const digit = x % 10; // 取模
    x = ~~(x / 10); // 获取整数部分
    rev = rev * 10 + digit;
    if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
      return 0;
    }
  }
  return rev;
};
```
