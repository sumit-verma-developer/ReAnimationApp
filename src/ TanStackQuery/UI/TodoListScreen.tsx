import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { useTodos, useDeleteTodo, useUpdateTodo } from '../hooks/useTodos';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';

const TodoListScreen = ({ navigation }: any) => {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useTodos();

    const { mutate: deleteTodo, isPending: isDeleting, variables: deletingId } = useDeleteTodo();
    const { mutate: updateTodo, isPending: isUpdating, variables: updatingId } = useUpdateTodo();

    const todos = data?.pages.flatMap((page: any[]) => page) ?? [];

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const height = interpolate(scrollY.value, [0, 90], [90, 0], 'clamp');
        const opacity = interpolate(scrollY.value, [0, 60], [1, 0], 'clamp');
        const translateY = interpolate(scrollY.value, [0, 90], [0, -20], 'clamp');

        return {
            height,
            opacity,
            transform: [{ translateY }],
            justifyContent: 'center',
            overflow: 'hidden',
        };
    });

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Text
                style={[
                    styles.todoText,
                    item.completed && { textDecorationLine: 'line-through', color: 'gray' }
                ]}
                numberOfLines={2}
            >
                {item.title}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => deleteTodo(item.id)}
                    style={styles.deleteButton}
                    disabled={isDeleting && deletingId === item.id}
                >
                    {isDeleting && deletingId === item.id ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.deleteText}>Delete</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => updateTodo({ id: item.id, updates: { completed: !item.completed } })}
                    style={[styles.updateButton, item.completed && { backgroundColor: '#faad14' }]}
                    disabled={isUpdating && updatingId?.id === item.id}
                >
                    {isUpdating && updatingId?.id === item.id ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.updateText}>
                            {item.completed ? 'Mark Pending' : 'Mark Done'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <StatusBar barStyle={"dark-content"} />
            <View style={styles.container}>
                <Animated.View style={headerAnimatedStyle}>
                    <Text style={[styles.header, { marginBottom: 0 }]}>My Todos</Text>
                </Animated.View>

                {isLoading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#4f46e5" />
                    </View>
                ) : isError ? (
                    <View style={styles.centered}>
                        <Text style={{ color: 'red' }}>Error fetching todos.</Text>
                    </View>
                ) : (
                    <Animated.FlatList
                        showsVerticalScrollIndicator={false}
                        data={todos}
                        keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
                        renderItem={renderItem}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={
                            <Text style={styles.empty}>No Todos Yet !</Text>
                        }
                        ListFooterComponent={
                            isFetchingNextPage ? (
                                <View style={{ paddingVertical: 20 }}>
                                    <ActivityIndicator size="large" color="#4f46e5" />
                                </View>
                            ) : <View style={{ height: 20 }} />
                        }
                        removeClippedSubviews={true}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                    />
                )}

                {/* Floating Button */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('CreateTodoScreen')}
                >
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TodoListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        // marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
    },
    todoText: {
        fontSize: 16,
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        color: 'gray',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#4f46e5',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: {
        color: '#fff',
        fontSize: 28,
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    updateButton: {
        backgroundColor: '#4f46e5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    updateText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});