$('#btnHideEmail').click(function(e) {
  if($('#formHideEmail').smkValidate()){
    var email = $.smkHideEmail($('#formHideEmail input').val());
    $.smkAlert({
      text: email,
      type:'success'
    });
  }
});
