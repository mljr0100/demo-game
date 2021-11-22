/**
 * 配置游戏
 */
var gameConfig = {
  width: 500,
  height: 500,
  rows: 3, //行
  cols: 3, //列
  imgSrc: "img/lol.png", //注意图片是相对于html文件路径的位置
  dom: document.getElementById("game"),
  isOver: false, //游戏是否结束
};
//每一小块的宽高
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;

//所有小块的数量
gameConfig.pieceNumber = gameConfig.cols * gameConfig.rows;

var blocks = []; //记录小方块对象信息的数组

/**
 * 小方块对象的构造函数
 * @param left 当前的横坐标
 * @param top 当前的纵坐标
 * @param isVisible 元素是否可见
 */
function Block(left, top, isVisible) {
  this.left = left; //当前的横坐标
  this.top = top; //当前的纵坐标
  this.correctLeft = this.left; //正确的横坐标
  this.correctTop = this.top; //正确的纵坐标
  this.isVisible = isVisible; //元素是否可见
  this.dom = document.createElement("div"); //创建元素
  this.dom.style.width = gameConfig.pieceWidth + "px";
  this.dom.style.height = gameConfig.pieceHeight + "px";
  this.dom.style.border = "1px solid #fff";
  this.dom.style.boxSizing = "border-box";
  this.dom.style.position = "absolute";
  this.dom.style.backgroundImage = `url(${gameConfig.imgSrc})`;
  this.dom.style.backgroundPositionX = -this.left + "px";
  this.dom.style.backgroundPositionY = -this.top + "px";
  this.dom.style.transition = "0.5s"; //表示css属性变化的时候在0.5s内完成
  this.dom.style.cursor = "pointer";
  if (!this.isVisible) {
    this.dom.style.display = "none";
  }
  this.show = function () {
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  }; //坐标随着left的值变化，记得调用该函数
  gameConfig.dom.appendChild(this.dom);
}

/**
 * 初始化数据
 */
function init() {
  //1.初始化游戏dom对象容器
  initGameDom();

  //2.初始化小方块。
  //2-1.准备一个数组存放小方块dom对象的相关信息，包含当前位置正确位置等信息
  initBlocksArray();

  //2-2.打乱顺序，即洗牌
  shuffle();

  //3.注册点击事件
  regEvent();

  /**
   * 初始化游戏容器
   */
  function initGameDom() {
    gameConfig.dom.style.width = gameConfig.width + "Px";
    gameConfig.dom.style.height = gameConfig.height + "px";
    gameConfig.dom.style.border = "1px solid #ccc";
    gameConfig.dom.style.position = "relative";
  }
  /**
   * 初始化一个小方块数组
   */
  function initBlocksArray() {
    for (var i = 0; i < gameConfig.rows; i++) {
      for (var j = 0; j < gameConfig.cols; j++) {
        //i表示行，j表示列
        var isVisible = true; //表示元素是否可见
        if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
          isVisible = false;
        }
        var b = new Block(
          j * gameConfig.pieceWidth, //当前的横坐标
          i * gameConfig.pieceHeight, //当前的纵坐标
          isVisible
        ); //利用构造函数创建包含小方块信息的对象
        blocks.push(b);
      }
    }
  }
  /**
   * 打乱顺序，即洗牌
   */
  function shuffle() {
    for (var i = 0; i < blocks.length; i++) {
      //随机产生一个下标
      var index = getRandom(0, blocks.length);
      //将数组的当前项与数组的随机项交换left和top值
      exchange(blocks[i], blocks[index]);
    }
  }
  /**
   * 得到一个随机数
   * @param {*} min
   * @param {*} max
   * @returns
   */
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /**
   * 交换a、b两个dom的left和top值
   */
  function exchange(a, b) {
    var tempLeft = a.left,
      tempTop = a.top;
    a.left = b.left;
    a.top = b.top;
    b.left = tempLeft;
    b.top = tempTop;
    a.show();
    b.show();
  }
  /**
   * 注册点击事件
   */
  function regEvent() {
    var inVisibleBlock = blocks.find((item) => {
      return !item.isVisible;
    }); //获取看不见的元素对象
    blocks.forEach((item) => {
      //满足条件时交换left、top值
      item.dom.onclick = function () {
        if (gameConfig.isOver) {
          return;
        } //游戏结束后就不能再点击了
        if (
          (item.left === inVisibleBlock.left &&
            isEqual(
              Math.abs(item.top - inVisibleBlock.top),
              gameConfig.pieceHeight
            )) ||
          (item.top === inVisibleBlock.top &&
            isEqual(
              Math.abs(item.left - inVisibleBlock.left),
              gameConfig.pieceWidth
            ))
        ) {
          exchange(item, inVisibleBlock);
          isWin(); //游戏结束判定
        }
        // exchange(item, inVisibleBlock);
        // isWin();
      };
    });
  }
  /**
   * 判断游戏是否结束
   */
  function isWin() {
    if (
      blocks.every((item) => {
        return item.left === item.correctLeft && item.top === item.correctTop;
      })
    ) {
      blocks.forEach((item) => {
        //游戏结束去掉所有边框
        item.dom.style.border = "none";
        item.dom.style.display = "block";
        gameConfig.isOver = true;
      });
    }
  }
  /**
   * 判断两个数是否相等
   */
  function isEqual(a, b) {
    return parseInt(a) === parseInt(b);
  }
}
init();
