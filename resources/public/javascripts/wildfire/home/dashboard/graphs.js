jQuery(document).ready(function(){

  jQuery(window).bind("graph.draw", function(){
    jQuery(".graph").each(function(){
      var table = jQuery(this),
          config = analytics_config[table.attr("id")],
          chart_div = table.siblings(".chart"),
          data = [],
          chart=false,
          chart_type = graph_types[table.attr("id")]
          ;

      table.find("tr:not(.totals)").each(function(){
        var row = jQuery(this),
            tmp = [];
        row.find("td,th").each(function(){
          if(this.tagName.toUpperCase() == "TD") tmp.push(parseFloat(jQuery(this).text()));
          else tmp.push(jQuery(this).text());
        });
        data.push(tmp);
      });

      if(data && data.length > 1){
        chart_div.html("");
        chart = new google.visualization[chart_type](document.getElementById(chart_div.attr("id") ) );
        chart.draw(google.visualization.arrayToDataTable(data), config);
      }
      table.hide();
    });

    jQuery(".bar_gauge").each(function(){
      var bar = jQuery(this),
            total = 0,
            items = bar.find(".bar_segment"),
            largest = 0,
            main_bar = false
            ;
      items.each(function(){
        var val =parseInt(jQuery(this).attr("data-amount") );
        if(val > largest){
          largest = val;
          main_bar = jQuery(this);
        }
        total+= val;
      } ).each(function(){
        var amount = parseInt(jQuery(this).attr("data-amount")),
              one_percent = total/100,
              width = Math.round(amount / one_percent)
              ;
        jQuery(this).css({width:width+"%"}).find(".amount").html(width+"% ");
      });
      if(main_bar){
        main_bar.addClass("biggest_segment");
      }
    });
  });



  jQuery(window).trigger("graph.draw");
  jQuery(document).ajaxComplete(function(){
    jQuery(window).trigger("graph.draw");
  });

});

jQuery(document).ready(function(){
  jQuery(".analytics").each(function(){
    var analytics_container = jQuery(this);
    analytics_container.addClass('loading');
    jQuery.ajax({
      url:analytics_container.attr('data-dest'),
      type:"post",
      success:function(res){
        jQuery(window).trigger("analytics.loaded");
        analytics_container.removeClass("loading").find(".listing").html(res);
      }
    });
  });


});