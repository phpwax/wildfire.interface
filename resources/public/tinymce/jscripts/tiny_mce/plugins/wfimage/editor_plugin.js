/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
  tinymce.create('tinymce.plugins.WildfireImagePlugin', {
    init : function(ed, url) {
      this.editor = ed;
      // Register commands
      ed.addCommand('wfImageLink', function() {

        ed.windowManager.open({
          ui_dialog: "#wildfire-image-dialog",
          width : 1000,
          height : 550,
          inline : 1,
          button_actions:{
            'Insert':function(){
              var preview = jQuery("#wildfire-image-dialog .image_preview"),
                  sz = jQuery("#wf_img_size").val(),
                  cl = jQuery("#wf_img_pos").val(),
                  alt = jQuery("#wf_img_cap").val(),
                  img,iframe
                  ;
              if((img = preview.find("img")) && img.length){
                imgstr = "<img src='"+img.attr('src').replace("172", sz)+"' class='"+cl+"' alt='"+alt+"'>";
              }else if((iframe = preview.find("iframe")) && iframe.length){
                imgstr = iframe.attr({"class":cl,"width":sz,"height":Math.floor(sz/1.778)}).parent().html();
              }
              tinymce.execCommand('mceInsertContent',false,imgstr);
              jQuery(this).dialog("close");
            },
            'Cancel':function(){
              jQuery(this).dialog("close");
            }
          }
        }, {
          plugin_url : url
        });
      });

      // Register buttons
      ed.addButton('image', {
        title : 'Insert Image',
        cmd : 'wfImageLink'
      });

    },

    
  });

  // Register plugin
  tinymce.PluginManager.add('wfimage', tinymce.plugins.WildfireImagePlugin);
})();