import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import Animated, {
    LinearTransition,
    JumpingTransition,
    CurvedTransition,
    FadeInDown,
    FadeOutUp,
    SlideOutRight,
    SlideInLeft
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const INITIAL_DATA = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    title: `Animated Card ${i + 1}`,
    color: `hsl(${i * 55}, 85%, 65%)`
}));

type ItemType = {
    id: number;
    title: string;
    color: string;
};

export default function ListLayoutAnimations() {
    const [items, setItems] = useState<ItemType[]>(INITIAL_DATA);
    const [nextId, setNextId] = useState(INITIAL_DATA.length);
    const [transitionStyle, setTransitionStyle] = useState<'Linear' | 'Jumping' | 'Curved'>('Linear');

    const addRandomItem = () => {
        const randomIndex = Math.floor(Math.random() * (items.length + 1));
        const newItem = {
            id: nextId,
            title: `Animated Card ${nextId + 1}`,
            color: `hsl(${(nextId * 55) % 360}, 85%, 65%)`
        };
        const newItems = [...items];
        newItems.splice(randomIndex, 0, newItem);
        setItems(newItems);
        setNextId(nextId + 1);
    };

    const removeItem = (idToRemove: number) => {
        setItems(items.filter(item => item.id !== idToRemove));
    };

    const shuffleItems = () => {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        setItems(shuffled);
    };

    const getLayout = () => {
        switch (transitionStyle) {
            case 'Jumping': return JumpingTransition;
            case 'Curved': return CurvedTransition.delay(50);
            case 'Linear':
            default: return LinearTransition.springify().damping(14).mass(0.8);
        }
    };

    const toggleTransitionStyle = () => {
        const styles: ('Linear' | 'Jumping' | 'Curved')[] = ['Linear', 'Jumping', 'Curved'];
        const next = (styles.indexOf(transitionStyle) + 1) % styles.length;
        setTransitionStyle(styles[next]);
    };

    const renderItem = ({ item }: { item: ItemType }) => (
        <Animated.View
            entering={FadeInDown.springify().damping(15).mass(0.9)}
            exiting={SlideOutRight.duration(300)}
            layout={getLayout()}
            style={[styles.card, { borderLeftColor: item.color }]}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.avatar, { backgroundColor: item.color }]}>
                    <Text style={styles.avatarText}>{item.id}</Text>
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>Reanimated Layout</Text>
                </View>
                <Pressable
                    style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
                    onPress={() => removeItem(item.id)}
                >
                    <MaterialCommunityIcons name="delete" size={18} color="#FF4757" />
                </Pressable>
            </View>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={['#101016', '#1a1a24']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.title}>List Animations</Text>
                        <Text style={styles.subtitle}>Powered by Reanimated 3</Text>
                    </View>
                    <Pressable style={styles.transitionBadge} onPress={toggleTransitionStyle}>
                        <MaterialCommunityIcons name="swap-horizontal" size={14} color="#00E5FF" />
                        <Text style={styles.transitionText}>{transitionStyle}</Text>
                    </Pressable>
                </View>

                <View style={styles.controls}>
                    <Pressable style={styles.btnPrimary} onPress={addRandomItem}>
                        <LinearGradient colors={['#FF007A', '#7928CA']} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
                            <Text style={styles.btnTextPrimary}>Add Item</Text>
                        </LinearGradient>
                    </Pressable>
                    <Pressable style={styles.btnSecondary} onPress={shuffleItems}>
                        <MaterialCommunityIcons name="shuffle" size={18} color="#FFF" />
                        <Text style={styles.btnTextSecondary}>Shuffle</Text>
                    </Pressable>
                </View>
            </LinearGradient>

            <Animated.FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                itemLayoutAnimation={getLayout()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050508',
    },
    header: {
        paddingTop: 65,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: '#7928CA',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
        zIndex: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#9090A0',
        fontWeight: '500',
        marginTop: 4,
    },
    transitionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 229, 255, 0.25)',
        gap: 6,
    },
    transitionText: {
        color: '#00E5FF',
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    btnPrimary: {
        flex: 1,
        height: 52,
        borderRadius: 26,
        overflow: 'hidden',
        shadowColor: '#FF007A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    btnGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    btnTextPrimary: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 15,
    },
    btnSecondary: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingHorizontal: 22,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        gap: 8,
    },
    btnTextSecondary: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    listContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#121216',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.03)',
        borderLeftWidth: 4,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    avatarText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    cardTextContainer: {
        flex: 1,
        marginLeft: 14,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E0E0E0',
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6A6A7A',
    },
    deleteBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 71, 87, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBtnPressed: {
        opacity: 0.6,
        transform: [{ scale: 0.95 }],
    },
});