/* clear cache 12321312 */

var Logger = (function() {

    var _getParameterByName = function(name, url) {

        if(typeof pc_synd_id !== 'undefined'){
            var variables = {'partner' : pc_synd_id, 'sid' : pc_session_id};
        }
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results){
            if(typeof variables !== 'undefined' && typeof variables[name] !== 'undefined'){
                return variables[name];
            }else if(window[`req_${name}`] !== 'undefined'){
                return window[`req_${name}`];
            }else{
                return null;
            }
        }
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var _sendLog = function(params, url) {

        var http = new XMLHttpRequest();

        http.open('POST', url, true);

        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        http.send(JSON.stringify(params));
    }

    var _syndication         = 'online_advice';
    var _session_id          = window.session_id;
    var _interaction_log_url = 'https://clicknow.io/api/logger/post_interaction/';

    return {

        SetSyndication: function(value){
            _syndication = value
        },
        SetSession: function(value){
            _session_id = value
        },
        AddToKettle: function(key, value) {

            var params = {
                session_id : _session_id,
                key        : key,
                value      : value
            };

            _sendLog(params, _kettle_url);
        },
        ClickLog: function(element, category, type = 'click', event){
            if(typeof element.dataset.log !== 'undefined'){
                var event_type = `${element.dataset.log}`;
            }else if(element.id != ''){
                var event_type = `#${element.id}_${type}`;
            }else{
                var event_type = `@${element.localName}_${type}`;
            }

            if(typeof element.value !== 'undefined' && element.value.length > 0){
                var event_details = `${element.value}`;
            }else if(event.clientX){
                var event_details = `${event.clientX}-${event.clientY} | ${event.isTrusted}`;
            }else{
                var event_details = null;
            }

            Logger.LogInteraction(category, event_type, event_details);
        },

        GetParameterByName: function(name, url){
            return _getParameterByName(name, url);
        },
        GetParams: function(url){
            var url_params = new Object();
            for (name in this) {
                if(name.includes("pc_")){
                    url_params[name] = this[name];
                }
            }
            var parser = document.createElement('a');
            parser.href = !url ? window.location.href : url;
            var query = parser.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                url_params[pair[0]] = decodeURIComponent(pair[1]);
            }

            return url_params;
        },
        SaveParams: function(event_type, array ){
            var data = new Object();
            for(var i = 0; i < array.length; i++ ){
                data[array[i]] = Logger.GetParameterByName(array[i]);
            }
            Logger.EventLog(event_type, JSON.stringify(data));
        },
        AddEventListenerToElements: function(array, category){
            document.querySelector('body').addEventListener('click', function(event) {
                if(array.indexOf(event.target.tagName.toLowerCase()) != -1
                    || array.indexOf(`.${event.target.className}`) != -1
                    || typeof event.target.dataset.log != 'undefined'){
                    Logger.ClickLog(event.target, category, 'click', event);
                }
            });
            document.querySelector('body').addEventListener('focusout', function(event) {
                if(array.indexOf(event.target.tagName.toLowerCase()) != -1){
                    Logger.ClickLog(event.target, category);
                }
            });
            var data = {};
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                data.device = 'mobile';
            }else{
                data.device = 'desktop';
            }

            if(window.innerHeight > window.innerWidth){
                data.positioning = 'portrait';
            }else{
                data.positioning = 'landscape';
            }

            data.os = navigator.oscpu;
            Logger.LogInteraction(category, 'nav_data',JSON.stringify(data));

        },
        EventLog: function(event_type, event_details) {

            var params = {
                session_id: _session_id,
                synd_id: _syndication,
                event_type: event_type,
                event_details: event_details
            };

            _sendLog(params, _event_log_url);
        },

        LogInteraction: function(category, sub_category, content) {

            if (typeof content == 'undefined') {
                content = null;
            }

            var params = {
                session_id: _session_id,
                category: category,
                sub_category: sub_category,
                content: content,
                synd_id: _syndication
            };

            _sendLog(params, _interaction_log_url);

        },

        Glog: function(msg, subject, log_type, line) {

            glog_value = msg;

            if (! line === undefined) {

                glog_value = line + ': ' + msg;
            }

            switch (log_type) {

                case 'always':
                    var level = 1;
                    var severity = 1;
                    break;

                case 'debug':
                    var level = 3;
                    var severity = 4;
                    break;

                default:
                    return false;
                    break;
            }

            var params = {
                app_id: 'pinchecker_lander',
                session_id: _session_id,
                cat: 'javascript',
                sub_cat: null,
                level: level,
                severity: severity,
                key: subject,
                value: glog_value
            };

            _sendLog(params, _glog_url);
        }
    };
})();


var warn = console.warn;
window.warn_log = [];
_warn_log = console.warn;
console.warn = function(){
    var args = Array.from(arguments);
    if(typeof Logger == 'object' && window.warn_log.indexOf(JSON.stringify(args)) == -1){
        Logger.EventLog('console_warn', JSON.stringify(args));
        window.warn_log.push(JSON.stringify(args));
    }
    _warn_log.apply(console, args);
}

var error = console.error;
window.error_log = [];
_erro_log = console.error;
console.error = function(){
    var args = Array.from(arguments);
    if(typeof Logger == 'object' && window.error_log.indexOf(JSON.stringify(args)) == -1){
        Logger.EventLog('console_error', JSON.stringify(args));
        window.error_log.push(JSON.stringify(args));
    }
    _erro_log.apply(console, args);
}
