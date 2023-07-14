import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
// import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function DisplayConfetti() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  // sx={{ overflow: 'hidden' }}
  return (
    <Box component="div" sx={{ position:'fixed', zIndex:2000, width:'100vw', height:'100vh' }}>
      <Confetti
        // numberOfPieces={2}
        recycle={false}
        width={windowDimensions.width}
        height={windowDimensions.height + 200}
      />
    </Box>
  );
};