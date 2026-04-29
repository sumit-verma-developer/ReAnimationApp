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
                    onPress={() => navigation.navigate('RnAnimatedHome' as never)}
                >
                    <Text style={styles.cardTitle}>React-native-Animated Api </Text>
                    <Text style={styles.cardSub}>
                        Animations • Gestures • mostly run on js thread (use for small animation)
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('ReanimatedHome' as never)}
                >
                    <Text style={styles.cardTitle}>Reanimation by sofware mansion</Text>
                    <Text style={styles.cardSub}>
                        complex Animations • run of UI thread (use for complex animations)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('RnSkiaHome' as never)}
                >
                    <Text style={styles.cardTitle}>React native Skia </Text>
                    <Text style={styles.cardSub}>
                        2D animations • run of UI thread (use for complex animations)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Home' as never)}
                >
                    <Text style={styles.cardTitle}>Reanimation Better Ui</Text>
                    <Text style={styles.cardSub}>
                        UI • Layout • Project Base
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('TodoListScreen' as never)}
                >
                    <Text style={styles.cardTitle}>Todo App</Text>
                    <Text style={styles.cardSub}>
                        TanStack Query
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('FirestoreScreen' as never)}
                >
                    <Text style={styles.cardTitle}>Firestore</Text>
                    <Text style={styles.cardSub}>
                        Firestore Database
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
