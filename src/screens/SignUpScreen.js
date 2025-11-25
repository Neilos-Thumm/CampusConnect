import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { setUser: setAuthUser } = useContext(AuthContext);

  const onSubmit = () => {
    if (!email || !password) return Alert.alert("Please fill all required fields");
    if (password !== confirm) return Alert.alert("Passwords do not match");
    setAuthUser({ user, firstName, lastName, email });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <TextInput style={styles.input} placeholder="User" value={user} onChangeText={setUser} />
      <TextInput style={styles.input} placeholder="First name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry value={confirm} onChangeText={setConfirm} />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.outlineText}>Back to Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f1ff", paddingVertical: 30 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  input: { width: "80%", padding: 12, marginVertical: 6, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, backgroundColor: "#fff" },
  button: { width: "80%", backgroundColor: "#8b5cf6", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  outlineButton: { width: "80%", borderWidth: 1, borderColor: "#8b5cf6", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  outlineText: { color: "#8b5cf6", fontWeight: "bold" },
});
