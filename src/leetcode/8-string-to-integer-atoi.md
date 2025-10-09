---
icon: code
date: 2025-09-22
category:
  - LeetCode
tag:
  - 暴力解法
  - 自动机
star: true
sticky: true
---

# 8. 字符串转换整数 (atoi)

## 题目

请你来实现一个 `myAtoi(string s)` 函数，使其能将字符串转换成一个 `32` 位有符号整数。

函数 `myAtoi(string s)` 的算法如下：

1.  **空格：** 读入字符串并丢弃无用的前导空格（`" "`）
2.  **符号：** 检查下一个字符（假设还未到字符末尾）为 `'-'` 还是 `'+'`。如果两者都不存在，则假定结果为正。
3.  **转换：** 通过跳过前置零来读取该整数，直到遇到非数字字符或到达字符串的结尾。如果没有读取数字，则结果为 0。
4.  **舍入：** 如果整数数超过 `32` 位有符号整数范围 `[−2^31,  2^31 − 1]` ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 `−2^31` 的整数应该被舍入为 `−2^31` ，大于 `2^31 − 1` 的整数应该被舍入为 `2^31 − 1` 。

返回整数作为最终结果。

**示例 1：**

> 输入：s = "42"
> 输出：42
> 解释：加粗的字符串为已经读入的字符，插入符号是当前读取的字符。
> 带下划线线的字符是所读的内容，插入符号是当前读入位置。
> 第 1 步："42"（当前没有读入字符，因为没有前导空格）
> 第 2 步："42"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
> 第 3 步："42"（读入 "42"）

## 方法 1：暴力解法

根据题目内容，主要需要对字符串做以下操作即可：

1. 去除开头空格
2. 返回有符号的整数
3. 忽视整数后面的其他字符
4. 整数范围 `[−2^31,  2^31 − 1]`
5. 不符合上述的其他情况返回 0

因此可以通过字符串计算操作得到正确答案。

```javascript
var myAtoi = function (s) {
  // 边界值
  const MAX_NUM = Math.pow(2, 31) - 1;
  const MIN_NUM = -Math.pow(2, 31);
  s = s.trim(); // 去除空格

  // 匹配字符
  const regex = /^[+-]?\d+/;
  const match = s.match(regex);

  if (!match) return 0; // 没有找到合法的数字部分，直接返回 0

  // 转换为数字类型
  let num = parseInt(match[0], 10);

  if (num > MAX_NUM) return MAX_NUM;
  if (num < MIN_NUM) return MIN_NUM;

  return num;
};
```

## 方法 2：自动机

**自动机** 是指我们的程序在每个时刻有一个状态 `s`，每次从序列中输入一个字符 `c`，并根据字符 `c` 转移到下一个状态 `s'`。这样，我们只需要建立一个覆盖所有情况的从 `s` 与 `c` 映射到 `s'` 的表格即可解决题目中的问题。

针对本题这个问题，我们可以用如下表格来表示这个自动机:

|               | ''(Space) | +/-(Sign) | number    | other |
| ------------- | --------- | --------- | --------- | ----- |
| **start**     | start     | signed    | in_number | end   |
| **signed**    | end       | end       | in_number | end   |
| **in_number** | end       | end       | in_number | end   |
| **end**       | end       | end       | end       | end   |

以 `" -42"` 为例，它在自动机中会执行如下转化流程：

1. 初始阶段，从第 `0` 行开始。由于第一个字符为空格，找到对应的列，因此坐标为[0, 0]，对应表格中的 **start** 阶段。
2. 因此第二个字符还是从第 `0` 行开始。第二个字符为负号，因此坐标为[0, 1]，对应表格中的 **signed** 阶段。
3. 下一个字符为"4"，因此坐标为[1, 2]，对应表格中的 **in_number** 阶段。
4. 下一个字符为"2"，因此坐标为[2, 2]，对应表格中的 **in_number** 阶段。
5. 没有字符，遍历结束，得到结果 `-42`。

```javascript
var myAtoi = function (s) {
  class Automaton {
    // 构建自动机类
    constructor() {
      this.state = "start"; // 初始为'start'阶段
      this.sign = 1; // 符号
      this.res = 0; // 数字
      this.map = new Map([
        ["start", ["start", "signed", "in_number", "end"]],
        ["signed", ["end", "end", "in_number", "end"]],
        ["in_number", ["end", "end", "in_number", "end"]],
        ["end", ["end", "end", "end", "end"]],
      ]); // 自动机状态和执行阶段对应表
    }

    // 获取状态的下标
    getIndex(char) {
      if (char === " ") return 0;
      if (char === "-" || char === "+") return 1;
      if (!isNaN(parseInt(char))) return 2;
      return 3;
    }

    // 执行转换
    get(char) {
      // 每次传入字符时，都要更新自动机的执行阶段
      this.state = this.map.get(this.state)[this.getIndex(char)];
      if (this.state === "in_number") {
        this.res = this.res * 10 + parseInt(char);
        this.res =
          this.sign === 1
            ? Math.min(this.res, Math.pow(2, 31) - 1)
            : Math.min(this.res, -Math.pow(-2, 31));
      } else if (this.state === "signed") {
        this.sign = char === "+" ? 1 : -1;
      }
    }
  }

  const automaton = new Automaton();

  for (let char of s) {
    automaton.get(char);
  }
  return automaton.sign * automaton.res;
};
```
