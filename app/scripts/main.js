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

  Prism.plugins.NormalizeWhitespace.setDefaults({
    'break-lines': 80
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

function jsonInputToOutput() {
  var content = $("#jsonInput").val();
  if (content.trim().length == 0) {
      return false;
  }
  try { 
      var jsondata = content.toString();
      var converter = new E2EConverter();
      console.log(converter.buildECML(jsondata, true));
      $("#output").empty().text(converter.buildECML(jsondata, true));
  } catch (e) {
      console.log('error!');
  }
}

