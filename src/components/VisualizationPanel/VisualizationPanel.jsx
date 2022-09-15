import { Background } from '../index';
import * as styles from './VisualizationPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-slider';
import '@esri/calcite-components/dist/components/calcite-switch';
import '@esri/calcite-components/dist/components/calcite-checkbox';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import {
  CalciteLabel,
  CalciteRadioButtonGroup,
  CalciteRadioButton,
  CalciteSlider,
  CalciteSwitch,
  CalciteCheckbox
} from '@esri/calcite-components-react';
import { useEffect, useState } from 'react';

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
  setDisplaySections
}) => {
  const [currentNSSection, setCurrentNSSection] = useState(2);
  const [currentWESection, setCurrentWESection] = useState(0);

  useEffect(() => {
    let updatedSections = sections.map((section) => {
      if (section.label === `ns${currentNSSection}` || section.label === `we${currentWESection}`) {
        section.enabled = true;
      } else {
        section.enabled = false;
      }
      return section;
    });
    setSections(updatedSections);
  }, [currentNSSection, currentWESection]);

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
      {!displayError && selectedVisualization === 'surfaces' ? (
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
                scale='s'
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
                scale='s'
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
                scale='s'
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
      <CalciteLabel
        className={styles.label}
        layout='inline-space-between'
        onCalciteSwitchChange={(event) => {
          console.log(event.target.checked ? 'Applied slice' : 'Slice not applied');
        }}
      >
        Apply slices
        <CalciteSwitch scale='m'></CalciteSwitch>
      </CalciteLabel>
      <div className='separator'></div>
      <CalciteLabel className={styles.label}>Vertical exaggeration</CalciteLabel>
      <CalciteSlider
        labelHandles
        min='1'
        max='200'
        scale='s'
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
