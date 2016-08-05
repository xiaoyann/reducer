import Reducer from '../src/index'
import { createStore } from 'redux'
import { assert } from 'chai'

let reducer = new Reducer()

let initState = {
  todos: {
    filter: '',
    items: [],
    users: {}
  }  
}

const ADD_TODO = 'ADD_TODO'
const PATH = 'todos.items'

reducer.register(ADD_TODO, PATH, function(state, data) {
  state = state.slice()
  state.push(data)
  return state
})


let todo = 'improve reducer'

let newState = reducer.reduce(initState, {
  type: ADD_TODO, path: PATH, data: todo
})

describe('Reducer', function() {
  
  it('必须返回一个全新的 state', function() {
    assert.notStrictEqual(initState, newState)
  })

  it('在 path 内的元素必须是克隆的副本', function() {
    assert.notStrictEqual(initState.todos.items, newState.todos.items)
  })

  it('不在 path 内的元素必须是共享的', function() {
    assert.strictEqual(initState.todos.users, newState.todos.users)
  })

  it('旧的 state 不能包含更新', function() {
    assert.strictEqual(-1, initState.todos.items.indexOf(todo))
  })

  it('新的 state 必须包含更新', function() {
    assert.strictEqual(0, newState.todos.items.indexOf(todo))
  })
})

