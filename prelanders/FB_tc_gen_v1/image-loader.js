function getJsonFromUrl(url) {
  if (!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  query.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

var hour = new Date().getHours(),
  day = new Date().getDay(),
  params = getJsonFromUrl(),
  fb_image = params['ad'] || "1";

$('#prize_images').children().each(function (index, value) {
  $(this).attr('style', 'display: none');
});

if ((day === 0 || day === 6) || hour <= 7 || hour >= 19) {
  $('#prize_branded_image_' + fb_image).attr('style', '');
} else {
  $('#prize_image_' + fb_image).attr('style', '');
}

