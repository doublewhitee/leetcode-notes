---
icon: code
date: 2026-09-08
order: 16
category:
  - LeetCode
tag:
  - 数组
  - 双指针
  - 排序
star: true
sticky: true
---

# 16. 最接近的三数之和

## 题目

给你一个长度为 `n` 的整数数组 `nums` 和 一个目标值 `target`。请你从 `nums` 中选出三个整数，使它们的和与 `target` 最接近。返回这三个整数的和。

假定每组输入只存在**恰好**一个解。

**示例 1：**

> 输入：nums = [-1,2,1,-4], target = 1
> 输出：2
> 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2)。

**示例 2：**

> 输入：nums = [0,0,0], target = 1
> 输出：0
> 解释：与 target 最接近的和是 0 (0 + 0 + 0 = 0)。

## 方法 1：排序 + 双指针

**思路：** 首先对数组进行排序，然后固定第一个数，使用双指针在剩余部分寻找另外两个数，使得三数之和最接近 `target`。

**关键点：**

1. 排序后可以方便地通过双指针调整三数之和与 `target` 的差距
2. 固定第一个数 `nums[i]`，在 `[i+1, n-1]` 区间内使用双指针 `left` 和 `right` 寻找另外两个数
3. 用一个变量 `best` 记录当前最接近 `target` 的和，通过比较差的绝对值来更新
4. 当 `sum === target` 时直接返回，因为这就是最接近的情况
5. 当 `sum < target` 时，需要增大和，左指针右移；当 `sum > target` 时，需要减小和，右指针左移

```javascript
var threeSumClosest = function(nums, target) {
  const n = nums.length;
  // 不满足的场景直接返回
  if (n < 3) return 0;

  // 数组排序
  nums = nums.sort((a, b) => a - b);

  // 初始化答案为前三数之和
  let best = nums[0] + nums[1] + nums[2];

  // 遍历列表
  for (let i = 0; i < n; i++) {
    // 设定左右指针，查找最接近 target 的结果
    let left = i + 1, right = n - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      // 更新最接近的结果
      if (Math.abs(sum - target) < Math.abs(best - target)) {
        best = sum;
      }
      // 恰好相等，直接返回
      if (sum === target) {
        return target;
      }
      else if (sum < target) left += 1;
      else if (sum > target) right -= 1;
    }
  }
  return best;
};
```

时间复杂度：**`O(n²)`**，其中 `n` 是数组的长度。排序的时间复杂度是 `O(n log n)`，枚举三元组的时间复杂度是 `O(n²)`。
空间复杂度：**`O(log n)`**，排序使用的额外空间。
