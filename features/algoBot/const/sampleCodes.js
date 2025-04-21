export const sampleCodes = {
  stack :
`
\`\`\`
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
}
\`\`\`
`,
  queue:
` 
\`\`\`
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
}
\`\`\`
`,
  heap:
`
\`\`\`
// pq : Priority Queue의 약자로 우선순위 큐를 의미합니다.
class Heap {
  constructor() {
    this.pq = [null];
  }
  length() {
    return this.pq.length;
  }
  insert(element) {
    this.pq.push(element); // 일단 삽입한다.
    let currentIndex = this.pq.length -1;
    let parentIndex =  Math.floor(currentIndex/ 2) // null을 기본값으로 넣은 이유
    while (
      parentIndex !== 0 &&
        this.pq[currentIndex] > this.pq[parentIndex]
    ) {
      // 부모보다 자식이 큰 값이라면 바꿔야한다.
      [this.pq[parentIndex], this.pq[currentIndex]] = [this.pq[currentIndex], this.pq[parentIndex]]
      // 현재 값이 부모 노드위치로 올라갔으니 이를 반영한다.
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }
  heappop() {
    // 루트노드만 있는 경우의 예외를 처리한다.
    if (this.pq.length === 2) return this.pq.pop();
    // 최상단 노드 값을 임시 저장한다. 재배치를 완료한 이후에 이를 반환한다.
    const returnValue = this.pq[1];
    this.pq[1] = this.pq.pop(); // 마지막 노드값을 할당하여 강제 재배치를 진행한다.
    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    // 현 위치보다 자식들의 값이 더 크다면 바꿔야함.
    while (
      this.pq[currentIndex] < this.pq[leftIndex] ||
      this.pq[currentIndex] < this.pq[rightIndex]
    ) {
      // 이동할 때 더 큰 노드쪽으로 이동한다.
      if (this.pq[rightIndex] > this.pq[leftIndex]) {
        [this.pq[currentIndex],this.pq[rightIndex]] = [this.pq[rightIndex],this.pq[currentIndex]]
        currentIndex = rightIndex;
      } else {
        [this.pq[currentIndex],this.pq[leftIndex]] = [this.pq[leftIndex],this.pq[currentIndex]]
        currentIndex = leftIndex;
      }
      leftIndex = currentIndex  * 2;
      rightIndex = leftIndex + 1;
      // left, right, current를 다시 정하고 이를 반복한다.
    }
    return returnValue;
  }
}
\`\`\`
`
}