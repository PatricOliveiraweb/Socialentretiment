import styles from "./Button.module.css";
interface IButton {
  text: string;
  disabled?: boolean;
}
const Button = ({ text, disabled }: IButton) => {
  return (
    <button className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
