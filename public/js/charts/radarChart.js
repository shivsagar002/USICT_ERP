var options = {
    series: [{
    name: 'IOT',
    data: [80, 50, 30, 40, 95, 67],
  }, {
    name: 'Data Warehouse',
    data: [56, 30, 40, 80, 70, 80],
  }, {
    name: 'Cyber Security',
    data: [44, 76, 78, 56, 43, 23],
  }],
    chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  title: {
    text: 'Test Scores'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  }
  };

  var chart = new ApexCharts(document.querySelector("#radarChart"), options);
  chart.render();