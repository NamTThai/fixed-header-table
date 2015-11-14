document.addEventListener("WebComponentsReady", function() {
  var eventListener = document.querySelector("#event-listener");

  eventListener.eHeaderTransform = function(event) {
    var appName = document.querySelector('#mainToolbar .app-name');
    var middleContainer = document.querySelector('#mainToolbar .middle-container');
    var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    var heightDiff = event.detail.height - event.detail.condensedHeight;
    var yRatio = Math.min(1, event.detail.y / heightDiff);
    var maxMiddleScale = 0.50;
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - event.detail.y) / (heightDiff / (1 - maxMiddleScale)) + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  };

  eventListener.getSuccessData = function() {
    $.get(appPath + "dataSuccess", function(data) {
      var table = document.querySelector('fixed-header-table');
      table.headers = ["AAAA", "AAAAAAAAA", "AAAAAA", "AAAAA", "AAA", "AAAA AAAAAAA", "AAAAAAA", "AAAAAAAA"];
      table.rows = data;
    });
  };

  eventListener.getFailedData = function() {
    $.get(appPath + "dataFail", function(data) {
      var table = document.querySelector('fixed-header-table');
      table.headers = ["AAAA", "AAAAAAAAA", "AAAAAA", "AAAAA", "AAA", "AAAAAAAAA", "AAAAAAA", "AAAAAAA", "AAAAA", "AAAAAAAAA"];
      table.rows = data;
    });
  };
});
