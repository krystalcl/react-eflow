/*
 * pub/sub工具
 * */
const pubSub = {
  _events: {},
  /*
   * 根据name 绑定事件
   * @param {String} name 事件名称
   * @param {Function} callback 事件回调
   * @return {Object}
   * */
  sub: function (name, callback) {
    if (name) {
      if (!this._events[name]) {
        this._events[name] = [];
      }
      if (!callback)return;
      this._events[name].push({
        name: name,
        callback: callback
      });
    }
    return this;
  },
  /*
   * 根据name 触发事件
   * @param {String} name 事件名称
   * @return {undefined}
   * */
  pub: function (name) {
    var eventers = this._events[name] || [],
      eventer,
      callback,
      ret;
    var length = eventers.length;
    for(var i = 0; i < length; i++){
      eventer = eventers[i];
      callback = eventer.callback;
      if (callback) {
        ret = callback.apply(this, Array.prototype.slice.call(arguments, 1));
        if (ret === true) {
          return ret;
        }
      }
    }
  },
  /*
   * 根据name 销毁事件绑定
   * @param {String} name 事件名称
   * @param {[Function]} callback 事件回调
   * @return {Object}
   * */
  off: function (name, callback) {
    if (name) {
      var eventers = this._events[name],
        eventer,
        eventCallback;
      if (eventers) {
        var length = eventers.length;
        while (length--) {
          eventer = eventers[length];
          eventCallback = eventer.callback;
          if (callback === eventCallback || !callback) {
            if(eventers.length <= 1){
              delete this._events[name];
            }
            else{
              this._events[name]
                = eventers
                = eventers
                  .slice(0, length)
                  .concat(eventers.slice(length + 1));
            }
          }
        }
      }
    }
    return this;
  }
}
export default pubSub;
