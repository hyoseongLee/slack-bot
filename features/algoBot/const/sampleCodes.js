export const sampleCodes = {
  stack :
`
\`\`\`
class Stack {
  constructor() {
    this.stack = [];
  }

  push(element) {
    this.stack.push(element); // element를 push한다.
  }

  pop() {
    if (this.stack.length === 0) return false // 0인경우 pop 하는 것은 불가능해요.
    return this.stack.pop(); // pop한 값을 뺀다.
  }
}
\`\`\`

https://www.scorchedrice.com/article/algobot-algorithm-1/ 에서 자세한 정보를 확인해볼 수 있어요.
`,
  queue:
` 
\`\`\`
class Queue {
  constructor() {
    this.queue = [];
  }

  push(element) {
    this.queue.push(element)
  }

  popleft() {
    // 선입선출의 구조이기 때문에 array 앞부분이 우선적으로 나와야겠죠?
    if (this.queue.length === 0) return false
    return this.queue.shift();
  }
}
\`\`\`

https://www.scorchedrice.com/article/algobot-algorithm-1/ 에서 자세한 정보를 확인해볼 수 있어요.
`,
  heap:
`
\`\`\`
class MaxHeap {
  constructor() {
    this.pq = [null];
}
insert(element) {
  this.pq.push(element); // 일단 배열에 push
  let currentIndex = this.pq.length-1;
  let parentIndex = Math.floor(currentIndex/2);
  while (
    parentIndex !== 0 &&
    this.pq[currentIndex] > this.pq[parentIndex] // 자식 노드값이 더 크다면 올라가야한다.
  ) {
    [this.pq[currentIndex], this.pq[parentIndex]] = [this.pq[parentIndex], this.pq[currentIndex]];
    currentIndex = parentIndex;
    parentIndex = Math.floor(currentIndex/2);
  }
}
heappop() {
  if (this.pq.length === 2) return this.pq.pop(); // 오직 루트노드만 있을 때
  const returnValue = this.pq[1];
  this.pq[1] = this.pq.pop(); // 마지막 리프노드 하나를 루트노드로 임의 배치 => 재배치 과정
  let currentIndex = 1;
  let leftIndex = 2;
  let rightIndex = 3;
  while (
      this.pq[currentIndex] < this.pq[leftIndex] ||
      this.pq[currentIndex] < this.pq[rightIndex]
    ) {
      if (this.pq[leftIndex] < this.pq[rightIndex]) {
        [this.pq[currentIndex], this.pq[rightIndex]] = [this.pq[rightIndex], this.pq[currentIndex]]
        currentIndex = rightIndex
      } else {
        // left가 더 큰경우 뿐만 아니라, right가 인덱스를 벗어나 undefined를 도출하는 경우에도 left를 변경해야함.
        [this.pq[currentIndex], this.pq[leftIndex]] = [this.pq[leftIndex], this.pq[currentIndex]]
        currentIndex = leftIndex
      }
      leftIndex = currentIndex * 2;
      rightIndex = leftIndex + 1;
    }
      return returnValue;
  }
}

\`\`\`

https://www.scorchedrice.com/article/algobot-algorithm-2/ 에서 자세히 확인할 수 있어요.
`,
linkedlist:
`
\`\`\`
class Node {
  constructor(nodeName) {
    this.name = nodeName;
    this.after = null;
  }
  setAfter(nodeName) {
    this.after = nodeName;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  push(element) {
    if (this.head === null) {
      this.head = element;
      this.tail = element;
    } else {
      this.tail.setAfter(element);
      this.tail = element;
    }
  }

  // head(처음)부터 tail(끝)까지 탐색한다면
  headToTail() {
    let currentNode = this.head;
    console.log(currentNode);
    while (currentNode.after !== null) {
      currentNode = currentNode.after;
      console.log(currentNode);
    }
  }
}
\`\`\`

https://www.scorchedrice.com/article/algobot-algorithm-2/ 에서 자세한 정보를 확인할 수 있어요.
`,
binarysearchtree:`
\`\`\`
class Node {
  constructor(nodeNumber) {
    this.node = nodeNumber;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BST {
// root : Node class
  constructor(root) {
    this.root = root;
  }

  insert(node) {
  // insert
    if (node.node < this.root.node) {
      if (this.root.leftChild ===  null) {
        this.root.leftChild = new BST(node);
      } else {
        this.root.leftChild.insert(node);
      }
    } else if (node.node > this.root.node) {
      if (this.root.rightChild === null) {
        this.root.rightChild = new BST(node);
      } else {
        this.root.rightChild.insert(node);
      }
    } else {
      return
    }
  }
  search(node) {
    if (node.node === this.root.node) {
      return true;
    }

    if (node.node < this.root.node) {
      if (this.root.leftChild === null) {
        return false
      } else {
        this.root.leftChild.search(node);
      }
    }

    if (node.node > this.root.node) {
      if (this.root.rightChild === null) {
        return false
      } else {
        this.root.rightChild.search(node);
      }
    }
  }
}
\`\`\`

https://www.scorchedrice.com/article/algobot-algorithm-2/ 에서 자세한 정보를 확인할 수 있어요.
`,
dfs: `
DFS와 BFS는 다양한 곳에서 활용할 수 있어야해요. 이차원 배열에서, 노드와 간선 관계에서.. 언제 어떤식으로 구현해야할지 연습을 통해 학습해야해요.

https://www.scorchedrice.com/article/algobot-algorithm-1/ 해당 게시물의 예시 자료를 보고 DFS와 BFS의 차이를 명확하게 이해할 수 있다면 코드를 통해 연습하는 방법을 추천해요.
`,
bfs: `
DFS와 BFS는 다양한 곳에서 활용할 수 있어야해요. 이차원 배열에서, 노드와 간선 관계에서.. 언제 어떤식으로 구현해야할지 연습을 통해 학습해야해요.

https://www.scorchedrice.com/article/algobot-algorithm-1/ 해당 게시물의 예시 자료를 보고 DFS와 BFS의 차이를 명확하게 이해할 수 있다면 코드를 통해 연습하는 방법을 추천해요.
`
}