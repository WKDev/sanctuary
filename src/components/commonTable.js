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
        <Table variant="simple" size="sm">
          <Tbody>
            <Tr>
              <Th>Sensor</Th>

              <Td>
                {type === "level"
                  ? MetaData.level_sensor
                  : type === "enc"
                  ? MetaData.encoder_sensor
                  : ""}
              </Td>

              <Th>Line</Th>
              <Td>{MetaData.line}</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Th>Reference Level</Th>
              <Td>{refLevel}</Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Th>Date, Time</Th>
              <Td>{formatTimestamp(MetaData.time)}</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Th>Tester Name</Th>
              <Td>{MetaData.testername}</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr>
              <Th>Avg. Velocity</Th>
              <Td>{MetaData.avg_velocity}</Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CommonAnalysisTable;
