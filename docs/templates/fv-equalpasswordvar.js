var password = 'Smoke3';

$('#btnEqualPassVar').click(function() {
  if ($('#formEqualPassVar').smkValidate()) {
    if( $.smkEqualPass(password, '#pass') ){
      // Code here
      $.smkAlert({
        text: $('#pass').val(),
        type: 'success'
      });
    }
  }
});
