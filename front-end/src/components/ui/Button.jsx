const Button = ({
  children,
  className = "",
  type = "",
  id = "",
  onClick,
  ...props
}) => {
  return (
    <button
      className={(
        "flex justify-center items-center text-base h-10 cursor-pointer rounded-lg bg-gray-200 text-gray-700 p-5 hover:bg-tc-green hover:text-white " +
        className
      ).trim()}
      {...(type ? (type = { type }) : null)}
      {...(id ? (id = { id }) : null)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
