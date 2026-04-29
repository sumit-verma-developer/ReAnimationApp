import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import Animated, {
    LinearTransition,
    FadeInUp,
    FadeOutDown,
    FadeIn,
    FadeOut,
    ZoomIn,
    ZoomOut
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// Premium color palette for cards
const COLORS = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#14B8A6', // Teal
];

const NAMES = [
    'Nova', 'Echo', 'Horizon', 'Luna', 'Apex', 'Zenith', 'Pulse', 'Aura'
];

interface CardItem {
    id: number;
    title: string;
    color: string;
    size: 'small' | 'large';
}

const LayoutTransition = () => {
    const navigation = useNavigation();

    const [items, setItems] = useState<CardItem[]>([
        { id: 1, title: 'Nova', color: '#8B5CF6', size: 'large' },
        { id: 2, title: 'Echo', color: '#10B981', size: 'small' },
        { id: 3, title: 'Luna', color: '#EC4899', size: 'small' },
    ]);

    const [nextId, setNextId] = useState(4);

    const addItem = () => {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        const randomSize = Math.random() > 0.6 ? 'large' : 'small';

        const newItem: CardItem = {
            id: nextId,
            title: `${randomName} ${nextId}`,
            color: randomColor,
            size: randomSize,
        };

        // Insert at random position to show off layout transition
        const insertIndex = Math.floor(Math.random() * (items.length + 1));
        const newItems = [...items];
        newItems.splice(insertIndex, 0, newItem);

        setItems(newItems);
        setNextId(prev => prev + 1);
    };

    const removeItem = (idToRemove: number) => {
        setItems(items.filter(item => item.id !== idToRemove));
    };

    const shuffleItems = () => {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        setItems(shuffled);
    };

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
                <Text style={styles.headerTitle}>Layout Transitions</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.addButton]}
                    onPress={addItem}
                    activeOpacity={0.8}>
                    <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Add Item</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.shuffleButton]}
                    onPress={shuffleItems}
                    activeOpacity={0.8}>
                    <MaterialCommunityIcons name="shuffle" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Shuffle</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>

                <Text style={styles.subtitle}>
                    Tap an item to remove it. Notice how the remaining items fluidly transition to their new layouts.
                </Text>

                <View style={styles.gridContainer}>
                    {items.map((item) => {
                        const isLarge = item.size === 'large';
                        return (
                            <Animated.View
                                key={item.id}
                                layout={LinearTransition.springify().damping(16).stiffness(120)}
                                entering={ZoomIn.springify().damping(14).stiffness(120)}
                                exiting={ZoomOut.duration(200)}
                                style={[
                                    styles.card,
                                    { backgroundColor: item.color },
                                    isLarge ? styles.cardLarge : styles.cardSmall
                                ]}>
                                <TouchableOpacity
                                    style={styles.cardTouchable}
                                    activeOpacity={0.9}
                                    onPress={() => removeItem(item.id)}>
                                    <View style={styles.cardContent}>
                                        <MaterialCommunityIcons
                                            name={isLarge ? "star-four-points" : "circle-slice-8"}
                                            size={isLarge ? 32 : 24}
                                            color="#FFFFFF"
                                            style={styles.cardIcon}
                                        />
                                        <Text style={styles.cardText}>{item.title}</Text>
                                    </View>
                                    <View style={styles.removeIconContainer}>
                                        <MaterialCommunityIcons name="close" size={16} color="rgba(255,255,255,0.7)" />
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </View>

                {items.length === 0 && (
                    <Animated.View
                        entering={FadeIn.delay(300)}
                        exiting={FadeOut}
                        style={styles.emptyState}>
                        <MaterialCommunityIcons name="view-grid-plus-outline" size={64} color="#333333" />
                        <Text style={styles.emptyStateText}>No items remaining</Text>
                        <Text style={styles.emptyStateSubtext}>Add some items to see the layout transitions in action.</Text>
                    </Animated.View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LayoutTransition;

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
    controlsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 16,
        gap: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    addButton: {
        backgroundColor: '#6366F1',
        shadowColor: '#6366F1',
    },
    shuffleButton: {
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: '#333333',
        shadowColor: '#000000',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    cardSmall: {
        width: (width - 40 - 12) / 2, // 2 columns
        height: 120,
    },
    cardLarge: {
        width: width - 40, // full width minus padding
        height: 140,
    },
    cardTouchable: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    cardContent: {
        flex: 1,
    },
    cardIcon: {
        marginBottom: 12,
        opacity: 0.9,
    },
    cardText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    removeIconContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyStateText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#666666',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 15,
        color: '#444444',
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 32,
    }
});
