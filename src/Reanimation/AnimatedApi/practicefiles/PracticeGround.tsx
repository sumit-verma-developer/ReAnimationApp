import { Animated, PanResponder, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View } from 'react-native'
import React, { useRef } from 'react'



const CustomAnimatedComponent = Animated.createAnimatedComponent(TouchableOpacity)
const PracticeGround = () => {


    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const scale = useAnimatedValue(1)


    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: (pan.x as any)._value,
                    y: (pan.y as any)._value
                })
                pan.setValue({ x: 0, y: 0 })

                Animated.spring(scale, {
                    toValue: 2,
                    useNativeDriver: false,
                    friction: 5,
                    tension: 10,
                }).start()
            },

            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: pan.x,
                        dy: pan.y
                    }
                ],
                { useNativeDriver: false }
            ),

            onPanResponderRelease: () => {
                pan.flattenOffset()
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 5,
                    tension: 10,
                    useNativeDriver: false,
                }).start()


            }

        })).current


    const scaleValue = useAnimatedValue(1)

    const HandlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 1.2,
            useNativeDriver: true,

        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,

        }
        ).start()
    }


    return (
        <View style={styles.container}>
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    transform: [...pan.getTranslateTransform(), { scale }],

                }}
            />

            <CustomAnimatedComponent
                onPressIn={HandlePressIn}
                onPressOut={handlePressOut}
                style={{
                    marginTop: 60,
                    width: 80,
                    height: 80,
                    backgroundColor: 'green',
                    borderRadius: 10,
                    transform: [{ scale: scaleValue }]
                }}
            >

            </CustomAnimatedComponent>
            <Text style={styles.text}>PracticeGround</Text>
        </View>
    )
}

export default PracticeGround

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444346ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 40,
    }
})