//0：空白、1：玩家、2：墙、3：箱子
export const SPACE = 0;
export const PLAYER = 1;
export const WALL = 2;
export const BOX = 3;
//表示游戏的地图数据形成的数组（二维数组的每个坐标表示一个物体）
export const mapArr = [
  [0, 0, 2, 2, 2, 2, 2, 0, 0], //代表地图的行
  [0, 0, 2, 0, 1, 0, 2, 0, 0],
  [0, 0, 2, 0, 3, 0, 2, 0, 0],
  [2, 2, 2, 0, 0, 0, 2, 2, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 0, 3, 3, 3, 3, 3, 0, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 2, 0, 3, 3, 3, 0, 2, 2],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 3, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0],
];
export const rowNumber = mapArr.length; //游戏一共有多少行
export const colNumber = mapArr[0].length; //游戏一共有多少列
//表示箱子正确位置的横纵坐标对象形成的数组
export const correctArr = [
  { row: 3, col: 4 },
  { row: 4, col: 4 },
  { row: 5, col: 2 },
  { row: 5, col: 3 },
  { row: 5, col: 4 },
  { row: 5, col: 5 },
  { row: 5, col: 6 },
  { row: 6, col: 4 },
  { row: 7, col: 4 },
  { row: 8, col: 4 },
  { row: 9, col: 4 },
  { row: 10, col: 4 },
];
