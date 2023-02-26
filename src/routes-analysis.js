import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdSettings,
  MdDisabledByDefault,
} from "react-icons/md";

// Admin Imports
import EntryDashboard from "views/entry/default";
import OpenView from "views/entry/open";
import EntryView from "views/entry/default";
import Overview from "views/analysis/overview";
import LRDiff from "views/analysis/lrdiff";

const routesAnalysis = [
  {
    name: "Overview",
    layout: "/analysis",
    path: "/overview",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    element: <Overview />,
    // secondary:true,
    // messageNavbar:"기록 내용 요약"
  },
  {
    name: "주행노면 좌우차",
    layout: "/analysis",
    path: "/lr_diff",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    element: <LRDiff />,
    secondary: true,
  },
  {
    name: "평면성",
    layout: "/analysis",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/smoothness",
    element: <LRDiff />,
  },
  {
    name: "상하 불규칙",
    layout: "/analysis",
    path: "/hl_irregularity",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    element: <Overview />,
  },
  {
    name: "평탄성",
    layout: "/analysis",
    path: "/flatness",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    element: <Overview />,
  },
  {
    name: "안내레일 내측거리",
    layout: "/analysis",
    path: "/guiderail_inner_dist",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    element: <Overview />,
  },
  {
    name: "직진도",
    layout: "/analysis",
    path: "/straightness",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    element: <Overview />,
  },

  {
    name: "연결부 단차",
    layout: "/analysis",
    path: "/gap",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    element: <Overview />,
  },
];

export default routesAnalysis;
