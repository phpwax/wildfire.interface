jQuery(document).ready(function(){

  jQuery("select:not(.unstyled_select)").each(function(){

    var select2 = jQuery(this).select2({width:"off",allowClear: true}),
        option = jQuery(this).find("option:first");
        if(!option.val()){
          placeholder = option.html();
          option.html("");
          select2.select2({width:"off",allowClear: true,placeholder:placeholder}); //would be nice if there would be a setter for the placeholder
        }

  });

});