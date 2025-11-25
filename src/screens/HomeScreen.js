// src/screens/HomeScreen.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const MenuButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <MenuButton title="Manage Timetable" onPress={() => navigation.navigate("Timetable")} />
      <MenuButton title="Friends" onPress={() => navigation.navigate("Friends")} />
      <MenuButton title="Browse Events" onPress={() => navigation.navigate("Events")} />
      <MenuButton title="My Account" onPress={() => navigation.navigate("MyAccount")} />

      <TouchableOpacity style={styles.signout} onPress={signOut}>
        <Text style={styles.signoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEDCFF", padding: 20 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginVertical: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    marginVertical: 10,
    alignItems: "center",
    elevation: 2,
  },
  cardText: { fontSize: 18, fontWeight: "600" },
  signout: {
    alignSelf: "center",
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#3949AB",
    borderRadius: 20,
  },
  signoutText: { color: "#fff", fontWeight: "700" },
});
