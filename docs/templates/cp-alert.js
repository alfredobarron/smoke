// Alert type warning
$('#btnWarning').click(function(e) {
  e.preventDefault();
  $.smkAlert({
    text: 'Alert type "warning"',
    type: 'warning',
  });
});
// Alert type success, position top-left
$('#btnSuccess').click(function(e) {
  e.preventDefault();
  $.smkAlert({
    text: 'Alert type "success"',
    type: 'success',
    position:'top-left'
  });
});
// Alert type danger, position top-center, 10 seconds
$('#btnDanger').click(function(e) {
  e.preventDefault();
  $.smkAlert({
    text: 'Alert type "danger" time 10 seconds',
    type: 'danger',
    position:'top-center',
    time: 10
  });
});
// Alert type info, position bottom-right, icon glyphicon-time, permanent
$('#btnInfo').click(function(e) {
  e.preventDefault();
  $.smkAlert({
    text: 'Alert type "info" permanent',
    type: 'info',
    position:'bottom-right',
    icon: 'glyphicon-time',
    permanent: true
  });
});
