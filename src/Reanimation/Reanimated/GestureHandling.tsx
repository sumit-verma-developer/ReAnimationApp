import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    withSequence
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const GestureHandling = () => {
    // Pan
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    // Scale (Pinch)
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    // Rotation
    const rotation = useSharedValue(0);
    const savedRotation = useSharedValue(0);

    // Interaction states
    const isPressed = useSharedValue(false);
    const isLongPressed = useSharedValue(false);
    const pressScale = useSharedValue(1);

    // 1. Pan Gesture
    const panGesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
            pressScale.value = withSpring(0.95);
        })
        .onUpdate((e) => {
            translateX.value = savedTranslateX.value + e.translationX;
            translateY.value = savedTranslateY.value + e.translationY;
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        })
        .onFinalize(() => {
            isPressed.value = false;
            pressScale.value = withSpring(1);
        });

    // 2. Pinch Gesture
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    // 3. Rotation Gesture
    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
        });

    // 4. Double Tap Gesture (Reset Configuration)
    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            scale.value = withSpring(1);
            rotation.value = withSpring(0);

            savedTranslateX.value = 0;
            savedTranslateY.value = 0;
            savedScale.value = 1;
            savedRotation.value = 0;
        });

    // 5. Single Tap Gesture (Bounce)
    const singleTapGesture = Gesture.Tap()
        .onStart(() => {
            pressScale.value = withSequence(
                withSpring(1.15, { damping: 10, stiffness: 200 }),
                withSpring(1)
            );
        });

    // 6. Long Press Gesture (Glow & Elevate)
    const longPressGesture = Gesture.LongPress()
        .minDuration(400)
        .onStart(() => {
            isLongPressed.value = true;
        })
        .onFinalize(() => {
            isLongPressed.value = false;
        });

    // Grouping gestures for proper simultaneity
    const taps = Gesture.Exclusive(doubleTapGesture, singleTapGesture);
    const gestures = Gesture.Simultaneous(
        panGesture,
        pinchGesture,
        rotationGesture,
        taps,
        longPressGesture
    );

    // Reactive styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value * pressScale.value * (isLongPressed.value ? 1.05 : 1) },
                { rotateZ: `${rotation.value}rad` },
            ],
            shadowColor: isLongPressed.value ? '#38bdf8' : '#000000',
            shadowOffset: {
                width: 0,
                height: withTiming(isLongPressed.value ? 20 : 10),
            },
            shadowOpacity: withTiming(isLongPressed.value ? 0.6 : 0.3),
            shadowRadius: withTiming(isLongPressed.value ? 25 : 15),
            elevation: isLongPressed.value ? 20 : 10,
            borderColor: withTiming(isLongPressed.value ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.15)'),
            borderWidth: withTiming(isLongPressed.value ? 2 : 1),
            backgroundColor: withTiming(isLongPressed.value ? 'rgba(30, 41, 59, 1)' : 'rgba(30, 41, 59, 0.85)'),
        };
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* Background Atmosphere */}
            <View style={[styles.bgCircle, styles.circleLeft]} />
            <View style={[styles.bgCircle, styles.circleRight]} />
            <View style={[styles.bgCircle, styles.circleCenter]} />

            <View style={styles.header}>
                <Text style={styles.title}>Interaction Hub</Text>
                <Text style={styles.subtitle}>Combine gestures to interact</Text>
            </View>

            <GestureDetector gesture={gestures}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <View style={styles.cardInner}>
                        <View style={styles.chipContainer}>
                            <View style={styles.chip} />
                            <View style={styles.signalIcon}>
                                <View style={styles.signalLine} />
                                <View style={[styles.signalLine, { height: 10 }]} />
                                <View style={[styles.signalLine, { height: 14 }]} />
                            </View>
                        </View>
                        
                        <Text style={styles.cardNumber}>4111  2222  3333  4444</Text>
                        
                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                                <Text style={styles.cardValue}>ALEX P. DEV</Text>
                            </View>
                            <View>
                                <Text style={styles.cardLabel}>EXPIRES</Text>
                                <Text style={styles.cardValue}>12/28</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </GestureDetector>

            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionTitle}>Supported Gestures</Text>
                <View style={styles.instructionGrid}>
                    <Text style={styles.instructionText}>👆 <Text style={styles.bold}>Pan</Text> to drag</Text>
                    <Text style={styles.instructionText}>🤏 <Text style={styles.bold}>Pinch</Text> to scale</Text>
                    <Text style={styles.instructionText}>🔄 <Text style={styles.bold}>Rotate</Text> to twist</Text>
                    <Text style={styles.instructionText}>📱 <Text style={styles.bold}>Tap</Text> to bounce</Text>
                    <Text style={styles.instructionText}>⚡ <Text style={styles.bold}>Double Tap</Text> to reset</Text>
                    <Text style={styles.instructionText}>⏱️ <Text style={styles.bold}>Long Press</Text> to glow</Text>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

export default GestureHandling;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    bgCircle: {
        position: 'absolute',
        width: 350,
        height: 350,
        borderRadius: 175,
        opacity: 0.12,
    },
    circleLeft: {
        top: -50,
        left: -150,
        backgroundColor: '#8b5cf6',
    },
    circleRight: {
        bottom: -50,
        right: -150,
        backgroundColor: '#0ea5e9',
    },
    circleCenter: {
        top: '30%',
        left: '10%',
        backgroundColor: '#f43f5e',
        width: 200,
        height: 200,
        opacity: 0.08,
    },
    header: {
        position: 'absolute',
        top: 60,
        alignItems: 'center',
    },
    title: {
        color: '#f8fafc',
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 1,
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 15,
        marginTop: 6,
        fontWeight: '500',
    },
    card: {
        width: width * 0.88,
        height: width * 0.58,
        borderRadius: 24,
        overflow: 'hidden',
    },
    cardInner: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    chip: {
        width: 48,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    signalIcon: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 3,
        height: 14,
    },
    signalLine: {
        width: 3,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 2,
    },
    cardNumber: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 4,
        marginBottom: 24,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    cardLabel: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    cardValue: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1,
    },
    instructionsContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        paddingHorizontal: 24,
    },
    instructionTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    instructionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(30, 41, 59, 0.65)',
        padding: 18,
        borderRadius: 20,
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
    },
    instructionText: {
        color: '#cbd5e1',
        fontSize: 14,
        width: '48%',
        marginBottom: 14,
    },
    bold: {
        fontWeight: '800',
        color: '#f8fafc',
    },
});