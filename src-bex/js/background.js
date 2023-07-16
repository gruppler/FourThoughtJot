// Create a context menu item for selected text.
chrome.contextMenus.create({
  id: "FourThoughJotText",
  title: "Jot this thought",
  contexts: ["selection"],
});

// Listen for the context menu item click event.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "FourThoughJotText") {
    // Get the selected text.
    const thought = info.selectionText;

    // Send a message to the content script to show the UI with the selected text.
    chrome.action.openPopup(thought, () => {
      console.log("Callback", arguments);
    });
  }
});
