$('#btnAlphanumeric').click(function() {
  if( $('#formAlphanumeric').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formAlphanumeric input').val(),
      type: 'success'
    });
  }
});
