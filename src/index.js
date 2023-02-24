import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import AnalysisLayout from "layouts/analysis";
import EntryLayout from "layouts/entry";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

import { Provider } from "contexts";

ReactDOM.render(
  <Provider>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/entry/*" element={<EntryLayout />} />
              <Route path="/analysis/*" element={<AnalysisLayout />} />
              <Route path="/" element={<Navigate to="/entry/open" />} />
              <Route
                path="/analysis"
                element={<Navigate to="/analysis/overview" />}
              />
            </Routes>
          </BrowserRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
