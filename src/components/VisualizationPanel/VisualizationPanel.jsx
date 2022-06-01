import { Background } from '../index';
import * as styles from './VisualizationPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-slider';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import {
  CalciteLabel,
  CalciteRadioButtonGroup,
  CalciteRadioButton,
  CalciteSlider
} from '@esri/calcite-components-react';

const VisualizationPanel = ({
  selectedVariable,
  selectedVisualization,
  setSelectedVisualization,
  exaggeration,
  setExaggeration
}) => {
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
        {selectedVariable.visualization.map((visualization, index) => {
          const checked = selectedVisualization === visualization.value ? { checked: true } : undefined;
          return (
            <CalciteLabel key={index} layout='inline' className={styles.label}>
              <CalciteRadioButton value={visualization.value} {...checked} scale='s'></CalciteRadioButton>
              {visualization.name}
            </CalciteLabel>
          );
        })}
      </CalciteRadioButtonGroup>
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
