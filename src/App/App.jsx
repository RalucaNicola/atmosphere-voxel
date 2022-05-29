import { useState } from 'react';
import { Map, Title, MeasurementsPanel, Legend, TimePanel } from '../components';
import { variables } from '../config';
import * as styles from './App.module.css';

export const App = () => {
  const [selectedVariable, setSelectedVariable] = useState(variables[0]);
  const [selectedVisualization, setSelectedVisualization] = useState(variables[0].visualization[0]);
  const [selectedTime, setSelectedTime] = useState(1);
  const [legendContainer, setLegendContainer] = useState(null);
  return (
    <>
      <Map>
        <Legend legendContainer={legendContainer}></Legend>
      </Map>
      <div className={styles.appLayout}>
        <header className={styles.appTitle}>
          <Title text='Atmospheric measurements using radio occultation' size='large'></Title>
        </header>
        <div className={styles.leftPanels}>
          <MeasurementsPanel
            selectedVariable={selectedVariable}
            setSelectedVariable={setSelectedVariable}
            selectedVisualization={selectedVisualization}
            setSelectedVisualization={setSelectedVisualization}
            setLegendContainer={setLegendContainer}
          ></MeasurementsPanel>
          <TimePanel selectedTime={selectedTime} setSelectedTime={setSelectedTime}></TimePanel>
        </div>
      </div>
    </>
  );
};
