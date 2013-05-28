var auto_save_signature,
    auto_interval,
    auto_saver,
    auto_save_time
    ;

function auto_save_form(auto_saver){

  var form_container = auto_saver.closest("form"),
      form_data = form_container.serialize()+"&"+auto_saver.attr("name")+"=1";
      ;

  if(auto_save_signature != form_data){

    auto_saver.addClass("autosave_active");

    jQuery.ajax({
      url:window.location.pathname+".json"+window.location.search,
      data:form_data,
      type:"post",
      dataType:"json",
      async:true,
      success:function(res){
        auto_save_signature = form_data;
        if(res.meta.model.primval){
          
          //making "save for later" button behave as if we were on the new revision's edit url to avoid having 2 revisions when an autosave occurs, and then someone clicks "save for later".
          form_container.find('input[name="revision"]').click(function(){
            jQuery(this).attr("name", "hide"); //did this to mirror the functionality of the "save for later" button as in _submit.html for content
            form_container.attr("action", action+res['id']); //changed action to post to the new revision's url instead, same behaviour as if autosave didn't exist
          });
        }
        auto_saver.removeClass("autosave_active");
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

  setTimeout(function(){
    //animate button green and show rotating autosaver
    auto_interval = setInterval(function(){
      auto_save_form(auto_saver);
    }, auto_save_time);
  }, 2000);

});