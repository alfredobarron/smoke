$('#btnFloat').click(function(e) {
  if($('#formFloat').smkValidate()){
    var float = $.smkFloat($('#formFloat input').val());
    $.smkAlert({
      text: float,
      type:'success'
    });
  }
});
