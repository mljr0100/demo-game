if (!window.myPlugin) {
  window.myPlugin = {};
}
window.myPlugin.createWaterFall = function (option) {
  var defaultOption = {
    minGap: 10, //图片间最小间隙
    imgSrcs: [], //图片路径数组
    imgWidth: 220, //图片的固定宽度
    container: document.body, //容器dom元素
  };
  option = Object.assign({}, defaultOption, option);
  var imgs = []; //存放img元素的数组

  createImg();
  handleParent();
  /**
   * 创建图片元素
   */
  function createImg() {
    var debounce = myPlugin.debounce(setImgPosition, 30);
    option.imgSrcs.forEach((item) => {
      var img = document.createElement("img");
      img.src = item;
      img.style.width = option.imgWidth + "px";
      img.style.transition = ".5s";
      img.style.position = "absolute"; //图片行盒默认基线对齐，设置成绝对定位元素控制left和top
      img.onload = debounce;
      imgs.push(img);
      option.container.appendChild(img);
    });
  }
  /**
   * 处理父级的定位
   */
  function handleParent() {
    var style = getComputedStyle(option.container);
    if (style.position === "static") {
      option.container.style.position = "relative";
    }
  }
  /**
   * 设置图片的位置
   */
  function setImgPosition() {
    //1. 每行有几张图片
    var info = getHorizontalInfo();
    //定义一个横向图片数量长度的数组。存放下一张图片的top
    var arr = new Array(info.number);
    arr.fill(info.gap);
    imgs.forEach((item) => {
      var minTop = Math.min.apply(this, arr); //得到arr中最小的top值
      var index = arr.indexOf(minTop); //得到最小top值的图片下标，即它位于第几列
      item.style.top = minTop + "px";
      arr[index] += item.clientHeight + info.gap; //更新数组中的top值
      item.style.left = index * option.imgWidth + (index + 1) * info.gap + "px";
    });
    var maxTop = Math.max.apply(this, arr);
    option.container.style.height = maxTop + "px";
    /**
     * 获取水平方向上图片的信息。几张图片、图片空隙多少
     */
    function getHorizontalInfo() {
      var obj = {};
      obj.containerWidth = option.container.clientWidth; //容器宽度
      obj.number = Math.floor(
        (obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap)
      ); //每行有几张图片
      obj.gap =
        (obj.containerWidth - obj.number * option.imgWidth) / (obj.number + 1); //单张图片的间隙
      return obj;
    }
  }
  var wDebounce = myPlugin.debounce(setImgPosition, 30);
  window.onresize = wDebounce;
};
