import React from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = ({ x, y, concat, refLevel }) => {
  const options = {
    chart: {
      id: 'basic-line',
    },
    animations: {
      enabled: false,
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: concat[0],
      type: 'numeric',
      title: {
        text: 'Distance[m]',
      },
    },
    yaxis: {
      type: 'numeric',
      title: {
        text: 'Measurement[m]',
      },
      min: -refLevel - 1,
      max: refLevel + 1,
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    markers: {
      size: 0,
    },

    annotations: {
      // Ref_level
      yaxis: [
        {
          y: -refLevel,
          strokeDashArray: 0,
          borderColor: '#ff0000',
          borderWidth: 1,
        },
        {
          y: refLevel,
          strokeDashArray: 0,
          borderColor: '#ff0000',
          borderWidth: 1,
        },
      ],
    },

    // noData: {
    //   text: 'Loading...',
    //   align: 'center',
    //   verticalAlign: 'middle',
    //   offsetX: 0,
    //   offsetY: 0,
    //   style: {
    //     color: '#000000',
    //     fontSize: '14px',
    //     fontFamily: 'Helvetica',
    //   },
    // },
  };

  const series = [
    {
      name: 'Level1',
      data: concat[1],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default ChartComponent;
