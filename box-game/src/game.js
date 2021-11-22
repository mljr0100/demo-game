import showUI from "./ui.js";
import { playerMove, isWin } from "./play.js";
showUI();
function keyMove(e) {
  let isMove = false;
  if (e.key === "ArrowLeft") {
    isMove = playerMove("left");
  } else if (e.key === "ArrowRight") {
    isMove = playerMove("right");
  } else if (e.key === "ArrowUp") {
    isMove = playerMove("up");
  } else if (e.key === "ArrowDown") {
    isMove = playerMove("down");
  }
  if (isMove) {
    showUI();
    if (isWin()) {
      console.log("游戏结束");
      document.removeEventListener("keydown", keyMove);
    }
  }
}
document.addEventListener("keydown", keyMove);
