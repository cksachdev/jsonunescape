const RX_BACKSPACE = /\\b/g;
const RX_FORM_FEED = /\\f/g;
const RX_NEWLINE = /\\n/g;
const RX_CARRIAGE_RETURN = /\\r/g;
const RX_TAB = /\\t/g;
const RX_DOUBLE_QUOTE = /\\"/g;
const RX_BACKSLASH = /\\\\/g;

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

  $('#copyOutput').click(function () {
    copyToClipboard('hiddenBodyOutput');
  });

  Prism.plugins.NormalizeWhitespace.setDefaults({
    'break-lines': 120
  });
});

function copyToClipboard(element_id) {
  var aux = document.createElement('div');
  aux.setAttribute('contentEditable', true);
  aux.innerHTML = document.getElementById(element_id).innerHTML;
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


function viewJsonOuput() {
  var content = $('#jsonInput').val();
  if (content.trim().length == 0) {
    return false;
  }

  try {
    var jsonStr = unescapeJsonString(content);
    var jsonObject = $.parseJSON(jsonStr);
    $("#bodyOutput,#hiddenBodyOutput").empty().text(JSON.stringify(jsonObject, null, parseInt(2)));
  } catch (error) {
    $("#bodyOutput,#hiddenBodyOutput").empty().text(content);
  }

  setTimeout(function () {
    Prism.highlightElement($("#bodyOutput")[0]);
  }, 10);
  
}

function viewXmlOutput() {
  var content = $("#jsonInput").val();
  if (content.trim().length == 0) {
    return false;
  }
  var converter = new E2EConverter();
  try {
    var enescapeJson = unescapeJsonString(content);
    var jsondata = JSON.parse(enescapeJson);
    $("#bodyOutput,#hiddenBodyOutput").empty().text(converter.buildECML(jsondata, true));
  } catch (error) {
    var output = converter.buildECML(JSON.parse(content), true);
    $("#bodyOutput,#hiddenBodyOutput").empty().text(output);
  }

  setTimeout(function () {
    Prism.highlightElement($("#bodyOutput")[0]); 
  }, 10);
}

function unescapeJsonString(text) {
  text = text.replace(RX_BACKSPACE, "\b");
  text = text.replace(RX_FORM_FEED, "\f");
  text = text.replace(RX_NEWLINE, "\n");
  text = text.replace(RX_CARRIAGE_RETURN, "\r");
  text = text.replace(RX_TAB, "\t");
  text = text.replace(RX_DOUBLE_QUOTE, "\"");
  text = text.replace(RX_BACKSLASH, "\\");
  return text;
}
