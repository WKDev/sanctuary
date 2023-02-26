// Chakra Imports
import {
  MenuDivider,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
// Custom Components
import { BackButton } from "components/navbar/backButton/backButton";

import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline, MdSave } from "react-icons/md";
import routes from "routes-analysis.js";
import { ThemeEditor } from "./ThemeEditor";

import { Context } from "contexts/index";
import { UPDATE } from "contexts/actionTypes";
import { useContext, useEffect } from "react";
import { UPDATE_VIEW_OPTIONS } from "contexts/actionTypes";

import { ItemContent } from "components/menu/ItemContent";

export default function HeaderLinks(props) {
  const { ipcRenderer } = window.require("electron");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: vo,
    },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    const ret = {
      ...vo,
      range: [0, _csv.length],
      globalRange: [0, _csv.length],
    };
    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: {
        viewOptions: ret,
      },
    });

    return () => {};
  }, []);

  const {
    variant,
    secondary,
    background,
    children,
    placeholder,
    borderRadius,
    ...rest
  } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  const menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const navigate = useNavigate();

  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  const inputText = useColorModeValue("primaryGray.900", "gray.100");
  const searchIconColor = useColorModeValue("gray.700", "white");
  const exportColor = useColorModeValue("brand.500", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");

  const handleAggchange = (v) => {
    // console.log("vo.range", vo.range);
    // console.log("(_csv.length / vo.aggregation)", _csv.length / vo.aggregation);
    // console.log("pos0", vo.range[0] / (_csv.length / vo.aggregation));

    // console.log("pos1", vo.range[1] / (_csv.length / vo.aggregation));

    if (v !== 0) {
      const NewPos = [
        ((vo.range[0] / (_csv.length / vo.aggregation)) * _csv.length) /
          Number(v),
        ((vo.range[1] / (_csv.length / vo.aggregation)) * _csv.length) /
          Number(v),
      ];

      // console.log("NewPos", NewPos);

      const ret = {
        ...vo,
        range: [NewPos[0], NewPos[1]],
        aggregation: Number(v),
      };

      // console.log("ret fromhandleAggChange", ret);
      dispatch({
        type: UPDATE_VIEW_OPTIONS,
        payload: {
          viewOptions: ret,
        },
      });
    }
  };

  const handleSlider = (v) => {
    const result = v.map(Math.floor);

    const ret = {
      ...vo,
      range: result,
      globalRange: result,
    };
    console.log("v.globalRange", vo.globalRange);

    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: {
        viewOptions: ret,
      },
    });
  };

  const handleSliderEnd = (v) => {
    // 차트 범위 업데이트 하기

    const result = v.map(Math.floor);

    const ret = {
      ...vo,
      range: result,
    };

    // transformedX[vo.globalRange[1] - 1]

    dispatch({
      type: UPDATE_VIEW_OPTIONS,
      payload: {
        viewOptions: ret,
      },
    });
  };

  const handleWsCommunicator = () => {
    //sending ws comm..
    // 28일까지 마무리하기
  };
  const transformedX = _csv.map((obj) => {
    const trv =
      (obj.enc / MetaData.enc_ppr) * 3.1415926 * MetaData.wheel_diameter;
    return trv;
  });

  const transformedY = _csv.map((obj) => {
    return obj.level1;
  });

  const aggedX = transformedX.filter(
    (element, index) => index % vo.aggregation === 0
  );
  const aggedY = transformedY.filter(
    (element, index) => index % vo.aggregation === 0
  );

  // const filteredConcat = concat.map((innerArray) =>
  //   innerArray.filter((element, index) => index % viewOptions.aggregation === 0)
  // );

  const slicedX = aggedX.slice(vo.range[0], vo.range[1]);
  const slicedY = aggedY.slice(vo.range[0], vo.range[1]);

  ////////////////////////////////////////

  return (
    <Flex
      w={{ sm: "100%", md: "100%" }}
      alignItems="center"
      flexDirection="row"
      justify="flex-end"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <BackButton
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me="20px"
        mx="20px"
        pa="20px"
        borderRadius="30px"
      />
      <Text
        css={{ transform: "rotate(0.04deg)" }}
        color="gray.400"
        fontSize="25"
        fontWeight="400"
        lineHeight="160%"
        mx="20px"
      >
        |
      </Text>
      {/* <FormControl mx="15px" width="400px">
        <Select placeholder="Aggregation">
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
          <option>Nigeria</option>
        </Select>
      </FormControl> */}
      <Divider orientation="vertical" />
      <Text
        css={{ transform: "rotate(0.04deg)" }}
        color={inputText}
        fontSize="16"
        fontWeight="600"
        lineHeight="160%"
      >
        Aggregation
      </Text>

      <NumberInput
        max={50}
        min={1}
        mx="20px"
        width="220px"
        value={vo.aggregation}
        onChange={(e) => handleAggchange(e)}
      >
        <NumberInputField />

        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text
        css={{ transform: "rotate(0.04deg)" }}
        color="gray.400"
        fontSize="25"
        fontWeight="400"
        lineHeight="160%"
        mx="10px"
      >
        |
      </Text>

      <RangeSlider
        mx="20px"
        aria-label={["min", "max"]}
        defaultValue={[vo.range[0], vo.range[1]]}
        value={[vo.range[0], vo.range[1]]}
        max={_csv.length / vo.aggregation}
        onChange={(v) => {
          handleSlider(v);
        }}
        onChangeEnd={(v) => {
          handleSliderEnd(v);
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>

      <Text
        css={{ transform: "rotate(0.04deg)" }}
        color="gray.400"
        fontSize="25"
        fontWeight="400"
        lineHeight="160%"
        mx="20px"
      >
        |
      </Text>

      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<Icon as={MdSave} color={inputBg} w="24px" h="24px" />}
          w="35%"
          fontSize="md"
          // bg={background || inputBg || exportColor}
          bg={exportColor}
          color={inputBg}
          fontWeight="700"
          _placeholder={{ color: "gray.400", fontSize: "12px" }}
          borderRadius={borderRadius || "30px"}
          css={{ fontFamily: "나눔스퀘어", transform: "rotate(0.04deg)" }}
          onClick={() => {
            // navigation("/");
            // onOpen();
          }}
        >
          내보내기
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          minW={{ base: "unset", md: "400px", xl: "450px" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          <Flex jusitfy="space-between" w="100%" mb="20px">
            <Text
              fontSize="lg"
              fontWeight="900"
              color={textColor}
              css={{ fontFamily: "나눔스퀘어", transform: "rotate(0.04deg)" }}
            >
              XLS 파일로 내보내기
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <Text
              fontSize="md"
              fontWeight="600"
              color={textColorBrand}
              me="auto"
              css={{ fontFamily: "나눔스퀘어", transform: "rotate(0.04deg)" }}
            >
              보고서 출력 전, 다음의 내용을 모두 확인해주세요.
            </Text>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent
                title={"Aggergation"}
                content={`${vo.aggregation}, 기록 간격 : ${
                  MetaData.recording_interval
                } --> ${Number(
                  vo.aggregation * MetaData.recording_interval
                ).toFixed(2)} (m or rev)`}
              />
            </MenuItem>
            <MenuDivider />

            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent
                title={"시작지점"}
                content={`${Number(transformedX[vo.globalRange[0]]).toFixed(
                  3
                )}m`}
              />
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent
                title={"종료 지점"}
                // content={`${transformedX[vo.globalRange[1] - 1].toFixd(3)}m`}
                content={`${Number(transformedX[vo.globalRange[1] - 1]).toFixed(
                  3
                )}m`}
              />
            </MenuItem>

            <MenuDivider />
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <Button
                leftIcon={
                  <Icon as={MdSave} color={inputBg} w="24px" h="24px" />
                }
                mx="auto"
                w="35%"
                fontSize="md"
                // bg={background || inputBg || exportColor}
                bg={exportColor}
                color={inputBg}
                fontWeight="700"
                _placeholder={{ color: "gray.400", fontSize: "12px" }}
                borderRadius={borderRadius || "30px"}
                css={{ fontFamily: "나눔스퀘어", transform: "rotate(0.04deg)" }}
                onClick={() => handleWsCommunicator()}
              >
                내보내기
              </Button>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          onClose();
          navigate(-1);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>종료</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose();
              navigate(-1);
            }}
          />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <div>계속하시겠습니까?</div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                onClose();
                navigate(-4);
              }}
            >
              취소
            </Button>
            <Button
              variant="outline"
              bg="#f5f6f7"
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
              onClick={() => {
                onClose();
                window.close();
              }}
            >
              종료하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Menu>
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: "30px", md: "unset" }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          {/* <Image src={navImage} borderRadius="16px" mb="28px" /> */}

          {/* TODO */}
          {/* 경로 지정 및 웹소켓 송신 */}
          <Flex flexDirection="column">
            <Link w="100%" href="https://horizon-ui.com/pro">
              <Button w="100%" h="44px" mb="10px" variant="brand">
                Export to xlsx
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      {/* <ThemeEditor navbarIcon={navbarIcon} /> */}

      {/* <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color="white"
            name="Adela Parkson"
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, Adela
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>
            <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
              <Text fontSize="sm">Newsletter Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm">Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu> */}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
