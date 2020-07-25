import React from 'react';

import '../../styles/components/Common/toggle.scss';

const Toggle = ({ options }) => {
  return (
    <div className="toggle">
      <input
        type="radio"
        id={options[0].id}
        name="toggle-rad"
        checked={options[0].isChecked}
      />
      <label
        className="option-one"
        htmlFor={options[0].id}
        onClick={options[0].onClick}
      >
        {options[0].label}
      </label>
      <input
        type="radio"
        id={options[1].id}
        name="toggle-rad"
        checked={options[1].isChecked}
      />
      <label
        className="option-two"
        htmlFor={options[1].id}
        onClick={options[1].onClick}
      >
        {options[1].label}
      </label>
    </div>
  );
};
export default Toggle;
