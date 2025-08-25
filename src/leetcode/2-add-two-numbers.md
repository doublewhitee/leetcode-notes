---
icon: code
date: 2025-08-23
category:
  - LeetCode
tag:
  - 链表
star: true
sticky: true
---

# 2. 两数相加

## 题目

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

> 输入：l1 = [2,4,3], l2 = [5,6,4]
> 输出：[7,0,8]
> 解释：342 + 465 = 807.

**示例 2：**

> 输入：l1 = [0], l2 = [0]
> 输出：[0]

**示例 3：**

> 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
> 输出：[8,9,9,9,0,0,0,1]

## 方法 1：模拟

这题的思路很简单就能得到，按位数逐位相加，将它们的求和结果作为当前位数。同时计算进位，给下一位计算。如果结束时还有进位，那么新增一位。对我来说它的坑点在于链表的写法，调试了好几次。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0; // 标志进位
  let listNode = null;
  let head = null; // 用于从 head 返回链表
  while (l1 || l2) {
    let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    if (!head) {
      head = listNode = new ListNode(sum % 10); // 首个链表节点
    } else {
      // 赋值下一位
      listNode.next = new ListNode(sum % 10);
      listNode = listNode.next;
    }
    carry = Math.floor(num / 10); // 计算下一个进位
    // 切换到下一位节点
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  // 如果计算完毕有进位，新增一个节点
  if (carry) listNode.next = new ListNode(carry);
  return head;
};
```

时间复杂度：**`O(n)`**
空间复杂度：**`O(1)`**，返回值不计入空间复杂度
