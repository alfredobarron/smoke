$('#btnRangeChar').click(function() {
  if( $('#formRangeChar').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formRangeChar input').val(),
      type: 'success'
    });
  }
});
