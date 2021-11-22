var config = {
  smallDom: document.querySelector(".small"),
  smallWidth: 350,
  smallHeight: 350,
  smallUrl: "images/mouse.jpg",
  bigDom: document.querySelector(".big"),
  bigWidth: 500,
  bigHeight: 500,
  bigUrl: "images/mouseBigSize.jpg",
  bigBkWidth: 800,
  bigBkHeight: 800,
  moveDom: document.querySelector(".small .move"),
};

config.widthRite = config.bigWidth / config.bigBkWidth;
config.heightRite = config.bigHeight / config.bigBkHeight;

config.sizeRiteW = config.bigBkWidth / config.smallWidth;
config.sizeRiteH = config.bigBkHeight / config.smallHeight;
config.moveWidth = config.smallWidth * config.widthRite;
config.moveHeight = config.smallHeight * config.heightRite;
function init() {
  //1. 初始化各个dom对象的背景图及宽高
  initDom();

  //2. 注册事件
  regEvent();

  /**
   * 初始化各个dom对象的背景图及宽高
   */
  function initDom() {
    config.moveDom.style.width = config.moveWidth + "px";
    config.moveDom.style.height = config.moveHeight + "px";
    config.smallDom.style.backgroundImage = `url(${config.smallUrl})`;
    config.smallDom.style.backgroundRepeat = "no-repeat";
    config.smallDom.style.backgroundPosition = "0 0";
    config.smallDom.style.backgroundSize = "100% 100%";
    config.bigDom.style.backgroundImage = `url(${config.bigUrl})`;
    config.bigDom.style.backgroundRepeat = "no-repeat";
    // config.bigDom.style.backgroundPosition = "0 0";
    config.bigDom.style.backgroundSize = `${config.bigBkWidth}px ${config.bigBkHeight}px`;
  }

  /**
   * 注册事件
   */
  function regEvent() {
    config.smallDom.onmouseenter = function (e) {
      config.moveDom.style.display = "block";
      config.bigDom.style.display = "block";
      //注册移动事件
      config.smallDom.onmousemove = function (e) {
        //鼠标距离smallDom左边界的距离
        var tofX = e.pageX - this.offsetLeft - this.clientLeft;
        var tofY = e.pageY - this.offsetTop - this.clientTop;
        //moveDom应该移动的距离：tofX - moveWidth/2
        var disX = tofX - 0.5 * config.moveWidth;
        var disY = tofY - 0.5 * config.moveHeight;
        disX += e.movementX;
        disY += e.movementY;
        getR(disX, disY);
      };
    };

    config.smallDom.onmouseleave = function () {
      config.moveDom.style.display = "none";
      config.bigDom.style.display = "none";
    };

    function getR(disX, disY) {
      if (disX < 0) {
        disX = 0;
      }
      if (disY < 0) {
        disY = 0;
      }
      if (disX > config.smallWidth - config.moveWidth) {
        disX = config.smallWidth - config.moveWidth;
      }
      if (disY > config.smallHeight - config.moveHeight) {
        disY = config.smallHeight - config.moveHeight;
      }
      config.moveDom.style.left = disX + "px";
      config.moveDom.style.top = disY + "px";
      config.bigDom.style.backgroundPosition = `-${
        disX * config.sizeRiteW
      }px -${disY * config.sizeRiteH}px`;
    }
  }
}
init();
