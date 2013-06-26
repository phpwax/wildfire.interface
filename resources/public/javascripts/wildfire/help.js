jQuery(document).ready(function(){
  var STEPS;

  if(jQuery("#client-analytics").length) jQuery(".help").hide();
  jQuery(window).bind("analytics.loaded", function(){
    jQuery(".help").show();
  });

  function overlay_resize(){
    var over = jQuery("#overlay"),
          h = jQuery(document).outerHeight(),
          w = jQuery(document).outerWidth()
          ;
    over.css({"height":h, "width":w, "top":0, "left":0, "position":"absolute", "z-index":350, 'background':'rgba(0,0,0,0.8)'}).show();
  }
  function insert_overlay(){
    overlay_resize();
    jQuery(document).scrollTop(0);

  }

  function add_introduction(intro){
    var overlay = jQuery("#overlay");
    overlay.append("<div class='intro'><a href='' class='close_help_button'>&nbsp;</a><a href='' class='logo'>&nbsp;</a> "+intro+"</div><div class='controls'></div><div class='steps'></div>");
    jQuery(".close_help_button").on("click", function(e){
      var curr = jQuery("#overlay").attr("data-active");
      e.preventDefault();
      overlay.hide().html("");
      window.location.hash="";
      jQuery("#overlay,body").attr("data-active", 0); //reset the active point
      jQuery("body").removeClass("help-running").removeClass("ha-"+curr);
    });
  }

  function help_event(dom_event, ui, e, index, area){
    //restore from event if its set (accordion triggers where event runs higher in dom etc)
    if(ui && ui.newHeader){
      var data = ui.newHeader.data();
      e = data.help.e;
      index = data.help.index;
      area = data.help.area;
    }
    overlay_resize();

    var  clone = jQuery(e.selector).clone(),
          dimensions = {h: jQuery(e.selector).outerHeight(), w:jQuery(e.selector).outerWidth()},
          pos = jQuery(e.selector).offset(),
          copy = (clone && clone.length) ? jQuery("<p class='helpcopy'>"+e.copy+"</p>") : jQuery("<p class='fallbackhelpcopy'>"+e.fallback_copy+"</p>"),
          t = (pos) ? (pos.top + parseFloat(e.position.top)) : 150,
          l = (pos) ? (pos.left + parseFloat(e.position.left)) : 250
        ;
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

  }

  function run_help_step(step, index){
    var area = jQuery("#overlay .steps");
    area.html("");
    for(var i in step.elements){
      var e = step.elements[i];
      //see if there is anything to trigger (to show alternative tabs etc)
      if(e.triggers){
        //only bind on the last item (ie it wont trigger till all other tabs etc are selected)
        var _b = e.triggers[e.triggers.length-1];
        if(_b && _b.listen_selector){
          jQuery(_b.listen_selector).one(_b.listen, help_event);
          jQuery(_b.selector).data("help", {e:e, area:area, index:index});
        }else if(_b){
          jQuery(_b.selector).one(_b.event, help_event);
        }
        //trigger all
        for(var t in e.triggers){
          var _t = e.triggers[t];
          if(_t.listen_selector) jQuery(_t.selector).trigger(_t.event);
          else jQuery(_t.selector).trigger(_t.event, [false, e, index, area]);
        }

      }
      else help_event(false, false, e, index, area);
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


  jQuery(window).bind("help.autoload", function(){
    var hash = window.location.hash,
          hp = (hash && hash.length) ? hash.indexOf("HELP:") : false,
          help = (hp && hp >= 0) ? hash.replace("HELP:", "") .replace("#", ""): ""
          ;

    if(hp && hp >= 0 && help >=0){
      jQuery("#overlay").attr("data-active", help);
      jQuery("a.help").trigger("click");
    }

  });
  jQuery(window).trigger("help.autoload");

});