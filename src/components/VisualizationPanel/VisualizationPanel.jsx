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
  isosurfaces,
  setIsosurfaces,
  displayError,
  sections,
  setSections
}) => {
  const [displaySections, setDisplaySections] = useState(false);
  const [currentNSSection, setCurrentNSSection] = useState(2);
  const [currentWESection, setCurrentWESection] = useState(0);

  useEffect(() => {
    let updatedSections = null;
    if (displaySections) {
      updatedSections = sections.map((section) => {
        if (section.label === `ns${currentNSSection}` || section.label === `we${currentWESection}`) {
          section.enabled = true;
        } else {
          section.enabled = false;
        }
        return section;
      });
    } else {
      updatedSections = sections.map((section) => {
        return { ...section, enabled: false };
      });
    }
    setSections(updatedSections);
  }, [displaySections, currentNSSection, currentWESection]);

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
      {!displayError && isosurfaces.length > 0 ? (
        <div className={styles.surfaces}>
          {isosurfaces.map((surface, index) => (
            <CalciteLabel
              key={index}
              layout='inline'
              className={styles.label}
              onCalciteCheckboxChange={(evt) => {
                const updatedSurfaces = isosurfaces.map((surface) => {
                  if (surface.value === evt.target.value) {
                    surface.enabled = evt.target.checked;
                  }
                  return surface;
                });
                setIsosurfaces(updatedSurfaces);
              }}
            >
              <CalciteCheckbox
                value={surface.value}
                checked={surface.enabled ? true : undefined}
                scale='s'
              ></CalciteCheckbox>
              {surface.label}
            </CalciteLabel>
          ))}
        </div>
      ) : (
        ''
      )}
      <div className={styles.dynamicSections}>
        <CalciteLabel
          className={styles.label}
          layout='inline'
          onCalciteSwitchChange={(event) => {
            setDisplaySections(event.target.checked);
          }}
        >
          Display sections
          <CalciteSwitch scale='m'></CalciteSwitch>
        </CalciteLabel>
        {displaySections ? (
          <div className={styles.sections}>
            <p>North - South</p>
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

            <p>West - East</p>
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
      <div className='separator'></div>
      <CalciteLabel
        className={styles.label}
        layout='inline'
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
