function Button({ text, type = "button" }) {
  return (
    <button
      type={type}
      className="..."
    >
      {text}
    </button>
  );
}

export default Button;