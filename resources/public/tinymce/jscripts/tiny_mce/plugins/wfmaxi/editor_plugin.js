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
        alert("howdy");
      });

      // Register buttons
      ed.addButton('image', {
        title : 'Maximise',
        cmd : 'wfMaxiLink'
      });

    }

  });

  // Register plugin
  tinymce.PluginManager.add('wfmaxi', tinymce.plugins.WildfireMaxiPlugin);
})();