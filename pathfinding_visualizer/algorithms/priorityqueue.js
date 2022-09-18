class PriorityNode {
  key;
  priority;

  constructor(key, priority) {
    this.key = key;
    this.priority = priority;
  }
}

export class PriorityQueue {
  nodes = [];

  enqueue(priority, key) {
    this.nodes.push(new PriorityNode(key, priority));
  }

  dequeue() {
    let min = Infinity;
    let minIndex;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].priority <= min) {
        min = this.nodes[i].priority;
        minIndex = i;
      }
    }

    const minKey = this.nodes[minIndex].key;

    this.nodes.splice(minIndex, 1);

    return minKey;
  }

  decreasePriority(key, priority) {
    const node = this.nodes.find(node => node.key === key);
    node.priority = priority;
  }

  empty() {
    return !this.nodes.length;
  }
}
