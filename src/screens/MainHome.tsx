import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Snowfall from '../components/snowfall/Snowfall'

const MainHome = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.mainContainer}>
            {/* ❄️ Snow Background */}
            <Snowfall />

            {/* 🌑 Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Welcome ❄️</Text>
                <Text style={styles.subtitle}>
                    Reanimated Playground
                </Text>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('LearningReanimationHome' as never)}
                >
                    <Text style={styles.cardTitle}>Reanimated Lab</Text>
                    <Text style={styles.cardSub}>
                        Animations • Gestures • Transitions
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Home' as never)}
                >
                    <Text style={styles.cardTitle}>Home Screen</Text>
                    <Text style={styles.cardSub}>
                        UI • Layout • Practice
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainHome


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0B0F1A', // night sky
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        zIndex: 10,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 30,
    },

    card: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 18,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    cardSub: {
        marginTop: 6,
        fontSize: 13,
        color: '#9CA3AF',
    },
})
