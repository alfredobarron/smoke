$('#btnDecimal').click(function() {
  if( $('#formDecimal').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formDecimal input').val(),
      type: 'success'
    });
  }
});
