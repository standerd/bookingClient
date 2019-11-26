import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Key from "../../config/keys";

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

export default function GoogleMaps() {
  return (
    <RegularMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${Key.mapsKey}`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "580px" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
}
