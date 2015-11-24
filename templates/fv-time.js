$('#btnTime').click(function() {
  if( $('#formTime').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formTime input').val(),
      type: 'success'
    });
  }
});
