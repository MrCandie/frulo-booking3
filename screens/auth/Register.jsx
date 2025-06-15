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
import { register } from "../../service/authService";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");

  const { login } = useAuth();
  const { showToast } = useToast();

  const handleRegister = async () => {
    if (!email) return showToast("Email is required", "error");
    if (password !== confirmPassword) {
      return showToast("Passwords do not match", "error");
    }

    try {
      setLoading(true);

      const res = await register(email, password);

      showToast("Account created successfully!");
      login(res?.user, res?._tokenResponse?.idToken, accountType);
      setLoading(false);
    } catch (err) {
      showToast(err.message, "error");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.title}>Create Account ✨</Text>

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

      {/* Inputs */}
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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
        {loading && <ActivityIndicator color="#fff" size="small" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    justifyContent: "center",
    gap: 10,
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
});
