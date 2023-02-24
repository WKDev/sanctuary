// Chakra imports
import {
  Box, Button, Flex, Icon, Text, useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card.js';
import React from 'react';
// Assets
import { MdUpload } from 'react-icons/md';
import Dropzone from 'views/entry/open/components/Dropzone';

export default function Upload(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = 'gray.400';
  return (
    <Card {...rest} align="center" p="20px">
      <Flex h="100%" direction={{ base: 'column', '2xl': 'row' }}>
        <Dropzone
          w={{ base: '100%', '2xl': '400px' }}
          me="60px"
          maxH={{ base: '100%', lg: '100%', '2xl': '100%' }}
          minH={{ base: '150px', lg: '150px', '2xl': '150px' }}
          content={(
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
          )}
        />
      </Flex>
    </Card>
  );
}
