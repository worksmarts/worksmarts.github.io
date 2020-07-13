var count = 0;
var max = 2;
var last_index;
var gifts = $(".gift");

for (var i = 0; i < gifts.length; i++) {
  (function (index) {
    gifts[index].addEventListener("click", function () {
      if (last_index != index) {
        count++;
        last_index = index;
        if (count <= max) {
          if (count == max) {
            gifts[index].className = "gift gift-win";
            setTimeout(function () {
              $('.content--step-1').css('display', 'none');
              $('.content--step-2').css('display', 'block');
            }, 2000);
          } else {
            gifts[index].className = "gift gift-fail";
          }
        }
      }
    });
  })(i);
}
