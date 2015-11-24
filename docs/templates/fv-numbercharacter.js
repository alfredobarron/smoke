$('#btnNumberChar').click(function() {
  if( $('#formNumberChar').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formNumberChar input').val(),
      type: 'success'
    });
  }
});
