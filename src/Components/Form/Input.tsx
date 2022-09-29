import styles from "./Input.module.css";

interface IInput {
  label: string;
  name: string;
  type: string;
  value?: string;
  error?: string;
  onChange?: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  disabled?: boolean;
}
const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  disabled,
}: IInput) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
        <input
          type={type}
          name={name}
          id={name}
          className={styles.input}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
