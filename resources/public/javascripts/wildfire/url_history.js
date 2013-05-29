jQuery(function($){
  var parse_url = function(url){
    var orig = url.split("?"),
        after = orig[1] || orig[0],
        params = after.split("&"),
        ret = {};
    for(var i in params){

      if(params[i] != window.location.origin+window.location.pathname){
        var split = params[i].split("=");
        ret[split[0]] = split[1];
      }
    }
    return ret;
  }

  $(window).bind("update_url", function(e, new_params){
    if(typeof new_params == "string") new_params = parse_url(new_params);
    var current_params = parse_url(window.location.href);
    $.extend(current_params, new_params);
    var ret = [];
    for(var i in current_params) ret.push(i+"="+current_params[i]);
    history.pushState({}, window.document.title, window.location.pathname+"?"+ret.join("&"));
  });

  $(window).bind("autosave.completed", function(e,res){
    history.replaceState(res, window.document.title, "/"+res.meta.controller+"/"+res.meta.action+"/"+res.meta.model.primval+"/");
  });
});
