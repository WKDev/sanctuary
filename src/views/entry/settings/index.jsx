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
import { useState, useEffect, useContext, useRef } from "react";
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
import SettingElement from "./components/SettingElement";
import { CHART_TYPE, UPDATE_VIEW_OPTIONS } from "contexts/actionTypes";
import RefLevelInput from "./components/RefLevelInput";

export default function SettingsView(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const location = useLocation();
  const { ipcRenderer } = window.require("electron");
  const isMountedRef = useRef(false);

  // context API
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: vo,
    },
    dispatch,
  } = useContext(Context);

  const text_secondColor = useColorModeValue("secondaryGray.700", "white");
  const hoverColor = useColorModeValue("gray.200", "gray.700");

  const [settingData, setsettingData] = useState({});

  const handleRadio = () => {
    const ret = {
      ...vo,
      enableApexChart: !vo.enableApexChart,
    };
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: {
        viewOptions: ret,
      },
    });
    ipcRenderer.send("rtoe_update_settings", ret); // 설정 요청
  };

  const handleAggLevel = (v) => {
    const ret = {
      ...vo,
      aggregation: Number(v),
    };
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: {
        viewOptions: ret,
      },
    });

    ipcRenderer.send("rtoe_update_settings", ret); // 설정 요청
  };

  const handleRefLevel = (type, v, idx) => {
    let ret = {};
    if (type === "Smooth" || type === "HL" || type === "Straightness") {
      console.log("special", ret);
      ret = {
        ...vo,
        range: vo.range,
      };
      const cmd = `referenceLevel.${type}[${idx}] = ${v}`;
      eval(cmd);
    } else {
      ret = {
        ...vo,
        referenceLevel: { ...vo.referenceLevel, [type]: Number(v) },
      };
    }
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: {
        viewOptions: ret,
      },
    });
    console.log("type", type);
    console.log("v", v);
    ipcRenderer.send("rtoe_update_settings", ret); // 설정 요청
  };

  useEffect(() => {
    ipcRenderer.send("rtoe_fetch_settings"); // 설정 요청
    ipcRenderer.on("etor_fetch_settings", handleFetchSettings); // 설정 받았을 때 할 일

    return () => {};
  }, []);

  // 설정 받아와서 저장
  const handleFetchSettings = (event, data) => {
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: { viewOptions: data },
    });
  };

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
            <RadioGroup
              me="40px"
              value={vo.enableApexChart}
              onChange={() => handleRadio()}
            >
              <Stack direction="row">
                <Radio value={false} size="lg">
                  uPlot
                </Radio>
                <Spacer />
                <Radio value={true} size="lg">
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
            <NumberInput
              max={50}
              min={1}
              me="40px"
              width="100px"
              onChange={(v) => handleAggLevel(v)}
              defaultValue={vo.aggregation}
              value={vo.aggregation}
            >
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
        <SettingElement
          title="주행노면 좌우차"
          description="기본값 : < ±4mm"
          controls={
            <>
              <Spacer />
              <Spacer />
              <Text>±</Text>
              <Input
                size="sm"
                w="5%"
                type="number"
                value={vo.referenceLevel.LRDiff}
                onChange={(e) => handleRefLevel("LRDiff", e.target.value)}
              />
              <Text me="40px">mm</Text>
            </>
          }
        />
        <Divider size="50%" />
        <SettingElement
          title="주행노면 평면성"
          description="기본값 : < 3mm / 3m"
          controls={
            <>
              <Spacer />
              <Text>±</Text>
              <Input
                type="number"
                size="sm"
                value={vo.referenceLevel.Smooth[0]}
                onChange={(e) => handleRefLevel("Smooth", e.target.value, 0)}
                w="5%"
              />
              <Text>mm / </Text>

              <Input
                size="sm"
                type="number"
                value={vo.referenceLevel.Smooth[1]}
                onChange={(e) => handleRefLevel("Smooth", e.target.value, 1)}
                w="5%"
              />
              <Text me="40px">m</Text>
            </>
          }
        />
        <Divider size="50%" />
        <SettingElement
          title="주행노면 고저"
          description="기본값 : < 3mm / 3m"
          controls={
            <>
              <Spacer />
              <Text>±</Text>
              <Input
                type="number"
                size="sm"
                value={vo.referenceLevel.HL[0]}
                onChange={(e) => handleRefLevel("HL", e.target.value, 0)}
                w="5%"
              />
              <Text>mm / </Text>

              <Input
                type="number"
                size="sm"
                value={vo.referenceLevel.HL[1]}
                onChange={(e) => handleRefLevel("HL", e.target.value, 1)}
                w="5%"
              />
              <Text me="40px">m</Text>
            </>
          }
        />
        <Divider size="50%" />

        <SettingElement
          title="평탄성"
          description="기본값 : < ∑= 1.2mm"
          controls={
            <>
              <Spacer />
              <Spacer />
              <Text>{"< ∑="}</Text>
              <Input
                size="sm"
                w="5%"
                type="number"
                value={vo.referenceLevel.Flatness}
                onChange={(e) => handleRefLevel("Flatness", e.target.value)}
              />
              <Text me="40px">mm</Text>
            </>
          }
        />
        <Divider size="50%" />

        <SettingElement
          title="안내레일 내측거리"
          description="기본값 : < 10mm"
          controls={
            <>
              <Spacer />
              <Spacer />
              <Text>{"< "}</Text>
              <Input
                size="sm"
                w="5%"
                type="number"
                value={vo.referenceLevel.InnerDist}
                onChange={(e) => handleRefLevel("InnerDist", e.target.value)}
              />
              <Text me="40px">mm</Text>
            </>
          }
        />
        <Divider size="50%" />

        <SettingElement
          title="직진도"
          description="기본값 : < 3mm / 3m"
          controls={
            <>
              <Spacer />
              <Text>±</Text>
              <Input
                type="number"
                size="sm"
                value={vo.referenceLevel.Straightness[0]}
                onChange={(e) =>
                  handleRefLevel("Straightness", e.target.value, 0)
                }
                w="5%"
              />
              <Text>mm / </Text>

              <Input
                size="sm"
                type="number"
                value={vo.referenceLevel.Straightness[1]}
                onChange={(e) =>
                  handleRefLevel("Straightness", e.target.value, 1)
                }
                w="5%"
              />
              <Text me="40px">m</Text>
            </>
          }
        />
        <Divider size="50%" />
        <SettingElement
          title="연결부 단차"
          description="기본값 : < 0.5mm"
          controls={
            <>
              <Spacer />
              <Spacer />
              <Text>{"< "}</Text>
              <Input
                size="sm"
                w="5%"
                type="number"
                value={vo.referenceLevel.gap}
                onChange={(e) => handleRefLevel("gap", e.target.value)}
              />
              <Text me="40px">mm</Text>
            </>
          }
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
