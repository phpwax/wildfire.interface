jQuery(document).ready(function(){

  jQuery(window).bind("join.files.highlight", function(){
    jQuery(".joined-to-model").removeClass("joined-to-model");
    jQuery(".joined-file").each(function(){
      var primval = jQuery(this).data("primval");
      jQuery(this).closest("fieldset").find("#data-listing #row_"+primval).addClass("joined-to-model");
    });
  });

  //this inserts the ability to join media to the content
  jQuery(window).bind("preview.click", function(e, row, preview_container){
    var primval = row.data("model-id"),
        checkbox = jQuery(".default_value_to_unset_join").clone(),
        field = row.closest(".media-listing, .existing-files").attr("data-field"),
        button = (jQuery(".f_"+field+"_"+primval).length) ? "<a href='#' class='button js-added remove-button' data-primval='"+primval+"'>REMOVE</a>" : "<a href='#' class='button js-added add-button' data-primval='"+primval+"'>ADD</a>"
        ;
    if(row.parents(".file-listing").length){
      if(jQuery(".media-listing, .existing-files").length){
        checkbox.attr("name", checkbox.attr("name").replace("[0]", "["+primval+"][id]")).attr("type", "checkbox").attr("checked", false).val(primval).hide();
        preview_container.html(preview_container.html()+button).append(checkbox);
      }
    }
  });

  jQuery(".embedded-media-listing").closest("fieldset").bind("add-media", function(e, result){
    var existing = jQuery(this).find(".existing-files").append(result);
    existing.find(".joined-file:last .join-order-field").val(existing.find(".joined-file").length);
    existing.find('select.media-type-selector').select2({allowClear:true});
  });

  //on click we will now copy that
  jQuery(".button.operation_add, .button.add-button").live("click", function(e){
    e.preventDefault();

    var target = jQuery(this),
        primval = target.data("primval") || target.closest(".media-listing-item").data("primval"),
        holder = target.closest(".embedded-media-listing"),
        field = holder.attr("data-field"),
        url = holder.attr("data-new-join-url"),
        join_class = holder.attr("data-join-class");
        join_id = holder.attr("data-join-id");
        join_field = holder.attr("data-join-field");;

    jQuery.ajax({
      "url":url,
      "data":{
        "target_id":primval,
        "field":field,
        "join_class":join_class,
        "join_id":join_id,
        "join_field":join_field
      },
      "success":function(result){
        var fieldset = target.closest("fieldset"),
            button = fieldset.find("#row_"+primval+" .operation_add"),
            button_link = button.attr("href");

        fieldset.trigger("add-media", result);
        button.addClass("operation_remove").removeClass("operation_add").text("Remove").attr("href",button_link.replace("\/add\/","\/remove\/"));

        $(".media-listing-item").hoverIntent(
          function(){$(this).toggleClass("hovered");},
          function(){$(this).toggleClass("hovered");}
        );

        jQuery(window).trigger("join.files.highlight");
        jQuery(window).trigger("join.added");
      }
    });
  });
  jQuery(".button.operation_remove, .button.remove-button").live("click", function(e){
    e.preventDefault();
    var item = jQuery(this),
          primval = jQuery(this).data("primval") || jQuery(this).closest(".media-listing-item").data("primval"),
          fieldset = jQuery(this).closest("fieldset"),
          field = fieldset.find(".embedded-media-listing").attr("data-field"),
          buttons = fieldset.find("#row_"+primval+" .operation_remove, #row_"+primval+" .remove-button")
          ;

    buttons.each(function(){
      var b = jQuery(this);
      if(b.hasClass("operation_remove")) b.addClass("operation_add").removeClass("operation_remove");
      else b.addClass("add-button").removeClass("remove-button");
      b.text("Add").attr("href", b.attr("href").replace("\/remove\/","\/add\/"));
    });
    jQuery(".f_"+field+"_"+primval).remove();
    jQuery("#row_"+primval).removeClass("joined-to-model");
    jQuery(window).trigger("join.files.highlight");
    jQuery(window).trigger("join.removed");
  });

});