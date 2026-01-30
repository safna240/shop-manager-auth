import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    SafeAreaView, ScrollView, ActivityIndicator, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../services/api';

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [organization, setOrganization] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password || !organization) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setLoading(true);
        const payload = {
            user: { name, email, password, password_confirmation: confirmPassword },
            organization: { name: organization },
        };

        try {
            await registerUser(payload);
            Alert.alert("Success", "Registration successful!", [
                { text: "OK", onPress: () => router.replace('/login') }
            ]);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Registration failed";
            Alert.alert("Error", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Back button removed per your request for a cleaner flow */}

                <View style={styles.header}>
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoL}>L</Text>
                    </View>
                    <Text style={styles.brandName}>ledgers{"\n"}daily</Text>
                    <Text style={styles.tagline}>Create your business account</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        placeholder="Full Name"
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                    />
                    <TextInput
                        placeholder="Email Address"
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                    />
                    <TextInput
                        placeholder="Organization Name"
                        style={styles.input}
                        onChangeText={setOrganization}
                        value={organization}
                    />

                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.btnText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => router.replace('/login')}
                    >
                        <Text style={styles.loginLinkText}>
                            Already have an account? <Text style={styles.boldText}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    scrollContent: { padding: 25, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: 30, marginTop: 40 },
    logoCircle: {
        width: 60,
        height: 60,
        backgroundColor: '#E1E8FF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoL: { color: '#151C48', fontWeight: 'bold', fontSize: 28 },
    brandName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#151C48',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 30
    },
    tagline: { color: '#8A8A8A', fontSize: 13, marginTop: 5 },
    form: { marginTop: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        backgroundColor: '#F9F9F9'
    },
    registerBtn: {
        backgroundColor: '#151C48',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10
    },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    loginLink: { marginTop: 20, alignItems: 'center' },
    loginLinkText: { color: '#666', fontSize: 14 },
    boldText: { color: '#151C48', fontWeight: 'bold' }
});