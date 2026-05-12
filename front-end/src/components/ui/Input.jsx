const Input = ({
  className = "",
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <input
      className={(
        "h-10 rounded-lg border-slate-500 border p-2 w-full text-base placeholder:text-black " +
        className
      ).trim()}
      type={type}
      name={name}
      {...(id ? (id = { id }) : null)}
      // Making sure this is a controlled component
      value={value}
      {...(placeholder ? (placeholder = { placeholder }) : null)}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
