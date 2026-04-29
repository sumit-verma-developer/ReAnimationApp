import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    withRepeat,
    withSequence,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { createWorkletRuntime, runOnJS, runOnRuntime, runOnUI } from 'react-native-worklets';

const { width } = Dimensions.get('window');

// Custom Javascript Runtime for Background Tasks
const backgroundRuntime = createWorkletRuntime('background');

const Threading = () => {
    const [isComputing, setIsComputing] = useState(false);
    const [computationResult, setComputationResult] = useState<number | null>(null);
    const [count, setCount] = useState(0);

    const boxTranslateX = useSharedValue(0);
    const tapScale = useSharedValue(1);
    const indicatorRotation = useSharedValue(0);

    const updateCounter = () => setCount((prev) => prev + 1);

    const handleTap = Gesture.Tap().onEnd(() => {
        'worklet';
        runOnJS(updateCounter)();
        tapScale.value = withSequence(
            withSpring(1.2, { damping: 2, stiffness: 80 }),
            withSpring(1)
        );
    });

    const animatedBoxStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: boxTranslateX.value },
                { scale: tapScale.value }
            ]
        };
    });

    const animatedIndicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${indicatorRotation.value}deg` }]
        };
    });

    const startUIAnimation = () => {
        'worklet';
        // Run completely on UI thread, independent of JS
        boxTranslateX.value = withSpring(boxTranslateX.value === 0 ? width * 0.4 : 0, {
            damping: 15,
            stiffness: 90
        });
        indicatorRotation.value = withRepeat(
            withTiming(indicatorRotation.value + 360, { duration: 1000 }),
            -1,
            false
        );
    };

    const handleMoveBox = () => {
        runOnUI(startUIAnimation)();
    };

    // --- Heavy Computation Handlers ---

    const updateComputationalResult = (result: number) => {
        setComputationResult(result);
        setIsComputing(false);
    };

    const heavyComputation = () => {
        'worklet';
        // This runs in the background worklet runtime!
        let sum = 0;
        for (let i = 0; i < 99999999; i++) {
            sum += i;
        }
        // Send result back to JS thread to update React state
        runOnJS(updateComputationalResult)(sum);
    };

    const handleHeavyTask = () => {
        setIsComputing(true);
        setComputationResult(null);
        // Execute heavy computation on the background thread so JS & UI threads remain responsive
        runOnRuntime(backgroundRuntime, heavyComputation)();
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* Background Atmosphere */}
            <View style={[styles.bgCircle, styles.circleTopLeft]} />
            <View style={[styles.bgCircle, styles.circleBottomRight]} />

            <View style={styles.header}>
                <Text style={styles.title}>Multithreading Concept</Text>
                <Text style={styles.subtitle}>JS Thread  •  UI Thread  •  Background</Text>
            </View>

            <View style={styles.notesContainer}>
                <Text style={styles.notesTitle}>How It Works 💡</Text>
                
                <Text style={styles.noteText}>
                    <Text style={[styles.boldNote, { color: '#fbbf24' }]}>1. JS Thread:</Text> Handles React state and business logic. If you block this, UI might freeze and state won't update.
                </Text>
                
                <Text style={styles.noteText}>
                    <Text style={[styles.boldNote, { color: '#a78bfa' }]}>2. UI Thread:</Text> Executes Native code and Reanimated animations. Runs at a smooth 60-120fps independently of the JS thread.
                </Text>
                
                <Text style={styles.noteText}>
                    <Text style={[styles.boldNote, { color: '#38bdf8' }]}>3. Background Runtime:</Text> Uses Worklets to run heavy computations on a secondary thread, leaving JS & UI threads completely free to stay responsive!
                </Text>
            </View>

            <GestureDetector gesture={handleTap}>
                <Animated.View style={[styles.box, animatedBoxStyle]}>
                    <View style={styles.boxInner}>
                        <Animated.View style={[styles.spinner, animatedIndicatorStyle]} />
                        <Text style={styles.boxText}>Tap Me!</Text>
                        <Text style={styles.countText}>React JS State: {count}</Text>
                    </View>
                </Animated.View>
            </GestureDetector>

            <View style={styles.statusContainer}>
               {isComputing && (
                   <View style={styles.statusRow}>
                        <ActivityIndicator color={"#38bdf8"} />
                        <Text style={styles.statusTextComputing}>Background Task Running...</Text>
                   </View>
               )}
               {computationResult !== null && (
                   <Text style={styles.statusTextSuccess}>Task Result: {computationResult} ✓</Text>
               )}
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={[styles.button, styles.btnSecondary]} onPress={handleHeavyTask} activeOpacity={0.8}>
                    <Text style={[styles.btnText, { color: '#38bdf8' }]}>Simulate Heavy Background Task</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.btnPrimary]} onPress={handleMoveBox} activeOpacity={0.8}>
                    <Text style={styles.btnText}>Trigger UI Thread Animation</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default Threading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        paddingTop: 70,
    },
    bgCircle: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.12,
    },
    circleTopLeft: {
        top: -100,
        left: -150,
        backgroundColor: '#a78bfa',
    },
    circleBottomRight: {
        bottom: -150,
        right: -100,
        backgroundColor: '#38bdf8',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    title: {
        color: '#f8fafc',
        fontSize: 26,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 13,
        marginTop: 6,
        fontWeight: '700',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    notesContainer: {
        width: width * 0.9,
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        padding: 22,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        marginBottom: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    notesTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    noteText: {
        color: '#cbd5e1',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 12,
        fontWeight: '500',
    },
    boldNote: {
        fontWeight: '800',
    },
    box: {
        width: width * 0.42,
        height: width * 0.42,
        backgroundColor: 'rgba(167, 139, 250, 0.15)',
        borderRadius: 28,
        borderWidth: 1.5,
        borderColor: 'rgba(167, 139, 250, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: width * 0.05,
        shadowColor: '#a78bfa',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    boxInner: {
        alignItems: 'center',
    },
    spinner: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 3.5,
        borderColor: 'rgba(255,255,255,0.1)',
        borderTopColor: '#f8fafc',
        marginBottom: 16,
    },
    boxText: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    countText: {
        color: '#a78bfa',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    statusContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.2)',
    },
    statusTextComputing: {
        color: '#38bdf8',
        fontSize: 14,
        fontWeight: '700',
    },
    statusTextSuccess: {
        color: '#4ade80',
        fontSize: 15,
        fontWeight: '700',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.3)',
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 24,
        gap: 16,
    },
    button: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    btnPrimary: {
        backgroundColor: '#a78bfa',
    },
    btnSecondary: {
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderWidth: 1.5,
        borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    btnText: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});