import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Alert
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
            const response = await loginUser({ email, password });
            console.log("Login Success:", response.data);
            Alert.alert("Welcome", "Login successful!");
            // router.replace('/dashboard');
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
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoIcon}>L</Text>
                    </View>
                    <Text style={styles.brandName}>ledgers{"\n"}daily</Text>
                    <Text style={styles.tagline}>Manage your business with ease</Text>
                </View>

                {/* Input Section */}
                <View style={styles.form}>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
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
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Login</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={() => router.push('/signup')}
                    >
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.privacyLink}>
                        <Text style={styles.privacyText}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Footer Section Removed */}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    logoBox: {
        width: 50,
        height: 50,
        backgroundColor: '#E1E8FF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoIcon: {
        color: '#151C48',
        fontWeight: 'bold',
        fontSize: 24
    },
    brandName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#151C48',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 30
    },
    tagline: {
        color: '#8A8A8A',
        fontSize: 12,
        marginTop: 5
    },
    form: {
        width: '100%',
        marginTop: 15
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        backgroundColor: '#FBFBFB',
        fontSize: 16
    },
    loginBtn: {
        backgroundColor: '#151C48',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12
    },
    registerBtn: {
        backgroundColor: '#1F255E',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    privacyLink: {
        marginTop: 15
    },
    privacyText: {
        color: '#151C48',
        textDecorationLine: 'underline',
        fontSize: 13,
        textAlign: 'center'
    }
    // Footer styles removed
});