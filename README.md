# YouTube Channel Search Extension

This extension adds a search bar to YouTube channel pages, allowing you to search for videos within that channel.

## Features

- Injects a search bar into YouTube channel pages.
- Searches for videos within the channel based on the input query.
- Fetches and uses a dynamic list of shortforms from an external source.

## Installation

1. Clone the repository or download the zip file.
2. Navigate to `chrome://extensions/` in your Chrome browser.
3. Enable "Developer mode" using the toggle in the top-right corner.
4. Click "Load unpacked" and select the `youtube-channel-search-extension` folder.

## Usage

1. Navigate to a YouTube channel page.
2. Use the search bar injected into the page to search for videos within the channel.
3. View and click on the search results.

## Development

### Prerequisites

- A Google Developer account and a YouTube API key.

### Folder Structure

- `manifest.json`: Manifest file describing the extension.
- `content.js`: Script to inject the search bar and handle searches.
- `popup.html`: HTML file for the extension popup UI (if needed).
- `popup.js`: JavaScript file for the popup's functionality (if needed).
- `styles.css`: CSS file for styling the injected elements.
- `images/`: Folder to store images like icons.
  - `icon.png`: Icon for the extension.
- `README.md`: Documentation for the project.

## License

This project is licensed under the MIT License.
