if (!this.myPlugin) {
  this.myPlugin = {};
}
/**
 * 动画插件。构造函数，用new调用
 * 可传递的参数有：defaultOption中配置项以及onstart、onmove、onend
 * 动画开始调用start方法、结束调用end方法
 */
this.myPlugin.Animate = function (option) {
  var defaultOption = {
    duration: 16,
    total: 1000,
    begin: {},
    end: {},
  };
  this.option = Object.assign({}, defaultOption, option); //配置对象
  this.timer = null; //计时器id
  this.number = Math.ceil(this.option.total / this.option.duration); //总运动次数
  this.curNum = 0; //当前运动次数
  this.distance = {}; //需要移动的总距离
  this.everyDis = {}; //单次移动的距离
  this.curData = myPlugin.clone(this.option.begin, true); //当前数据！非常重要是回调函数的参数出口
  for (var prop in this.option.begin) {
    this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
    this.everyDis[prop] = this.distance[prop] / this.number;
  }
};
this.myPlugin.Animate.prototype.start = function () {
  if (this.timer) {
    return;
  }
  if (this.option.onstart) {
    this.option.onstart();
  }
  var that = this;
  this.timer = setInterval(function () {
    that.curNum++;
    for (var prop in that.curData) {
      if (that.curNum === that.number) {
        that.curData[prop] = that.option.end[prop];
      } //此步骤解决js运算不精准的问题
      else {
        that.curData[prop] += that.everyDis[prop];
      }
    }
    if (that.option.onmove) {
      that.option.onmove(that.curData);
      // that.option.onmove.call(that, that.curData);
    }
    if (that.curNum === that.number) {
      that.stop();
    }
  }, this.option.duration);
};
this.myPlugin.Animate.prototype.stop = function () {
  clearInterval(this.timer);
  this.timer = null;
  if (this.option.onend) {
    this.option.onend();
  }
};
