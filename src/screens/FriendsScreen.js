// src/screens/FriendsScreen.js
import React, { useContext, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

function FriendItem({ item, onRemove }) {
  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.club}>{item.club}</Text>
      </View>
      <TouchableOpacity style={styles.msgBtn}>
        <Text>Msg</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.moreBtn} onPress={() => onRemove(item.id)}>
        <Text>⋯</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FriendsScreen() {
  const { friends, addFriend, removeFriend } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [q, setQ] = useState("");

  const data = useMemo(
    () => friends.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())),
    [friends, q]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>

      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Add friend (name or email)"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            addFriend(text);
            setText("");
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Add</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, { marginTop: 10 }]}
        placeholder="Search"
        value={q}
        onChangeText={setQ}
      />

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <FriendItem item={item} onRemove={removeFriend} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EEFF", padding: 16 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginVertical: 8 },
  addRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E6EA",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addBtn: { paddingVertical: 12, paddingHorizontal: 16, backgroundColor: "#7C3AED", borderRadius: 10 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ECE9F5",
  },
  name: { fontWeight: "700", fontSize: 16 },
  club: { color: "#666", marginTop: 4 },
  msgBtn: { paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: "#E6E6EA", borderRadius: 8, marginRight: 8 },
  moreBtn: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: "#E6E6EA", borderRadius: 8 },
});
