---
icon: code
date: 2025-08-25
category:
  - LeetCode
tag:
  - 滑动窗口
star: true
sticky: true
---

# 3. 无重复字符的最长子串

## 题目

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长 子串** 的长度。

**示例 1：**

> 输入: s = "abcabcbb"
> 输出: 3
> 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

**示例 2：**

> 输入: s = "bbbbb"
> 输出: 1
> 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

**示例 3：**

> 输入: s = "pwwkew"
> 输出: 3
> 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

## 方法 1：滑动窗口

以示例一中的字符串 abcabcbb 为例，找出从每一个字符开始的，不包含重复字符的最长子串，那么其中最长的那个字符串即为答案。对于示例一中的字符串，我们列举出这些结果，其中括号中表示选中的字符以及最长的字符串：

- 以 (a)bcabcbb 开始的最长字符串为 (abc)abcbb；
- 以 a(b)cabcbb 开始的最长字符串为 a(bca)bcbb；
- 以 ab(c)abcbb 开始的最长字符串为 ab(cab)cbb；
- 以 abc(a)bcbb 开始的最长字符串为 abc(abc)bb；
- 以 abca(b)cbb 开始的最长字符串为 abca(bc)bb；
- 以 abcab(c)bb 开始的最长字符串为 abcab(cb)b；
- 以 abcabc(b)b 开始的最长字符串为 abcabc(b)b；
- 以 abcabcb(b) 开始的最长字符串为 abcabcb(b)。

这其实就是滑动窗口的思想，可以维护一段不重复的字符串队列，当出现重复时滑动它（将左边元素移出队列），直到满足题目要求。一直维持这样的结果，即可得到队列最长的长度。

```javascript
var lengthOfLongestSubstring = function (s) {
  // 哈希集合，记录每个字符是否出现过
  const set = new Set();
  const len = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rightIndex = -1,
    maxLen = 0;
  for (let i = 0; i < len; ++i) {
    if (i !== 0) {
      // 左指针向右移动一格，移除一个字符
      set.delete(s.charAt(i - 1));
    }
    // 当未遍历结束，且下一位在当前set中未重复时
    while (rightIndex + 1 < n && !set.has(s.charAt(rightIndex + 1))) {
      // 不断地移动右指针
      set.add(s.charAt(rightIndex + 1));
      ++rightIndex;
    }
    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    maxLen = Math.max(maxLen, rightIndex - i + 1);
  }
  return maxLen;
};
```

时间复杂度：**`O(n)`**
