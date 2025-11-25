// src/screens/EventsScreen.js
import React, { useContext, useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

function EventCard({ event }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{event.title}</Text>
      <Text style={styles.meta}>{`${event.date.replace(/-/g, "/")} · ${event.time} · ${event.location}`}</Text>
      <Text style={styles.desc}>{event.description}</Text>
    </View>
  );
}

export default function EventsScreen() {
  const { events } = useContext(AuthContext);
  const [q, setQ] = useState("");

  const data = useMemo(
    () =>
      events.filter(
        (e) =>
          e.title.toLowerCase().includes(q.toLowerCase()) ||
          e.description.toLowerCase().includes(q.toLowerCase())
      ),
    [events, q]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={q}
        onChangeText={setQ}
      />
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingVertical: 6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EEFF", padding: 16 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginVertical: 8 },
  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6EA",
    padding: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ECE9F5",
  },
  cardTitle: { fontSize: 18, fontWeight: "700" },
  meta: { color: "#6b7280", marginTop: 4 },
  desc: { marginTop: 6, color: "#4b5563" },
});
