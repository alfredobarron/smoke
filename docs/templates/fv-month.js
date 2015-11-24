$('#btnMonth').click(function() {
  if( $('#formMonth').smkValidate() ){
    // Code here
    $.smkAlert({
      text: $('#formMonth input').val(),
      type: 'success'
    });
  }
});
