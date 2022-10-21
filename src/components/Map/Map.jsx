import * as styles from './Map.module.css';
import { useRef, useEffect, useState, Children, cloneElement } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import TimeExtent from '@arcgis/core/TimeExtent';
import { mapConfig } from '../../config';

const getSidePadding = () => {
  return Math.min(Math.max(window.innerWidth * 0.3, 200), 300);
};

const Map = ({ selectedTime, children }) => {
  const mapDivRef = useRef(null);
  const [mapView, setMapView] = useState(null);

  // initialize effect
  useEffect(() => {
    if (mapDivRef.current) {
      const padding = getSidePadding();
      let view = new SceneView({
        container: mapDivRef.current,
        map: new WebScene({
          portalItem: {
            id: mapConfig['web-scene-id']
          }
        }),
        ui: { components: [] },
        qualityProfile: 'high',
        padding: {
          left: padding,
          right: padding
        },
        alphaCompositingEnabled: true,
        environment: {
          background: {
            type: 'color',
            color: [0, 0, 0, 0]
          },
          starsEnabled: false,
          atmosphereEnabled: false
        }
      });
      view
        .when(() => {
          setMapView(view);
          window.view = view;
        })
        .catch(console.error);
    }
    return () => {
      if (mapView) {
        mapView.destroy();
        setMapView(null);
      }
    };
  }, [mapDivRef]);

  useEffect(() => {
    if (mapView && selectedTime) {
      const date = `${selectedTime}, 2019`;
      const startDate = new Date(date);
      startDate.setDate(startDate.getDate() - 4);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 4);
      const timeExtent = new TimeExtent({
        start: startDate,
        end: endDate
      });
      mapView.timeExtent = timeExtent;
    }
  }, [mapView, selectedTime]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          mapView
        });
      })}
    </>
  );
};

export default Map;
