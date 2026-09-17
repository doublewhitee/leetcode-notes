---
icon: code
date: 2026-09-13
order: 21
category:
  - LeetCode
tag:
  - 链表
  - 递归
star: true
sticky: true
---

# 21. 合并两个有序链表

## 题目

将两个升序链表合并为一个新的**升序**链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。

**示例 1：**

> 输入：l1 = [1,2,4], l2 = [1,3,4]
> 输出：[1,1,2,3,4,4]

**示例 2：**

> 输入：l1 = [], l2 = []
> 输出：[]

**示例 3：**

> 输入：l1 = [], l2 = [0]
> 输出：[0]

**提示：**

- 两个链表的结点数目的范围为 `[0, 50]`
- `-100 <= Node.val <= 100`
- `l1` 和 `l2` 均按 **非递减顺序** 排列

## 方法 1：迭代 + 虚拟头结点

**思路：** 用一个虚拟头结点 `dummy` 串联结果，引入游标指针 `current` 依次把较小值的结点接上去。当某个链表遍历完后，把另一个链表剩余部分直接接到结果尾部。

**关键点：**

1. 引入虚拟头结点 `dummy`，避免单独处理「结果链表头」的空指针问题
2. 维护 `current` 指针指向当前已拼接好的尾结点
3. 每次比较 `list1.val` 和 `list2.val`，把较小值的结点接到 `current.next` 并推进对应链表的指针
4. 当其中一条链表为空时，把另一条链表的剩余部分整体接到尾部即可
5. 返回 `dummy.next`，不能直接返回 `current`（它指向末尾结点）

```javascript
var mergeTwoLists = function(list1, list2) {
  // 虚拟头结点，统一处理「结果链表为空」的情况
  const dummy = new ListNode(0);
  let current = dummy;

  // 两条链表都未遍历完时，比较结点值依次拼接
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // 至少一条链表遍历完，把另一条剩余部分直接接上
  current.next = list1 !== null ? list1 : list2;

  return dummy.next;
};
```

时间复杂度：**`O(n + m)`**，其中 `n` 和 `m` 分别是两个链表的长度。每个结点恰好访问一次。
空间复杂度：**`O(1)`**，只使用了常数个指针变量。

## 方法 2：递归

**思路：** 递归地处理头结点较小的那个链表，把它的 `next` 指向「剩余部分与另一条链表合并后的结果」，最后返回这个头结点。

**关键点：**

1. 终止条件：其中一条链表为空时，直接返回另一条链表
2. 递归关系：取头结点较小的那条链表，让它的 `next` 等于「两链表剩余部分合并的结果」
3. 递归本质是「先确定当前头结点，再把剩余工作交给下一层」
4. 递归深度等于较短链表的长度，最坏情况下为 `O(n + m)`（一条链表很长、另一条极短时会有较多递归栈帧）

```javascript
var mergeTwoLists = function(list1, list2) {
  // 任一链表为空，直接返回另一条
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  if (list1.val <= list2.val) {
    // list1 较小：合并 list1.next 和 list2，再接到 list1 后面
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    // list2 较小：合并 list1 和 list2.next，再接到 list2 后面
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
```

时间复杂度：**`O(n + m)`**，与方法 1 相同。
空间复杂度：**`O(n + m)`**，递归调用栈的深度，取决于较短链表的长度；最坏情况下（一条链表为空、另一条很长）为 `O(n)` 或 `O(m)`。

> 两种写法时间复杂度相同，差异在空间：迭代版是 `O(1)`，递归版是 `O(n + m)`。在链表很长（特别是面试中常见的 10⁴~10⁵ 量级）时，递归可能爆栈，**优先使用迭代版**。递归版的优势是代码更短、更贴合「分治」的直觉，适合作为理解递归的练习。
