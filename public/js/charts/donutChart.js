var options = {
    series: [355,75,106,279,310,119],
    labels:["BCA","BBA","BBA(CAM)","BBA LLB","BA LLB","B.Tech"],
    colors:['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#F44336'],
    chart: {
        width: 380,
        type: 'donut',
    },
    plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 270
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        type: 'gradient',
    },
    legend: {
        formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
    },
    title: {
        text: 'Students'
    },
    responsive: [{
        breakpoint: 550,
        options: {
            chart: {
                width: 400
            },
            legend: {
                position: 'bottom',
                fontSize: '10px',
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#donut"), options);

chart.render();
