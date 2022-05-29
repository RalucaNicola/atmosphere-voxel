import * as styles from './Title.module.css';
const Title = ({ text, size }) => {
  if (size === 'large') {
    return <h1 className={styles.titleBackground}>{text}</h1>;
  } else {
    return <h2 className={styles.titleBackground}>{text}</h2>;
  }
};

export default Title;
