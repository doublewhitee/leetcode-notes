---
icon: code
date: 2025-10-11
order: 11
category:
  - LeetCode
tag:
  - 双指针
  - 贪心
star: true
sticky: true
---

# 11. 盛最多水的容器

## 题目

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：**你不能倾斜容器。

**示例 1：**

> 输入：[1,8,6,2,5,4,8,3,7]
> 输出：49

**示例 2：**

> 输入：height = [1,1]
> 输出：1

## 方法 1：双指针（贪心）

**思路概括：** 移动左侧的木板和右侧的木板都是为了取到更多的水，每次只能移动一个。如果最短一侧的木板不动，后续的移动（缩短宽度）得到的结果必然不会比现状更多。

这个操作本质上是对于两次遍历的简化。在看到这道题时，最容易想到的解法是通过两次遍历，遍历出所有可能的情况，以此求出最小值（时间复杂度 `n^2` ）。但是，如果一边木板比另一边短的情况，移动另一边木板是完全无效的，因此可以让这一次的循环提前结束。

```javascript
var maxArea = function (height) {
  let left = 0,
    right = height.length - 1;
  let res = 0;
  while (left < right) {
    res = Math.max(Math.min(height[left], height[right]) * (right - left), res);

    if (height[left] < height[right]) left++;
    else right--;
  }
  return res;
};
```
