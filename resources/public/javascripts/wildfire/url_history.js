jQuery(function($){
  var parse = function(url){
    var orig = url.split("?"),
        after = orig[1] || orig[0],
        params = after.split("&"),
        ret = {};
    for(var i in params){
      var split = params[i].split("=");
      ret[split[0]] = split[1];
    }
    return ret;
  }

  $(window).bind("update_url", function(e, new_params){
    if(typeof new_params == "string") new_params = parse(new_params);
    var current_params = parse(window.location.href);
    $.extend(current_params, new_params);
    var ret = [];
    for(var i in current_params) ret.push(i+"="+current_params[i]);
    history.pushState({}, "", window.location.pathname+"?"+ret.join("&"));
  });
});
