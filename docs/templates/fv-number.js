$('#btnNumber').click(function() {
  if( $('#formNumber').smkValidate() ){
    // Code here
    var val = 'Empty!';

    if ($('#formNumber input').val() !== '') {
      val = $('#formNumber input').val();
    }

    $.smkAlert({
      text: val,
      type: 'success'
    });
  }
});
