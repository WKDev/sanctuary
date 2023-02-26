import React from "react";
import uPlot from "uplot";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

const UPlot = ({ x, y, input, ylabel, refLevel }) => {
  // const options = {
  //   chart: {
  //     id: 'basic-line',
  //   },
  //   animations: {
  //     enabled: false,
  //   },

  //   dataLabels: {
  //     enabled: false,
  //   },

  //   xaxis: {
  //     categories: x,
  //     type: 'numeric',
  //     title: {
  //       text: 'Distance[m]',
  //     },
  //   },
  //   yaxis: {
  //     type: 'numeric',
  //     title: {
  //       text: 'Measurement[m]',
  //     },
  //     min: -4,
  //     max: 4,
  //   },
  //   stroke: {
  //     width: 2,
  //     curve: 'straight',
  //   },
  //   markers: {
  //     size: 0,
  //   },

  // annotations: {
  //   // Ref_level
  //   yaxis: [
  //     {
  //       y: -4,
  //       strokeDashArray: 0,
  //       borderColor: '#ff0000',
  //       borderWidth: 1,
  //       label: {
  //         borderColor: '#00000000',
  //         style: {
  //           fontSize: '12px',
  //           color: '#ff0000',
  //           background: '#00000000',
  //         },
  //         text: 'X = -1',
  //       },
  //     },
  //     {
  //       y: 4,
  //       strokeDashArray: 0,
  //       borderColor: '#ff0000',
  //       borderWidth: 1,
  //       label: {
  //         borderColor: '#00000000',
  //         style: {
  //           fontSize: '12px',
  //           color: '#ff0000',
  //           background: '#00000000',
  //         },
  //         text: 'X = -1',
  //       },
  //     },
  //   ],
  // },

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
  // };

  // const series = [
  //   {
  //     name: 'Level1',
  //     data: y,
  //   },
  // ];

  // const dummyPlugin = () => ({
  //   hooks: {
  //     init(u, opts) {},
  //   },
  // });

  const options = {
    // title: '(uPlot Backend)',
    width: 1200,
    height: 350,
    series: [
      {
        label: "Distance[m]",
      },
      {
        label: "Measurement[mm]",
        points: { show: false },
        stroke: "blue",
        // fill: 'blue',
      },
      {
        label: "Ref+",
        points: { show: false },
        stroke: "red",
        // fill: 'blue',
      },
      {
        // label: 'Ref-',
        points: { show: false },
        stroke: "red",
        // fill: 'blue',
      },
    ],
    scales: { x: { time: false } },
    // plugins: [dummyPlugin()],
  };
  const refPositive = new Array(x.length).fill(refLevel);
  const refNegative = new Array(x.length).fill(-refLevel);

  const concat = [x, y];

  const concatWithRef = [...concat, refPositive, refNegative];

  // console.log('concatWithRef', concatWithRef);

  return (
    <UplotReact
      options={options}
      data={concatWithRef}
      // target={target}
      // onCreate={(chart) => {}}
      // onDelete={(chart) => {}}
    />
  );
};

export default UPlot;
