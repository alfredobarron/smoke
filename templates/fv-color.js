$('#btnColor').click(function() {
  if( $('#formColor').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formColor input').val(),
      type: 'success'
    });
  }
});
