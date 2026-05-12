const Select = ({ children, className = "", id = "", onChange, value }) => {
  return (
    <select
      className={(
        "text-[16px] h-10 rounded-lg border border-slate-500 p-2 " + className
      ).trim()}
      {...(id ? (id = { id }) : null)}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  );
};

export default Select;
