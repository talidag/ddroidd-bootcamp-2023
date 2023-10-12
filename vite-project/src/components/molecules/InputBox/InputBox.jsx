import "./InputBox.scss";

const InputBox = ({
  id,
  label,
  placeholder,
  handleInputChange,
  formData,
  handleInputClick,
  required,
  type,
  invalidStyle,
}) => {
  return (
    <div
      className="input-box"
      style={{
        fontWeight: id === "firstName" || id === "lastName" ? 700 : 600,
      }}
    >
      <label htmlFor={id}>
        {label} {required && <span style={{ color: "#f00" }}> *</span>}
      </label>

      <input
        style={{
          width: id.includes("address") ? "840px" : "",
          border: invalidStyle ? "1px solid red" : "",
        }}
        type={type === "email" ? "email" : "text"}
        required={required}
        name={id}
        onChange={(e) => handleInputChange(e)}
        onClick={(e) => handleInputClick(e)}
        value={formData[id]}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
