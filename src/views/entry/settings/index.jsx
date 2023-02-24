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
  Switch,
  Radio,
  RadioGroup,
  Stack,
  Spacer,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
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
import { ADD_FRUIT } from "contexts/actionTypes";

import { CiRuler } from "react-icons/ci";
import { GiCartwheel } from "react-icons/gi";
import Summary from "./components/Summary";
import SettingElement from "./components/SettingElement";

export default function SettingsView(props) {
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
    },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    // const { ipcRenderer } = window.require("electron");

    console.log("MetaData", MetaData);
    console.log("_csv", _csv);
    console.log("overview rendered");
    return () => {};
  }, [location]);

  const text_secondColor = useColorModeValue("secondaryGray.700", "white");
  const hoverColor = useColorModeValue("gray.200", "gray.700");

  // onClick={() => props.onClickRow(row)}
  // transition="all .2s ease-in-out"
  // gap="20px"
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex align="center" w="100%" px="15px" my="10px">
        <Text
          css={{ transform: "rotate(0.04deg)" }}
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          기본 설정
        </Text>
      </Flex>
      <Card
        direction="column"
        px="0px"
        py="0"
        mb="20px"
        overflowX={{ sm: "hidden", lg: "hidden" }}
      >
        <SettingElement
          hover
          title="차트 그리기 방법"
          description="ApexChart를 사용하는 경우, 성능 저하가 있을 수 있습니다."
          controls={
            <RadioGroup me="40px">
              <Stack direction="row">
                <Radio value="1" size="lg">
                  uPlot
                </Radio>
                <Spacer />
                <Radio value="2" size="lg">
                  ApexChart
                </Radio>
              </Stack>
            </RadioGroup>
          }
        ></SettingElement>
        {/* <RadioGroup onChange={setValue} value={value}> */}
        <Divider size="50%" />
        <SettingElement
          hover
          title="기본 Aggregation Level"
          description="데이터를 건너뛸 주기를 결정합니다. 0.05m 간격으로 측정된 데이터
          기준으로, 분석 및 출력 시 0.05m * ( Aggregation Level ) 간격의 데이터를
          출력합니다."
          controls={
            <NumberInput max={50} min={1} me="40px" width="100px">
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          }
        ></SettingElement>
      </Card>

      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          css={{ transform: "rotate(0.04deg)" }}
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Reference Level 설정
        </Text>
      </Flex>
      <Card
        direction="column"
        w="100%"
        px="0px"
        py="0"
        mb="20px"
        overflowX={{ sm: "hidden", lg: "hidden" }}
      >
        {/* <Flex px="25px" justify="space-between" align="center">
        <Text css={{ transform: "rotate(0.04deg)" }} color={textColor} fontSize="20px" fontWeight="700" lineHeight="100%">
          새로 열어 분석하기
        </Text>
      </Flex> */}
        {/* <SimpleGrid columns={{ base: 2, md: 2, xl: 2 }} gap="20px" mb="20px"> */}
        <SettingElement
          title="주행노면 좌우차"
          description="기본값 : < ±4mm, 단위 : ±( Reference Level )mm"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
        <Divider size="50%" />
        <SettingElement
          title="주행노면 평면성"
          description="기본값 : < 3mm / 3m, 단위 : ±( Reference Level )mm / ( Reference Level )m"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
        <Divider size="50%" />
        <SettingElement
          title="주행노면 고저"
          description="기본값 : < 3mm / 3m, 단위 : ±( Reference Level )mm / ( Reference Level )m"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
        <Divider size="50%" />

        <SettingElement
          title="평탄성"
          description="기본값 : < ∑= 1.2mm, 단위 : < ∑= ( Reference Level )mm"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
        <Divider size="50%" />

        <SettingElement
          title="안내레일 내측거리"
          description="기본값 : < 10mm, 단위 : < ( Reference Level )mm"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
        <Divider size="50%" />

        <SettingElement
          title="직진도"
          description="기본값 : < 3mm / 3m, 단위 : ±( Reference Level )mm / ( Reference Level )m"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
        <Divider size="50%" />
        <SettingElement
          title="연결부 단차"
          description="기본값 : < 0.5mm, 단위 : < ( Reference Level )mm"
          controls={<Input placeholder={props.placeholder} w="10%" mx="40px" />}
        />
      </Card>

      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          css={{ transform: "rotate(0.04deg)" }}
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          기타 설정
        </Text>
      </Flex>
      <Card
        direction="column"
        w="100%"
        px="0px"
        py="0px"
        mb="20px"
        overflowX={{ sm: "hidden", lg: "hidden" }}
      >
        <SettingElement
          hover
          title="설정 초기화"
          description="모든 Aggregation Level, Reference Level을 초기값으로 되돌립니다."
          controls={<Button me="40px">초기화하기</Button>}
        ></SettingElement>

        <Divider size="50%" />
        <SettingElement hover title="프로그램 정보"></SettingElement>
      </Card>
    </Box>
  );
}
