import { useEffect, useContext, useState } from "react";
import Chart from "react-apexcharts";
// import ReactApexChart from "react-apexcharts";
import { Context } from "contexts/index";
import UPlot from "./UPlot";
import { UPDATE, CHART_TYPE } from "contexts/actionTypes";

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Text,
  Switch,
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";

const ChartComponent = (props) => {
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: viewOptions,
    },
    dispatch,
  } = useContext(Context);

  const transformedData = _csv.map((obj) => {
    const trv =
      (obj.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
    return [trv, obj.level1];
  });

  const transformedX = _csv.map((obj) => {
    const trv =
      (obj.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
    return trv;
  });

  const transformedY = _csv.map((obj) => {
    return obj.level1;
  });

  // console.log("_csv", _csv.level1);
  // console.log("transformedDataX", transformedX);
  // console.log("transformedDataY", transformedY);
  // const concat = [transformedX, transformedY];

  const aggedX = transformedX.filter(
    (element, index) => index % viewOptions.aggregation === 0
  );
  const aggedY = transformedY.filter(
    (element, index) => index % viewOptions.aggregation === 0
  );

  // const filteredConcat = concat.map((innerArray) =>
  //   innerArray.filter((element, index) => index % viewOptions.aggregation === 0)
  // );

  const slicedX = aggedX.slice(viewOptions.range[0], viewOptions.range[1]);
  const slicedY = aggedY.slice(viewOptions.range[0], viewOptions.range[1]);
  // const slicedConcat = [concatX, concatY];

  const elasticAnim = slicedX.length > 1000 ? false : true;

  const options_basic = {
    chart: {
      id: "basic-line",
      toolbar: {
        autoSelected: "pan",
        show: true,
      },
      animations: {
        enabled: elasticAnim,
      },
      // noData: {
      //   text: "Loading...",
      //   align: "center",
      //   verticalAlign: "middle",
      //   offsetX: 0,
      //   offsetY: 0,
      //   style: {
      //     color: "#000000",
      //     fontSize: "14px",
      //     fontFamily: "Helvetica",
      //   },
      // },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      // min: slicedX[viewOptions.range[0]],
      // max: slicedX[viewOptions.range[1]], // 초기 표시 범위
      categories: slicedX,
      type: "numeric",
      title: {
        text: "Distance[m]",
      },
    },
    yaxis: {
      min: -1 * props.referenceLevel - 1,
      max: props.referenceLevel + 1,
      type: "numeric",
      title: {
        text: "Measurement[m]",
      },
    },
    stroke: {
      width: 2,
      curve: "straight",
    },
    markers: {
      size: 0,
    },

    annotations: {
      // Ref_level
      yaxis: [
        {
          y: -props.referenceLevel,
          strokeDashArray: 0,
          borderColor: "#ff0000",
          borderWidth: 1,
        },
        {
          y: props.referenceLevel,
          strokeDashArray: 0,
          borderColor: "#ff0000",
          borderWidth: 1,
        },
      ],
    },
  };

  const series = [
    {
      name: "Level1",
      data: slicedY,
    },
  ];

  const handleChartType = () => {
    dispatch({
      type: CHART_TYPE,
      payload: { enableApexChart: !viewOptions.enableApexChart },
    });
  };

  return (
    <>
      {/* <Chart options={basic_options} series={series} type="line" height={350} /> */}

      <Card mb="20px">
        <Flex minWidth="max-content" justify="flex-end" gap="2">
          <FormLabel>{`uPlot / ApexChart${
            viewOptions.enableApexChart
              ? "" //" (ApexChart는 plot에 시간이 소요될 수 있습니다.)"
              : ""
          }`}</FormLabel>
          <Switch
            // defaultValue={enableApexChart}
            isChecked={viewOptions.enableApexChart}
            onChange={() => handleChartType()}
          />
        </Flex>
        {viewOptions.enableApexChart ? (
          <Chart
            options={options_basic}
            series={series}
            type="line"
            height={350}
          />
        ) : (
          <Flex align="center" direction="column">
            <UPlot x={slicedX} y={slicedY} refLevel={props.referenceLevel} />
          </Flex>
        )}

        {viewOptions.enableApexChart}
      </Card>

      {/* <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      /> */}
      {/* <ReactApexChart
        options={options_brush}
        series={series}
        type="area"
        height={150}
      /> */}
    </>
  );
};

export default ChartComponent;

// const options = {
//   chart: {
//     id: "basic-line",
//     toolbar: {
//       autoSelected: "pan",
//       show: true,
//     },
//     animations: {
//       enabled: elasticAnim,
//     },
//     noData: {
//       text: "Loading...",
//       align: "center",
//       verticalAlign: "middle",
//       offsetX: 0,
//       offsetY: 0,
//       style: {
//         color: "#000000",
//         fontSize: "14px",
//         fontFamily: "Helvetica",
//       },
//     },
//   },

//   dataLabels: {
//     enabled: false,
//   },

//   xaxis: {
//     categories: slicedConcat[0],
//     type: "numeric",
//     title: {
//       text: "Distance[m]",
//     },
//   },
//   yaxis: {
//     type: "numeric",
//     title: {
//       text: "Measurement[m]",
//     },
//     min: -viewOptions.referenceLevel - 1,
//     max: viewOptions.referenceLevel + 1,
//   },
//   stroke: {
//     width: 2,
//     curve: "straight",
//   },
//   markers: {
//     size: 0,
//   },

//   annotations: {
//     // Ref_level
//     yaxis: [
//       {
//         y: -viewOptions.referenceLevel,
//         strokeDashArray: 0,
//         borderColor: "#ff0000",
//         borderWidth: 1,
//       },
//       {
//         y: viewOptions.referenceLevel,
//         strokeDashArray: 0,
//         borderColor: "#ff0000",
//         borderWidth: 1,
//       },
//     ],
//   },
// };

// const options_brush = {
//   chart: {
//     zoom: {
//       enabled: true,
//       type: "x",
//       resetIcon: {
//         offsetX: -10,
//         offsetY: 0,
//         fillColor: "#fff",
//         strokeColor: "#37474F",
//       },
//       selection: {
//         background: "#90CAF9",
//         border: "#0D47A1",
//       },
//     },
//     id: "chart1",
//     height: 130,
//     type: "area",
//     brush: {
//       target: "line",
//       enabled: true,
//     },
//     selection: {
//       enabled: true,
//       xaxis: {
//         min: slicedConcat[0][0],
//         max: slicedConcat[0][-1], // 초기 표시 범위
//       },
//     },
//   },
//   colors: ["#008FFB"],
//   fill: {
//     type: "gradient",
//     gradient: {
//       opacityFrom: 0.91,
//       opacityTo: 0.1,
//     },
//   },
//   xaxis: {
//     categories: concat[0],
//     type: "numeric",
//     title: {
//       text: "Distance[m]",
//     },
//   },
//   yaxis: {
//     tickAmount: 4,
//     type: "numeric",
//   },
// };
