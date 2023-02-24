// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Avatar,
  FormLabel,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

// Custom components
import BarChart from 'components/charts/BarChart';
import React from 'react';
import { barChartDataConsumption, barChartOptionsConsumption } from 'variables/charts';
import {
  MdBarChart, MdAddTask, MdAttachMoney, MdFileCopy,
} from 'react-icons/md';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import Usa from 'assets/img/dashboards/usa.png';

export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
  return (
  // <Card align='center' direction='column' w='100%' {...rest}>
  //   <Flex align='center' w='100%' px='15px' py='10px'>
  //     <Text
  //       me='auto'
  //       color={textColor}
  //       fontSize='xl'
  //       fontWeight='700'
  //       lineHeight='100%'>
  //       장비 녹화 데이터
  //     </Text>
  //     </Flex>

    <Box h="100px" mt="auto">
      <SimpleGrid
        columns={{
          base: 2, md: 2, lg: 4, '2xl': 4,
        }}
        gap="20px"
        mb="20px"
      />
    </Box>
    // </Card>
  );
}
