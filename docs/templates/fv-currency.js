$('#btnCurrency').click(function() {
  if( $('#formCurrency').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formCurrency input').val(),
      type: 'success'
    });
  }
});
