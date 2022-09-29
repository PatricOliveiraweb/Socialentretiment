import React from "react";
import styles from "./Select.module.css";

interface ISelectType {
  values: string[];
  name: string;
  setValue: (item: string) => void;
}
const Select = ({ values, setValue, name }: ISelectType) => {
  return (
    <label htmlFor={name} className={styles.select}>
      {name}:
      <select
        name={name}
        id={name}
        className={styles.select}
        onChange={({ target }) => setValue(target.value)}
        defaultValue={"DEFAULT"}
      >
        <option selected disabled value="DEFAULT">
          Selecione uma categoria
        </option>
        {values &&
          values.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
      </select>
    </label>
  );
};

export default Select;
