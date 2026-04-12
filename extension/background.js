// OpenToolsKit Chrome Extension - Background Service Worker

const OPENTOOLSKIT_URL = 'https://www.opentoolskit.com/en';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'opentoolskit-open',
    title: 'Open with OpenToolsKit',
    contexts: ['link', 'page'],
  });

  chrome.contextMenus.create({
    id: 'opentoolskit-merge',
    parentId: 'opentoolskit-open',
    title: 'Merge PDFs',
    contexts: ['link', 'page'],
  });

  chrome.contextMenus.create({
    id: 'opentoolskit-compress',
    parentId: 'opentoolskit-open',
    title: 'Compress PDF',
    contexts: ['link', 'page'],
  });

  chrome.contextMenus.create({
    id: 'opentoolskit-convert',
    parentId: 'opentoolskit-open',
    title: 'Convert to PDF',
    contexts: ['link', 'page'],
  });

  chrome.contextMenus.create({
    id: 'opentoolskit-all-tools',
    parentId: 'opentoolskit-open',
    title: 'All tools',
    contexts: ['link', 'page'],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  let url = OPENTOOLSKIT_URL;

  switch (info.menuItemId) {
    case 'opentoolskit-merge':
      url = `${OPENTOOLSKIT_URL}/tools/merge-pdf`;
      break;
    case 'opentoolskit-compress':
      url = `${OPENTOOLSKIT_URL}/tools/compress-pdf`;
      break;
    case 'opentoolskit-convert':
      url = `${OPENTOOLSKIT_URL}/tools/jpg-to-pdf`;
      break;
    case 'opentoolskit-all-tools':
    case 'opentoolskit-open':
    default:
      url = OPENTOOLSKIT_URL;
      break;
  }

  chrome.tabs.create({ url });
});
