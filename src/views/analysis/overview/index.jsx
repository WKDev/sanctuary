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
  MenuDivider,
} from "@chakra-ui/react";
import Card from "components/card/Card";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useContext } from "react";
import {
  MdAddTask,
  MdAccessTime,
  MdBarChart,
  MdFileCopy,
  MdOutlineTimer,
  MdFilePresent,
  MdDevices,
} from "react-icons/md";
import { Divider } from "@chakra-ui/react";

import { useLocation } from "react-router-dom";
import { Context } from "contexts/index";
import { UPDATE } from "contexts/actionTypes";

import { CiRuler } from "react-icons/ci";
import { GiCartwheel } from "react-icons/gi";
import Summary from "./components/Summary";
import { CHART_TYPE, UPDATE_VIEW_OPTIONS } from "contexts/actionTypes";
export default function Overview(props) {
  const { ipcRenderer } = window.require("electron");

  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const location = useLocation();

  const unixToYyMmDd = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // convert Unix timestamp to milliseconds
    const year = date.getFullYear().toString().slice(2, 4).padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // context API
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: vo,
    },
    dispatch,
  } = useContext(Context);

  // useEffect(() => {
  //   // const { ipcRenderer } = window.require("electron");

  //   console.log("MetaData", MetaData);
  //   console.log("_csv", _csv);
  //   console.log("overview rendered");
  //   return () => {};
  // }, [location]);

  useEffect(() => {
    ipcRenderer.send("rtoe_fetch_settings"); // 설정 요청
    ipcRenderer.on("etor_fetch_settings", handleFetchSettings); // 설정 받았을 때 할 일

    return () => {};
  }, []);

  // 설정 받아와서 저장
  const handleFetchSettings = (event, data) => {
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: { viewOptions: { ...data, range: [0, _csv.length] } },
    });

    // console.log("overview_handlefetchsettings", vo);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          장비 기본정보
        </Text>
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 2, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 2, md: 2, xl: 2 }} gap="20px" mb="0px">
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdDevices} color={brandColor} />
                }
              />
            }
            name="장비 유형"
            value={MetaData.device_type}
          />
          <MiniStatistics
            startContent={
              <div>
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAccessTime}
                      color={brandColor}
                    />
                  }
                />
              </div>
            }
            name="측정시간"
            value={unixToYyMmDd(MetaData.time)}
          />
        </SimpleGrid>
        {/* <MiniStatistics growth='+23%' name='Sales' value='$574.34' /> */}

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="Testername / Line"
          value={`${MetaData.testername} / ${MetaData.line}`}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 2, md: 2, xl: 4 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdOutlineTimer}
                  color={brandColor}
                />
              }
            />
          }
          name="기록 주기 "
          value={
            MetaData.recording_type === "meter"
              ? `${"sample /" + MetaData.recording_interval + "m"}`
              : `${"sample /" + MetaData.recording_interval + "rev"}`
          }
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFilePresent} color={brandColor} />
              }
            />
          }
          name="기록 수량"
          value={_csv.length}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={CiRuler} color={brandColor} />}
            />
          }
          name="LevelMeter"
          value={MetaData.level_sensor}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={GiCartwheel} color={brandColor} />
              }
            />
          }
          name="Encoder"
          value={MetaData.encoder_sensor}
        />
      </SimpleGrid>
      <Divider />
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          분석 내용 요약
        </Text>
      </Flex>
      <Box h="100px" mt="auto">
        <SimpleGrid
          columns={{
            base: 4,
            md: 4,
            lg: 4,
            "2xl": 4,
          }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics ok="true" value="Passed" name="주행노면 좌우차" />
          <MiniStatistics ok="false" value="Passed" name="평면성" />
          <MiniStatistics ok="false" value="Passed" name="상하 불규칙" />
          <MiniStatistics ok="false" value="Passed" name="평탄성" />
          <MiniStatistics ok="false" value="Passed" name="안내레일 내측거리" />
          <MiniStatistics ok="false" value="Passed" name="직진도" />
          <MiniStatistics ok="false" value="Passed" name="연결부 단차(L)" />
          <MiniStatistics ok="false" value="Passed" name="연결부 단차(L)" />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
