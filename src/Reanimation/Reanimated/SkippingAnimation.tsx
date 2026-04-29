import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import Animated, {
    LayoutAnimationConfig,
    ZoomIn,
    ZoomOut,
    FadeInDown,
    FadeOutDown
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SkippingAnimation = () => {
    const navigation = useNavigation();

    // Visibility
    const [cardVisible, setCardVisible] = useState(true);
    const [statsVisible, setStatsVisible] = useState(true);

    // Parent Config
    const [skipCardEnter, setSkipCardEnter] = useState(false);
    const [skipCardExit, setSkipCardExit] = useState(false);

    // Child Config
    const [skipStatsEnter, setSkipStatsEnter] = useState(true);
    const [skipStatsExit, setSkipStatsExit] = useState(true);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Skipping Animations</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Visual Section */}
                <View style={styles.visualSection}>
                    <LayoutAnimationConfig skipEntering={skipCardEnter} skipExiting={skipCardExit}>
                        {cardVisible && (
                            <Animated.View
                                entering={ZoomIn.springify().damping(14)}
                                exiting={ZoomOut.springify().damping(14)}
                                style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIconBox}>
                                        <MaterialCommunityIcons name="credit-card-outline" size={28} color="#A78BFA" />
                                    </View>
                                    <View style={styles.cardHeaderTexts}>
                                        <Text style={styles.cardTitle}>Classic Card</Text>
                                        <Text style={styles.cardSubtitle}>**** 4291</Text>
                                    </View>
                                </View>

                                {/* Inner Component configuration */}
                                <LayoutAnimationConfig skipEntering={skipStatsEnter} skipExiting={skipStatsExit}>
                                    {statsVisible && (
                                        <Animated.View
                                            style={styles.statsBox}
                                            entering={FadeInDown.delay(200).springify().damping(14)}
                                            exiting={FadeOutDown.springify().damping(14)}>
                                            <Text style={styles.statsLabel}>Total Balance</Text>
                                            <Text style={styles.statsValue}>$12,450.00</Text>
                                        </Animated.View>
                                    )}
                                </LayoutAnimationConfig>
                            </Animated.View>
                        )}
                    </LayoutAnimationConfig>
                </View>

                {/* Control Panel Section */}
                <View style={styles.controlSection}>
                    <Text style={styles.sectionTitle}>Visibility Controls</Text>

                    <View style={styles.controlRow}>
                        <View style={styles.controlLabelContainer}>
                            <MaterialCommunityIcons name="credit-card" size={20} color="#9CA3AF" />
                            <Text style={styles.controlLabel}>Parent Card</Text>
                        </View>
                        <Switch
                            value={cardVisible}
                            onValueChange={setCardVisible}
                            trackColor={{ false: '#374151', true: '#8B5CF6' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.controlRow}>
                        <View style={styles.controlLabelContainer}>
                            <MaterialCommunityIcons name="chart-box-outline" size={20} color="#9CA3AF" />
                            <Text style={styles.controlLabel}>Child Stats</Text>
                        </View>
                        <Switch
                            value={statsVisible}
                            onValueChange={setStatsVisible}
                            trackColor={{ false: '#374151', true: '#8B5CF6' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Animation Config (Parent)</Text>

                    <View style={styles.controlRow}>
                        <View style={styles.controlLabelContainer}>
                            <MaterialCommunityIcons name="skip-next" size={20} color="#EC4899" />
                            <Text style={styles.controlLabel}>Skip Entering</Text>
                        </View>
                        <Switch
                            value={skipCardEnter}
                            onValueChange={setSkipCardEnter}
                            trackColor={{ false: '#374151', true: '#EC4899' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.controlRow}>
                        <View style={styles.controlLabelContainer}>
                            <MaterialCommunityIcons name="skip-previous" size={20} color="#EC4899" />
                            <Text style={styles.controlLabel}>Skip Exiting</Text>
                        </View>
                        <Switch
                            value={skipCardExit}
                            onValueChange={setSkipCardExit}
                            trackColor={{ false: '#374151', true: '#EC4899' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Animation Config (Child)</Text>

                    <View style={styles.controlRow}>
                        <View style={styles.controlLabelContainer}>
                            <MaterialCommunityIcons name="skip-next" size={20} color="#10B981" />
                            <Text style={styles.controlLabel}>Skip Entering</Text>
                        </View>
                        <Switch
                            value={skipStatsEnter}
                            onValueChange={setSkipStatsEnter}
                            trackColor={{ false: '#374151', true: '#10B981' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.controlRow}>
                        <View style={styles.controlLabelContainer}>
                            <MaterialCommunityIcons name="skip-previous" size={20} color="#10B981" />
                            <Text style={styles.controlLabel}>Skip Exiting</Text>
                        </View>
                        <Switch
                            value={skipStatsExit}
                            onValueChange={setSkipStatsExit}
                            trackColor={{ false: '#374151', true: '#10B981' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                </View>

            </ScrollView>
        </View>
    );
};

export default SkippingAnimation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090B',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#09090B',
        zIndex: 10,
    },
    backButton: {
        padding: 10,
        borderRadius: 14,
        backgroundColor: '#18181B',
        borderWidth: 1,
        borderColor: '#27272A',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    placeholder: {
        width: 46,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    visualSection: {
        minHeight: 320,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: '#18181B',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#27272A',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardIconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cardHeaderTexts: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F4F4F5',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#A1A1AA',
    },
    statsBox: {
        backgroundColor: '#27272A',
        borderRadius: 16,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#10B981',
    },
    statsLabel: {
        fontSize: 13,
        color: '#A1A1AA',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    statsValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    controlSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#A1A1AA',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
        marginLeft: 4,
    },
    controlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#18181B',
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#27272A',
    },
    controlLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#F4F4F5',
        marginLeft: 12,
    },
});