/* global describe test expect */

const Grid = require('../src/grid')

describe('Grid', () => {
  test('you can set the columns and rows', () => {
    const grid = new Grid({cols: 4, rows: 3})

    expect(grid.rows).toBe(3)
    expect(grid.cols).toBe(4)
    grid.render()
  })

  test('retrieve a node', () => {
    const grid = new Grid({cols: 3, rows: 3})

    /*
        ╔═══╤═══╤═══╗
        ║ 0 │ 1 │ 2 ║
        ╟───┼───┼───╢
        ║ 0 │ 1 │ 2 ║
        ╟───┼───┼───╢
        ║ 0 │ 1 │ 2 ║
        ╚═══╧═══╧═══╝
    */

    expect(grid.getNode(0, 0)).toBe(grid._graph[0][0])
    expect(grid.getNode(1, 1)).toBe(grid._graph[1][1])
    expect(grid.getNode(1, 2)).toBe(grid._graph[2][1])
    expect(grid.getNode(2, 2)).toBe(grid._graph[2][2])
  })

  test('a node has edges', () => {
    const grid = new Grid({cols: 3, rows: 3})

    const node = grid.getNode(1, 1)

    expect(node.edges.nw).toEqual([0, 0])
    expect(node.edges.n).toEqual([1, 0])
    expect(node.edges.ne).toEqual([2, 0])
  })

  test('You can add a counter to the grid', () => {
    const grid = new Grid({cols: 4, rows: 3})

    grid.addCounter('white', 3)

    const node = grid.getNode(3, 2)

    expect(node.counter).toEqual('○')
  })

  test('Counters stack in columns', () => {
    const grid = new Grid({cols: 3, rows: 3})

    grid.addCounter('white', 1)
    grid.addCounter('black', 1)

    const white = grid.getNode(1, 2)
    const black = grid.getNode(1, 1)

    expect(white.counter).toEqual('○')
    expect(black.counter).toEqual('●')
  })

  test('Counters stack in columns until they fill the column', () => {
    const grid = new Grid({cols: 4, rows: 2})

    ;[0, 1, 2, 3].forEach((col) => grid.addCounter('white', col))
    ;[0, 1, 2, 3].forEach((col) => grid.addCounter('black', col))

    const columnFull = grid.addCounter('black', 0)
    expect(columnFull instanceof Error).toBeTruthy()
  })

  test('You can\'t put counters in columns outside the grid', () => {
    const grid = new Grid({cols: 3, rows: 3})

    const columnOffGrid = grid.addCounter('black', 3)
    expect(columnOffGrid instanceof Error).toBeTruthy()
  })
})
