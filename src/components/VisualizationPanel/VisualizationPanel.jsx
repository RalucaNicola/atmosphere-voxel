import { Background } from '../index';
import * as styles from './VisualizationPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-slider';
import '@esri/calcite-components/dist/components/calcite-switch';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import {
  CalciteLabel,
  CalciteRadioButtonGroup,
  CalciteRadioButton,
  CalciteSlider,
  CalciteSwitch
} from '@esri/calcite-components-react';
import { useEffect, useState } from 'react';
import VoxelSlice from '@arcgis/core/layers/voxel/VoxelSlice';

const getSlice = (orientation, value) => {
  switch (orientation) {
    case 'NS':
      return new VoxelSlice({
        orientation: 180,
        tilt: 90,
        point: [0, value, 0]
      });
    case 'WE':
      return new VoxelSlice({ orientation: 270, tilt: 90, point: [value, 0, 0] });
    case 'UD':
      return new VoxelSlice({
        orientation: 0,
        tilt: 0,
        point: [0, 0, value]
      });
  }
};

const VisualizationPanel = ({
  selectedVariable,
  selectedVisualization,
  setSelectedVisualization,
  exaggeration,
  setExaggeration,
  isosurfaceInfo,
  displayError,
  sections,
  setSections,
  isosurfaceValue,
  setIsosurfaceValue,
  displayIsosurface,
  setDisplayIsosurface,
  displaySections,
  setDisplaySections,
  displaySlices,
  setDisplaySlices,
  setSlices
}) => {
  const [currentNSSection, setCurrentNSSection] = useState(0);
  const [currentWESection, setCurrentWESection] = useState(0);
  const [currentWESlice, setCurrentWESlice] = useState(getSlice('WE', 39));
  const [currentNSSlice, setCurrentNSSlice] = useState(getSlice('NS', 1));
  const [currentUpDownSlice, setCurrentUpDownSlice] = useState(getSlice('UD', 41));

  useEffect(() => {
    if (displaySections) {
      let updatedSections = sections.map((section) => {
        if (section.label === `ns${currentNSSection}` || section.label === `we${currentWESection}`) {
          section.enabled = true;
        } else {
          section.enabled = false;
        }
        return section;
      });
      setSections(updatedSections);
    }
  }, [currentNSSection, currentWESection, displaySections]);

  useEffect(() => {
    if (displaySlices) {
      setSlices([currentNSSlice, currentWESlice, currentUpDownSlice]);
    }
  }, [currentNSSlice, currentWESlice, currentUpDownSlice, displaySlices]);

  return (
    <Background title='Visualization' size='small'>
      <CalciteRadioButtonGroup
        name='visualization-group'
        layout='vertical'
        scale='s'
        onCalciteRadioButtonChange={(event) => {
          setSelectedVisualization(event.target.value);
        }}
      >
        <CalciteLabel layout='inline' className={styles.label}>
          <CalciteRadioButton
            value='volume'
            checked={selectedVisualization === 'volume' ? true : undefined}
            scale='s'
          ></CalciteRadioButton>
          Full volume
        </CalciteLabel>
        <CalciteLabel layout='inline' className={styles.label}>
          <CalciteRadioButton
            value='surfaces'
            checked={selectedVisualization === 'surfaces' ? true : undefined}
            scale='s'
          ></CalciteRadioButton>
          Surfaces and sections
        </CalciteLabel>
      </CalciteRadioButtonGroup>
      {!displayError && selectedVisualization === 'surfaces' && isosurfaceInfo ? (
        <div className={styles.surfaces}>
          <CalciteLabel
            className={styles.label}
            layout='inline-space-between'
            onCalciteSwitchChange={(event) => {
              setDisplayIsosurface(event.target.checked);
            }}
          >
            Display isosurface ({selectedVariable.unit})
            <CalciteSwitch scale='m' checked={displayIsosurface ? true : undefined}></CalciteSwitch>
          </CalciteLabel>
          {displayIsosurface ? (
            <>
              <img className={styles.surfaceGraphic} src='./assets/surface.png'></img>
              <CalciteSlider
                labelHandles
                min={isosurfaceInfo.min}
                max={isosurfaceInfo.max}
                scale='m'
                value={isosurfaceValue}
                snap
                step={isosurfaceInfo.max - isosurfaceInfo.min < 10 ? 0.2 : 1}
                onCalciteSliderInput={(event) => {
                  const value = event.target.value;
                  setIsosurfaceValue(value);
                }}
              ></CalciteSlider>
            </>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {selectedVisualization === 'surfaces' ? (
        <div className={styles.dynamicSections}>
          <CalciteLabel
            className={styles.label}
            layout='inline-space-between'
            onCalciteSwitchChange={(event) => {
              setDisplaySections(event.target.checked);
            }}
          >
            Display sections
            <CalciteSwitch scale='m' checked={displaySections ? true : undefined}></CalciteSwitch>
          </CalciteLabel>
          {displaySections ? (
            <div className={styles.sections}>
              <img className={styles.surfaceGraphic} src='./assets/section-north-south.png'></img>
              <CalciteSlider
                min='0'
                max='36'
                scale='m'
                value={currentNSSection}
                snap
                step='1'
                onCalciteSliderInput={(event) => {
                  const value = event.target.value;
                  setCurrentNSSection(value);
                }}
              ></CalciteSlider>

              <img className={styles.surfaceGraphic} src='./assets/section-west-east.png'></img>
              <CalciteSlider
                min='0'
                max='36'
                scale='m'
                value={currentWESection}
                snap
                step='1'
                onCalciteSliderInput={(event) => {
                  const value = event.target.value;
                  setCurrentWESection(value);
                }}
              ></CalciteSlider>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <div className='separator'></div>
      <div>
        <CalciteLabel
          className={styles.label}
          layout='inline-space-between'
          onCalciteSwitchChange={(event) => {
            setDisplaySlices(event.target.checked);
          }}
        >
          Slice layer
          <CalciteSwitch scale='m' checked={displaySlices ? true : undefined}></CalciteSwitch>
        </CalciteLabel>
        {displaySlices ? (
          <div className={styles.slices}>
            <img className={styles.sliceGraphic} src='./assets/slice-west-east.png'></img>
            <CalciteSlider
              min={2}
              max={39}
              scale='m'
              value={currentWESlice.point[0]}
              snap
              step={1}
              onCalciteSliderInput={(event) => {
                const value = event.target.value;
                setCurrentWESlice(getSlice('WE', value));
              }}
            ></CalciteSlider>
            <img className={styles.sliceGraphic} src='./assets/slice-north-south.png'></img>
            <CalciteSlider
              min={1}
              max={38}
              scale='m'
              value={currentNSSlice.point[1]}
              snap
              step={1}
              onCalciteSliderInput={(event) => {
                const value = event.target.value;
                setCurrentNSSlice(getSlice('NS', value));
              }}
            ></CalciteSlider>
            <img className={styles.sliceGraphic} src='./assets/slice-up-down.png'></img>
            <CalciteSlider
              min={1}
              max={41}
              scale='m'
              value={currentUpDownSlice.point[2]}
              snap
              step={1}
              onCalciteSliderInput={(event) => {
                const value = event.target.value;
                setCurrentUpDownSlice(getSlice('UD', value));
              }}
            ></CalciteSlider>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='separator'></div>
      <CalciteLabel className={styles.label}>Vertical exaggeration</CalciteLabel>
      <CalciteSlider
        labelHandles
        min='1'
        max='200'
        scale='m'
        value={exaggeration}
        snap
        step='10'
        onCalciteSliderInput={(event) => {
          const value = event.target.value ? event.target.value : 1;
          setExaggeration(value);
        }}
      ></CalciteSlider>
    </Background>
  );
};

export default VisualizationPanel;
