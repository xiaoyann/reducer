# reducer

以更优雅的方式定义 Reducer，只复制 state 中需要被修改的值，其他的共享引用。

## Quick start

```js
import Reducer from 'reducer';

let reducer = new Reducer();

reducer.register('ADD_TODO', 'todos.items', function(items, data) {
    items = items.slice();
    items.push(data);
    return items;
});

let initState = {
    todos: {
        items: []
    }
};

export default function(state = initState, action) {
    return reducer.reduce(state, action);
};
```

```js
dispatch({ type: 'ADD_TODO', path: 'todos.items', data: 'go home' })
```

## [Spec](https://github.com/xiaoyann/reducer/blob/master/test/spec.js)

```js
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
```





