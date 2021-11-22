var table = document.getElementsByTagName("table")[0];
/**
 * 获取每行的商品信息
 */
function getInfo(tr) {
  var price = Number(tr.querySelector(".cart_td_5").innerText),
    score = Number(tr.querySelector(".cart_td_4").innerText),
    number = Number(tr.querySelector(".cart_td_6 input").value),
    checked = tr.querySelector(".cart_td_1 input").checked,
    subTotal = price * number,
    subScore = number * score;
  return {
    price,
    score,
    number,
    checked,
    subTotal,
    subScore,
  };
}
/**
 * 计算每行小计的金额和积分，并更新页面
 */
function getSubST() {
  var mess = document.querySelectorAll("tbody tr[id^=product]");
  Array.from(mess).forEach((item) => {
    var info = getInfo(item);
    item.querySelector(".cart_td_7").innerText = info.subTotal;
  });
}
/**
 * 计算所有金额和积分，并更新页面
 */
function getAllST() {
  var mess = document.querySelectorAll("tbody tr[id^=product]");
  var sumTotal = 0,
    sumScore = 0;
  Array.from(mess).forEach((item) => {
    var info = getInfo(item);
    if (info.checked) {
      sumTotal += info.subTotal;
      sumScore += info.subScore;
    }
  });
  document.getElementById("total").innerText = sumTotal;
  document.getElementById("integral").innerText = sumScore;
}
/**
 * 更新所有页面数据
 */
function upAll() {
  getSubST();
  getAllST();
}
upAll();
//注册事件
table.onclick = function (e) {
  if (e.target.alt === "add") {
    //商品数量+1
    var prevInp = e.target.previousElementSibling;
    prevInp.value = Number(prevInp.value) + 1;
    upAll();
  } else if (e.target.alt === "minus") {
    //商品数量-1
    var prevInp = e.target.nextElementSibling;
    prevInp.value = Number(prevInp.value) - 1;
    if (prevInp.value < 1) {
      prevInp.value = 1;
    }
    upAll();
  } else if (e.target.alt === "delete") {
    var mess = document.querySelectorAll("tbody tr[id^=product]");
    Array.from(mess).forEach((item) => {
      var info = getInfo(item);
      if (info.checked) {
        deleteTr(item);
      }
    });
  } else if ((e.target.type = "checkbox")) {
    //选中某行商品、删除、全选
    if (e.target.parentElement.className === "cart_td_8") {
      //删除某行
      var par = e.target.parentElement.parentElement;
      par.previousElementSibling.remove();
      par.remove();
    }
    if (e.target.id === "allCheckBox") {
      //全选
      var cbs = table.querySelectorAll("input[name=cartCheckBox]");
      Array.from(cbs).forEach((item) => {
        item.checked = e.target.checked;
      });
    }
    getAllST();
  }
};
function deleteTr(dom) {
  dom.previousElementSibling.remove();
  dom.remove();
  getAllST();
}
