import { View, Text } from "native-base";
import React from "react"

export function List ({name}:{name: string}) {
    return (
        <View background="#1c2329">
            <Text>{name}</Text>
        </View>
    );
}
