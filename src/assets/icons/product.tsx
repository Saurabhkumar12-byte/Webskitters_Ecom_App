import React from 'react';
import { Path, Svg } from 'react-native-svg';

function product() {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2v-6h2v6z" />
    </Svg>
  );
}

export default product;
