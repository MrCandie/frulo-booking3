import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/auth";
import { useToast } from "../../context/toast-context";
import { login } from "../../service/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState("customer");
  const { login: loginAuth } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    try {
      if (!email || !password)
        return showToast("Email and password are required", "warning");
      setLoading(true);
      const res = await login(email, password);
      loginAuth(res?.user, res?._tokenResponse?.idToken, accountType);
      showToast("Login Successful");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      showToast(err.message, "error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      {/* Account Type Selector */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            accountType === "customer" && styles.roleSelected,
          ]}
          onPress={() => setAccountType("customer")}>
          <Text
            style={[
              styles.roleText,
              accountType === "customer" && styles.roleTextSelected,
            ]}>
            Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            accountType === "vendor" && styles.roleSelected,
          ]}
          onPress={() => setAccountType("vendor")}>
          <Text
            style={[
              styles.roleText,
              accountType === "vendor" && styles.roleTextSelected,
            ]}>
            Vendor
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
        {loading && <ActivityIndicator color="#fff" size="small" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 24,
  },
  linkText: {
    color: "#007bff",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  roleSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  roleText: {
    color: "#333",
    fontWeight: "500",
  },
  roleTextSelected: {
    color: "#fff",
  },
});
