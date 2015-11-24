$('#btnDate').click(function() {
  if( $('#formDate').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formDate input').val(),
      type: 'success'
    });
  }
});
