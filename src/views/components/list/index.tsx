import { View, Text } from "native-base";
import React from "react"

export function List ({name}:{name: string}) {
    return (
        <View>
            <Text>{name}</Text>
        </View>
    );
}
