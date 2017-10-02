const Graph = require('cli-table')
const Node = require('./node')

const chars = {
  top: '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  bottom: '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  left: '║',
  'left-mid': '╟',
  mid: '─',
  'mid-mid': '┼',
  right: '║',
  'right-mid': '╢',
  middle: '│'
}

class Grid {
  constructor ({ cols, rows }) {
    this.cols = cols || 6
    this.rows = rows || 7
    this._graph = []

    new Array(this.rows)
      .fill(0)
      .forEach((row, rowIndex) => {
        const nodes = new Array(this.cols)
          .fill(0)
          .map((node, n) => new Node(n, rowIndex))

        this._graph.push(nodes)
      })
  }

  getNode (col, row) {
    return this._graph[row][col] ? this._graph[row][col] : null
  }

  addCounter (color, col) {
    if (col < 0 || col > this.cols - 1) return new Error(`Column ${col} is out of bounds`)
    const node = this._findEmptyLocation(col)
    if (!node) return new Error(`Column ${col} is full`)
    this._graph[node.row][node.col].addCounter(color)
    this.render()
  }

  render () {
    const graph = new Graph({ chars })

    this._graph.forEach((row) => {
      const renderRow = row.map(r => r.counter)
      graph.push(renderRow)
    })

    console.log(graph.toString())
  }

  _findEmptyLocation (col, row) {
    row = row === undefined ? this.rows - 1 : row
    const node = this.getNode(col, row)
    if (node.counter !== ' ' && row > 0) return this._findEmptyLocation(col, row - 1)
    if (node.counter !== ' ' && row === 0) return null
    return node
  }
}

module.exports = Grid
