jQuery(document).ready(function(){
  var STEPS;

  if(jQuery("#client-analytics").length) jQuery(".help").hide();
  jQuery(window).bind("analytics.loaded", function(){
    jQuery(".help").show();
  });

  function insert_overlay(){
    var over = jQuery("#overlay"),
          h = jQuery(document).outerHeight(),
          w = jQuery(document).outerWidth()
        ;

    over.css({"height":h, "width":w, "top":0, "left":0, "position":"absolute", "z-index":350, 'background':'rgba(0,0,0,0.8)'}).show();
    jQuery(document).scrollTop(0);

  }

  function add_introduction(intro){
    var overlay = jQuery("#overlay");
    overlay.append("<div class='intro'><a href='' class='close_help_button'>&nbsp;</a><a href='' class='logo'>&nbsp;</a> "+intro+"</div><div class='controls'></div><div class='steps'></div>");
    jQuery(".close_help_button").on("click", function(e){
      var curr = jQuery("#overlay").attr("data-active");
      e.preventDefault();
      overlay.hide().html("");
      jQuery(window).trigger("locationclear");
      jQuery("#overlay,body").attr("data-active", 0); //reset the active point
      jQuery("body").removeClass("help-running").removeClass("ha-"+curr);
    });
  }

  function run_help_step(step, index){
    var area = jQuery("#overlay .steps");
    area.html("");
    for(var i in step.elements){

      var e = step.elements[i],
            clone = jQuery(e.selector).clone(),
            dimensions = {h: jQuery(e.selector).outerHeight(), w:jQuery(e.selector).outerWidth()},
            pos = jQuery(e.selector).offset(),
            copy = (clone && clone.length) ? jQuery("<p class='helpcopy'>"+e.copy+"</p>") : jQuery("<p class='fallbackhelpcopy'>"+e.fallback_copy+"</p>"),
            t = (pos) ? (pos.top + parseFloat(e.position.top)) : 150,
            l = (pos) ? (pos.left + parseFloat(e.position.left)) : 250
            ;
      //see if there is anything to trigger (to show alternative tabs etc)
      if(e.trigger) jQuery(e.trigger.selector).trigger(e.trigger.event);
      //wrap in a timeout to delay
      setTimeout(function(){
        window.location.hash = "HELP:"+index;
        if(parseFloat(e.position.top) > 0) copy.addClass("helpbelow");
        copy.css({"position":"absolute", top: t, left: l}).appendTo(area);

        if(clone && clone.length) clone.css({"position":"absolute", top:pos.top, left:pos.left, width:dimensions.w+7, height:dimensions.h+6}).addClass("highlighted_block").appendTo(area);

        var top = ((parseFloat(e.position.top) > 0 && clone && clone.length) ? clone.offset().top : copy.offset().top)  - 80;
        jQuery(document).scrollTop( (top >0 ) ? top : 0 );
        //unbind events
        jQuery("#overlay .steps a, #overlay .steps .button, #overlay .steps .submit, #overlay .steps input, #overlay .steps select, #overlay .tree_col_status, #overlay .view_children_link").unbind("click submit change").bind("click submit change", function(e){
          e.preventDefault();
          e.stopPropagation();
          return false;
        });

      }, 800);

    }
  }

  function show_next_previous(){
    var controls = jQuery("#overlay .controls"),
          active = (parseInt(jQuery("#overlay").attr("data-active")) > 0 ) ? parseInt(jQuery("#overlay").attr("data-active")) : 0;
    if(STEPS.length > 1){
      controls.hide().append("<a href='#' class='next_help clearfix'>Next <span></span></a> <a href='#' class='previous_help clearfix disabled_help'><span></span> Previous</a>");

      jQuery(".next_help, .previous_help").bind("click", function(e){
        e.preventDefault();
        var curr= parseInt(jQuery("#overlay").attr("data-active")),
              pos =parseInt(jQuery("#overlay").attr("data-active"))
              ;
        if(jQuery(this).hasClass("next_help")) pos ++;
        else if(jQuery(this).hasClass("previous_help")) pos --;

        if(pos < 0) pos = 0;
        if(pos >= STEPS.length) pos = 0;

        //toggle classes
        if(pos == 0) jQuery(".previous_help").addClass("disabled_help");
        else jQuery(".previous_help").removeClass("disabled_help");

        if(pos+1 == STEPS.length) jQuery(".next_help").addClass("disabled_help");
        else jQuery(".next_help").removeClass("disabled_help");

        run_help_step(STEPS[pos], pos);
        jQuery("#overlay,body").attr("data-active", pos);
        jQuery("body").removeClass("ha-"+curr).addClass("ha-"+pos);
      });

    }
    jQuery("#overlay,body").attr("data-active", active);
    jQuery("body").addClass("ha-"+active);
    controls.show();
    run_help_step(STEPS[active], active);
  }



  jQuery(".help").on("click", function(e){
    e.preventDefault();
    var help = jQuery(this),
          target = help.attr("href")+".help"
          ;
    jQuery.ajax({
      url:target,
      dataType:"json",
      success:function(res){
        jQuery("body").addClass("help-running");
        insert_overlay();
        add_introduction(res.introduction);
        STEPS = res.steps;
        show_next_previous();

      },
      error:function(){

      }
    });

  });

});