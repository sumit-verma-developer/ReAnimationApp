import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
} from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { ScreenData } from './ScreenData'
import { useNavigation } from '@react-navigation/native'

const LearningReanimationHome = () => {
    const progress = useSharedValue(0)
    const navigation = useNavigation()

    const onPress = (item: string) => {
        navigation.navigate(item as never)
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.card}
                onPress={() => onPress(item.name)}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.cardIndex}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </Text>

                    <Text style={styles.cardTitle}>{item.name}</Text>

                    <Text style={styles.cardSubTitle}>
                        Tap to explore animation
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Reanimated Lab 🚀</Text>
                <Text style={styles.headerSubtitle}>
                    Master animations step by step
                </Text>
            </View>

            {/* List */}
            <FlatList
                data={ScreenData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default LearningReanimationHome


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F6F7FB',
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },

    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 6,
    },

    listContainer: {
        padding: 20,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,

        // Shadow (iOS)
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },

        // Shadow (Android)
        elevation: 4,
    },

    cardContent: {
        flexDirection: 'column',
    },

    cardIndex: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: 4,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },

    cardSubTitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 6,
    },
})
