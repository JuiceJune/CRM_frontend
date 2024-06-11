const BorderlessSelect = ({ value, options, onChange, className, label, field }) => {
    let selectStyle = {
        border: 'none',
        padding: '5px 5px',
        fontSize: '1rem',
        fontWeight: 'bold'
    };

    return (
        <div>
            <span>{label}: </span>
            <select
                value={value || ""}
                onChange={onChange}
                className={className}
                style={selectStyle}
            >
                <option value="">Empty</option>
                {options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option[field]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BorderlessSelect;