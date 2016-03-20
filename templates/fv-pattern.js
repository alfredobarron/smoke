$('#btnPattern').click(function() {
  if( $('#formPattern').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formPattern input').val(),
      type: 'success'
    });
  }
});
