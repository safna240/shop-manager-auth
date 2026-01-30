import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../services/api';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            // Calls the API
            await loginUser({ email, password });

            // Success: Move to Home screen and remove login from history
            router.replace('/home');
        } catch (error: any) {
            const msg = error.response?.data?.error || "Invalid email or password";
            Alert.alert("Login Failed", msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    {/* CSS LOGO - No image file needed */}
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoTextSymbol}>L</Text>
                    </View>
                    <Text style={styles.brandName}>ledgers{"\n"}daily</Text>
                    <Text style={styles.tagline}>Manage your business with ease</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.btnText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={() => router.push('/signup')}
                    >
                        <Text style={styles.registerText}>
                            Don't have an account? <Text style={styles.boldText}>Register</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151C48',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'white',
        width: '85%',
        borderRadius: 25,
        padding: 30,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    logoContainer: { alignItems: 'center', marginBottom: 20 },
    logoCircle: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#E1E8FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoTextSymbol: { color: '#151C48', fontSize: 28, fontWeight: 'bold' },
    brandName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#151C48',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 30
    },
    tagline: { color: '#8A8A8A', fontSize: 12, marginTop: 5 },
    form: { width: '100%', marginTop: 15 },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        backgroundColor: '#FBFBFB'
    },
    loginBtn: {
        backgroundColor: '#151C48',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12
    },
    registerBtn: {
        marginTop: 10,
        alignItems: 'center'
    },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    registerText: { color: '#666', fontSize: 14 },
    boldText: { color: '#151C48', fontWeight: 'bold' }
});