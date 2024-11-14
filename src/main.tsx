import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "1.476rem",
    },
    h2: {
      fontSize: "1.383rem",
    },
    h3: {
      fontSize: "1.296rem",
    },
    h4: {
      fontSize: "1.215rem",
    },
    h5: {
      fontSize: "1.138rem",
    },
    h6: {
      fontSize: "1.067rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.937rem",
    },
    caption: {
      fontSize: "0.878rem",
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
