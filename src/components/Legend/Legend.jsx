import { useEffect } from 'react';
import Legend from '@arcgis/core/widgets/Legend';
import * as styles from './Legend.module.css';
const LegendContainer = ({ legendContainer, mapView }) => {
  useEffect(() => {
    let legend = null;
    if (legendContainer && mapView) {
      const container = document.createElement('div');
      legendContainer.appendChild(container);
      legend = new Legend({
        view: mapView,
        container: container
      });
    }
    return () => {
      if (legend) {
        legend.destroy();
      }
    };
  }, [legendContainer, mapView]);

  return null;
};

export default LegendContainer;
