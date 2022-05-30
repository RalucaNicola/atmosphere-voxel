import { useState } from 'react';
import { Map, Title, MeasurementsPanel, Legend, TimePanel, VoxelLayer } from '../components';
import { variables, timeDates } from '../config';
import * as styles from './App.module.css';

export const App = () => {
  const [selectedVariable, setSelectedVariable] = useState(variables[0]);
  const [selectedVisualization, setSelectedVisualization] = useState(variables[0].visualization[0].value);
  const [selectedTime, setSelectedTime] = useState(timeDates[0]);
  const [legendContainer, setLegendContainer] = useState(null);

  return (
    <>
      <Map selectedTime={selectedTime}>
        <Legend legendContainer={legendContainer}></Legend>
        <VoxelLayer selectedVariable={selectedVariable} selectedVisualization={selectedVisualization}></VoxelLayer>
      </Map>
      <div className={styles.appLayout}>
        <header className={styles.appTitle}>
          <Title text='Atmospheric measurements using radio occultation' size='large'></Title>
        </header>
        <MeasurementsPanel
          selectedVariable={selectedVariable}
          setSelectedVariable={setSelectedVariable}
          selectedVisualization={selectedVisualization}
          setSelectedVisualization={setSelectedVisualization}
          setLegendContainer={setLegendContainer}
        ></MeasurementsPanel>
        <TimePanel selectedTime={selectedTime} setSelectedTime={setSelectedTime}></TimePanel>
      </div>
    </>
  );
};
