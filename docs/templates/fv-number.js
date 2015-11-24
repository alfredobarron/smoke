$('#btnNumber').click(function() {
  if( $('#formNumber').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formNumber input').val(),
      type: 'success'
    });
  }
});
