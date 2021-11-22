var ul = document.querySelector(".left ul");

var firLi = ul.children[0].cloneNode(true);
ul.appendChild(firLi);

setInterval(function () {
  var animate = new myPlugin.Animate({
    duration: 30,
    total: 500,
    begin: {
      top: ul.scrollTop,
    },
    end: {
      top: ul.scrollTop + ul.clientHeight,
    },
    onmove: function (data) {
      if (data.top >= ul.scrollHeight - ul.clientHeight) {
        data.top = 0;
      }
      ul.scrollTop = data.top;
    },
  });
  animate.start();
}, 1000);
