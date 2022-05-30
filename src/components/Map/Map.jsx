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
  const mapDivRef = useRef();
  const [mapView, setMapView] = useState(null);

  // initialize effect
  useEffect(() => {
    let view = null;

    if (mapDivRef.current) {
      const padding = getSidePadding();
      view = new SceneView({
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
      if (view) {
        view.destroy();
        view = null;
      }
    };
  }, [mapDivRef]);

  useEffect(() => {
    if (mapView && selectedTime) {
      const startDate = new Date(selectedTime);
      startDate.setDate(startDate.getDate() - 4);
      const endDate = new Date(selectedTime);
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
