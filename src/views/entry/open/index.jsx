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
} from "@chakra-ui/react";
// Assets
// Custom components

import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "contexts/index";
import { UPDATE, UPDATE_METADATA, UPDATE_CSV } from "contexts/actionTypes";

import RecentListsTable from "views/entry/open/components/RecentListsTable";
import OpenNew from "views/entry/open/components/OpenNew";

import { columnsDataComplex } from "views/entry/open/variables/columnsData";
import { UPDATE_VIEW_OPTIONS } from "contexts/actionTypes";

export default function OpenView() {
  const { ipcRenderer } = window.require("electron");
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);

  // electron+papa parse로부터 데이터 수신
  useEffect(() => {
    ipcRenderer.send("rtoe_fetch_recent"); // 최근데이터 요청
    ipcRenderer.send("rtoe_fetch_settings"); // 설정 요청

    ipcRenderer.on("etor_fetch_recent", handleFetchRecent); // 최근데이터 받았을 때 할 일
    ipcRenderer.on("etor_csv", handleCsv); // csv 파일을 받았을 때 할 일
    ipcRenderer.on("etor_metadata", handleMetaData); // 메타데이터를 받았을 때 할 일
    ipcRenderer.on("etor_fetch_settings", handleFetchSettings); // 메타데이터를 받았을 때 할 일

    return () => {};
  }, []);

  // ContextAPI
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: viewOptions,
    },
    dispatch,
  } = useContext(Context);

  // 최근 데이터 받아와서 리스트업
  const handleFetchRecent = (event, data) => {
    const output = data.map((obj, index) => {
      // console.log({...obj, "name": obj.path.split('\\').pop()})
      return { ...obj, name: obj.path.split("\\").pop() };
    });
    const output_flatten = output.flat();
    setRecent(output_flatten);
  };

  // 설정 저장
  const handleFetchSettings = (event, data) => {
    // console.log("data", data);
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: { viewOptions: data },
    });
  };

  const handleSelectRow = (row) => {
    // 최근 파일 누르면 실행
    console.log("row", row.cells[1].value);
    ipcRenderer.send("rtoe_prev_file", row.cells[1].value);
    navigate("/analysis");
  };

  const handleCsv = (event, d) => {
    dispatch({
      type: UPDATE_CSV,
      payload: { _csv: d },
    });

    // 초기에 csv 길이 바탕으로 slider 값 지정하기

    // console.log("file fetch detecd_move to analysis");
    setTimeout(() => {
      navigate("/analysis");
    }, 100);
  };
  const handleMetaData = (event, d) => {
    dispatch({
      type: UPDATE_METADATA,
      payload: { MetaData: d },
    });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <OpenNew />
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
