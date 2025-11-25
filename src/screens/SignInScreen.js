import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput style={styles.input} placeholder="User" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={() => signIn(email, password)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.outlineText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 40 },
  input: { width: "80%", padding: 12, marginVertical: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  button: { width: "80%", backgroundColor: "#0066cc", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  outlineButton: { width: "80%", borderWidth: 1, borderColor: "#0066cc", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  outlineText: { color: "#0066cc", fontWeight: "bold" },
});
