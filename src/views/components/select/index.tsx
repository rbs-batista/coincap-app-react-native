import { FormControl, Select as NativeBaseSelect } from "native-base";
import React from "react";

type Option = {
    label: string;
    value: string;
};

type InputProps = {
    errorMessage?: string | null;
    isInvalid?: boolean;
    options: Option[];
    onChange: (value: string) => void;
};

export function Select({ errorMessage = null, isInvalid = false, options, onChange, ...res }: InputProps) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl mb={4} isInvalid={invalid}>
            <NativeBaseSelect
                placeholder="Selecione uma opção"
                selectedValue={'TED'}
                onValueChange={(value) => onChange(value)}
                {...res}
            >
                {options.map(option => (
                    <NativeBaseSelect.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </NativeBaseSelect>
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}
