var hour = new Date().getHours(),
  day = new Date().getDay();

if (window._dp == 1) {
  if ((day === 0 || day === 6) || hour <= 7 || hour >= 19) {
    $(".wh").remove();
    $(".nwh").css("display", "block");
  } else {
    $(".nwh").remove();
  }
} else {
  $(".nwh").remove();
}
