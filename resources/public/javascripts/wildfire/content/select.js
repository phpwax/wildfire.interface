jQuery(document).ready(function(){

  jQuery("select:not(.unstyled_select)").each(function(){

    var select = jQuery(this).select2({width:"resolve",allowClear:true}),
        option = jQuery(this).find("option:first");
        if(!option.val()){
          placeholder = option.html();
          option.html("");
          select.select2({width:"resolve",allowClear:true,placeholder:placeholder}); //would be nice if there would be a setter for the placeholder
        }

  });

});