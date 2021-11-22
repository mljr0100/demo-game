import * as map from "./map.js";
const divContainer = document.getElementById("game");
const pieceWidth = 45;
const pieceHeight = 45;

/**
 * 设置divContainer容器的宽高
 */
function setDivContainer() {
  divContainer.style.width = pieceWidth * map.colNumber + "px";
  divContainer.style.height = pieceHeight * map.rowNumber + "px";
}
/**
 * 判断某坐标位置的箱子是否在正确的位置上
 * @param {*} row
 * @param {*} col
 */
function isCorrect(row, col) {
  //   for (const prop of map.correctArr) {
  //     if (prop.row === row && prop.col === col) {
  //       return true;
  //     }
  //   }
  //   return false;
  return map.correctArr.find((prop) => prop.row === row && prop.col === col);
}
/**
 * 根据提供的坐标位置，创建div
 * @param {*} row 表示第几行
 * @param {*} col 表示第几列
 */
function setOnePiece(row, col) {
  const div = document.createElement("div");
  div.className = "item";
  div.style.left = pieceWidth * col + "px";
  div.style.top = pieceHeight * row + "px";
  if (map.mapArr[row][col] === map.WALL) {
    div.classList.add("wall");
  } else if (map.mapArr[row][col] === map.PLAYER) {
    div.classList.add("player");
  } else if (map.mapArr[row][col] === map.BOX) {
    //判断某坐标位置的箱子是否在正确的位置上
    if (isCorrect(row, col)) {
      div.classList.add("correct-box");
    } else {
      div.classList.add("box");
    }
  } else if (map.mapArr[row][col] === map.SPACE) {
    if (isCorrect(row, col)) {
      div.classList.add("correct");
    } else {
      return;
    }
  }
  divContainer.appendChild(div);
}
/**
 * 根据地图数据设置divContainer里面的内容
 */
function setContent() {
  //1. 清空divContainer里面的内容
  divContainer.innerHTML = "";
  //2.遍历地图数组。设置容器内部的内容
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      //根据坐标创建元素
      setOnePiece(row, col);
    }
  }
}

export default function () {
  //1.初始化设置divContainer容器的宽高
  setDivContainer();
  //2.根据地图数据设置divContainer里面的内容
  setContent();
}
