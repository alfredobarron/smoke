$('#btnStrongPass').click(function() {
  if( $('#formStrongPass').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formStrongPass input').val(),
      type: 'success'
    });
  }
});
