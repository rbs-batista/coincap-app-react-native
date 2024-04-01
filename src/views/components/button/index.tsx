import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";
import React from "react";

type Props = IButtonProps & {
    title: string;
}
export function Button({ title, ...res }: Props) {
    return (
        <ButtonNativeBase
            style={{ backgroundColor: '#63b7ff', }}
            {...res}
        >
            <Text style={{ fontWeight: 'bold', color: '#fbfdf1' }}>
                {title}
            </Text>

        </ButtonNativeBase>
    )
}