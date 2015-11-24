$('#btnUrl').click(function() {
  if( $('#formUrl').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formUrl input').val(),
      type: 'success'
    });
  }
});
