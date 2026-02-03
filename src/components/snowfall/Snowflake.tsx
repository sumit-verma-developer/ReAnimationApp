import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

const Snowflake = ({ size }: { size: number }) => {
    const translateY = useSharedValue(-50)
    const translateX = Math.random() * width
    const opacity = Math.random() * 0.6 + 0.3
    const duration = Math.random() * 6000 + 9000

    useEffect(() => {
        translateY.value = withRepeat(
            withTiming(height + 50, { duration }),
            -1,
            false
        )
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }, { translateX }],
        opacity,
    }))

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: '#FFFFFF',
                },
                animatedStyle,
            ]}
        />
    )
}

export default Snowflake
