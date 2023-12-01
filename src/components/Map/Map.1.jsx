import React, { useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

export const Map = ({ position }) => {
  const options = useMemo(
    () => ({
      // mapId: 'b181cac70f27f5e6', // dark mode
      clickableIcons: false,
      disableDefaultUI: true,
    }),
    []
  );

  return (
    <div className='map'>
      <GoogleMap
        center={position}
        zoom={15}
        mapContainerClassName='map-container'
        options={options}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </div>
  );
};
