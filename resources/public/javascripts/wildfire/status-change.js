jQuery(document).ready(function(){

  jQuery(".tree_col_status").live("click", function(e){
    e.preventDefault();
    var status = jQuery(this),
          li = status.parents(".tree_node"),
          link = li.find("a"),
          target = link.attr("href").replace("/edit/", "/status-toggle/") + ".json"
          ;
    jQuery.ajax({
      url:target,
      success:function(){
        if(status.hasClass("live")) status.addClass("not-live").removeClass("live").text("NOT LIVE");
        else status.removeClass("not-live").addClass("live").text("LIVE");
      }
    });

  });

});