import { Box, Button, CircularProgress, Typography } from "@mui/material"
import "./App.css"
import { useState } from "react"
import Color from "color"

const textColor = new Color("#fff")

function App() {
  const [mode, modeSetter] = useState<"ready" | "results" | "running">("ready")

  return (
    <Box
      height="100%"
      boxSizing="border-box"
      padding={2}
      paddingTop={4}
      display="flex"
      flexDirection="column"
      color={textColor.toString()}
    >
      {/* header */}
      <Box paddingBottom={4}>
        <Typography
          variant="h2"
          fontWeight="bold"
        >
          Bookmark Organizer
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        {mode == "ready" ? (
          <Typography
            variant="caption"
            sx={{ color: textColor.alpha(0.3).toString() }}
          >
            Click the organize button to have AI generate a proposed new
            organization for your bookmarks
          </Typography>
        ) : mode == "running" ? (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          mode == "results" && (
            <Typography
              variant="h6"
              sx={{ textDecoration: "underline" }}
            >
              Proposed organization
            </Typography>
          )
        )}
      </Box>

      {/* footer */}
      <Box sx={{ marginTop: "auto" }}>
        {/* organize button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => modeSetter("running")}
        >
          Organize
        </Button>
      </Box>
    </Box>
  )
}

export default App
