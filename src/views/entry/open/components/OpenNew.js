import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import {
  useGlobalFilter, usePagination, useSortBy, useTable,
} from 'react-table';

// Custom components

import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Upload from 'views/entry/open/components/Upload';
import { useNavigate } from 'react-router-dom';

export default function CheckTable(props) {
  const nav = useNavigate();
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  return (
    <Card direction="column" w="100%" px="0px" overflowX={{ sm: 'hidden', lg: 'hidden' }}>
      <Flex px="25px" justify="space-between" align="center">
        <Text color={textColor} fontSize="20px" fontWeight="700" lineHeight="100%">
          새로 열어 분석하기
        </Text>
      </Flex>
      <Upload />
    </Card>
  );
}
