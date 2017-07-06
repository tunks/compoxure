/*jslint browser: true, boss:true */
(function (w, d) {

  var elBetweenDelimiters = function (first, last) {
    var els = [];
    var el = first;

    while (el = el.nextSibling) {
      if (el === last) {
        return els;
      }
      els.push(el);
    }
  };

  var markNodes = function (openTag) {
    var data = JSON.parse(openTag.innerHTML);
    var id = openTag.getAttribute('data-cx-open-id');
    var closeTag = d.querySelector('script[data-cx-close-id="' + id + '"]');
    var nodes = elBetweenDelimiters(openTag, closeTag);
    if ('groupCollapsed' in console) {
      console.groupCollapsed('cx fragment:' + data.id);
    } else {
      console.log('cx fragment:' + data.id);
    }

    if ('table' in console) {
      console.table(data.logEvents);
    } else {
      console.log('events', data.logEvents);
    }

    console.log('Nodes:', nodes);

    console.log('Options:', data.options);

    console.log('Status:', data.status);

    if ('groupEnd' in console) {
      console.groupEnd();
    } else {
      console.log('----------------');
    }

    nodes.forEach(function (el) {
      el.cxDebugId = id;
      el.cxDebugData = data;
      el.cxDebugNodes = nodes;
    });
  };

  var openTags = d.querySelectorAll('script[type="cx-debug-open"]');
  Array.prototype.forEach.call(openTags, markNodes);

}(window, document));
