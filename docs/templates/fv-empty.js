$('#btnEmpty').click(function() {
  if ($('#formEmpty').smkValidate()) {
    // Code here

    $.smkAlert({
      text: 'Validate!',
      type: 'success'
    });
  }
});
