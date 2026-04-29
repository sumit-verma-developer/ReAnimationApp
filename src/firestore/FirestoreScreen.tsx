import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StatusBar,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

interface UserData {
    id: string;
    name?: string;
    email?: string;
    role?: string;
}

const FirestoreScreen = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

    useEffect(() => {
        // Real-time listener for the 'users' collection
        const unsubscribe = firestore()
            .collection('users')
            .onSnapshot(
                querySnapshot => {
                    const usersList: UserData[] = [];
                    if (querySnapshot) {
                        querySnapshot.forEach(documentSnapshot => {
                            usersList.push({
                                ...documentSnapshot.data(),
                                id: documentSnapshot.id,
                            } as UserData);
                        });
                    }
                    console.log("usersList", usersList)
                    setUsers(usersList);
                    setLoading(false);
                },
                error => {
                    console.error("Firestore Snapshot Error: ", error);
                    setLoading(false);
                }
            );

        // Unsubscribe from events when no longer in use
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }: { item: UserData }) => {
        const displayName = item.name || 'Unknown User';
        const displayEmail = item.email || 'No email provided';

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>
                            {displayName.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName} numberOfLines={1}>{displayName}</Text>
                        <Text style={styles.userEmail} numberOfLines={1}>{displayEmail}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                    >
                        <MaterialCommunityIcons name={activeDropdownId === item.id ? "chevron-up" : "dots-horizontal"} color="#94A3B8" size={24} />
                    </TouchableOpacity>
                </View>

                {activeDropdownId === item.id && (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteUser(item.id)}
                    >
                        <MaterialCommunityIcons name="delete-outline" color="#EF4444" size={20} />
                        <Text style={styles.deleteButtonText}>Delete User</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleAddUserSubmit = async () => {
        if (!newName.trim() || !newEmail.trim()) return;

        if (!validateEmail(newEmail)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setEmailError('');

        try {
            const newUser = {
                name: newName,
                email: newEmail,
                role: 'User',
                createdAt: firestore.FieldValue.serverTimestamp(),
            };
            const result = await firestore().collection('users').add(newUser);
            console.log("User added with ID: ", result.id);

            // Reset form
            setNewName('');
            setNewEmail('');
            setEmailError('');
            setModalVisible(false);
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await firestore().collection('users').doc(id).delete();
            setActiveDropdownId(null);
            console.log("User deleted with ID: ", id);
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Firestore Users</Text>
                <TouchableOpacity style={styles.headerRightButton}>
                    <MaterialCommunityIcons name="magnify" color="#1A1A1A" size={28} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color="#6366F1" />
                        <Text style={styles.loadingText}>Fetching Real-time Data...</Text>
                    </View>
                ) : users.length === 0 ? (
                    <View style={styles.centerContainer}>
                        <View style={styles.emptyIconContainer}>
                            <MaterialCommunityIcons name="database-off-outline" size={48} color="#94A3B8" />
                        </View>
                        <Text style={styles.emptyTitle}>No users found</Text>
                        <Text style={styles.emptySubtext}>Waiting for data in your Firestore collection.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={users}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.9}
                onPress={() => setModalVisible(true)}
            >
                <MaterialCommunityIcons name="plus" color="#FFFFFF" size={32} />
            </TouchableOpacity>

            {/* Add User Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => {
                        setModalVisible(false);
                        setEmailError('');
                    }}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New User</Text>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false);
                                setEmailError('');
                            }}>
                                <MaterialCommunityIcons name="close" size={24} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter user name"
                            placeholderTextColor="#94A3B8"
                            value={newName}
                            onChangeText={setNewName}
                        />

                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={[styles.input, emailError ? styles.inputError : null]}
                            placeholder="Enter user email"
                            placeholderTextColor="#94A3B8"
                            value={newEmail}
                            onChangeText={(text) => {
                                setNewEmail(text);
                                if (emailError) setEmailError('');
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <TouchableOpacity style={styles.submitButton} onPress={handleAddUserSubmit}>
                            <Text style={styles.submitButtonText}>Add User</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default FirestoreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 4,
        zIndex: 10,
    },
    backButton: {
        padding: 6,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    headerRightButton: {
        padding: 6,
        borderRadius: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100, // Space for FAB
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
    },
    emptyIconContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#E0E7FF',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4F46E5',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    actionButton: {
        padding: 8,
    },
    fab: {
        position: 'absolute',
        bottom: 32,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
        zIndex: 20,
    },
    deleteButton: {
        backgroundColor: '#FEF2F2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    deleteButtonText: {
        color: '#EF4444',
        fontWeight: '600',
        marginLeft: 4,
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1E293B',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1E293B',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#6366F1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: -16,
        marginBottom: 20,
        marginLeft: 4,
    },
    inputError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },
});