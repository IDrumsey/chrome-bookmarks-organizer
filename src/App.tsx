import { Box, Button, Typography } from "@mui/material"
import "./App.css"
import { useState } from "react"

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
    >
      {/* header */}
      <Box>
        <Typography
          variant="h2"
          fontWeight="bold"
        >
          Bookmark Organizer
        </Typography>
      </Box>

      {/* footer */}
      <Box sx={{ marginTop: "auto" }}>
        {/* organize button */}
        <Button
          variant="contained"
          fullWidth
        >
          Organize
        </Button>
      </Box>
    </Box>
  )
}

export default App
