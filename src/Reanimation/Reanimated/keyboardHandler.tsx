import { StyleSheet, Text, View, TextInput, Keyboard, Platform, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, useAnimatedKeyboard } from 'react-native-reanimated'

const KeyboardHandler = () => {
    // We use a shared value to track the keyboard height smoothly
    const keyboardHeight = useSharedValue(0);
    // const keyboard = useAnimatedKeyboard()

    useEffect(() => {
        // Listen to keyboard show/hide events. 
        // iOS uses keyboardWillShow/Hide for smoother animation before the keyboard appears.
        // Android uses keyboardDidShow/Hide.
        const showSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                keyboardHeight.value = withTiming(e.endCoordinates.height, {
                    duration: e.duration || 250,
                    easing: Easing.out(Easing.exp),
                });
            }
        );
        const hideSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => {
                keyboardHeight.value = withTiming(0, {
                    duration: e.duration || 250,
                    easing: Easing.out(Easing.exp),
                });
            }
        );

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // Animate the bottom padding of our wrapper so content flows upwards natively
    const animatedWrapperStyle = useAnimatedStyle(() => {
        return {
            paddingBottom: keyboardHeight.value,
        };
    });

    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Visual Background Elements */}
                <View style={styles.bgCircle1} />
                <View style={styles.bgCircle2} />

                <Animated.View style={[styles.innerContainer, animatedWrapperStyle]}>
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.header}>
                            <Text style={styles.title}>Get in Touch</Text>
                            <Text style={styles.subtitle}>We'd love to hear from you. Please fill out your details below.</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor="#6b7280"
                                value={form.name}
                                onChangeText={(t) => setForm({ ...form, name: t })}
                            />

                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="john@example.com"
                                placeholderTextColor="#6b7280"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={form.email}
                                onChangeText={(t) => setForm({ ...form, email: t })}
                            />

                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+1 234 567 8900"
                                placeholderTextColor="#6b7280"
                                keyboardType="phone-pad"
                                value={form.phone}
                                onChangeText={(t) => setForm({ ...form, phone: t })}
                            />

                            <Text style={styles.label}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Type your message here..."
                                placeholderTextColor="#6b7280"
                                multiline
                                value={form.message}
                                onChangeText={(t) => setForm({ ...form, message: t })}
                            />

                            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                                <Text style={styles.buttonText}>Send Message</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.ScrollView>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default KeyboardHandler

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    bgCircle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
    },
    bgCircle2: {
        position: 'absolute',
        bottom: 100,
        left: -150,
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
    },
    innerContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        lineHeight: 24,
    },
    card: {
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#cbd5e1',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#f8fafc',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
        paddingTop: 16,
    },
    button: {
        backgroundColor: '#38bdf8',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#38bdf8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    buttonText: {
        color: '#0f172a',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
})