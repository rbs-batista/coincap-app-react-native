import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";
import React from "react";

type Props = IButtonProps & {
    title: string;
}
export function Button({ title, ...res }: Props) {
    return (
        <ButtonNativeBase
            style={{ backgroundColor: '#3bdd8a', }}
            {...res}
        >
            <Text style={{ fontWeight: '800', color: '#000', fontSize: 17}}>
                {title}
            </Text>

        </ButtonNativeBase>
    )
}