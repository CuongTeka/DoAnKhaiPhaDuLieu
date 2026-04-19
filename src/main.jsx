import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext.jsx";
// import "@mantine/tiptap/styles.css";
import "./index.css";
import App from "./App.jsx";
// import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        {/* <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontSizes: {
              md: "16px",
            },
          }}
        > */}
        <App />
        {/* </MantineProvider> */}
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
