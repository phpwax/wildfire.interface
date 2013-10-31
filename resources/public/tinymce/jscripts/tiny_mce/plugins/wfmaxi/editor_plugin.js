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
  tinymce.create('tinymce.plugins.WildfireMaxiPlugin', {
    init : function(ed, url) {
      this.editor = ed;
      // Register commands
      ed.addCommand('wfMaxiLink', function() {
        var win = $("#content_tab_content .mceLayout");

        if(win.hasClass("maximised")) {
          win.css({
            "position":"static"
          });
          win.find("#wildfire_content_content_iframe").attr("title","Maximise Editor");
          win.removeClass("maximised");

        } else {
          win.css({
            "position":"absolute",
            "z-index" : "10",
            "left"    : "0px",
            "top"     : "0px",
            "bottom"  : "0px"
            "width"   : "100%",
          });
          win.addClass("maximised");
          win.find("#wildfire_content_content_iframe").attr("title","Minimise Editor");
        }
        
      });

      // Register buttons
      ed.addButton('iframe', {
        title : 'Maximise Editor',
        cmd : 'wfMaxiLink'
      });

    }

  });

  // Register plugin
  tinymce.PluginManager.add('wfmaxi', tinymce.plugins.WildfireMaxiPlugin);
})();