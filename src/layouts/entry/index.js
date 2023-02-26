// Chakra imports
import {
  Portal,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarEntry.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import routesEntrypoint from "routes-entrypoint.js";
import OpenView from "views/entry/open";

const { ipcRenderer } = window.require("electron");
// Custom Chakra theme
export default function EntryLayout(props) {
  // const [navTitle, setNavTitle] = useState("");

  // useEffect(() => {
  //   console.log('컴포넌트가 화면에 나타남');
  //   setNavTitle(getActiveNavbar(routesEntrypoint))
  //   return () => {
  //     console.log('컴포넌트가 화면에서 사라짐');
  //   };
  // },[navTitle]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 왼쪽 사이드바 누른 결과가 종료라면, 모달 열기
    if (getActiveRoute(routesEntrypoint) === "종료") {
      onOpen();
      console.log("window.location.href", window.location.href);
      return () => {};
    }
  }, [location]);

  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => window.location.pathname !== "/entry/full-screen-maps";
  const getActiveRoute = (routes) => {
    const activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        const categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        // console.log( window.location.href.indexOf(routes[i].layout + routes[i].path))
        // console.log(routes[i].layout + routes[i].path)

        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  // ROUTES 파일로부터 자동으로 ROUTES 생성.
  // REACT-ROUter-dom-v6에 맞게 중첩라우팅 적용, 230221 chanhyeokson
  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.layout === "/entry") {
        // console.log(prop.element)
        return <Route path={`${prop.path}`} element={prop.element} key={key} />;
      }
      if (prop.path === "/terminate") {
        return console.log("first", "end");
      }

      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      }
      return null;
    });
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routesEntrypoint} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                // onOpen={onOpen}
                logoText="AGT"
                brandText={getActiveRoute(routesEntrypoint)}
                secondary={getActiveNavbar(routesEntrypoint)}
                message={getActiveNavbarText(routesEntrypoint)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Routes path="/entry">{getRoutes(routesEntrypoint)}</Routes>
            </Box>
          ) : null}
          <Modal
            isOpen={isOpen}
            isCentered
            onClose={() => {
              onClose();
              navigate("/");
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>종료</ModalHeader>
              <ModalCloseButton
                onClick={() => {
                  onClose();
                  navigate("/");
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
                    navigate("/");
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

          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
