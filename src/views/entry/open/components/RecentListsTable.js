/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  Button,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { Hoverable } from "@chakra-ui/react";
import React, { useMemo, useEffect, useState, useRef, useContext } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

import { Context } from "contexts/index";
import { UPDATE, ADD_FRUIT } from "contexts/actionTypes";

export default function RecentListsTable(props) {
  const { ipcRenderer } = window.require("electron");

  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  // context API
  const {
    state: {
      record: { MetaData, _csv },
      // productList: { fruits },
    },
    dispatch,
  } = useContext(Context);

  const unixTimeToDateString = (unixTimestamp) => {
    if (unixTimestamp === "None") {
      return "None";
    }
    const dateObj = new Date(unixTimestamp * 1000);
    const year = dateObj.getFullYear();
    const month = `0${dateObj.getMonth() + 1}`.slice(-2);
    const day = `0${dateObj.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  const hoverColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [metadata, setMetadata] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const isMountedRef = useRef(false);
  // const isMountedRef_csv = useRef(false);

  // useEffect(() => {
  //   if (csvData.length > 0 && Object.keys(metadata).length > 0) {
  //     console.log("ending rendering...!");
  //   }
  //   return () => {};
  // }, [metadata, csvData]);

  // useEffect(() => {
  //   if (!isMountedRef.current) {
  //     // 컴포넌트 초기 마운트 시
  //     isMountedRef.current = true;
  //   } else {
  //     // 컴포넌트 업데이트시
  //     if (csvData.length > 0 && Object.keys(metadata).length > 0) {
  //       console.log("navigate and sending data to analysis layout");
  //       console.log("metadata", metadata);
  //       // console.log('csvData', csvData);

  //       // 정보들 contextapi에 저장 후 이동
  //       dispatch({
  //         type: UPDATE,
  //         payload: { MetaData: metadata, _csv: csvData },
  //       });
  //     }
  //     return () => {};
  //   }
  // }, [metadata, csvData]);

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text
          color={textColor}
          fontSize="20px"
          fontWeight="700"
          lineHeight="100%"
        >
          최근 열어본 파일
        </Text>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              //       <Box
              //   as="tr"
              //   _hover={{ background: hoverColor }}
              //   transition="all .2s ease-in-out"
              // >
              <Tr
                {...row.getRowProps()}
                key={index}
                onClick={() => props.onClickRow(row)}
                transition="all .2s ease-in-out"
                gap="20px"
                _hover={{ background: hoverColor }}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "이름") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "경로") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Approved"
                              ? "green.500"
                              : cell.value === "Disable"
                              ? "red.500"
                              : cell.value === "Error"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Approved"
                              ? MdCheckCircle
                              : cell.value === "Disable"
                              ? MdCancel
                              : cell.value === "Error"
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "기록일자") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {unixTimeToDateString(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "분석일자") {
                    data = (
                      // <SimpleGrid columns={{ base: 2, md: 2, xl: 2 }} gap='10px' >
                      //       <Box display="flex" alignItems="center" height="100%">

                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {unixTimeToDateString(cell.value)}
                      </Text>
                      // </Box>
                      // <Button onClick={() => console.log(cell.value)} >선택</Button>
                      // </SimpleGrid>
                    );
                  }

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
              // </Box>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
