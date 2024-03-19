import React from "react"
import { View, Text } from "native-base";

export function List ({name}:{name: string}) {
    return (
        <View background="#1c2329" padding="6" marginBottom="3">
            <Text color="#dde4eb">{name}</Text>
        </View>
    );
}
