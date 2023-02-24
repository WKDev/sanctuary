// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAnalysis";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routesAnalysis from "routes-analysis.js";
// import OpenView from 'views/entry/open'
// Custom Chakra theme
import { Context } from "contexts/index";
import { UPDATE } from "contexts/actionTypes";
import { useToast } from "@chakra-ui/react";

export default function AnalysisLayout(props) {
  // context API
  const {
    state: {
      record: { MetaData, _csv },
    },
    dispatch,
  } = useContext(Context);

  // toast
  const location = useLocation();

  useEffect(() => () => {}, [location]);
  // useEffect(() => {
  //   console.log('Analysis');

  //   console.log('MetaData', MetaData);
  //   console.log('_csv', _csv);

  //   toast({
  //     title: 'Account created.',
  //     description: "We've created your account for you.",
  //     status: 'success',
  //     duration: 9000,
  //     isClosable: true,
  //   });

  //   return () => {};
  // }, []);

  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () =>
    window.location.pathname !== "/analysis/full-screen-maps";
  const getActiveRoute = (routes) => {
    const activeRoute = "Default analysis Text";
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
      if (prop.layout === "/analysis") {
        return <Route path={`${prop.path}`} element={prop.element} key={key} />;
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      }
      return null;
    });
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  return (
    <Box css={{ transform: "rotate(0.04deg)" }}>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routesAnalysis} display="none" {...rest} />
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
                brandText={getActiveRoute(routesAnalysis)}
                secondary={getActiveNavbar(routesAnalysis)}
                message={getActiveNavbarText(routesAnalysis)}
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
              pt="100px"
            >
              <Routes path="/analysis">{getRoutes(routesAnalysis)}</Routes>
            </Box>
          ) : null}
          {/* <Box>
            <Footer />
          </Box> */}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
