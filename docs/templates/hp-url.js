$('#btnGetUrl').click(function(e) {
  e.preventDefault();
  var url = $.smkGetURL();
  $.smkAlert({
    text: url,
    type:'success'
  });
});
