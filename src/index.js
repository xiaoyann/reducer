import { cloneWithPath } from 'bali.js';

class Reducer {
  constructor() {
    this.reducers = {};
  }

  /**
   * register reducer
   * @param  {string}   type  Redux action Type
   * @param  {string}   path  
   * @param  {Function} fn    Redux reducer
   */
  register(type, path, fn) {
    let conf = this.reducers[path] || {};
    conf[type] = fn;
    this.reducers[path] = conf;
  }

  /**
   * @param  {any} state  
   * @param  {object} action 
   * @return state
   */
  reduce(state, action) {
    let type = action.type;
    let path = action.path;
    let conf = this.reducers[path];
    
    if (!conf) return state;

    state = cloneWithPath(state, path);

    let keys = path.split('.');
    let name = keys.pop();
    let fn = conf[type];
    
    let parent = keys.reduce((pre, cur) => pre = pre[cur], state);  
    parent[name] = fn(parent[name], action.data);

    return state;
  }
}


export default Reducer;





