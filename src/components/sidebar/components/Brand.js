import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Image, Box, Text } from "@chakra-ui/react";

import Card from "components/card/Card";

import agt_logo from "assets/img/logo.png";
// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");
  const img_size = "64px";

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex align="center" direction="column">
      {/* <AppleLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      {/* <Box boxSize='sm'> */}
      <Image src={agt_logo} alt="logo" h={img_size} w={img_size} mb="20px" />
      <Text
        color={textColor}
        fontSize="20px"
        fontWeight="700"
        lineHeight="100%"
      >
        {" "}
        AGT 주행로 분석 프로그램
      </Text>
      {/* </Box> */}
      <HSeparator mb="20px" mt="20px" />
    </Flex>

    // <Card
    //   direction='column'
    //   w='100%'
    //   h = '80px'
    //   ma = '0px'
    //   pa = '0px'
    //   px='25px'
    //   overflowX={{ sm: "hidden", lg: "hidden" }}
    //   >

    //   <Flex px='0px' justify='space-between' align='center'>
    //   <Image src={agt_logo} alt='logo' h={img_size} w={img_size} mb="20px" />
    //   <Text
    //       color={textColor}
    //       fontSize='20px'
    //       fontWeight='700'
    //       lineHeight='100%'>
    //   AGT 주행로 분석 프로그램
    //   </Text>
    //   </Flex>

    // </Card>
  );
}

export default SidebarBrand;
