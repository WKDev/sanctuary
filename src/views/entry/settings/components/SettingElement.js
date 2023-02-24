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

const SettingElement = (props) => {
  const hoverColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const text_secondColor = useColorModeValue("secondaryGray.700", "white");

  return (
    <Flex
      _hover={props.hover ? { background: hoverColor } : null}
      minWidth="max-content"
      justify="space-between"
      alignItems="center"
      gap="2"
      py="15px"
      transition="all .2s ease-in-out"
    >
      <Flex
        p="2"
        px="25px"
        justify="space-between"
        align="left"
        direction="column"
      >
        <Text
          css={{ transform: "rotate(0.04deg)" }}
          color={textColor}
          fontSize="20"
          fontWeight="600"
          lineHeight="100%"
          mb="10px"
        >
          {props.title}
        </Text>
        <Text
          css={{ transform: "rotate(0.04deg)" }}
          color={text_secondColor}
          fontSize="16"
          fontWeight="600"
          lineHeight="160%"
        >
          {props.description}
        </Text>
      </Flex>
      {/* <RadioGroup onChange={setValue} value={value}> */}
      {props.controls}
    </Flex>
  );
};

export default SettingElement;
