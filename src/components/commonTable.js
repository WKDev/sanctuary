import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Context } from "contexts/index";
import { UPDATE } from "contexts/actionTypes";
import { useToast } from "@chakra-ui/react";

import Card from "./card/Card";

const CommonAnalysisTable = ({ refLevel, type }) => {
  const {
    state: {
      record: { MetaData, _csv },
    },
    dispatch,
  } = useContext(Context);

  const formatTimestamp = (ts) => {
    const date = new Date(ts * 1000);
    const year = date.getFullYear().toString().slice(2);
    const month = `0${String(date.getMonth() + 1)}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    // return ts;
  };

  return (
    <Card mb="20px" pa="5px" mt="20px">
      <TableContainer>
        <Table
          variant="simple"
          size="sm"
          borderColor="red.200"
          colorScheme="blackAlpha"
        >
          <Tbody>
            <Tr>
              <Th fontSize="l">Sensor</Th>

              <Td fontSize="l">
                {type === "level"
                  ? MetaData.level_sensor
                  : type === "enc"
                  ? MetaData.encoder_sensor
                  : ""}
              </Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>

              <Th fontSize="l">Line</Th>
              <Td fontSize="l">{MetaData.line}</Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>
            </Tr>
            <Tr>
              <Th fontSize="l">Reference Level</Th>
              <Td fontSize="l">{refLevel}</Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>
            </Tr>
            <Tr>
              <Th fontSize="l">Date, Time</Th>
              <Td fontSize="l">{formatTimestamp(MetaData.time)}</Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>
            </Tr>
            <Tr>
              <Th fontSize="l">Tester Name</Th>
              <Td fontSize="l">{MetaData.testername}</Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>
            </Tr>
            <Tr>
              <Th fontSize="l">Avg. Velocity</Th>
              <Td fontSize="l">{MetaData.avg_velocity}</Td>
              <Td fontSize="l"></Td>
              <Td fontSize="l"></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CommonAnalysisTable;
