// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card.js';
// Custom components
import BarChart from 'components/charts/BarChart';
import { useState, React } from 'react';
import { barChartDataConsumption, barChartOptionsConsumption } from 'variables/charts';
import { MdBarChart } from 'react-icons/md';
import { usePapaParse, useCSVReader } from 'react-papaparse';

const { ipcRenderer } = window.require('electron');

export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  /// //////////////////
  const { readString } = usePapaParse();
  const { CSVReader } = useCSVReader();

  const styles = {
    csvReader: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
    },
    browseFile: {
      width: '20%',
    },
    acceptedFile: {
      border: '1px solid #ccc',
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: '80%',
    },
    remove: {
      borderRadius: 0,
      padding: '0 20px',
    },
    progressBarBackgroundColor: {
      backgroundColor: 'red',
    },
  };
  /// //////////////////

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

  // const [csvData, setCsvData] = useState(null);

  // const handleSelectFile = () => {
  //   ipcRenderer.send('select-file');
  // };

  // // electron+papa parse로부터 데이터 수신
  // ipcRenderer.on('file-selected-path', (event, data) => {
  //   console.log('path received from electron : ', data);
  // });

  // // electron+papa parse로부터 데이터 수신
  // ipcRenderer.on('etor_csv', (event, data) => {
  //   setCsvData(data);
  //   console.log('data received from electron : ', data);
  // });

  // ipcRenderer.on('etor_metadata', (event, data) => {
  //   setCsvData(data);
  //   console.log('metadata received from electron : ', data);
  // });

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          SampleChart
        </Text>
        <Button
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
        </Button>
      </Flex>

      <Box h="240px" mt="auto">
        <BarChart chartData={barChartDataConsumption} chartOptions={barChartOptionsConsumption} />
      </Box>
      {/* papapase area */}

      {/* <button onClick={() => handleReadString()}>readString</button>; */}

      <CSVReader
        onUploadAccepted={(results) => {
          console.log('---------------------------');
          console.log(results);
          console.log('---------------------------');
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <div style={styles.csvReader}>
              <button type="button" {...getRootProps()} style={styles.browseFile}>
                Browse file
              </button>
              <div style={styles.acceptedFile}>{acceptedFile && acceptedFile.name}</div>
              {/* <button {...getRemoveFileProps()} style={styles.remove}>
                Remove
              </button> */}
            </div>
            <ProgressBar style={styles.progressBarBackgroundColor} />
          </>
        )}
      </CSVReader>

      {/* end papapase area */}
      <Button onClick={handleSelectFile}>invoke ipcmain</Button>
      {/* {csvData && (
        <ul>
          {csvData.map((row, index) => (
            <li key={index}>{JSON.stringify(row)}</li>
          ))}
        </ul>
      )} */}
    </Card>
  );
}
