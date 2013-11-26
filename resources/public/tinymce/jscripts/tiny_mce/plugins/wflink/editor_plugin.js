/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

function __tinymce_insert_standard_link(ed, se){
  var e = ed.dom.getParent(se.getNode(), 'A'),
      linkd=jQuery('#wildfire-link-dialog'),
      siteaddress = linkd.attr("data-server");
      href=(jQuery('#wf_ld_internal') && jQuery('#wf_ld_internal').val())?jQuery('#wf_ld_internal').val(): jQuery('#wf_ld_url').val(),
      href_target= jQuery('#wf_ld_tar').val(),
      href_class = jQuery('#wf_ld_class').val();

  if(href.length && href_target.length){
    if(href.charAt(0) == "/") href = siteaddress+href;
    else if(href.substring(0,7) == "mailto:") href=href;
    else if(href.substring(0,4) != "http") href = "http://"+href;
    // Create new anchor elements
    if (e == null) {
    ed.getDoc().execCommand("unlink", false, null);
      tinymce.execCommand("mceInsertLink", false, "#mce_temp_url#", {skip_undo : 1});
      tinymce.each(ed.dom.select("a"), function(n) {
        if (ed.dom.getAttrib(n, 'href') == '#mce_temp_url#') {
          e = n;
          ed.dom.setAttribs(e, {
           href : href,
           target : href_target,
           class: href_class
          });
        }
      });
    } else {
      ed.dom.setAttribs(e, {
        href : href,
        target : href_target,
                    class: href_class
      });
    }
  }
}

var __tinymce_insert_functions = ["__tinymce_insert_standard_link"];

(function() {
  tinymce.create('tinymce.plugins.WildfireLinkPlugin', {
    init : function(ed, url) {
      this.editor = ed;
      // Register commands
      ed.addCommand('wfAdvLink', function() {
        var se = ed.selection;

        // No selection and not in link
        if (se.isCollapsed() && !ed.dom.getParent(se.getNode(), 'A'))
          return;

        ed.windowManager.open({
          ui_dialog: "#wildfire-link-dialog",
          width : 400,
          height : 500,
          inline : 1,
          button_actions:{
            'Insert':function(){
              for(var i in __tinymce_insert_functions){
                var func = __tinymce_insert_functions[i];
                console.log(func);
                window[func](ed,se);
                //(ed,se);
              }
              jQuery(this).dialog("close");
            },
            'Cancel':function(){jQuery(this).dialog("close");}
          }
        }, {
          plugin_url : url
        });
      });

      // Register buttons
      ed.addButton('link', {
        title : 'Insert Link',
        cmd : 'wfAdvLink'
      });


      ed.onNodeChange.add(function(ed, cm, n, co) {
        cm.setDisabled('link', co && n.nodeName != 'A');
        cm.setActive('link', n.nodeName == 'A' && !n.name);
      });
    },


  });

  // Register plugin
  tinymce.PluginManager.add('wflink', tinymce.plugins.WildfireLinkPlugin);
})();