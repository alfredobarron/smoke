$scope.validateEmail = function(){
  if ($('#formEmail').smkValidate()) {
    // Code here
    $.smkAlert({
      text: $scope.email,
      type: 'success'
    });
  }
};
