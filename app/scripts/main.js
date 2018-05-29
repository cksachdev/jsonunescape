$(function () {

  $("#horizontal").kendoSplitter({
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

  var data = [{
    'AreaCode': 'B697-31',
    'Revenue': 12747128.190000001
  }, {
    'AreaCode': 'B697-92',
    'Revenue': 7922559.1600000048
  }, {
    'AreaCode': 'B697-76',
    'Revenue': 7541039.540000001
  }, {
    'AreaCode': 'B697-46',
    'Revenue': 7076495.5800000066
  }, {
    'AreaCode': 'B553-131',
    'Revenue': 5738816.5099999979
  }, {
    'AreaCode': 'B553-193',
    'Revenue': 4608556.52
  }, {
    'AreaCode': 'B697-74',
    'Revenue': 3895194.1099999994
  }, {
    'AreaCode': 'D158-233',
    'Revenue': 3572808.989999996
  }, {
    'AreaCode': 'B697-78',
    'Revenue': 3512657.6999999937
  }, {
    'AreaCode': 'B672-31',
    'Revenue': 2955916.9800000032
  }, {
    'AreaCode': 'B553-46',
    'Revenue': 2806813.7100000042
  }];

  var tmpData = data;
  var formattedData = JSON.stringify(tmpData, null, '\t');
  $('#jsonInput').text(formattedData);

});


function copyInput() {
  var copyText = document.getElementById("jsonInput");
  copyText.select();
  document.execCommand("copy");
}
