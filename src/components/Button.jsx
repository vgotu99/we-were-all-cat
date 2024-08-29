import "./Button.css";

const Button = ({ onClick, type, text }) => {
  return (
    <button onClick={onClick} className={`button button_${type}`}>
      {text}
    </button>
  );
};

export default Button;
