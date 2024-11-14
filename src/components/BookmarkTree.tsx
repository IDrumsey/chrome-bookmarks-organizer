import { Box, Typography } from "@mui/material"
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view"
import { textColor } from "../assets/Colors"
import { useMemo } from "react"

type BookmarkTreeProps = {
  nodes: chrome.bookmarks.BookmarkTreeNode[]
}

const BookmarkTree = (props: BookmarkTreeProps) => {
  const rootBookmarks = useMemo<chrome.bookmarks.BookmarkTreeNode[]>(() => {
    if (!props.nodes || props.nodes.length === 0) return []

    const isAllUntitled = (
      nodes: chrome.bookmarks.BookmarkTreeNode[]
    ): boolean => {
      return nodes.every(
        (node) => node.title === "" || node.title === undefined
      )
    }

    let currentLevel = props.nodes
    let nextLevel: chrome.bookmarks.BookmarkTreeNode[] = []
    let level = 0

    while (currentLevel.length > 0) {
      if (!isAllUntitled(currentLevel)) {
        break // Found the first level where not all titles are "Untitled"
      }

      // Move to the next level of children
      nextLevel = currentLevel.flatMap((node) => node.children || [])
      currentLevel = nextLevel
      level++
    }

    return currentLevel
  }, [props.nodes])

  const renderTree = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        itemId={node.id}
        label={
          <Box
            style={{
              textAlign: "left",
            }}
          >
            {/* Left-align the content */}
            <Typography
              variant="body2"
              sx={{ color: textColor.alpha(0.6).toString() }}
            >
              {node.title || ""}
            </Typography>
            {node.url && (
              <Typography
                variant="caption"
                sx={{ color: textColor.alpha(0.2).toString() }}
              >
                {node.url}
              </Typography>
            )}
          </Box>
        }
      >
        {node.children ? renderTree(node.children) : null}
      </TreeItem>
    ))
  }

  return (
    <SimpleTreeView sx={{ width: "100%" }}>
      {renderTree(rootBookmarks)}
    </SimpleTreeView>
  )
}

export default BookmarkTree
