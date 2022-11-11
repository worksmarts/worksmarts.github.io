// Get the browser language
var language = window.campaignLang || window.navigator.userLanguage || window.navigator.language;

// Set the correct locale based on the language
moment.locale(language);

// https://momentjs.com/docs/#/displaying/format/
var now = moment().format('LL');
var month = moment().format('MMMM');

// console.log(now);

$('#date_placeholder').text(now);
$('#date_month_placeholder').text(month);
