import * as styles from './Background.module.css';
const Background = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.borderLeftTop}></div>
      <div className={styles.borderRightTop}></div>
      <div className={styles.borderRightBottom}></div>
      <div className={styles.borderLeftBottom}></div>
      {children}
    </div>
  );
};

export default Background;
