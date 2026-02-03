import React from 'react'
import { StyleSheet, View } from 'react-native'
import Snowflake from './Snowflake'

const SNOW_COUNT = 45

const Snowfall = () => {
    return (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            {Array.from({ length: SNOW_COUNT }).map((_, index) => (
                <Snowflake
                    key={index}
                    size={Math.random() * 4 + 2}
                />
            ))}
        </View>
    )
}

export default Snowfall
