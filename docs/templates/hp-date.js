$('#btnDate').click(function(e) {
  var date = $.smkDate({
    date: $('#formDate #date').val(),
    format: $('#formDate #format').val()
  });
  $.smkAlert({
    text: date,
    type:'success'
  });
});
