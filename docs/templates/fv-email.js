$scope.validateEmail = function(){
  if ($('#formEmail').smkValidate()) {
    // Code here

    $.smkAlert({
      text: $('#formEmail #email').val(),
      type: 'success'
    });
  }
};
