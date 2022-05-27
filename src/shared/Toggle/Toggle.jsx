import React from 'react';
import styles from './toggle.css'

function Toggle({ value, onChange }) {
  return (
    <label className={styles.switch} htmlFor="toggler">
      <input
        id="toggler"
        type="checkbox"
        onClick={onChange}
        checked={value}
        readOnly />
      <span className={styles.slider} />
      <span className={styles.wave} />
    </label>
  )
}

export default Toggle