const Label = ({ className = "", children, ...props }) => {
  return (
    <label
      className={("font-medium leading-none " + className).trim()}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
