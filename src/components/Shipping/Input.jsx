function Input({ name, type, label, title, onChange, value }) {
  return (
    <label className="flex flex-col w-full gap-2">
      <span>{title}</span>
      <input
        value={value}
        onChange={onChange}
        className="px-2 w-full hover:border-[#54d67d] py-2 rounded-md outline-none border border-slate-200"
        type={type}
        placeholder={label}
        name={name}
      />
    </label>
  );
}

export default Input;
