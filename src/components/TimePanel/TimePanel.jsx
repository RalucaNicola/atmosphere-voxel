import { Background } from '../index';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import { CalciteLabel, CalciteRadioButtonGroup, CalciteRadioButton } from '@esri/calcite-components-react';

import * as styles from './TimePanel.module.css';
const TimePanel = ({ selectedTime }) => {
  return (
    <Background title='Time' size='small'>
      <CalciteRadioButtonGroup
        name='time-group'
        layout='horizontal'
        scale='s'
        onCalciteRadioButtonChange={(event) => {
          setSelectedTime(event.target.value);
        }}
      >
        <CalciteLabel layout='inline' className={styles.label}>
          <CalciteRadioButton value={1} {...(selectedTime === 1 ? { checked: true } : undefined)}></CalciteRadioButton>
          June 1, 2019
        </CalciteLabel>
        <CalciteLabel layout='inline' className={styles.label}>
          <CalciteRadioButton value={2} {...(selectedTime === 2 ? { checked: true } : undefined)}></CalciteRadioButton>
          July 31, 2019
        </CalciteLabel>
      </CalciteRadioButtonGroup>
    </Background>
  );
};

export default TimePanel;
