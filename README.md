# reducer

以更优雅的方式定义 Reducer，只复制 state 中需要被修改的值，其他的共享引用。

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
