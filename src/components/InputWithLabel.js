import React from 'react';
/*
import {
    StyledLabel,
    StyledInput
} from './StyledComponents'
*/

const InputWithLabel = ({
                            id,
                            value,
                            type = 'text',
                            onInputChange,
                            isFocused,
                            children,
                        }) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </>
    );
};

export default InputWithLabel;
