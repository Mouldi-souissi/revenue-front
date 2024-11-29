import { useEffect, useState } from "react";

const defaultOption = { label: "", value: null };

const CustomSelect = () => {
  const [isOpen, toggle] = useState(false);
  const [selected, setSelected] = useState("Open this select menu");

  const options = [
    { label: "Aujourd'hui", value: "daily" },
    { label: "Hier", value: "yesterday" },
    { label: "Cette semaine", value: "weekly" },
    { label: "Ce mois", value: "monthly" },
  ];

  const handleSelection = (option) => {
    setSelected(option.label);
    toggle(false);
  };

  return (
    <div class="custom-select">
      <button
        className={`select-button`}
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-dropdown"
        onClick={() => toggle(!isOpen)}
      >
        <span class="selected-value">{selected}</span>
        <span class="arrow"></span>
      </button>
      <ul
        className={`select-dropdown ${isOpen ? "active" : ""}`}
        role="listbox"
        id="select-dropdown"
      >
        {options.map((option) => (
          <li
            role="option"
            key={option.value}
            onClick={() => handleSelection(option)}
            className={`option ${option.label === selected && "active"}`}
            tabIndex="0"
          >
            <input
              type="radio"
              checked={option.label === selected && "active"}
            />
            <label>{option.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
