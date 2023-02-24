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
} from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React from 'react';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
// import CheckTable from 'views/entry/default/components/CheckTable';
import ComplexTable from 'views/entry/default/components/ComplexTable';
import DailyTraffic from 'views/entry/default/components/DailyTraffic';
import PieCard from 'views/entry/default/components/PieCard';
import Tasks from 'views/entry/default/components/Tasks';
import TotalSpent from 'views/entry/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import MetadataOverView from 'views/entry/default/components/MetadataOverView';

import { columnsDataCheck, columnsDataComplex } from 'views/entry/default/variables/columnsData';
import tableDataCheck from 'views/entry/default/variables/tableDataCheck.json';
import tableDataComplex from 'views/entry/default/variables/tableDataComplex.json';

export default function EntryView() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 4, md: 4, xl: 1 }} gap="20px" mb="20px">
        {/* <TotalSpent /> */}
        <MetadataOverView />
        {/* <WeeklyRevenue /> */}
        {/* <SampleChart/> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
