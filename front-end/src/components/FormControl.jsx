const FormControl = ({ className = "", children, ...props }) => {
  return (
    <div className={("flex flex-col gap-y-2 " + className).trim()} {...props}>
      {children}
    </div>
  );
};

export default FormControl;
