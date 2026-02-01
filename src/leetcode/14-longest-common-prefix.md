---
icon: code
date: 2026-02-01
category:
  - LeetCode
tag:
  - 字符串
  - 数组
star: true
sticky: true
---

# 14. 最长公共前缀

## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1：**

> 输入：strs = ["flower","flow","flight"]
> 输出："fl"

**示例 2：**

> 输入：strs = ["dog","racecar","car"]
> 输出：""
> 解释：输入不存在公共前缀。

## 方法 1：纵向扫描

纵向扫描：从前往后遍历所有字符串的每一列，比较相同列上的字符是否相同，如果相同则继续对下一列进行比较，如果不相同则当前列不再属于公共前缀，当前列之前的部分为最长公共前缀。

```javascript
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return "";
  
  // 以第一个字符串为基准
  const firstStr = strs[0];
  const len = firstStr.length;
  const count = strs.length;
  
  // 遍历第一个字符串的每个字符
  for (let i = 0; i < len; i++) {
    const char = firstStr[i];
    // 检查其他字符串在相同位置是否也是这个字符
    for (let j = 1; j < count; j++) {
      // 如果当前字符串长度不够，或者字符不匹配，返回当前已匹配的前缀
      if (i === strs[j].length || strs[j][i] !== char) {
        return firstStr.substring(0, i);
      }
    }
  }
  
  // 如果第一个字符串就是最短的，且所有字符都匹配
  return firstStr;
};
```

时间复杂度：**`O(mn)`**，其中 `m` 是字符串数组中的字符串的平均长度，`n` 是字符串的数量。
空间复杂度：**`O(1)`**

## 方法 2：横向扫描

横向扫描：依次遍历字符串数组中的每个字符串，对于每个遍历到的字符串，更新最长公共前缀，当遍历完所有的字符串以后，即可得到字符串数组中的最长公共前缀。

```javascript
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return "";
  
  let prefix = strs[0];
  
  // 依次与后续字符串比较
  for (let i = 1; i < strs.length; i++) {
    prefix = getCommonPrefix(prefix, strs[i]);
    // 如果公共前缀为空，提前返回
    if (prefix.length === 0) break;
  }
  
  return prefix;
};

// 获取两个字符串的公共前缀
function getCommonPrefix(str1, str2) {
  const minLen = Math.min(str1.length, str2.length);
  let index = 0;
  
  while (index < minLen && str1[index] === str2[index]) {
    index++;
  }
  
  return str1.substring(0, index);
}
```

时间复杂度：**`O(mn)`**，其中 `m` 是字符串数组中的字符串的平均长度，`n` 是字符串的数量。
空间复杂度：**`O(1)`**
