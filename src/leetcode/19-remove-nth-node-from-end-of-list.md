---
icon: code
date: 2026-09-12
order: 19
category:
  - LeetCode
tag:
  - 链表
  - 双指针
star: true
sticky: true
---

# 19. 删除链表的倒数第 N 个结点

## 题目

给你一个链表，删除链表的**倒数**第 `n` 个结点，并且返回链表的头结点。

**示例 1：**

> 输入：head = [1,2,3,4,5], n = 2
> 输出：[1,2,3,5]

**示例 2：**

> 输入：head = [1], n = 1
> 输出：[]

**示例 3：**

> 输入：head = [1,2], n = 1
> 输出：[1]

**提示：**

- 链表中结点的数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

**进阶：** 你能尝试使用一趟扫描实现吗？

## 方法 1：双指针（快慢指针）

**思路：** 使用快慢指针，让快指针先走 `n` 步，然后快慢指针同时前进。当快指针到达链表末尾时，慢指针恰好指向倒数第 `n` 个结点的前驱。为了方便处理头结点被删除的情况，引入**虚拟头结点**（dummy）。

**关键点：**

1. 引入虚拟头结点 `dummy`，统一处理删除头结点的边界情况
2. 快指针 `fast` 先走 `n` 步，建立与慢指针 `slow` 之间的 `n` 步间距
3. 然后 `fast` 和 `slow` 同时前进，直到 `fast.next === null`，此时 `slow` 指向待删除结点的前驱
4. 通过 `slow.next = slow.next.next` 完成删除
5. 返回 `dummy.next`（不能直接返回 `head`，因为头结点可能被删除）

```javascript
var removeNthFromEnd = function(head, n) {
  // 虚拟头结点，统一删除头结点的边界
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;

  // fast 先走 n 步
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // fast 和 slow 同时前进，直到 fast 到达末尾
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // slow 指向待删除结点的前驱
  slow.next = slow.next.next;
  return dummy.next;
};
```

时间复杂度：**`O(n)`**，快指针最多遍历链表两次（先走 `n` 步 + 同步前进），慢指针最多遍历一次。
空间复杂度：**`O(1)`**，只使用了常数个指针变量。

## 方法 2：两次遍历

**思路：** 第一遍遍历计算链表长度 `len`，第二遍遍历找到第 `len - n` 个结点（即倒数第 `n` 个结点）并删除。同样引入虚拟头结点处理边界。

**关键点：**

1. 第一遍遍历得到链表长度 `len`
2. 待删除结点在正数第 `len - n` 个位置（下标从 1 开始），因此其前驱在正数第 `len - n` 个位置
3. 使用虚拟头结点避免单独处理头结点被删除的情况
4. 再次遍历到前驱位置，执行删除操作

```javascript
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0, head);
  let len = 0;
  let cur = head;
  // 第一遍：计算链表长度
  while (cur !== null) {
    len++;
    cur = cur.next;
  }

  // 待删除结点为第 len - n 个，其前驱为第 len - n - 1 个
  // 从虚拟头结点走 len - n - 1 步到达前驱
  cur = dummy;
  for (let i = 0; i < len - n; i++) {
    cur = cur.next;
  }
  cur.next = cur.next.next;
  return dummy.next;
};
```

时间复杂度：**`O(n)`**，遍历链表两次。
空间复杂度：**`O(1)`**，只使用了常数个变量。
