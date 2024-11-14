chrome.action.onClicked.addListener((tab) => {
  if (chrome.sidePanel && chrome.sidePanel.open) {
    // Get the current window to open the side panel within it
    chrome.windows.getCurrent((window) => {
      if (window.id) {
        chrome.sidePanel.open(
          {
            windowId: window.id, // Specify the window ID where you want to open the side panel
          },
          () => {
            console.log("Side panel opened in the specified window.")
          }
        )
      }
    })
  } else {
    console.error(
      "Side panel API is not available or supported in this Chrome version."
    )
  }
})
