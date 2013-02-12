jQuery(document).ready(function(){

  jQuery('.tree_list .view_children_link').live("click", function(e){
    var link = jQuery(this),
        row = jQuery(link.closest("li")),
        table = jQuery(link.closest("ul")),
        id = row.attr("data-row-id"),
        language = row.attr("data-row-language")
        ;
    row.toggleClass("open");
    if(link.hasClass("ajax_tree_load")){
      row.addClass('loading');
      jQuery.ajax({
        url:table.attr("data-action")+".ajax",
        data:{"filters[parent]":id, "filters[language]":language},
        type:"post",
        success:function(res){
          link
            .toggleClass("ajax_tree_load open")
            .addClass("open");

          jQuery(res)
            .wrap("<li>")
            .parent()
            .css("display", "none")
            .insertAfter(row.removeClass('loading'))
            .addClass("children-of-"+id)
            .slideDown("fast");

          $(window).trigger("update_url", link.attr("href"));
        },
        error:function(){}
      });
    }else if(link.hasClass('open')){
      link.toggleClass("open");
      jQuery('.children-of-'+id).slideUp("fast");
      $(window).trigger("update_url", link.attr("href"));
    }else{
      link.toggleClass("open");
      jQuery('.children-of-'+id).slideDown("fast");
    }
    e.preventDefault();
  });

});