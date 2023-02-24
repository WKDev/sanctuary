import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { MdArrowBack } from "react-icons/md";

export function BackButton(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("primaryGray.900", "gray.100");

  const navigation = useNavigate();
  return (
    <Button
      leftIcon={<MdArrowBack />}
      me="25px"
      ms="0px"
      w="30%"
      {...rest}
      fontSize="md"
      bg={background || inputBg}
      color={"brand"}
      fontWeight="700"
      _placeholder={{ color: "gray.400", fontSize: "14px" }}
      borderRadius={borderRadius || "30px"}
      css={{ transform: "rotate(0.04deg)" }}
      onClick={() => {
        navigation("/");
      }}
    >
      Go Back
    </Button>
  );
}
