import "./Button.css";

const Button = ({ onTouchEnd, onClick, type, text }) => {
  return (
    <button
      onTouchEnd={onTouchEnd}
      onClick={onClick}
      className={`button button_${type}`}
    >
      {text}
    </button>
  );
};

export default Button;
