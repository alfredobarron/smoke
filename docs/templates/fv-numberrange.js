$('#btnNumberRange').click(function() {
  if( $('#formNumberRange').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formNumberRange input').val(),
      type: 'success'
    });
  }
});
