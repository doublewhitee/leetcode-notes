---
icon: code
date: 2026-09-17
order: 24
category:
  - LeetCode
tag:
  - 链表
  - 递归
star: true
sticky: true
---

# 24. 两两交换链表中的结点

## 题目

给你一个链表，两两交换其中相邻的结点，并返回交换后链表的头结点。**必须在不修改结点内部值的情况下完成本题**（即，只能进行结点指针的重新连接）。

**示例 1：**

> 输入：head = [1,2,3,4]
> 输出：[2,1,4,3]

**示例 2：**

> 输入：head = []
> 输出：[]

**示例 3：**

> 输入：head = [1]
> 输出：[1]

**提示：**

- 链表中结点的数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

## 方法 1：迭代 + 虚拟头结点

**思路：** 引入虚拟头结点 `node`，让 `node.next` 始终指向「当前要处理的那一对结点中的第一个」。每一轮处理一对结点时，先用 `left` / `right` 把这一对取出来，按 `right → left → 下一对的头` 的顺序重连三条指针，最后把 `node` 前进两步，进入下一轮。当剩余不足两个结点时退出。

**关键点：**

1. 借助虚拟头结点 `node`，避免「头结点被换掉」后丢失结果入口。用 `const arr = node` 把入口地址保存下来，循环结束后从它出发返回真正的头
2. 循环条件 `node && node.next && node.next.next`：**剩余至少有两个结点**才进入循环；只剩一个或零个时直接结束
3. 每一轮重连三条边：
   - `node.next = right`：把当前指针接到这一对的新头 `right`
   - `left.next = right.next`：让 `left` 指向「下一对的头」（**顺序敏感**：必须先做这一步，再做下一步，否则 `right.next` 会被覆盖）
   - `right.next = left`：让 `right` 指向 `left`，完成这一对的反转
4. `node = node.next.next`：循环结束后 `node` 指向 `left`（这一对的尾），下一轮从这里开始处理下一对
5. 返回 `arr.next`，它指向交换后的真正头结点

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // 虚拟头结点，把 head 接在它后面；统一处理「头结点被换掉」的情况
    let node = new ListNode(0, head);
    // arr 保存虚拟头结点的入口地址，循环结束后从这里取真正的头
    const arr = node;
    // 至少要剩两个结点（node.next 和 node.next.next 都非空）才能交换
    while (node && node.next && node.next.next) {
        // left / right：当前这一对的两个结点
        const left = node.next;
        const right = node.next.next;

        // 三步重连：node → right → left → (下一对的头)
        node.next = right;          // 当前指针指向这一对的新头 right
        left.next = right.next;     // left 指向「下一对的头」（必须先做，否则 right.next 就丢了）
        right.next = left;          // right 反指 left，完成这一对的反转

        // node 前进两步，来到这一对的尾（left），下一轮从这里开始处理下一对
        node = node.next.next;
    }
    // arr.next 就是交换后的真正头结点
    return arr.next;
};
```

时间复杂度：**`O(n)`**，每个结点恰好访问一次。
空间复杂度：**`O(1)`**，只使用了常数个指针变量。

## 方法 2：递归

**思路：** 把问题拆成「交换前两个结点」+「把交换后的尾部接上后面结点交换的结果」。具体地：先把前两个结点 `first` / `second` 拿出来，让 `second.next = first`，再让 `first.next = swapPairs(second.next)`（即「从第三个结点开始递归交换的结果」），最后返回 `second` 作为这一段的新头。

**关键点：**

1. 终止条件：链表为空或只有一个结点，直接返回头（无结点可交换）
2. 递归关系：`newHead = second`，`first.next = swapPairs(second.next)`，`second.next = first`，返回 `newHead`
3. 这一步只关心「前两个结点的重连 + 把后续的递归结果接上」，不需要虚拟头结点
4. 递归深度 = `⌊n/2⌋`，最坏 `O(n)`，对本题 `n ≤ 100` 完全无压力；如果链表很长（n ≥ 10⁴）仍可能爆栈，那时就要改用方法 1
5. 代码比方法 1 短很多，但理解成本稍高：核心是「先处理当前两个结点，再把尾巴交给递归」，不要把 `first.next` 和 `second.next` 的赋值顺序弄混

```javascript
var swapPairs = function(head) {
  // 终止：没有结点或只有一个结点，没法交换
  if (head === null || head.next === null) return head;

  const first = head;
  const second = head.next;

  // 先把后面的部分递归交换，再接回 first 后面
  first.next = swapPairs(second.next);
  // second 变成这一段的新头
  second.next = first;

  return second;
};
```

时间复杂度：**`O(n)`**，每个结点恰好访问一次。
空间复杂度：**`O(n)`**，递归调用栈深度为 `⌊n/2⌋`，最坏情况下为 `O(n)`。

> 两种写法时间复杂度相同，差异在空间与代码风格：
>
> - **方法 1（迭代）** 是 `O(1)` 空间，逻辑稍微绕：要同时维护「指向当前新头」「当前对的两个结点」「下一对的头」四个指针，并且赋值顺序不能乱。优点是面试里最稳，长链表不会爆栈。
> - **方法 2（递归）** 是 `O(n)` 空间，代码短很多：只看「前两个结点 + 后面的递归结果」，赋值也只有两步。适合链表长度不大、追求表达简洁的场景，也是后续做「K 个一组翻转」（LeetCode 25）时递归写法的雏形。
>
> 链表题的常见取舍：**优先写迭代版保证安全，递归版作为理解题意的辅助**。
