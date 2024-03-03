import styles from './TextField.module.scss';

/***
 * Parameters for the text field
 */
interface TextFieldProps {
    /**
     * String of the header for the textbox.
     * @example
     * header={"First Name"}
     */
    header: string;
    //Variable to set the input value of the text
    setInputValue: (value: string) => void;
    /**
     * Sets the type of text box.
     * @example
     * type={"date"}
     */
    type?: string;
}

/***
 * Creates a text field with a header
 */
const TextField: React.FC<TextFieldProps> = ({ header, setInputValue, type}: TextFieldProps) => {
    // Event handler to update the input value
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
        
    return (
        <div>
        {/* Input field with event handler */}
        <div className={styles['TextField__header']}>{header}</div>
        <input
            className={styles['TextField__textBox']}
            type={type}
            onChange={handleChange} // When input changes, call handleChange
            placeholder={`Enter ${header}`} // Placeholder text for the input field
        />
    </div>
    );
};

TextField.defaultProps = {
    type: 'text', // Default placeholder text
};

export default TextField;