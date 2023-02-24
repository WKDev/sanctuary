// Chakra Imports
import {
  Avatar,
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
import { UPDATE, ADD_FRUIT } from "contexts/actionTypes";
import { useContext } from "react";

export default function HeaderLinks(props) {
  const {
    state: {
      record: { MetaData, _csv },
      viewOptions: { aggregation, range, referenceLevel },
    },
    dispatch,
  } = useContext(Context);

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

  const navigation = useNavigate();

  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  const inputText = useColorModeValue("primaryGray.900", "gray.100");
  const searchIconColor = useColorModeValue("gray.700", "white");
  const exportColor = useColorModeValue("brand.500", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");

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

      <NumberInput max={50} min={1} mx="20px" width="200px">
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

      <RangeSlider mx="20px" aria-label={["min", "max"]} defaultValue={[0, 30]}>
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
      {/* <Menu>
				<MenuButton p="0px">
					<Icon mt="6px" as={MdNotificationsNone} color={navbarIcon} w="18px" h="18px" me="10px" />
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p="20px"
					borderRadius="20px"
					bg={menuBg}
					border="none"
					mt="22px"
					me={{ base: '30px', md: 'unset' }}
					minW={{ base: 'unset', md: '400px', xl: '450px' }}
					maxW={{ base: '360px', md: 'unset' }}>
					<Flex jusitfy="space-between" w="100%" mb="20px">
						<Text fontSize="md" fontWeight="600" color={textColor}>
							Notifications
						</Text>
						<Text fontSize="sm" fontWeight="500" color={textColorBrand} ms="auto" cursor="pointer">
							Mark all read
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px="0" borderRadius="8px" mb="10px">
							<ItemContent info="Horizon UI Dashboard PRO" aName="Alicia" />
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px="0" borderRadius="8px" mb="10px">
							<ItemContent info="Horizon Design System Free" aName="Josh Henry" />
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu> */}

      <Button
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
          navigation("/");
        }}
      >
        내보내기
      </Button>

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
