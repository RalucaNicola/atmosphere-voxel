import { useState } from 'react';
import { Map, Title, MeasurementsPanel, VisualizationPanel, Legend, TimePanel, VoxelLayer, Scale } from '../components';
import { variables, timeDates } from '../config';
import * as styles from './App.module.css';

export const App = () => {
  const [selectedVariable, setSelectedVariable] = useState(variables[0]);
  const [selectedVisualization, setSelectedVisualization] = useState('volume');
  const [selectedTime, setSelectedTime] = useState(timeDates[0]);
  const [exaggeration, setExaggeration] = useState(200);
  const [legendContainer, setLegendContainer] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [isosurfaceInfo, setIsosurfaceInfo] = useState(null);
  const [sections, setSections] = useState([]);
  const [displayIsosurface, setDisplayIsosurface] = useState(true);
  const [isosurfaceValue, setIsosurfaceValue] = useState();
  const [displaySections, setDisplaySections] = useState(false);
  const [displaySlices, setDisplaySlices] = useState(false);
  const [slices, setSlices] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  return (
    <>
      <Map selectedTime={selectedTime}>
        <Legend legendContainer={legendContainer}></Legend>
        <VoxelLayer
          selectedVariable={selectedVariable}
          selectedVisualization={selectedVisualization}
          exaggeration={exaggeration}
          displayError={displayError}
          isosurfaceInfo={isosurfaceInfo}
          setIsosurfaceInfo={setIsosurfaceInfo}
          isosurfaceValue={isosurfaceValue}
          setIsosurfaceValue={setIsosurfaceValue}
          sections={sections}
          setSections={setSections}
          displayIsosurface={displayIsosurface}
          displaySections={displaySections}
          displaySlices={displaySlices}
          slices={slices}
          dimensions={dimensions}
          setDimensions={setDimensions}
        ></VoxelLayer>
        <Scale exaggeration={exaggeration}></Scale>
      </Map>
      <div className={styles.appLayout}>
        <header className={styles.appTitle}>
          <Title text='World atmospheric measurements' size='large'></Title>
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
              isosurfaceInfo={isosurfaceInfo}
              displayError={displayError}
              sections={sections}
              setSections={setSections}
              displayIsosurface={displayIsosurface}
              setDisplayIsosurface={setDisplayIsosurface}
              isosurfaceValue={isosurfaceValue}
              setIsosurfaceValue={setIsosurfaceValue}
              displaySections={displaySections}
              setDisplaySections={setDisplaySections}
              displaySlices={displaySlices}
              setDisplaySlices={setDisplaySlices}
              setSlices={setSlices}
              dimensions={dimensions}
            ></VisualizationPanel>
          </div>
        </div>
        <footer className={styles.appFooter}>
          <p>
            World map displaying measurements of pressure and temperature. Dataset derived from radio occultation data
            acquired in 2019 by{' '}
            <a href='https://geooptics.com/' target='_blank'>
              GeoOptics, Inc
            </a>
            . Map projection: Miller Cylindrical. See code on{' '}
            <a href='https://github.com/RalucaNicola/atmosphere-voxel' target='_blank'>
              GitHub
            </a>
            .
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
