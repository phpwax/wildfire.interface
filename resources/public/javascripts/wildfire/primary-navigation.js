jQuery(document).ready(function(){
  jQuery(".entypo-icon-sub").on("click", function(e){
    var li = jQuery(this).parents("li");
    li.find("ul.subnav").slideToggle();
    e.preventDefault();
  });

});