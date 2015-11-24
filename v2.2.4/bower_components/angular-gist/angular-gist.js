angular.module('gist', []);

angular.module('gist')
  .directive('gist', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var gistId = attrs.id;

        var iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.id = "gist-" + gistId;
        element[0].appendChild(iframe);

        var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style>' +
          '</head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height='+
          'document.body.scrollHeight + \'px\'"><script type="text/javascript">' +
          '!function(){"use strict";window.retargetLinks=function(){ var gists=' +
          'document.getElementsByClassName("gist");for(var i=0,links;i<gists.length;i++){' +
          'links=gists[i].getElementsByTagName("a");for(var j=0;j<links.length;j++){ ' + 
          'links[j].setAttribute("target","_blank");}}}}();</script><script type="text/javascript" ' +
          'src="https://gist.github.com/' + gistId + '.js" onload="retargetLinks()"></script></body></html>';

        var doc = iframe.document;
        if (iframe.contentDocument) doc = iframe.contentDocument;
        else if (iframe.contentWindow) doc = iframe.contentWindow.document;

        doc.open();
        doc.writeln(iframeHtml);
        doc.close();
      }
    };
  });
