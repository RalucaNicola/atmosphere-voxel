import { useState } from 'react';
import { Map, Title, MeasurementsPanel, VisualizationPanel, Legend, TimePanel, VoxelLayer, Scale } from '../components';
import { variables, timeDates } from '../config';
import * as styles from './App.module.css';

export const App = () => {
  const [selectedVariable, setSelectedVariable] = useState(variables[0]);
  const [selectedVisualization, setSelectedVisualization] = useState(variables[0].visualization[0].value);
  const [selectedTime, setSelectedTime] = useState(timeDates[0]);
  const [exaggeration, setExaggeration] = useState(200);
  const [legendContainer, setLegendContainer] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  return (
    <>
      <Map selectedTime={selectedTime}>
        <Legend legendContainer={legendContainer}></Legend>
        <VoxelLayer
          selectedVariable={selectedVariable}
          selectedVisualization={selectedVisualization}
          exaggeration={exaggeration}
          displayError={displayError}
        ></VoxelLayer>
        <Scale exaggeration={exaggeration}></Scale>
      </Map>
      <div className={styles.appLayout}>
        <header className={styles.appTitle}>
          <Title text='Atmospheric measurements using radio occultation' size='large'></Title>
        </header>
        <div className={styles.appContent}>
          <div className={styles.leftPane}>
            <MeasurementsPanel
              selectedVariable={selectedVariable}
              setSelectedVariable={setSelectedVariable}
              setLegendContainer={setLegendContainer}
              displayError={displayError}
              setDisplayError={setDisplayError}
            ></MeasurementsPanel>
            <TimePanel selectedTime={selectedTime} setSelectedTime={setSelectedTime}></TimePanel>
          </div>
          <div className={styles.rightPane}>
            <VisualizationPanel
              selectedVariable={selectedVariable}
              selectedVisualization={selectedVisualization}
              setSelectedVisualization={setSelectedVisualization}
              exaggeration={exaggeration}
              setExaggeration={setExaggeration}
            ></VisualizationPanel>
          </div>
        </div>
        <footer className={styles.appFooter}>
          <p>
            World map displaying atmospheric measurements of pressure and temperature. Dataset derived from radio
            occultation data acquired in 2019 by{' '}
            <a href='https://geooptics.com/' target='_blank'>
              GeoOptics, Inc
            </a>
            . Map projection: Miller Cylindrical.{' '}
          </p>
          <p>
            Powered by{' '}
            <a href='https://www.esri.com/en-us/home' target='_blank'>
              Esri
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
};
