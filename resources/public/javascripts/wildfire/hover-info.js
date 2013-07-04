jQuery(function(){

  jQuery(window).bind("media.generic.preview media.wildfirediskfile.preview", function(e, row, preview_container){
    preview_container.html(jQuery(row).html());
  });


  jQuery(".preview-hover tbody tr, .cms-uploads-1 tbody tr").live("mouseover", function(e){
    var str = "",
        row = jQuery(this),
        preview_container = (row.closest("fieldset").find(".media-data").length) ? row.closest("fieldset").find(".media-data") : jQuery("#page_content .upload_block .media-data"),
        trigger_type = (jQuery(this).data("media") ? jQuery(this).data("media") : "generic")
        ;
    jQuery(this).hoverIntent({over:function(){
      jQuery(window).trigger("media."+trigger_type+".preview", [row, preview_container]);
    }, timeout:400});
    jQuery(this).trigger('mouseover');
  });

  jQuery(".preview-click tbody tr").unbind("click").live("click", function(e){
    e.preventDefault();
    var str = "",
        row = jQuery(this),
        preview_container = row.closest("fieldset").find(".media-data"),
        trigger_type = (jQuery(this).data("media") ? jQuery(this).data("media") : "generic")
        ;
    jQuery(window).trigger("media."+trigger_type+".preview", [row, preview_container]);
    jQuery(window).trigger("preview.click", [row, preview_container]);
  });



});
