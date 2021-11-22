var game = {
  dom: document.querySelector(".game"),
  overDom: document.querySelector(".game .over"),
  isOver: false, //游戏是否结束
  isPause: true, //游戏是否是暂停状态
  start: function () {
    sky.timer.start();
    land.timer.start();
    bird.swingTimer.start();
    bird.dropTimer.start();
    pipeManager.createTimer.start();
    pipeManager.moveTimer.start();
    hitManager.timer.start();
    this.isPause = false;
  },
  stop: function () {
    sky.timer.stop();
    land.timer.stop();
    bird.swingTimer.stop();
    bird.dropTimer.stop();
    pipeManager.createTimer.stop();
    pipeManager.moveTimer.stop();
    hitManager.timer.stop();
    this.isPause = true;
  },
};
game.width = game.dom.clientWidth;
game.height = game.dom.clientHeight;

var sky = {
  dom: document.querySelector(".game .sky"),
  left: 0,
};
sky.width = sky.dom.clientWidth;
sky.height = sky.dom.clientHeight;
sky.timer = getTimer(16, sky, function () {
  this.left--;
  if (this.left <= -this.width / 2) {
    this.left = 0;
  }
  this.dom.style.left = this.left + "px";
});

var land = {
  dom: document.querySelector(".game .land"),
  left: 0,
};
land.width = land.dom.clientWidth;
land.height = land.dom.clientHeight;
land.top = game.height - land.height;
land.timer = getTimer(16, land, function () {
  this.left -= 2;
  if (this.left <= -this.width / 2) {
    this.left = 0;
  }
  this.dom.style.left = this.left + "px";
});

var bird = {
  dom: document.querySelector(".game .bird"),
  swingIndex: 0, //小鸟翅膀的状态0~2
  top: 150,
  left: 150,
  width: 33,
  height: 26,
  a: 0.002, //小鸟下落的加速度
  v: 0, //小鸟下落的初速度
  t: 16, //小鸟下落的时间间隔
  show: function () {
    if (this.swingIndex === 0) {
      this.dom.style.backgroundPosition = "-8px -10px";
    } else if (this.swingIndex === 1) {
      this.dom.style.backgroundPosition = "-60px -10px";
    } else {
      this.dom.style.backgroundPosition = "-112px -10px";
    }
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  },
  setTop: function (top) {
    if (top < 0) {
      top = 0;
    } else if (top > land.top - this.height) {
      top = land.top - this.height;
      this.jump();
    }
    this.top = top;
    this.show();
  }, //设置小鸟的top值
  jump: function () {
    this.v = -0.5;
  }, //实现按空格键小鸟跳跃
};
bird.swingTimer = getTimer(200, bird, function () {
  this.swingIndex = (this.swingIndex + 1) % 3;
  this.show();
});
bird.dropTimer = getTimer(bird.t, bird, function () {
  var dis = this.v * this.t + 0.5 * this.a * this.t ** 2; //下落的距离
  this.v = this.v + this.a * this.t;
  this.setTop(this.top + dis);
});
/**
 * 产生柱子的构造函数
 * @param {*} direction 柱子的朝向 "up" "down"
 * @param {*} height 柱子的长度即高度
 */
function Pipe(direction, height) {
  this.width = 52;
  this.height = height;
  this.left = game.width;
  if (direction === "up") {
    this.top = land.top - this.height;
  } else {
    this.top = 0;
  }
  this.direction = direction;
  this.dom = document.createElement("div");
  this.dom.className = "pipe " + direction;
  this.dom.style.height = height + "px";
  this.dom.style.top = this.top + "px";
  this.show();
  game.dom.appendChild(this.dom);
}
Pipe.width = 52;
Pipe.prototype.show = function () {
  this.dom.style.left = this.left + "px";
}; //柱子的横坐标会发生变化，所以写成函数实时更新
/**
 * 产生一对柱子的构造函数
 */
function PipePair() {
  var minHeight = 60, //柱子的最小高度
    gap = 150, //空隙
    maxHeight = land.top - gap - minHeight; //柱子的最大高度
  var h = getRandom(minHeight, maxHeight); //一个随即高度
  this.up = new Pipe("up", h);
  this.down = new Pipe("down", land.top - h - gap);
  this.left = this.up.left; //该数据方便后续使用
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
PipePair.prototype.show = function () {
  this.up.left = this.left;
  this.down.left = this.left;
  this.up.show();
  this.down.show();
};
PipePair.prototype.remove = function () {
  this.up.dom.remove();
  this.down.dom.remove();
};

var pipeManager = {
  pairs: [],
};
pipeManager.createTimer = getTimer(1500, pipeManager, function () {
  this.pairs.push(new PipePair());
});
pipeManager.moveTimer = getTimer(16, pipeManager, function () {
  for (var i = 0; i < this.pairs.length; i++) {
    var pair = this.pairs[i];
    pair.left -= 2;
    if (pair.left < bird.left - Pipe.width) {
      //积分+1
      game.score++;
      game.scoreDom.children[0].innerHTML = game.score;
    }

    if (pair.left < -Pipe.width) {
      this.pairs.splice(i, 1);
      pair.remove();
      i--;
    } else {
      pair.show();
    }
  }
});
var hitManager = {
  validate: function () {
    if (bird.top <= 0 || bird.top >= land.top - bird.height) {
      //小鸟和大地/天空碰撞
      return true;
    }
    for (var i = 0; i < pipeManager.pairs.length; i++) {
      var pair = pipeManager.pairs[i];
      if (this.validateBirdPipe(pair.up) || this.validateBirdPipe(pair.down)) {
        return true;
      }
    }
    return false;
  },
  /**
   * 辅助函数，判断小鸟是否和柱子相撞
   */
  validateBirdPipe(pipe) {
    var bx = bird.left + bird.width / 2; //小鸟中心点横坐标
    var by = bird.top + bird.height / 2;
    var px = pipe.left + pipe.width / 2; //柱子中心点横坐标
    var py = pipe.top + pipe.height / 2;
    if (
      Math.abs(px - bx) <= (bird.width + pipe.width) / 2 &&
      Math.abs(py - by) <= (bird.height + pipe.height) / 2
    ) {
      return true;
    }
    return false;
  },
};
hitManager.timer = getTimer(16, hitManager, function () {
  if (this.validate()) {
    game.stop();
    game.overDom.style.display = "block";
    game.isOver = true;
  }
});

/**
 * 一个通用的计时器函数
 * @param {*} duration
 * @param {*} that
 * @param {*} callback
 * @returns
 */
function getTimer(duration, that, callback) {
  var timer;
  return {
    start: function () {
      if (timer) {
        return;
      }
      timer = setInterval(callback.bind(that), duration);
    },
    stop: function () {
      clearInterval(timer);
      timer = null;
    },
  };
}

window.onkeypress = function (e) {
  if (e.key === "Enter") {
    //回车键开始或暂停
    if (game.isOver) {
      location.reload(); //刷新页面
      return;
    }
    if (game.isPause) {
      game.start();
    } else {
      game.stop();
    }
  } else if (e.key === " ") {
    //空格键跳跃
    bird.jump();
  }
};
