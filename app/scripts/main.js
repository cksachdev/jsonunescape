(function(){

  var window_height = $(window).height();
  var panel_height = $("#panel").outerHeight();
  var footer_height = $("#footer").outerHeight();

  console.log('window: ' + window_height);
   console.log('Panel: ' + panel_height);
   console.log('Footer: ' + footer_height);

   var target_div = $(".panel-body");
   var total_height = window_height  - panel_height - footer_height +30;
   console.log('Total ' + total_height);
   target_div.css('min-height', total_height);
  
})();
