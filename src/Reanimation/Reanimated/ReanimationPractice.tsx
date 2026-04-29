import { Button, Easing, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Animated, { measure, useAnimatedProps, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withClamp, withRepeat, withSpring, withTiming, useAnimatedKeyboard } from 'react-native-reanimated'



const ReanimationPractice = () => {
    const [value, setValue] = useState('')

    const keyboard = useAnimatedKeyboard()


    const animatedStyle = useAnimatedStyle(() => ({

        transform: [{ translateY: -keyboard.height.value }],
    }))




    return (
        <Animated.View style={[animatedStyle, { flex: 1, justifyContent: 'flex-end', alignSelf: 'center' }]}

        >

            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    width: 200,
                    height: 50,
                    borderRadius: 10,
                    padding: 10,
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}

                value={value}
                onChangeText={(text) => setValue(text)}
            />


        </Animated.View>
    )
}

export default ReanimationPractice

const styles = StyleSheet.create({

    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    }
})