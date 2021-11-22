import * as map from "./map.js";
/**
 * 获取玩家的地图坐标位置
 */
function getPlayerPoint() {
  for (let row = 0; row < map.rowNumber; row++) {
    for (let col = 0; col < map.colNumber; col++) {
      if (map.mapArr[row][col] === map.PLAYER) {
        return {
          row,
          col,
        };
      }
    }
  }
}
/**
 * 根据玩家的位置和要移动的方向得到下一个位置的坐标信息
 * @param {*} row
 * @param {*} col
 * @param {*} direction
 */
function getNextInfo(row, col, direction) {
  if (direction === "left") {
    return {
      row,
      col: col - 1,
      value: map.mapArr[row][col - 1],
    };
  } else if (direction === "right") {
    return {
      row,
      col: col + 1,
      value: map.mapArr[row][col + 1],
    };
  } else if (direction === "up") {
    return {
      row: row - 1,
      col,
      value: map.mapArr[row - 1][col],
    };
  } else if (direction === "down") {
    return {
      row: row + 1,
      col,
      value: map.mapArr[row + 1][col],
    };
  }
}
/**
 * 交换两个能够移动的物体
 * @param {*} point1
 * @param {*} poin2
 */
function exchange(point1, point2) {
  const temp = map.mapArr[point1.row][point1.col];
  map.mapArr[point1.row][point1.col] = map.mapArr[point2.row][point2.col];
  map.mapArr[point2.row][point2.col] = temp;
}
/**
 * 判断游戏是否结束
 */
export function isWin() {
  for (const prop of map.correctArr) {
    if (map.mapArr[prop.row][prop.col] !== map.BOX) {
      return false;
    }
  }
  return true;
  //   map.correctArr.every((prop) => map.mapArr[prop.row][prop.col] === map.BOX);
}

/**
 * 玩家移动的函数
 * @paran {direction} 玩家即将移动的方向 left、right、top、down
 * @returns 玩家是否要移动
 */
export function playerMove(direction) {
  //1.获取玩家的地图坐标位置
  const playerPoint = getPlayerPoint();
  //2.根据玩家的位置和要移动的方向得到下一个位置的坐标信息
  const nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);
  //3.根据nextInfo里面的value值判断玩家是否能够移动
  if (nextInfo.value === map.WALL) {
    return;
  } else if (nextInfo.value === map.SPACE) {
    exchange(playerPoint, nextInfo);
    return true;
  } else if (nextInfo.value === map.BOX) {
    //若玩家的下一个为位置是空白。则判断箱子的下一个位置能否移动
    const nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction);
    if (nextNextInfo.value === map.SPACE) {
      exchange(nextNextInfo, nextInfo);
      exchange(playerPoint, nextInfo);
      return true;
    }
  }
  return;
}
