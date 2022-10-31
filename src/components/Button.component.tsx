import Loader from "./Loader.component";
import './Button.component.css';

export default function Button(props: {
  loading?: boolean;
  disabled?: boolean;
  children?: any;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      disabled={props.disabled || props.loading}
      onClick={props.onClick}
      className={props.className}
    >
      {props.loading ? (<Loader/>) : props.children}
    </button>
  );
}
