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
        setLoading(true);
        // Matches your registration curl nested structure
        const payload = {
            user: { name, email, password, password_confirmation: confirmPassword },
            organization: { name: organization },
        };
        try {
            await registerUser(payload);
            Alert.alert("Success", "Registration successful!");
            router.push('/login');
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <View style={styles.header}>
                    <View style={styles.logoCircle}><Text style={styles.logoL}>L</Text></View>
                    <Text style={styles.brandName}>ledgers{"\n"}daily</Text>
                    <Text style={styles.tagline}>Manage your business with ease</Text>
                </View>

                <View style={styles.form}>
                    <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
                    <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={setEmail} />
                    <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
                    <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry onChangeText={setConfirmPassword} />
                    <TextInput placeholder="Organization Name" style={styles.input} onChangeText={setOrganization} />

                    <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} disabled={loading}>
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Register</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    scrollContent: { padding: 25 },
    backBtn: { marginBottom: 10 },
    backArrow: { fontSize: 30, color: '#151C48' },
    header: { alignItems: 'center', marginBottom: 20 },
    logoCircle: { width: 50, height: 50, backgroundColor: '#E1E8FF', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    logoL: { color: '#151C48', fontWeight: 'bold', fontSize: 24 },
    brandName: { fontSize: 24, fontWeight: 'bold', color: '#151C48', textAlign: 'center', marginTop: 10, lineHeight: 28 },
    tagline: { color: '#8A8A8A', fontSize: 12 },
    form: { marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#EEE', borderRadius: 10, padding: 15, marginBottom: 15, backgroundColor: '#F9F9F9' },
    registerBtn: { backgroundColor: '#151C48', padding: 18, borderRadius: 10, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});