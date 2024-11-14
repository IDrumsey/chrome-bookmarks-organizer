import { Box, Button, CircularProgress, Typography } from "@mui/material"
import "./App.css"
import { useState } from "react"
import BookmarkTree from "./components/BookmarkTree"
import { textColor } from "./assets/Colors"

function App() {
  const [mode, modeSetter] = useState<
    "waiting" | "discovering_bookmarks" | "organizing" | "results"
  >("waiting")

  const [bookmarksToShow, setBookmarksToShow] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([])

  function getAllBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      if (chrome.bookmarks) {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
          resolve(bookmarkTreeNodes)
        })
      } else {
        reject(new Error("Bookmarks API is not available."))
      }
    })
  }

  async function discoverBookmarksStep() {
    const bookmarks = await getAllBookmarks()
    setBookmarksToShow(bookmarks)
  }

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

      <Box sx={{ flex: 1, overflow: "auto", marginBottom: 2 }}>
        {mode == "waiting" ? (
          <Typography
            variant="body2"
            sx={{ color: textColor.alpha(0.3).toString() }}
          >
            Click the organize button to have AI generate a proposed new
            organization for your bookmarks
          </Typography>
        ) : mode == "discovering_bookmarks" ? (
          <>
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
            <BookmarkTree nodes={bookmarksToShow} />
          </>
        ) : (
          mode == "results" && (
            <>
              <Typography
                variant="h6"
                sx={{ textDecoration: "underline" }}
              >
                Proposed organization
              </Typography>
              <BookmarkTree nodes={bookmarksToShow} />
            </>
          )
        )}
      </Box>

      {/* footer */}
      <Box sx={{ marginTop: "auto" }}>
        {/* organize button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            modeSetter("discovering_bookmarks")
            discoverBookmarksStep()
          }}
        >
          Organize
        </Button>
      </Box>
    </Box>
  )
}

export default App
