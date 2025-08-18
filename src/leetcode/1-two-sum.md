---
icon: code
date: 2025-08-18
category:
  - LeetCode
tag:
  - 暴力解法
  - 哈希表
star: true
sticky: true
---

# 1. 两数之和

## 题目

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** `target` 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

**示例 1：**

> 输入：nums = [2,7,11,15], target = 9
> 输出：[0,1]
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

**示例 2：**

> 输入：nums = [3,2,4], target = 6
> 输出：[1,2]

**示例 3：**

> 输入：nums = [3,3], target = 6
> 输出：[0,1]

## 方法 1：暴力枚举

在给定的数组中进行遍历，假设获取到的数字为 `num[i]`，那么只需要找到数组剩余的值中是否存在 `target - num[i]`。由于前序已经匹配过，因此可以从下标 `i` 的下一个元素进行查找，减少重复匹配。

```javascript
var twoSum = function (nums, target) {
  // 设定一个数nums[i]
  for (let i = 0; i < nums.length - 1; i++) {
    let rest = target - nums[i];
    // 查找 target - nums[i]是否存在
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === rest) {
        return [i, j];
      }
    }
  }
};
```

时间复杂度：**`O(n²)`**
空间复杂度：**`O(1)`**

## 方法 2：哈希表

方法一的时间复杂度较高的原因是寻找 `target - nums[i]` 的时间复杂度过高。因此，可以采用哈希表，对于每一个 `nums[i]`，首先查询哈希表中是否存在 `target - nums[i]`，然后将 `nums[i]` 插入到哈希表中，即可保证不会让 `nums[i]` 和自己匹配。

```javascript
var twoSum = function (nums, target) {
  // 定义哈希表
  const hashMap = {};
  for (let i = 0; i < nums.length; i++) {
    const targetNum = target - nums[i]; // 计算另一个数字
    if (hashMap[targetNum] !== undefined) {
      return [hashMap[targetNum], i]; // 如果存在，证明找到两个数字的位置
    }
    // 没有找到，在哈希表中存储当前的数字为key，位置为value
    hashMap[nums[i]] = i;
  }
  return [];
};
```

时间复杂度：**`O(n)`**
空间复杂度：**`O(n)`**，哈希表的开销
