import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInRight,
    FadeInLeft,
    FadeInUp,
    FadeInDown,
    FadeOut,
    FadeOutRight,
    FadeOutLeft,
    FadeOutUp,
    FadeOutDown,
    BounceIn,
    BounceInRight,
    BounceInLeft,
    BounceInUp,
    BounceInDown,
    BounceOut,
    BounceOutRight,
    BounceOutLeft,
    BounceOutUp,
    BounceOutDown,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ANIMATIONS = [
    { name: 'Fade', enter: FadeIn, exit: FadeOut },
    { name: 'Fade Right', enter: FadeInRight, exit: FadeOutRight },
    { name: 'Fade Left', enter: FadeInLeft, exit: FadeOutLeft },
    { name: 'Fade Up', enter: FadeInUp, exit: FadeOutUp },
    { name: 'Fade Down', enter: FadeInDown, exit: FadeOutDown },
    { name: 'Bounce', enter: BounceIn, exit: BounceOut },
    { name: 'Bounce Right', enter: BounceInRight, exit: BounceOutRight },
    { name: 'Bounce Left', enter: BounceInLeft, exit: BounceOutLeft },
    { name: 'Bounce Up', enter: BounceInUp, exit: BounceOutUp },
    { name: 'Bounce Down', enter: BounceInDown, exit: BounceOutDown },
];

const AnimationCard = ({ item }: { item: any }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Auto layout effect to re-trigger the animation when toggled off
    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <TouchableOpacity
                    onPress={handleToggle}
                    style={styles.toggleBtn}
                    activeOpacity={0.7}>
                    <MaterialCommunityIcons
                        name={isVisible ? 'refresh' : 'play'}
                        size={20}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.animationContainer}>
                {isVisible && (
                    <Animated.View
                        entering={item.enter?.duration(600)}
                        exiting={item.exit?.duration(600)}
                        style={styles.box}>
                        <Text style={styles.boxText}>Reanimated</Text>
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const EnterExist = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Enter & Exit</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.subtitle}>
                    Tap the play/refresh icon to toggle the enter and exit animations.
                </Text>
                {ANIMATIONS.map((item, index) => (
                    <AnimationCard key={index} item={item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default EnterExist;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2A',
        marginTop: 25
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    placeholder: {
        width: 42,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    subtitle: {
        fontSize: 15,
        color: '#A0A0A0',
        marginBottom: 24,
        lineHeight: 22,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    toggleBtn: {
        backgroundColor: '#6366F1',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    animationContainer: {
        height: 120,
        backgroundColor: '#121212',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    box: {
        backgroundColor: '#8B5CF6',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    boxText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 16,
        letterSpacing: 1.2,
    },
});