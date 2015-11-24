$('#btnWeek').click(function() {
  if( $('#formWeek').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formWeek input').val(),
      type: 'success'
    });
  }
});
