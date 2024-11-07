var options = {
    series: [52],
    chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      }
    },
  },
  labels: ['Semester Progress'],
  };

  var chart = new ApexCharts(document.querySelector("#radialChart"), options);
  chart.render();