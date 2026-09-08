---
icon: code
date: 2025-09-28
order: 9
category:
  - LeetCode
tag:
  - 暴力解法
  - 数学
star: true
sticky: true
---

# 9. 回文数

## 题目

给你一个整数 `x` ，如果 `x` 是一个回文整数，返回 `true` ；否则，返回 `false` 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，`121` 是回文，而 `123` 不是。

**示例 1：**

> 输入：x = 121
> 输出：true

**示例 2：**

> 输入：x = -121
> 输出：false
> 解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

**示例 3：**

> 输入：x = 10
> 输出：false
> 解释：从右向左读, 为 01 。因此它不是一个回文数。

## 方法 1：暴力解法

最简单的解法就是将这个数字转换成字符串，接下来判断是否是回文数就很简单。

```javascript
var isPalindrome = function (x) {
  let str = x.toString();
  let left = 0,
    right = str.length - 1;
  let res = true;
  while (left < right) {
    if (str[left] !== str[right]) {
      res = false;
      break;
    }
    left += 1;
    right -= 1;
  }
  return res;
};
```

## 方法 2：数学

这道题有一个进阶要求，**不将整数转为字符串来解决这个问题**。首先，应该处理一些临界情况。所有负数都不可能是回文。针对数字的操作，可以通过取整和取余操作获取整数中对应的数字进行比较。

例如，`1221` 这个数字，通过计算 1221 / 1000， 得首位 1；通过计算 1221 % 10， 可得末位 1。比较这两者相同之后，再对 `22` 做相同的对比。

```javascript
var isPalindrome = function (x) {
  // 1. x 为负数，肯定不是回文数
  // 2. 如果 x 以 0 结尾，那么开头也要是 0，显然只有 0 符合这个要求
  if (x < 0 || (x % 10 == 0 && x != 0)) return false;

  let div = 1;
  // 获取最大除数
  while (x / div >= 10) div *= 10;
  while (x > 0) {
    let left = Math.floor(x / div);
    let right = Math.floor(x % 10);
    if (left !== right) return false;
    x = Math.floor((x % div) / 10);
    div /= 100; // 更新除数
  }
  return true;
};
```
