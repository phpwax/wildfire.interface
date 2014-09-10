var auto_save_signature,
    auto_interval,
    auto_saver,
    auto_save_time,
    auto_save_editor
    ;

function auto_save_form(auto_saver){
  if(typeof autosave_disabled != "undefined" && autosave_disabled === true) return true;
  auto_save_editor = tinyMCE.activeEditor;
  $(document).trigger("autosave.start", [auto_save_editor]);

  var form_container = auto_saver.closest("form"),
      form_data = form_container.serialize();
      ;

  if(auto_save_signature != form_data){
    auto_saver.addClass("autosave_active");

    jQuery.ajax({
      url:window.location.pathname+".json"+window.location.search,
      data:form_data+"&"+auto_saver.attr("name")+"=1",
      type:"post",
      dataType:"json",
      async:true,
      success:function(res){
        auto_save_signature = form_data;
        if(res.meta.message_render) jQuery("ul.messages").replaceWith(res.meta.message_render);
        if(res.meta.model.primval){
          //making "save for later" button behave as if we were on the new revision's edit url to avoid having 2 revisions when an autosave occurs, and then someone clicks "save for later".
          auto_saver.siblings('input[name="hide"]').css("display", "none");
          auto_saver.attr("name", "hide"); //did this to mirror the functionality of the "save for later" button as in _submit.html for content
        }
        auto_saver.removeClass("autosave_active");
        //tinyMCE.activeEditor.setContent(res.model.row.content);
        jQuery(window).trigger("autosave.completed", [res]);
      },
      error:function(){
        auto_saver.removeClass("autosave_active");
      }
    });
  }
}

jQuery(document).ready(function(){

  auto_saver = jQuery('#auto-save');
  auto_save_time = (typeof auto_save_time_override != "undefined")?auto_save_time_override : 20000;
  auto_save_signature = auto_saver.closest("form").serialize();
  if(auto_saver.length){
    setTimeout(function(){
      //animate button green and show rotating autosaver
      auto_interval = setInterval(function(){
        auto_save_form(auto_saver);
      }, auto_save_time);
    }, 2000);
  }

  auto_saver.parents("form").on("submit",function(e){
    autosave_disabled = true;
  });

});