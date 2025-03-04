const isMobile = (): boolean => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const isPortrait = (): boolean => {
  return window.matchMedia("(orientation: portrait)").matches;
};

const isLandscape = (): boolean => {
  return window.matchMedia("(orientation: landscape)").matches;
};

export { isMobile, isPortrait, isLandscape };