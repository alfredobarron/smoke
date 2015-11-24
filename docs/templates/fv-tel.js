$('#btnTel').click(function() {
  if( $('#formTel').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formTel input').val(),
      type: 'success'
    });
  }
});
