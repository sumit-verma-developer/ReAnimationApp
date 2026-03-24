import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { useAddTodo } from '../hooks/useTodos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Priority = 'high' | 'medium' | 'low';

const PRIORITIES: { key: Priority; label: string; color: string }[] = [
    { key: 'high', label: 'High', color: '#7C6AF7' },
    { key: 'medium', label: 'Medium', color: '#f59e0b' },
    { key: 'low', label: 'Low', color: '#94a3b8' },
];

const CreateTodoScreen = ({ navigation }: any) => {
    const [title, setTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [priority, setPriority] = useState<Priority>('high');
    const { mutate: addTodo, isPending } = useAddTodo();

    const handleSave = () => {
        if (!title.trim()) return;
        addTodo(
            { title, completed: false },
            { onSuccess: () => navigation.goBack() }
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back button */}
                    <View style={styles.backRow}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                            activeOpacity={0.7}
                        >
                            <Icon name="chevron-left" size={20} color="#1a1a2e" />
                        </TouchableOpacity>
                        <Text style={styles.backLabel}>Back</Text>
                    </View>

                    {/* Title section */}
                    <View style={styles.titleSection}>
                        <View style={styles.tagRow}>
                            <View style={styles.tagDot} />
                            <Text style={styles.tagText}>NEW TASK</Text>
                        </View>
                        <Text style={styles.heading}>What needs{'\n'}to be done?</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Input */}
                    <View style={[styles.inputBox, isFocused && styles.inputBoxFocused]}>
                        <Icon
                            name="pencil-outline"
                            size={18}
                            color={isFocused ? '#7C6AF7' : '#94a3b8'}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Write your task..."
                            placeholderTextColor="#cbd5e1"
                            value={title}
                            onChangeText={setTitle}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            multiline
                            autoFocus
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Priority */}
                    <Text style={styles.sectionLabel}>PRIORITY</Text>
                    <View style={styles.priorityRow}>
                        {PRIORITIES.map((p) => {
                            const isActive = priority === p.key;
                            return (
                                <TouchableOpacity
                                    key={p.key}
                                    onPress={() => setPriority(p.key)}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.priorityChip,
                                        isActive && {
                                            borderColor: p.color,
                                            backgroundColor: p.color + '18',
                                        },
                                    ]}
                                >
                                    <View style={[styles.chipDot, { backgroundColor: p.color }]} />
                                    <Text
                                        style={[
                                            styles.chipText,
                                            { color: isActive ? p.color : '#64748b' },
                                            isActive && styles.chipTextActive,
                                        ]}
                                    >
                                        {p.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Due date */}
                    <Text style={styles.sectionLabel}>DUE DATE</Text>
                    <TouchableOpacity style={styles.dateRow} activeOpacity={0.7}>
                        <Icon name="calendar-outline" size={16} color="#94a3b8" />
                        <Text style={styles.dateText}>Today</Text>
                        <Icon name="chevron-down" size={16} color="#94a3b8" style={styles.chevron} />
                    </TouchableOpacity>

                    <View style={styles.spacer} />

                    {/* Character count */}
                    <Text style={styles.charCount}>{title.length} characters</Text>

                    {/* Save button */}
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            (!title.trim() || isPending) && styles.saveButtonDisabled,
                        ]}
                        onPress={handleSave}
                        disabled={isPending || !title.trim()}
                        activeOpacity={0.85}
                    >
                        {isPending ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Icon
                                    name="plus"
                                    size={20}
                                    color={title.trim() ? '#fff' : '#94a3b8'}
                                    style={{ marginRight: 8 }}
                                />
                                <Text style={[styles.saveText, !title.trim() && styles.saveTextDisabled]}>
                                    Save task
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CreateTodoScreen;

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: '#F7F6F2',
    },
    scroll: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingTop: Platform.OS === 'ios' ? 60 : 24,
        paddingBottom: 40,
    },

    // Back
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#1a1a2e22',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#64748b',
    },

    // Title
    titleSection: {
        marginBottom: 20,
    },
    tagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    tagDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7C6AF7',
    },
    tagText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#7C6AF7',
        letterSpacing: 1,
    },
    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1a1a2e',
        lineHeight: 36,
        letterSpacing: -0.5,
    },

    divider: {
        height: 0.5,
        backgroundColor: '#1a1a2e15',
        marginBottom: 20,
    },

    // Input
    inputBox: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#1a1a2e10',
        padding: 18,
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: 130,
        marginBottom: 28,
    },
    inputBoxFocused: {
        borderColor: '#7C6AF7',
    },
    inputIcon: {
        marginTop: 2,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a2e',
        lineHeight: 24,
    },

    // Sections
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: 1,
        marginBottom: 10,
    },

    // Priority
    priorityRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    priorityChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#1a1a2e20',
        backgroundColor: '#F7F6F2',
    },
    chipDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#64748b',
    },
    chipTextActive: {
        fontWeight: '700',
    },

    // Date
    dateRow: {
        backgroundColor: '#fff',
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: '#1a1a2e15',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 28,
    },
    dateText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#1a1a2e',
    },
    chevron: {
        marginLeft: 'auto',
    },

    spacer: {
        flex: 1,
        minHeight: 16,
    },

    // Save
    charCount: {
        fontSize: 11,
        color: '#94a3b8',
        textAlign: 'right',
        marginBottom: 12,
    },
    saveButton: {
        backgroundColor: '#1a1a2e',
        borderRadius: 18,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#e2e8f0',
    },
    saveText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.2,
    },
    saveTextDisabled: {
        color: '#94a3b8',
    },
});