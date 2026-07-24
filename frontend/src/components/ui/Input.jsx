function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

export default Input;