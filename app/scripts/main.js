var parseContentBody = function(contentBody) {
  try {
      contentBody = JSON.parse(contentBody);
  } catch (e) {
      contentBody = convertToJSON(contentBody);
  }
  return contentBody;
}

var convertToJSON = function(contentBody) {
  try {
      var x2js = new X2JS({ attributePrefix: 'none', enableToStringFunc: false });
      return x2js.xml_str2json(contentBody);
  } catch (e) {
      return;
  }
}


$(function () {
  $('#horizontal').kendoSplitter({
    panes: [{
        collapsible: true,
        resizable: true
      },
      {
        collapsible: true,
        resizable: true
      }
    ]
  });

  $('#copyInput').click(function () {
    copyToClipboard('jsonInput');
  });

  $('#copyOutput').click(function () {
    copyToClipboard('jsonOutput');
  });

});


function copyToClipboard(element_id) {
  var aux = document.createElement('div');
  aux.setAttribute('contentEditable', true);
  aux.innerHTML = document.getElementById(element_id).value;
  aux.setAttribute('onfocus', 'document.execCommand(\'selectAll\',false,null)');
  document.body.appendChild(aux);
  aux.focus();

  try {
    document.execCommand('copy');
    console.log('Copied');
    alert('Copied!');
  } catch (err) {
    console.log('Oops, unable to copy');
  } finally {
    document.body.removeChild(aux);
  }


  window.getSelection().removeAllRanges();
}

function minifyJSON(element_id) {
  var content = $('#' + element_id).val();
  if (content.trim().length == 0) {
    return false;
  }
  try {
    var jsonStr = content;
    var jsonObject = $.parseJSON(jsonStr);
    $('#' + element_id).val(JSON.stringify(jsonObject, null, 0));

  } catch (e) {
    validateJSON();
  }
}


function beautifyJSON(element_id) {
  var content = $('#' + element_id).val();
  if (content.trim().length == 0) {
    return false;
  }
  try {
    var jsonStr = content;
    var jsonObject = $.parseJSON(jsonStr);
    $('#' + element_id).val(JSON.stringify(jsonObject, null, parseInt(2)));
  } catch (e) {
    validateJSON();
  }
}
