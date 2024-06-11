// eslint-disable-next-line react/prop-types
const BorderlessInput = ({value, className, onChange, bold = true}) => {
    let style = {
        border: 0,
        padding: '5px 0px',
        fontSize: '1.54rem',
        fontWeight: bold ? 'bold' : 'normal',
    }

    return (
        <input type="text"
               value={value}
               className={className}
               onChange={onChange}
               style={style}
        />
    );
};

export default BorderlessInput;