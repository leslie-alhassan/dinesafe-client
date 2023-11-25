import React, { useCallback, useMemo, useRef } from 'react';
import './Map.scss';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const Map = ({ position }) => {
  const options = useMemo(
    () => ({
      // mapId: 'b181cac70f27f5e6', // dark mode
      clickableIcons: false,
      disableDefaultUI: true,
    }),
    []
  );
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className='map'>
      <GoogleMap
        center={position}
        zoom={15}
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
