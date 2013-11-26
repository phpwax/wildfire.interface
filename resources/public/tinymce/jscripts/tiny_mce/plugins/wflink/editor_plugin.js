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

  if(href.length){
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

function __tinymce_create_anchor_link(ed, se){
  var e = ed.dom.getParent(se.getNode(), 'A'),
      linkd=jQuery('#wildfire-link-dialog'),
      anchor_name = jQuery("#wf_an_name").val().replace(/[\/| |]/ig, "")
      ;
  if(anchor_name.length && e == null){
    tinymce.execCommand("mceInsertLink", false, "#mce_temp_anc#", {skip_undo : 1});
    tinymce.each(ed.dom.select("a"), function(n) {
      if (ed.dom.getAttrib(n, 'href') == '#mce_temp_anc#') {
        e = n;
        ed.dom.setAttribs(e, {
         class: "__anchor__",
         name: anchor_name,
         href: "#",
        });
      }
    });
  }else if(anchor_name.length){
    ed.dom.setAttribs(e, {
      class: "__anchor__",
      href: "#",
      name: anchor_name
    });
  }
}

function __tinymce_anchor_link(ed, se){
  var e = ed.dom.getParent(se.getNode(), 'A'),
      linkd=jQuery('#wildfire-link-dialog'),
      anchor = jQuery("#wf_an_choice").val()
      ;
  if(anchor.length && e == null){
    tinymce.execCommand("mceInsertLink", false, "#mce_temp_anc#", {skip_undo : 1});
    tinymce.each(ed.dom.select("a"), function(n) {
      if (ed.dom.getAttrib(n, 'href') == '#mce_temp_anc#') {
        e = n;
        ed.dom.setAttribs(e, {
         class: " ",
         href: "#"+anchor
        });
      }
    });
  }else if(anchor.length){
    ed.dom.setAttribs(e, {
      class: " ",
      href: "#"+anchor
    });
  }
}

function __tinymce_anchor_checker(ed){
  var content = ed.getContent({format:"raw"}),
        pattern = /<a class="__anchor__" name="(.*?)" href="#">(.*?)<\/a>/ig,
        matches = content.match(pattern),
        select = jQuery("#wf_an_choice"),
        new_select = "<option value=''>----</option>"
        ;
  for(var x in matches) {
    var ele = jQuery(matches[x]), nm = ele.attr("name");
    new_select += "<option value='"+nm+"'>"+nm +" ("+ele.text()+")</option>";
  }

  select.html(new_select);

}

var __tinymce_linkinsert_functions = ["__tinymce_insert_standard_link", "__tinymce_create_anchor_link", "__tinymce_anchor_link"];
var __tinymce_pre_linkinsert_functions = ["__tinymce_anchor_checker"];
(function() {
  tinymce.create('tinymce.plugins.WildfireLinkPlugin', {
    init : function(ed, url) {
      this.editor = ed;
      // Register commands
      ed.addCommand('wfAdvLink', function() {
        var se = ed.selection;

        // No selection and not in link
        if (se.isCollapsed() && !ed.dom.getParent(se.getNode(), 'A')) return;

        for(var x in __tinymce_pre_linkinsert_functions){
          var f = __tinymce_pre_linkinsert_functions[x];
          window[f](ed);
        }
        ed.windowManager.open({
          ui_dialog: "#wildfire-link-dialog",
          width : 650,
          height : 450,
          inline : 1,
          button_actions:{
            'Insert':function(){
              for(var i in __tinymce_linkinsert_functions){
                var func = __tinymce_linkinsert_functions[i];
                window[func](ed,se);
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