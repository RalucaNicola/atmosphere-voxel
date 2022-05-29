import * as styles from './Map.module.css';
import { useRef, useEffect, useState, Children, cloneElement } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import { mapConfig } from '../../config';

const Map = ({ children }) => {
  const mapDivRef = useRef();
  const [mapView, setMapView] = useState(null);

  // initialize effect
  useEffect(() => {
    let view = null;
    try {
      view = new SceneView({
        container: mapDivRef.current,
        map: new WebScene({
          portalItem: {
            id: mapConfig['web-scene-id']
          }
        }),
        ui: { components: [] }
      });

      view
        .when(() => {
          setMapView(view);
          window.view = view;
        })
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
    return () => {
      if (view) {
        view.destroy();
        view = null;
      }
    };
  }, [mapDivRef.current]);

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
