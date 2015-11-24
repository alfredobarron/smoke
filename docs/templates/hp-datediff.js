$('#btnDateDiff').click(function(e) {
  var date = $.smkDateDiff({
    fromDate: $('#formDateDiff #date1').val(),
    toDate: $('#formDateDiff #date2').val(),
    interval: $('#formDateDiff #interval').val()
  });
  $.smkAlert({
    text: date + ' ' + $('#formDateDiff #interval').val(),
    type:'success'
  });
});
