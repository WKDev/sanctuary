import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card.js";
import { MdUpload } from "react-icons/md";

export default function CheckTable(props) {
  const { ipcRenderer } = window.require("electron");

  // 외부에서 새 파일 열어보기
  const handleimportFileFromOutside = () => {
    console.log("sending filedialog signal to electron...");
    ipcRenderer.send("rtoe_new_file");
  };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const hoverColor = useColorModeValue("gray.200", "gray.700");
  const brandColor = useColorModeValue("brand.500", "white");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "hidden", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="20px"
          fontWeight="700"
          lineHeight="100%"
        >
          새로 열어 분석하기
        </Text>
      </Flex>
      <Card align="center" p="20px">
        <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
          <Flex
            align="center"
            justify="center"
            bg={bg}
            border="1px dashed"
            borderColor={borderColor}
            borderRadius="16px"
            w="100%"
            h="max-content"
            minH={{ base: "150px", lg: "150px", "2xl": "150px" }}
            cursor="pointer"
            transition="all .2s ease-in-out"
            gap="20px"
            _hover={{ background: hoverColor }}
            onClick={handleimportFileFromOutside}
            // w={{ base: "100%", "2xl": "400px" }}
            me="60px"
            maxH={{ base: "100%", lg: "100%", "2xl": "100%" }}
          >
            <Button variant="no-effects">
              <Box>
                <Icon as={MdUpload} w="48px" h="48px" color={brandColor} />
                <Flex justify="center" mx="auto" mb="12px">
                  <Text fontSize="xl" fontWeight="700" color={brandColor}>
                    여기를 눌러 파일 가져오기
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                  AGT측정장비에서 취득된 .csv파일을 선택해주세요.
                </Text>
              </Box>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
}
