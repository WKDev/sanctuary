/* eslint-disable prefer-template */
// Chakra imports
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
} from '@chakra-ui/react';
import Card from 'components/card/Card';
// Custom components
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React, { useEffect, useContext, useState } from 'react';

import {
  MdAddTask,
  MdAccessTime,
  MdBarChart,
  MdFileCopy,
  MdOutlineTimer,
  MdFilePresent,
  MdDevices,
} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Context } from 'contexts/index';
import { UPDATE, ADD_FRUIT, CHART_TYPE } from 'contexts/actionTypes';
import {} from 'contexts/actionTypes';
import Chart from 'react-apexcharts';
import CommonAnalysisTable from 'components/commonTable';
import ChartComponent from './components/chartComponent';

import UPlot from './components/UPlot';

export default function LRDiff(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const location = useLocation();

  // context API
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: { enableApexChart, referenceLevel },
    },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    // const { ipcRenderer } = window.require("electron");

    // console.log('MetaData', MetaData);
    // console.log('_csv', _csv);
    // console.log('overview rendered');
    return () => {};
  }, [location]);

  // const data = _csv.map((item) => {
  //   const trv = (item.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
  //   return { travelled: trv, level1: item.level1 };
  // });

  const transformedData = _csv.map((obj) => {
    const trv = (obj.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
    return [trv, obj.level1];
  });

  const transformedDataX = _csv.map((obj) => {
    const trv = (obj.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
    return trv;
  });

  const transformedDataY = _csv.map((obj) => {
    const trv = (obj.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
    return obj.level1;
  });

  const concat = [transformedDataX, transformedDataY];

  // console.log('concat', concat);
  useEffect(() => {
    // const { ipcRenderer } = window.require("electron");
    // console.log('result', result);
    // console.log('transformedData', transformedData);
    // setChecked(!checked);
    // console.log('checked', checked);
    console.log('enableApexChart', enableApexChart);
  }, []);

  // const data = [
  //   { travelled: 0.000251327408, level1: '1.0' },
  //   { travelled: 0.5, level1: '2.0' },
  // ];

  const handleChartType = () => {
    dispatch({
      type: CHART_TYPE,
      payload: { enableApexChart: !enableApexChart },
    });
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          전체 범위
        </Text>
      </Flex> */}

      <CommonAnalysisTable type="level" refLevel="< ±4mm" />
      <Card mb="20px">
        <Flex minWidth="max-content" justify="flex-end" gap="2">
          <FormLabel htmlFor="isRequired">uPlot / ApexChart </FormLabel>
          <Switch value={enableApexChart} onChange={() => handleChartType()} />
        </Flex>
        {enableApexChart ? (
          <ChartComponent concat={concat} refLevel={referenceLevel} />
        ) : (
          <Flex align="center" direction="column">
            <UPlot
              x={transformedDataX}
              y={transformedDataY}
              concat={concat}
              refLevel={referenceLevel}
            />
          </Flex>
        )}

        {enableApexChart}
      </Card>
      {/* # plot here */}
    </Box>
  );
}
