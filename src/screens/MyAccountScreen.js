// src/screens/MyAccountScreen.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function MyAccountScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Username</Text>
        <Text style={styles.sectionText}>@{user?.user || "uq_student"}</Text>

        <Text style={[styles.sectionLabel, { marginTop: 12 }]}>Degree</Text>
        <Text style={styles.sectionText}>{user?.degree || "Bachelor of IT"}</Text>

        <Text style={[styles.sectionLabel, { marginTop: 12 }]}>Interested clubs</Text>
        <View style={{ marginTop: 6 }}>
          {(user?.clubs?.length ? user.clubs : ["CS Society", "AI Club", "Music Society"]).map((c) => (
            <Text key={c} style={styles.bullet}>• {c}</Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.outline} onPress={() => navigation.navigate("Personalisation")}>
        <Text style={styles.outlineText}>Edit profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primary} onPress={signOut}>
        <Text style={styles.primaryText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EEFF", padding: 16 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginVertical: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ECE9F5",
    marginTop: 8,
  },
  sectionLabel: { color: "#6b7280", fontWeight: "600" },
  sectionText: { fontSize: 16, marginTop: 4 },
  bullet: { fontSize: 16, marginVertical: 2 },
  outline: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#8B5CF6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  outlineText: { color: "#7C3AED", fontWeight: "700" },
  primary: {
    marginTop: 12,
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700" },
});
