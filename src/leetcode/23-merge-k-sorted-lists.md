---
icon: code
date: 2026-09-17
order: 23
category:
  - LeetCode
tag:
  - 链表
  - 分治
  - 堆
  - 优先队列
star: true
sticky: true
---

# 23. 合并 K 个升序链表

## 题目

给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。

**示例 1：**

> 输入：lists = [[1,4,5],[1,3,4],[2,6]]
> 输出：[1,1,2,3,4,4,5,6]

**示例 2：**

> 输入：lists = []
> 输出：[]

**示例 3：**

> 输入：lists = [[]]
> 输出：[]

**提示：**

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` 按升序排列
- `lists[i].length` 总和不超过 `10^4`

## 方法 1：优先队列（小顶堆）

**思路：** 把 k 条链表的头结点放进一个小顶堆，堆顶永远是「当前 k 个候选头结点中最小的那一个」。每次弹出堆顶接到结果链表尾部，再把弹出结点的 `next`（如果非空）压回堆里。重复这个过程，k 条链表就会被按从小到大的顺序依次消费完。

**关键点：**

1. 堆的元素是「结点 + 所属链表下标」。只存结点无法在值相等时区分来自哪条链表，堆会因无法比较自定义对象而报错
2. 初始化时把每条非空链表的头结点压入堆，时间 `O(k log k)`
3. 主循环：弹堆顶 → 接到结果尾部 → 把弹出结点的 `next` 压回堆。每次操作都是 `O(log k)`
4. 整个过程每个结点恰好进出堆一次，所以总复杂度是 `O(N log k)`，`N` 是所有结点的总数
5. 仍然借助虚拟头结点 `dummy` 简化头结点处理，避免「结果链表为空」的特殊分支
6. 当 `k` 很大（如 `10^4`）但每条链表很短时，堆里始终只有少数几个结点，开销可控；当 `k` 小但 `N` 大时，这种方法的优势最明显

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var mergeKLists = function(lists) {
  // 自定义最小堆：值小的优先；值相等时按下标 next 比较（next 越大越优先）
  // 这样保证 [val, next] 是严格全序，堆的比较函数不会出现 undefined
  const heap = new MinHeap((a, b) => {
    if (a.val !== b.val) return a.val < b.val;
    return a.next - b.next;
  });

  // 把每条非空链表的头结点入堆
  for (let i = 0; i < lists.length; i++) {
    if (lists[i] !== null) {
      heap.push([lists[i], i]);
    }
  }

  const head = new ListNode(0);
  let tail = head;

  while (!heap.isEmpty()) {
    const [node] = heap.pop();      // 弹出当前最小的头结点
    tail.next = node;               // 接到结果尾部
    tail = tail.next;

    if (node.next !== null) {
      heap.push([node.next, node[1]]); // 把该链表的下一个结点压回堆里
    }
  }

  return head.next;
};
```

时间复杂度：**`O(N log k)`**，`N` 是所有链表结点总数，`k` 是链表条数。每个结点入堆 / 出堆各一次，每次堆操作是 `O(log k)`。
空间复杂度：**`O(k)`**，堆中最多同时保存 k 个头结点。

## 方法 2：分治（两两合并）

**思路：** 借助第 21 题的「合并两个有序链表」函数，对 k 条链表做**归并式的两两合并**。第一轮把 `lists[0]` 和 `lists[1]` 合并、`lists[2]` 和 `lists[3]` 合并……；第二轮再把上一轮的结果两两合并；直到只剩一条链表。这一过程和归并排序的「自底向上归并」完全一致。

**关键点：**

1. 复用「合并两个有序链表」的迭代版（虚拟头结点 + 一次扫描），把它当成 `mergeTwoLists(a, b)`
2. 每一轮合并后，链表条数大致减半，所以总共需要 `log k` 轮
3. 每轮遍历所有当前链表，合并的总结点数是 `O(N)`（每条链表在这一轮恰好被扫一次）。全部 `log k` 轮加起来是 `O(N log k)`
4. 不要写成「顺序合并」（先把 `lists[0]` 和 `lists[1]` 合并，再把结果和 `lists[2]` 合并……），那种写法每轮长度翻倍，是 `O(kN)`，比 `O(N log k)` 慢很多
5. 终止条件：当前数组长度 ≤ 1 时直接返回 `lists[0]`（可能为 `null`，对应输入里全是空链表的情况）

```javascript
var mergeKLists = function(lists) {
  // 复用 21 题的迭代版：虚拟头结点 + 一次扫描
  const mergeTwoLists = (a, b) => {
    const dummy = new ListNode(0);
    let cur = dummy;
    while (a !== null && b !== null) {
      if (a.val <= b.val) {
        cur.next = a;
        a = a.next;
      } else {
        cur.next = b;
        b = b.next;
      }
      cur = cur.next;
    }
    cur.next = a !== null ? a : b;
    return dummy.next;
  };

  // 分治：两两合并，直到只剩一条
  while (lists.length > 1) {
    const merged = [];
    // 两两配对：i 与 i+1 合并；落单的 i（lists.length 为奇数）直接进下一轮
    for (let i = 0; i < lists.length; i += 2) {
      if (i + 1 < lists.length) {
        merged.push(mergeTwoLists(lists[i], lists[i + 1]));
      } else {
        merged.push(lists[i]);
      }
    }
    lists = merged; // 用合并后的数组进入下一轮
  }

  // 此时 lists 要么为空（输入全是空链表），要么只剩一条
  return lists[0] ?? null;
};
```

时间复杂度：**`O(N log k)`**。第 `i` 轮合并的总结点数是 `O(N)`，共 `log k` 轮，每轮内部调用 `mergeTwoLists` 是线性合并。
空间复杂度：**`O(log k)`**，用于 `merged` 中间数组的递归式生成（最坏情况下 `log k` 层都同时存在）；不计合并过程中链表本身的指针重连（这是 `O(1)`）。

> 两种方法都是 `O(N log k)`，但实现路径完全不同：
>
> - **方法 1（堆）** 思路更「线性」：始终只维护 k 个候选头结点，每次 `O(log k)` 选出最小的往结果里接。代码量稍大、需要写（或引入）堆结构，但「按顺序一个一个吐出结点」的过程很自然。
> - **方法 2（分治）** 思路更「递归」：把 k 条链表按归并排序的方式自底向上两两合并，每一轮 `lists.length` 减半。代码直接复用 21 题的 `mergeTwoLists`，不需要额外数据结构。
>
> 面试里两种都值得掌握：方法 1 展示了「用堆维护多个有序序列的最小值」这一通用套路（同样适用于「多个有序数组的第 K 小元素」等问题）；方法 2 则展示了「分治把 k 路合并降为 log k 轮合并」的对称美感。如果你不想手写堆、又已经在写 21 题，直接套方法 2 是性价比最高的做法。
