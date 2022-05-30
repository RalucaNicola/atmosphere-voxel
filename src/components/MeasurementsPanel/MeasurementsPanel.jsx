import { Background } from '../index';
import * as styles from './MeasurementsPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import { CalciteLabel, CalciteRadioButtonGroup, CalciteRadioButton } from '@esri/calcite-components-react';
import { variables } from '../../config';
import { useEffect, useRef } from 'react';

const MeasurementsPanel = ({
  selectedVariable,
  setSelectedVariable,
  selectedVisualization,
  setSelectedVisualization,
  setLegendContainer
}) => {
  const legendContainerRef = useRef();
  useEffect(() => {
    setLegendContainer(legendContainerRef.current);
  }, [legendContainerRef]);
  return (
    <Background title='Measurement' size='small'>
      <CalciteRadioButtonGroup
        name='pressure-group'
        layout='vertical'
        scale='s'
        onCalciteRadioButtonChange={(event) => {
          const variable = variables.filter((v) => v.name === event.target.value)[0];
          setSelectedVariable(variable);
        }}
      >
        {variables.map((variable, index) => {
          const checked = selectedVariable.name === variable.name ? { checked: true } : undefined;
          return (
            <CalciteLabel key={index} layout='inline' className={styles.label}>
              <CalciteRadioButton value={variable.name} {...checked} scale='s'></CalciteRadioButton>
              {variable.name}
            </CalciteLabel>
          );
        })}
      </CalciteRadioButtonGroup>
      <div className={styles.variableInfo}>
        <div className={styles.description}>{selectedVariable.description}</div>
        <div ref={legendContainerRef} className={styles.legend}></div>
      </div>
      <div className={styles.sectionSeparator}>
        {selectedVariable.visualization.length > 1 ? (
          <CalciteRadioButtonGroup
            name='visualization-group'
            layout='horizontal'
            scale='s'
            onCalciteRadioButtonChange={(event) => {
              setSelectedVisualization(event.target.value);
            }}
            className={styles.centerRadioButtons}
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
        ) : (
          <div>Displaying full volume</div>
        )}
      </div>
    </Background>
  );
};

export default MeasurementsPanel;
