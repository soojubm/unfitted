import styles from "./Radio.module.css";

interface RadioProps {
  id: string;
  name: string;
  label: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

function Radio(props: RadioProps) {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        checked={props.isChecked}
        disabled={props.isDisabled}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default Radio;
