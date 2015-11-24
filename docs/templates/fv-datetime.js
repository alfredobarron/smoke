$('#btnDatetime').click(function() {
  if( $('#formDatetime').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formDatetime input').val(),
      type: 'success'
    });
  }
});
