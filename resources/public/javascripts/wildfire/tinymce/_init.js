var tinymce_config = {
      // Location of TinyMCE script
      script_url : '/tinymce/js/tinymce/tinymce.min.js',
      relative_urls: false,
      theme: 'modern',
      width:'100%',
      height:300,
      autoresize_min_height: 300,
      autoresize_max_height: 300,
      //
      plugins: 'paste,table,image,media,link,code,wftemplate,autoresize,wordcount',
      content_css: "/stylesheets/build/wildfire-templates_combined.css",

    	//
      //TODO - list to document files
      //link_list: [
      //    {title: 'My page 1', value: 'http://www.tinymce.com'},
      //    {title: 'My page 2', value: 'http://www.moxiecode.com'}
      //]
    },
    simpletinymce_config = {
      // Location of TinyMCE script
      script_url : '/tinymce/jscripts/tiny_mce/tiny_mce.js',
      relative_urls: false,
      theme: 'modern',
      width:'100%',
      //
      plugins: 'paste,autoresize',
  		//
    }
    ;
    

jQuery(document).ready(function(){
  var tinymce = jQuery('textarea.tinymce').tinymce(tinymce_config);
  
  var simpletinymce = jQuery('textarea.simpletinymce').tinymce(simpletinymce_config);

  //hide the dialog boxes etc
  jQuery('#wildfire-link-dialog').hide();
  //source code view
  jQuery('#wildfire-source-code').hide();
  //inline image picker
  jQuery(window).bind("filter.trigger", function(){    
    var cloned_files = jQuery("#media .file-listing").clone(),
        info_box = jQuery(document.createElement("div"))
        ;
    //replace with the info
    info_box.addClass("image-info-container").hide().append("<div class='image-info'><label for='wf_img_size'>Size</label><input type='text' name='wf_img_size' value='120' id='wf_img_size'><label for='wf_img_pos'>Align</label><select name='wf_img_pos' id='wf_img_pos'><option value='inline_image align_left'>Left</option><option value='inline_image align_right'>Right</option><option value='inline_image align_center'>Center</option></select><label for='wf_img_cap'>Description</label><input type='text' name='wf_img_cap' value='' id='wf_img_cap'></div>");
    cloned_files.find(".uploading_container").replaceWith(info_box);
    
    jQuery("#wildfire-image-dialog").addClass("media-listing").html(jQuery(cloned_files).html()).hide().ajaxSuccess(function(){}).find("input[type='text'],select").each(function(){
      var obj = jQuery(this), parent_form = obj.parents("#wildfire-image-dialog");
      jQuery(window).trigger("filter.bind", [obj, parent_form]);
    });
    jQuery("#wildfire-image-dialog tbody tr").live("click", function(e){
      e.preventDefault();

      var row = jQuery(this),
      preview_container = (row.closest(".media-listing").find(".media-data").length) ? row.closest(".media-listing").find(".media-data") : jQuery("#wildfire-image-dialog .upload_block .media-data"),
      trigger_type = (jQuery(this).data("media") ? jQuery(this).data("media") : "generic")
      ;

      jQuery(window).trigger("media."+trigger_type+".preview", [row, preview_container]);
      jQuery("#wildfire-image-dialog .image-info-container").show();
    });
    jQuery(window).unbind("filter.trigger");
  });


  //table insert
  jQuery("#wildfire-table-insert").hide();
  //template insert
  jQuery("#wildfire-templates").hide();
  jQuery('#wildfire-templates').hide().bind("dialogopen", function(){
    jQuery('#wildfire-templates').find("iframe").attr('src', jQuery('#wildfire-templates').find("select").val());
    jQuery('#wildfire-templates').find("select").bind("change", function(){
      jQuery('#wildfire-templates').find("iframe").attr('src', jQuery(this).val());
    });
  });

});