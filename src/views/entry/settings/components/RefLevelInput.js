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

const RefLevelInput = (props) => {
  return (
    <>
      <Spacer />
      {props.addtionalInput ? (
        <>
          <Input
            type="number"
            value={props.value1}
            onChange={(e) => props.func}
            w="10%"
          />
          <Text me="40px">mm</Text>

          <Input
            size="sm"
            type="number"
            value={props.value2}
            onChange={(e) => props.func}
            w="10%"
            mx="10px"
          />
          <Text me="40px">mm</Text>
        </>
      ) : (
        <>
          <Input
            type="number"
            value={props.metric[props.value1]}
            onChange={(e) => props.func(e, props.value1)}
            w="10%"
          />
          <Text me="40px">mm</Text>
        </>
      )}
    </>
  );
};

export default RefLevelInput;
