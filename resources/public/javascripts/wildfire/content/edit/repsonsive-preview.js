jQuery(document).ready(function(){
  jQuery(".responsive-setting").on("click", function(e){
    e.preventDefault();
    var item = jQuery(this),
          w = item.attr("data-w"),
          h = item.attr("data-h")
          ;
      jQuery(".active-responsive").removeClass("active-responsive");
      item.addClass('active-responsive');
      jQuery(".design_preview iframe").attr("width", w).attr("height", h);
  });
});