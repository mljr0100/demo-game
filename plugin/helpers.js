if (!this.myPlugin) {
  this.myPlugin = {};
}
/**
 * 函数节流
 */
this.myPlugin.throttle = function (callback, wait, immediate) {
  if (!immediate) {
    immediate = false;
  }
  if (immediate) {
    var time;
    return function () {
      if (!time || Date.now() - time > wait) {
        callback.apply(this, arguments);
        time = Date.now();
      }
    };
  } else {
    var timer;
    return function () {
      var that = this,
        args = arguments;
      if (timer) {
        return;
      }
      timer = setTimeout(function () {
        callback.apply(that, args);
        timer = null;
      }, wait);
    };
  }
};
/**
 * 函数防抖
 */
this.myPlugin.debounce = function (callback, wait, immediate) {
  if (!immediate) {
    immediate = false;
  }
  var timer;
  return function () {
    var that = this,
      callNow = !timer,
      args = arguments;
    clearTimeout(timer);
    if (immediate) {
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) {
        callback.apply(that, args);
      }
    }
    timer = setTimeout(function () {
      callback.apply(that, args);
    }, wait);
  };
};
/**
 * 对象克隆
 */
this.myPlugin.clone = function (obj, deep) {
  if (Array.isArray(obj)) {
    if (deep) {
      var newArr = [];
      obj.forEach((item) => {
        newArr.push(this.clone(item, deep));
      });
      return newArr;
    } else {
      return obj.slice(0);
    }
  } else if (typeof obj === "object") {
    var newObj = {};
    for (var prop in obj) {
      if (deep) {
        newObj[prop] = this.clone(obj[prop], deep);
      } else {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  } else {
    return obj;
  }
};
