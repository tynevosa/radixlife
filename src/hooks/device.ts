import { useState, useEffect } from 'react';

const useDeviceOrientation = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(true);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Function to check if the device is mobile
  const checkIfMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  // Function to detect orientation
  const detectOrientation = () => {
    if (window.innerWidth > window.innerHeight) {
      setIsPortrait(false); // Landscape
    } else {
      setIsPortrait(true); // Portrait
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      detectOrientation(); // Recheck orientation when resizing
    };

    // Check initial values
    setIsMobile(checkIfMobile());
    detectOrientation(); // Check initial orientation

    // Event listener for resizing
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile,    // Whether it's a mobile device or not
    isPortrait,  // Whether the device is in portrait mode
    windowSize,  // Current window size (width, height)
  };
};

export default useDeviceOrientation;
