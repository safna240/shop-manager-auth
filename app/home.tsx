import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

// The "export default" is the most important part!
export default function Home() {
    const router = useRouter();

    const handleLogout = () => {
        // Sends the user back to Login and clears the navigation history
        router.replace('/login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>✓</Text>
                </View>

                <Text style={styles.welcomeText}>Welcome Home!</Text>
                <Text style={styles.subText}>You have successfully logged into the Shop Manager system.</Text>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#151C48',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    logoutBtn: {
        backgroundColor: '#151C48',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    logoutBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});