jQuery(function($){
  var serialize = function(obj, prefix) {
    var str = [];
    for(var p in obj) {
      var k = prefix ? prefix + "[" + encodeURIComponent(p) + "]" : p, v = obj[p];
      str.push(typeof v == "object" ? 
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
  }

  $(window).bind("update_url", function(e, new_url){
    var current_url = $.url(),
        current_params = current_url.param(),
        new_params = $.url(new_url).param();
    $.extend(current_params, new_params);
    history.pushState({}, "", current_url.attr("path")+"?"+serialize(current_params));
  });
});
