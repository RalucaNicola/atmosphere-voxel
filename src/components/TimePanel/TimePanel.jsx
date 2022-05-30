import { Background } from '../index';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import { CalciteLabel, CalciteRadioButtonGroup, CalciteRadioButton } from '@esri/calcite-components-react';
import { timeDates } from '../../config';
import * as styles from './TimePanel.module.css';
const TimePanel = ({ selectedTime, setSelectedTime }) => {
  return (
    <Background title='Time' size='small'>
      <CalciteRadioButtonGroup
        name='time-group'
        layout='horizontal'
        scale='s'
        onCalciteRadioButtonChange={(event) => {
          console.log(event.target.value);
          setSelectedTime(event.target.value);
        }}
      >
        {timeDates.map((time, index) => {
          return (
            <CalciteLabel layout='inline' key={index} className={styles.label}>
              <CalciteRadioButton
                value={time}
                {...(selectedTime === time ? { checked: true } : undefined)}
              ></CalciteRadioButton>
              {time}
            </CalciteLabel>
          );
        })}
      </CalciteRadioButtonGroup>
    </Background>
  );
};

export default TimePanel;
