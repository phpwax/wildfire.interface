var tinymce_config = {
      // Location of TinyMCE script
      script_url : '/tinymce/jscripts/tiny_mce/tiny_mce.js',
      relative_urls: false,
      theme: 'advanced',
      skin:'o2k7',
      skin_variant : "silver",
      width:'100%',
      height:350,
      autoresize_min_height: 350,
      autoresize_max_height: 350,
      //
      plugins: 'jqueryinlinepopups,paste,wflink,wfimage,wfhtml,wftable,wftemplate,wfmaxi',
      theme_advanced_blockformats: "p,h2,h3,h4,blockquote,h6",
      content_css: "/stylesheets/build/wildfire-templates_combined.css",
      // Theme options
    	theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,bullist,numlist,|,link,unlink,image,|,hr,|,code,|,table,|,row_before,row_after,delete_row,|,col_before,col_after,delete_col,|,iframe",
    	theme_advanced_buttons2 : "formatselect,template",
    	theme_advanced_buttons3 : "",
    	theme_advanced_buttons4 : "",
    	theme_advanced_toolbar_location : "top",
    	theme_advanced_toolbar_align : "left",
    	theme_advanced_statusbar_location : "bottom",
    	theme_advanced_resizing : false
    	//
    },
    simpletinymce_config = {
      // Location of TinyMCE script
      script_url : '/tinymce/jscripts/tiny_mce/tiny_mce.js',
      relative_urls: false,
      theme: 'advanced',
      skin:'o2k7',
      skin_variant : "silver",
      width:'100%',
      //
      plugins: 'directionality,jqueryinlinepopups,paste,wflink,autoresize',
      // Theme options
  		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,link,unlink,|,hr",
  		theme_advanced_buttons2 : "",
  		theme_advanced_buttons3 : "",
  		theme_advanced_buttons4 : "",
  		theme_advanced_toolbar_location : "top",
  		theme_advanced_toolbar_align : "left",
  		theme_advanced_statusbar_location : "bottom",
  		theme_advanced_resizing : false
  		//
    }
    ;
    

jQuery(document).ready(function(){
  $(document).trigger("tinymce.init",[tinymce_config]);
  var tinymce = jQuery('textarea.tinymce').tinymce(tinymce_config);
  
  var simpletinymce = jQuery('textarea.simpletinymce').tinymce(simpletinymce_config);

  //hide the dialog boxes etc
  jQuery('#wildfire-link-dialog').hide();
  //source code view
  jQuery('#wildfire-source-code').hide();


  jQuery("#wildfire-image-dialog").on("click",".media-listing-item", function(e){

    e.preventDefault();

    var row = jQuery(this),
        preview_container = row.closest("#wildfire-image-dialog").find(".image_preview"),
        trigger_type = (jQuery(this).data("media") ? jQuery(this).data("media") : "generic")
        ;

    jQuery(window).trigger("media."+trigger_type+".preview", [row, preview_container]);
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