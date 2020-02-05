import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Key from "../../config/keys";

export default function GoogleMaps(props) {
  let markers;

  !props.selected
    ? (markers = null)
    : props.markerArray === undefined || props.markerArray.length === 0
    ? (markers = (
        <Marker
          position={{
            lat: props.initialLat,
            lng: props.initialLng
          }}
        />
      ))
    : (markers = props.markerArray.map((key, index) => {
        return (
          <Marker
            key={key._id}
            onClick={MouseEvent => props.openWindow(index)}
            label={(index + 1).toString()}
            position={{
              lat: parseFloat(key.lat),
              lng: parseFloat(key.long)
            }}
          />
        );
      }));

  const RegularMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={{ lat: props.initialLat, lng: props.initialLng }}
        defaultOptions={{
          scrollwheel: false
        }}
      >
        {markers}
        {props.showInfo ? (
          <InfoWindow
            onCloseClick={() => props.closeWindow()}
            position={{
              lat: parseFloat(props.propsLat),
              lng: parseFloat(props.propsLng)
            }}
          >
            <div
              style={{
                background: `rgba(8, 8, 8, 0.8)`,
                border: `1px solid white`,
                color: "white",
                fontSize: " 0.5rem",
                padding: 5
              }}
            >
              <h1>{props.propsName}</h1>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    ))
  );
  return (
    <RegularMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${Key.mapsKey}`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "580px" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
}
