$('#btnEqualPass').click(function() {
  if ($('#formEqualPass').smkValidate()) {
    if( $.smkEqualPass('#pass1', '#pass2') ){
      // Code here
      $.smkAlert({
        text: $('#pass1').val(),
        type: 'success'
      });
    }
}
});
