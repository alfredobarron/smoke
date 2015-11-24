$('#btnCurrency').click(function(e) {
  if($('#formCurrency').smkValidate()){
    var currency = $.smkCurrency($('#formCurrency input').val(), '$');
    $.smkAlert({
      text: currency,
      type:'success'
    });
  }
});
