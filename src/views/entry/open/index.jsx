/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

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
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context } from 'contexts/index';
import { UPDATE, UPDATE_METADATA, UPDATE_CSV } from 'contexts/actionTypes';

import RecentListsTable from 'views/entry/open/components/RecentListsTable';
import OpenNew from 'views/entry/open/components/OpenNew';

import { columnsDataCheck, columnsDataComplex } from 'views/entry/open/variables/columnsData';
import tableDataCheck from 'views/entry/default/variables/tableDataCheck.json';

export default function OpenView() {
  const { ipcRenderer } = window.require('electron');

  // 최근 파일 목록 가져오기
  useEffect(() => {
    ipcRenderer.send('rtoe_fetch_recent');
  }, []);

  const isMountedRef = useRef(false);
  const [recent, setRecent] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [csvData, setCsvData] = useState([]);

  // ContextAPI
  const {
    state: {
      record: { MetaData, _csv },
    },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (!isMountedRef.current) {
      // 컴포넌트 초기 마운트 시
      isMountedRef.current = true;
    } else {
      // 컴포넌트 업데이트시
      if (csvData.length > 0 && Object.keys(metadata).length > 0) {
        console.log('navigate and sending data to analysis layout');
        console.log('metadata', metadata);
        console.log('csvData', csvData);
        ipcRenderer.send('rtoe_fetch_recent');

        // // 정보들 contextapi에 저장 후 이동
        // dispatch({
        //   type: UPDATE,
        //   payload: { MetaData: metadata, _csv: csvData },
        // });
      }
      return () => {};
    }
  }, [metadata, csvData]);

  // electron+papa parse로부터 데이터 수신
  const handleFetchRecent = (event, data) => {
    const output = data.map((obj, index) => {
      // console.log({...obj, "name": obj.path.split('\\').pop()})
      return { ...obj, name: obj.path.split('\\').pop() };
    });
    const output_flatten = output.flat();

    setRecent(output_flatten);
  };

  const handleSelectRow = (row) => {
    // 최근 파일 누르면 실행
    // TODO : 자동으로 분석 페이지 이동
    console.log('row', row.cells[1].value);
    ipcRenderer.send('rtoe_prev_file', row.cells[1].value);
  };

  const handleCsv = (event, d) => {
    // setCsvData(d);

    // 정보들 contextapi에 저장 후 이동
    dispatch({
      type: UPDATE_CSV,
      payload: { _csv: d },
    });
  };
  const handleMetaData = (event, d) => {
    // 정보들 contextapi에 저장 후 이동
    dispatch({
      type: UPDATE_METADATA,
      payload: { MetaData: d },
    });
  };

  // electron+papa parse로부터 데이터 수신

  useEffect(() => {
    ipcRenderer.on('etor_fetch_recent', handleFetchRecent);
    ipcRenderer.on('etor_csv', handleCsv);
    ipcRenderer.on('etor_metadata', handleMetaData);
    return () => {};
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <OpenNew columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <RecentListsTable
          columnsData={columnsDataComplex}
          tableData={recent}
          onClickRow={handleSelectRow}
        />
      </SimpleGrid>
    </Box>
  );
}


  // "files": [
  //   "dist/**/*",
  //   "electron/**/*",
  //   "src/**/*",
  //   "public/**/*",
  //   "electron/preload.js",
  //   "electron/electron.js"
  // ],