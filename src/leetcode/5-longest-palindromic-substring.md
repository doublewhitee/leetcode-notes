---
icon: code
date: 2025-08-29
order: 5
category:
  - LeetCode
tag:
  - 动态规划
  - 中心扩展算法
star: true
sticky: true
---

# 5. 最长回文子串

## 题目

给你一个字符串 `s`，找到 `s` 中最长的 **回文子串**。

**示例 1：**

> 输入：s = "babad"
> 输出："bab"
> 解释："aba" 同样是符合题意的答案。

**示例 2：**

> 输入：s = "cbbd"
> 输出："bb"

## 方法 1：动态规划

对于一个子串而言，如果它是回文串，并且长度大于 2，那么将它首尾的两个字母去除之后，它仍然是个回文串。例如对于字符串 “ababa”，如果我们已经知道 “bab” 是回文串，那么 “ababa” 一定是回文串，这是因为它的首尾两个字母都是 “a”。

根据这样的思路，我们就可以用动态规划的方法解决本题。我们用 P(i,j) 表示字符串 `s` 的第 `i` 到 `j` 个字母组成的串（下文表示成 s[i:j]）是否为回文串：

$$
P(i,j)=\begin{cases}
true, & 如果子串 Si…Sj 是回文串 \\
false, & 其他情况
\end{cases}
$$

这里的「其它情况」包含两种可能性：

- s[i,j] 本身不是一个回文串；
- i>j，此时 s[i,j] 本身不合法。

那么我们就可以写出动态规划的状态转移方程：

$$P(i,j)=P(i+1,j−1)∧(Si ==Sj)$$

也就是说，只有 s[i+1:j−1] 是回文串，并且 s 的第 i 和 j 个字母相同时，s[i:j] 才会是回文串。

上文的所有讨论是建立在子串长度大于 2 的前提之上的，我们还需要考虑动态规划中的边界条件，即子串的长度为 1 或 2。对于长度为 1 的子串，它显然是个回文串；对于长度为 2 的子串，只要它的两个字母相同，它就是一个回文串。因此我们就可以写出动态规划的边界条件：

$$
\begin{cases}
P(i,i)=true \\
P(i,i + 1)=(S[i] === S[i + 1])
\end{cases}
$$

根据这个思路，我们就可以完成动态规划了，最终的答案即为所有 P(i,j)=true 中 j−i+1（即子串长度）的最大值。

```javascript
var longestPalindrome = function (s) {
  const len = s.length;
  if (len < 2) return s;

  let maxLen = 1,
    begin = 0;
  // 生成二位数组，存储[start][end]的结果
  const dp = new Array(len).fill().map(() => new Array(len).fill(false));
  // 初始化 子串长度为1时一定为回文子串
  for (let i = 0; i < len; i++) {
    dp[i][i] = true;
  }

  // 从子串长度为2开始处理
  for (let subLen = 2; subLen <= len; subLen++) {
    // 定义开始下标i
    for (let i = 0; i < len; i++) {
      // 计算结束下标j
      let j = subLen + i - 1;
      if (j >= len) break; // 边界场景，直接跳出

      // 如果两边不相等，证明不是回文子串
      if (s[i] !== s[j]) {
        dp[i][j] = false;
      } else {
        if (j - i < 3) {
          // 如果长度小于等于2，且开始结束字符相等，一定是回文串
          dp[i][j] = true;
        } else {
          // 否则它是否是回文串取决于dp[i + 1][j - 1]的结果
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      // 计算完成后更新最大回文子串的结果
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        begin = i;
      }
    }
  }

  return s.substring(begin, begin + maxLen);
};
```

时间复杂度：**`O(n^2)`**
空间复杂度：**`O(n^2)`**

## 方法 2：中心扩展算法

**中心扩展算法**是一种通过以字符串的每个字符或字符对作为中心，然后向两边进行扩展来查找最长回文子串的算法。

边界情况即为子串长度为 `1` 或 `2` 的情况。我们枚举每一种边界情况，并从对应的子串开始不断地向两边扩展。如果两边的字母相同，我们就可以继续扩展，例如从 `P(i+1,j−1)` 扩展到 `P(i,j)`；如果两边的字母不同，我们就可以停止扩展，因为在这之后的子串都不能是回文串了。

```javascript
var longestPalindrome = function (s) {
  if (s.length <= 1) return s;

  let start = 0,
    end = 0;
  for (let i = 0; i < s.length; i++) {
    // 分别计算边界场景为1和2的情况进行扩展
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
};

// 封装中心扩展算法
const expandAroundCenter = (str, left, right) => {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    --left;
    ++right;
  }
  return right - left - 1;
};
```

时间复杂度：**`O(n^2)`**
空间复杂度：**`O(1)`**
