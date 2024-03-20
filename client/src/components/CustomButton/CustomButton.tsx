import styles from './CustomButton.module.scss';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

/***
 * Parameters for the custom Button
 */
interface CustomButtonProps extends Omit<ButtonProps, 'onClick'> {
    /**
     * Function to be completed when the button is clicked.
     */
    onClick: () => void;
    /** The contents in between the CustomButton tags to be displayed in the button. */
    children: React.ReactNode;
}

//This allows custom styling of the MUI Button component 
const StyledButton = styled(Button)()

/***
 * Creates a custom button
 */
const CustomButton: React.FC<CustomButtonProps> = ({onClick, children}: CustomButtonProps ) => {
    return (
        <div>
            <StyledButton 
                className={styles['CustomButton']}
                onClick={onClick}
            >
                {children} {/* Render children */}
            </StyledButton>
        </div>
    );
};

export default CustomButton;