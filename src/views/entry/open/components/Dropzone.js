// Chakra imports
import { Button, Flex, Input, useColorModeValue } from '@chakra-ui/react';
// Assets
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context } from 'contexts/index';
import { UPDATE, ADD_FRUIT } from 'contexts/actionTypes';

function Dropzone(props) {
  // context API
  const {
    state: {
      record: { MetaData, _csv },
      // productList: { fruits },
    },
    dispatch,
  } = useContext(Context);

  const { content, ...rest } = props;
  const { getRootProps, getInputProps } = useDropzone();
  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');

  const isMountedRef = useRef(false);

  const isMountedRefCsv = useRef(false);

  const hoverColor = useColorModeValue('gray.200', 'gray.700');

  const { ipcRenderer } = window.require('electron');

  const navigate = useNavigate();

  useEffect(() => {
    if (!isMountedRefCsv.current) {
      // 컴포넌트 초기 마운트 시
      isMountedRefCsv.current = true;
    } else {
      // setTimeout(()=>{navigate('/analysis')}, 1000)
    }
    return () => {};
  }, [MetaData, _csv]);

  const handleimportFileFromOutside = () => {
    console.log('sending filedialog signal to electron...');
    ipcRenderer.send('rtoe_new_file');
  };
  return (
    <div>
      <Flex
        align="center"
        justify="center"
        bg={bg}
        border="1px dashed"
        borderColor={borderColor}
        borderRadius="16px"
        w="100%"
        h="max-content"
        minH="100%"
        cursor="pointer"
        transition="all .2s ease-in-out"
        gap="20px"
        _hover={{ background: hoverColor }}
        onClick={handleimportFileFromOutside}
        // {...getRootProps({ className: "dropzone" })}
        {...rest}
      >
        {/* <Input variant='main'  /> */}
        <Button variant="no-effects">{content}</Button>
      </Flex>

      <Button
        onClick={() => {
          navigate('/analysis');
        }}
      >
        move
      </Button>
    </div>
  );
}

export default Dropzone;
