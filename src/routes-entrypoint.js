import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdSettings, MdDisabledByDefault } from 'react-icons/md';

// Admin Imports
import EntryDashboard from 'views/entry/default';

import OpenView from 'views/entry/open';
import EntryView from 'views/entry/default';
import SettingsView from 'views/entry/settings';
import Marketplace from 'views/analysis/marketplace';

const { remote } = window.require('electron');

const routesEntrypoint = [
  {
    name: '열기',
    layout: '/entry',
    path: '/open',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    element: <OpenView />,
    // secondary:true,
    // messageNavbar:"im in routes-entrypoint"
  },
  {
    name: '환경설정',
    layout: '/entry',
    path: '/settings',
    icon: <Icon as={MdSettings} width="20px" height="20px" color="inherit" />,
    element: <SettingsView />,
    secondary: true,
  },
  {
    name: '종료',
    layout: '/entry',
    icon: <Icon as={MdDisabledByDefault} width="20px" height="20px" color="inherit" />,
    path: '/teminate',
    element: <></>,
  },
];

export default routesEntrypoint;
