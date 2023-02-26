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
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useContext, useState } from "react";

import {
  MdAddTask,
  MdAccessTime,
  MdBarChart,
  MdFileCopy,
  MdOutlineTimer,
  MdFilePresent,
  MdDevices,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Context } from "contexts/index";
import { UPDATE, CHART_TYPE } from "contexts/actionTypes";
import {} from "contexts/actionTypes";
import Chart from "react-apexcharts";
import CommonAnalysisTable from "components/commonTable";
import ChartComponent from "./components/chartComponent";

import UPlot from "./components/UPlot";

export default function LRDiff(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const location = useLocation();

  // context API
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: { enableApexChart, referenceLevel },
    },
    dispatch,
  } = useContext(Context);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <CommonAnalysisTable
        type="level"
        refLevel={`< ±${referenceLevel.LRDiff}mm`}
      />
      <ChartComponent referenceLevel={referenceLevel.LRDiff} />
    </Box>
  );
}
