class Node {
  constructor (col, row) {
    this.col = col
    this.row = row
    this.edges = {
      nw: [col - 1, row - 1],
      n: [col, row - 1],
      ne: [col + 1, row - 1]
    }
    this.counter = ' '
  }

  addCounter (color) {
    const counters = {
      black: '●',
      white: '○'
    }
    this.counter = counters[color]
  }
}

module.exports = Node
