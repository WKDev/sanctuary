import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/App.css";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import AnalysisLayout from "layouts/analysis";
import EntryLayout from "layouts/entry";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

import { Provider } from "contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            <Routes>
              {/* <Route path="/" element={<App />} /> */}
              <Route path="/entry/*" element={<EntryLayout />} />
              <Route path="/analysis/*" element={<AnalysisLayout />} />
              <Route path="/" element={<Navigate to="/entry/open" />} />

              <Route
                path="/analysis"
                element={<Navigate to="/analysis/overview" />}
              />
            </Routes>
          </HashRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  </Provider>
);
