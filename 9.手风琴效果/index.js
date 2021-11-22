var container = document.querySelector(".container");

container.onclick = function (e) {
  if (e.target.tagName === "H2") {
    var acDiv = container.querySelector(".active");
    var next = e.target.nextElementSibling;
    if (next.classList.contains("active")) {
      return;
    }
    if (acDiv) {
      hidden(acDiv);
      acDiv.classList.remove("active");
    }
    next.classList.add("active");
    next.style.height = 0; //初始显示高度为0。执意要把next溢出隐藏
    show(next);
  }
};

function show(dom) {
  var animate = new myPlugin.Animate({
    total: 300,
    begin: {
      height: 0,
    },
    end: {
      height: dom.scrollHeight,
    },
    onmove: function (data) {
      dom.style.height = data.height + "px";
    },
    // onend: function () {
    //   dom.classList.remove("active");
    // },
  });
  animate.start();
}
function hidden(dom) {
  var animate = new myPlugin.Animate({
    total: 300,
    begin: { height: dom.scrollHeight },
    end: {
      height: 0,
    },
    onmove: function (data) {
      dom.style.height = data.height + "px";
    },
    onend: function () {
      dom.classList.remove("active");
    },
  });
  animate.start();
}
