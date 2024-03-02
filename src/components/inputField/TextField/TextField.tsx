import styles from './TextField.module.scss';

/***
import styles from './InputField.module.scss';
 * Parameters for the text field
 * header: Required. String of the header for the textbox. Example: "First Name", "Last Name"
 * setInputValue: Required. Variable to set the input value of the text
 * type: Optional. Sets the type of text box. Example: "text", "date"
 */
interface TextFieldProps {
    header: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    type?: string;
}

/***
 * Creates a text field with a header
 * @param header: String. The header of the TextField 
 * @param setInputValue: useState. Variable to store the input of the text field  send the 'set' variable
 * @param type: String. Optional, Defaults to 'text'. Sets the type of text box.
 */
export const TextField: React.FC<TextFieldProps> = ({ header, setInputValue, type}) => {
    // Event handler to update the input value
    const handleChange = (event: any) => {
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