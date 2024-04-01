import React from "react";
import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type InputProps = IInputProps &{
    errorMessage?: string | null
}
export function  Input({errorMessage = null, isInvalid,  ...res}: InputProps ){
    const invalid = !!errorMessage || isInvalid;
    return(
        <FormControl mb={4} isInvalid={invalid}>
            <NativeBaseInput
                bgColor={"#1c2329"}
                color={"#dde4eb"}
                fontSize="md"
                borderRadius= "20"
                mb={4}
                placeholderTextColor={"#dde4eb"}
                isInvalid={invalid}
                _focus={{
                    borderWidth: "1px",
                }}    
                _invalid={{
                    borderWidth: "1px",
                    borderColor:"pink.300"
                }}
                {...res}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
            
        </FormControl>
    );
}