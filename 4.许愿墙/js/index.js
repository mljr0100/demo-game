var container = document.querySelector(".container");
var inp = document.querySelector("input");
var zIndex = 1;
var vWidth = document.documentElement.clientWidth;
var vHeight = document.documentElement.clientHeight;
var paperWidth = 170,
  paperHeight = 170;

window.onresize = function () {
  //更改left值
  var disX = document.documentElement.clientWidth - vWidth;
  var disY = document.documentElement.clientHeight - vHeight;
  Array.from(container.children).forEach((item) => {
    var style = getComputedStyle(item);
    var prevLeft = parseFloat(style.left);
    var prevTop = parseFloat(style.top);
    prevLeft += disX * (prevLeft / (vWidth - paperWidth));
    prevTop += disY * (prevTop / (vHeight - paperHeight));
    item.style.left = prevLeft + "px";
    item.style.top = prevTop + "px";
  });
  vWidth = document.documentElement.clientWidth;
  vHeight = document.documentElement.clientHeight;
};
inp.onkeypress = function (e) {
  if (e.key === "Enter") {
    if (this.value) {
      createWish(this.value);
      this.value = "";
    }
  }
};
window.onclick = function (e) {
  if (
    e.target.parentElement &&
    e.target.parentElement.classList.contains("paper") &&
    e.target.tagName === "SPAN"
  ) {
    e.target.parentElement.remove();
  }
};
//实现拖拽功能
window.onmousedown = function (e) {
  var div = getMoveDiv(e.target);
  if (!div) {
    return;
  }
  div.style.zIndex = zIndex;
  zIndex++;
  var style = getComputedStyle(div);
  var divLeft = parseFloat(style.left);
  var divTop = parseFloat(style.top);
  window.onmousemove = function (e) {
    divLeft += e.movementX;
    divTop += e.movementY;
    if (divLeft < 0) {
      divLeft = 0;
    }
    if (divTop < 0) {
      divTop = 0;
    }
    if (divLeft > document.documentElement.clientWidth - paperWidth) {
      divLeft = document.documentElement.clientWidth - paperWidth;
    }
    if (divTop > document.documentElement.clientHeight - paperHeight) {
      divTop = document.documentElement.clientHeight - paperHeight;
    }
    div.style.left = divLeft + "px";
    div.style.top = divTop + "px";
  };
  window.onmouseup = window.onmouseleave = function () {
    window.onmousemove = null;
  };
};

/**
 * 得到可移动的div
 */
function getMoveDiv(dom) {
  if (dom.classList.contains("paper")) {
    return dom;
  } else if (
    dom.parentElement &&
    dom.parentElement.classList.contains("paper") &&
    dom.tagName === "P"
  ) {
    return dom.parentElement;
  }
}

/**
 * 创建一个愿望
 */
function createWish(words) {
  var div = document.createElement("div");
  div.classList.add("paper");
  div.innerHTML = `<p>${words}</p>
  <span>X</span>`;
  container.appendChild(div);
  div.style.backgroundColor = `rgb(${getNum(100, 200)},${getNum(
    100,
    200
  )},${getNum(100, 200)})`; //颜色随机
  //随机位置
  div.style.left = getNum(0, vWidth - div.clientWidth) + "px";
  div.style.top = getNum(0, vHeight - div.clientHeight) + "px";
  this.value = "";
  /**
   * 生成随机数
   */
  function getNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
/**
 * 初始化愿望
 */
function createInitPapers() {
  var arr = [
    "苍生根本不需要被你拯救",
    "他们不配",
    "太子殿下，你是美玉，让我来教导你吧",
    "在这世上，只有我才配教导你",
    "世上有很多事，你是无能为力的",
    "你想拯救苍生吗？",
    "就要日落了，拿起你的剑，否则，你知道会发生什么",
    "我去你妈的！！！你以为你是谁，敢这样跟我说话？！我可是太子殿下！！！",
    "你没听清吗？那我就再说一次",
  ];
  arr.forEach((item) => {
    createWish(item);
  });
}
createInitPapers();
