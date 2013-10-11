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
        var win = $("#content_tab_content");
        var frame = win.find("iframe");

        if(win.hasClass("maximised")) {
          win.css({
            "position":"static"
          });
          frame.css("height","350px");
          win.find("#wildfire_content_content_iframe").attr("title","Maximise Editor");
          win.removeClass("maximised");

        } else {
          win.css({
            "position":"absolute",
            "z-index" : "10",
            "left"    : "5px",
            "top"     : "5px",
            "width"   : "99%",
            "height"  : "99%"
          });
          frame.height($(document).height() - frame.offset().top);
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