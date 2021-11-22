var config = {
  imgWidth: 500,
  dotWidth: 20,
  doms: {
    divBanner: document.querySelector(".banner"),
    divArrow: document.querySelector(".banner .arrow"),
    divImgs: document.querySelector(".banner .imgs"),
    divDots: document.querySelector(".banner .dots"),
  },
  timer: {
    duration: 16,
    totalTime: 2000,
    id: null,
  },
  currentIndex: 0, //当前的实际图片索引0~imgNumber-1
  autoTimer: null,
};
config.imgNumber = config.doms.divImgs.children.length;
/**
 * 初始化尺寸
 */
function initSize() {
  config.doms.divImgs.style.width =
    config.imgWidth * (config.imgNumber + 2) + "px";
  config.doms.divDots.style.width = config.dotWidth * config.imgNumber + "px";
}
/**
 * 初始化元素
 */
function initElement() {
  for (var i = 0; i < config.imgNumber; i++) {
    var div = document.createElement("span");
    config.doms.divDots.appendChild(div);
  }
  var children = config.doms.divImgs.children;
  var newImg1 = children[0].cloneNode(true);
  var newImg4 = children[children.length - 1].cloneNode(true);
  config.doms.divImgs.appendChild(newImg1);
  config.doms.divImgs.insertBefore(newImg4, children[0]);
}
/**
 * 初始化imgs的marginLeft
 */
function initPosition() {
  config.doms.divImgs.style.marginLeft =
    -(config.currentIndex + 1) * config.imgWidth + "px";
}
/**
 * 初始化小圆点的选中状态
 */
function setDotStatus() {
  Array.from(config.doms.divDots.children).forEach((item) => {
    item.classList.remove("active");
  });
  config.doms.divDots.children[config.currentIndex].classList.add("active");
}
/**
 * 初始化汇总
 */
function init() {
  initSize();
  initElement();
  initPosition();
  setDotStatus();
}
init();
/**
 * 要切换的图片索引
 * @param {*} index 目标图片的实际索引位置
 * @param {*} direction "left" "right"
 */
function switchTo(index, direction) {
  if (index === config.currentIndex) {
    return;
  }
  if (!direction) {
    direction = "right";
  }
  //1. 移动的距离
  var targetLeft = -(index + 1) * config.imgWidth;
  animateSwitch();
  //2. 小圆点选中的索引位置变化
  config.currentIndex = index;
  setDotStatus();
  /**
   * 移动的过程
   */
  function animateSwitch() {
    stopAnimate();
    var number = Math.ceil(config.timer.totalTime / config.timer.duration),
      curNumber = 0,
      distance,
      prevLeft = parseFloat(getComputedStyle(config.doms.divImgs).marginLeft),
      totalWidth = config.imgWidth * config.imgNumber;
    if (direction === "right") {
      if (prevLeft > targetLeft) {
        distance = targetLeft - prevLeft; //-
      } else {
        distance = -(totalWidth - Math.abs(targetLeft - prevLeft)); //-
      }
    } else {
      if (prevLeft < targetLeft) {
        distance = targetLeft - prevLeft; //+
      } else {
        distance = totalWidth - Math.abs(targetLeft - prevLeft); //+
      }
    }
    var everyDistance = distance / number;
    config.timer.id = setInterval(function () {
      prevLeft += everyDistance;
      if (direction === "right" && Math.abs(prevLeft) > totalWidth) {
        prevLeft += totalWidth;
      } else if (direction === "left" && Math.abs(prevLeft) < config.imgWidth) {
        prevLeft -= totalWidth;
      }
      config.doms.divImgs.style.marginLeft = prevLeft + "px";
      curNumber++;
      if (curNumber === number) {
        stopAnimate();
      }
    }, config.timer.duration);
  }
  function stopAnimate() {
    clearInterval(config.timer.id);
    config.timer.id = null;
  }
}

function toLeft() {
  var index = config.currentIndex - 1;
  if (index < 0) {
    index = config.imgNumber - 1;
  }
  switchTo(index, "left");
}
function toRight() {
  var index = (config.currentIndex + 1) % config.imgNumber;
  switchTo(index, "right");
}
config.doms.divArrow.onclick = function (e) {
  if (e.target.classList.contains("left")) {
    toLeft();
  } else if (e.target.classList.contains("right")) {
    toRight();
  }
};
config.doms.divDots.onclick = function (e) {
  if (e.target.tagName === "SPAN") {
    var index = Array.from(this.children).indexOf(e.target);
    if (index < config.currentIndex) {
      switchTo(index, "left");
    } else {
      switchTo(index, "right");
    }
  }
};
config.autoTimer = setInterval(toRight, 2000);
config.doms.divBanner.onmouseleave = function () {
  if (!config.autoTimer) {
    config.autoTimer = setInterval(toRight, 2000);
  }
};
config.doms.divBanner.onmouseenter = function () {
  clearInterval(config.autoTimer);
  config.autoTimer = null;
};
