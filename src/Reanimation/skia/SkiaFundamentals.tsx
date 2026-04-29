import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

import { Canvas, Group, Circle } from '@shopify/react-native-skia';

const SkiaFundamentals = () => {

    // const { width, height } = useWindowDimensions();
    const width = 250;
    const height = 250;
    const r = width * 0.33;
    const c = width / 2;
    const offset = r / 2;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Skia Fundamentals</Text>
            <Canvas style={{ width, height }}>
                <Group blendMode="multiply">
                    <Circle cx={c - offset} cy={c - offset} r={r} color="cyan" />
                    <Circle cx={c + offset} cy={c - offset} r={r} color="magenta" />
                    <Circle cx={c} cy={c + offset} r={r} color="yellow" />
                </Group>
            </Canvas>
        </View>
    )
}

export default SkiaFundamentals

const styles = StyleSheet.create({

})