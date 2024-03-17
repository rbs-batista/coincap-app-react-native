import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";
import React from "react";

type Props = IButtonProps &  {
    title: string;
}
export function Button({title, ...res}: Props){
    return(
        <ButtonNativeBase
            w="full"
            h={20}
            bg={"green.700"}
            _pressed={{
                bgColor:"green.900"
            }}
            {...res}
        >
        <Text color= "white" fontSize={26}>{title}</Text>

        </ButtonNativeBase>
    )
}