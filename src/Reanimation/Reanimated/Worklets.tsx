import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnUI,
    runOnJS,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// ---------------------------------------------------------------------------
// 🧠 WHAT ARE WORKLETS?
// Worklets are tiny JavaScript functions that run on the UI thread.
// Unlike normal React Native JS code, which runs on the JavaScript thread
// and must communicate with the UI thread via a bridge (which takes time),
// worklets execute directly on the UI thread for maximum performance.
// 
// You can identify a worklet by the 'worklet'; directive at the top of the function.
// ---------------------------------------------------------------------------

export default function Worklets() {
    const [jsCounter, setJsCounter] = useState(0); // State on the JS thread

    // Shared values live on the UI thread but can be read/written from JS
    const boxScale = useSharedValue(1);
    const boxRotation = useSharedValue(0);
    const boxColor = useSharedValue('#6366f1'); // Initial indigo color

    // Array of colors for our worklet to pick from
    const colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444'];

    // 1️⃣ A function running on the JS Thread
    // This is a normal React function. We will call this from our UI Worklet.
    const updateJSCounter = (newValue: number) => {
        setJsCounter(newValue);
    };

    // 2️⃣ A standalone Worklet function (runs on UI Thread)
    // This does the heavy lifting instantly on the UI side without bridge delays.
    const complexUIWorklet = (currentJsValue: number) => {
        'worklet'; // 👈 This directive tells Reanimated to compile this for the UI thread

        // Perform animations directly on the UI Thread
        boxScale.value = withSpring(Math.random() * 0.5 + 1, { damping: 12 }); // Scale between 1 and 1.5
        boxRotation.value = withSpring(Math.random() * 360, { damping: 15 }); // Rotate randomly up to 360deg

        // Pick a random color from the captured colors array
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        boxColor.value = withTiming(randomColor, { duration: 400 });

        // 💡 IMPORTANT: We can't update JS state directly from a UI worklet.
        // We MUST use `runOnJS` to send data back to the JavaScript thread.
        const newCounterValue = currentJsValue + 1;
        runOnJS(updateJSCounter)(newCounterValue);
    };

    // 3️⃣ A function to trigger our worklet from JS
    const handlePress = () => {
        // `runOnUI` is used to call a worklet from the JS thread.
        // We pass the current JS state to the worklet function.
        runOnUI(complexUIWorklet)(jsCounter);
    };

    // Animated style that reacts to shared value changes on the UI thread
    const animatedBoxStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: boxScale.value },
                { rotate: `${boxRotation.value}deg` }
            ],
            backgroundColor: boxColor.value,
            shadowColor: boxColor.value, // Animate shadow color with the box!
        };
    });

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="flash" size={32} color="#14b8a6" />
                </View>
                <Text style={styles.title}>Worklets</Text>
                <Text style={styles.subtitle}>Supercharging the UI Thread</Text>
            </View>

            {/* Main Interactive Area */}
            <View style={styles.content}>

                {/* The Animated Box */}
                <Animated.View style={[styles.box, animatedBoxStyle]}>
                    <Text style={styles.boxText}>UI</Text>
                </Animated.View>

                {/* Info Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>JS Thread Callback Count</Text>
                        <Text style={styles.statValue}>{jsCounter}</Text>
                        <Text style={styles.statDesc}>Updated asynchronously via runOnJS</Text>
                    </View>
                </View>

                {/* Trigger Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={handlePress}
                >
                    <Text style={styles.buttonText}>Run Worklet</Text>
                    <MaterialCommunityIcons name="cog-outline" size={22} color="#fff" style={styles.buttonIcon} />
                </Pressable>

                {/* Explanation Card */}
                <View style={styles.infoCard}>
                    <MaterialCommunityIcons name="information-outline" size={28} color="#6366f1" style={styles.infoIcon} />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Behind the Scenes</Text>
                        <Text style={styles.infoText}>
                            1. Tap the button to trigger a function using <Text style={styles.code}>runOnUI()</Text>.{"\n"}
                            2. The Worklet performs complex math and animation instantly on the UI thread.{"\n"}
                            3. Finally, the Worklet uses <Text style={styles.code}>runOnJS()</Text> to safely update our React Native state.
                        </Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Clean and deep space background
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 60,
        alignItems: 'center',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(20, 184, 166, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(20, 184, 166, 0.3)',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#f8fafc',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        marginTop: 8,
        fontWeight: '500',
    },

    box: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40, // Space below the box
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
        elevation: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
    },
    boxText: {
        fontSize: 36,
        fontWeight: '900',
        color: '#ffffff',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    statsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    statCard: {
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(203, 213, 225, 0.1)',
    },
    statLabel: {
        fontSize: 12,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontWeight: '700',
    },
    statValue: {
        fontSize: 56,
        fontWeight: '900',
        color: '#14b8a6', // Teal highlighted numbers
        marginVertical: 4,
    },
    statDesc: {
        fontSize: 13,
        color: '#64748b',
        fontStyle: 'italic',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6366f1',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 20,
        width: '100%',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        marginBottom: 30,
        elevation: 8,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.97 }],
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '800',
        marginRight: 12,
        letterSpacing: 0.5,
    },
    buttonIcon: {
        marginTop: 2,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        borderLeftWidth: 4,
        borderLeftColor: '#6366f1',
        alignItems: 'flex-start',
    },
    infoIcon: {
        marginTop: 2,
    },
    infoTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#e2e8f0',
        marginBottom: 10,
        letterSpacing: 0.3,
    },
    infoText: {
        fontSize: 14,
        color: '#94a3b8',
        lineHeight: 24,
        fontWeight: '500',
    },
    code: {
        fontFamily: 'monospace',
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: '#38bdf8',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        fontSize: 13,
        overflow: 'hidden',
    }
});