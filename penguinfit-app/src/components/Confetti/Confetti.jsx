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
    <Box component="div" sx={{ maxWidth:'100%', overflow: 'hidden' }}>
      <Confetti
        recycle={false}
        width={windowDimensions.width - 50}
        height={windowDimensions.height*2 }
      />
    </Box>
  );
};