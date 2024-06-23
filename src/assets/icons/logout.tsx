import React from 'react';
import { Path, Svg } from 'react-native-svg';

function logout() {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <Path d="M17 16v2h-6v-2h6zm-4-14c-1.1 0-2 .9-2 2h2c0-.55.45-1 1-1s1 .45 1 1h2c0-1.1-.9-2-2-2zm4 4h-8v2h8v-2zm-3 5v-1c0-1.66-1.34-3-3-3s-3 1.34-3 3v1h-2v-1c0-2.21 1.79-4 4-4s4 1.79 4 4v1h-2z" />
    </Svg>
  );
}

export default logout;
