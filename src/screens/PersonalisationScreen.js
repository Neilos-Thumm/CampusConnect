// src/screens/PersonalisationScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const CLUBS = ["CS Society", "UQ Sport", "Debate Club", "AI Club", "Music Society"];

export default function PersonalisationScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [degree, setDegree] = useState(user?.degree || "");
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState(user?.clubs || []);

  const toggleClub = (c) => {
    setChosen((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  // ✅ 提交逻辑：编辑资料时返回上一页；首次设置时跳回 Home
  const onSubmit = () => {
    setUser({ ...(user || {}), degree, clubs: chosen });

    // 如果是从已登录的“编辑资料”进入，直接返回上一页；
    // 如果是注册流程的第一次设置，就回到 Home。
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  };

  const visibleClubs = CLUBS.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personalisation</Text>

      <Text style={styles.label}>What's your degree?</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Bachelor of IT"
        value={degree}
        onChangeText={setDegree}
      />

      <Text style={[styles.label, { marginTop: 16 }]}>
        Which clubs are you interested in?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Search clubs"
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.chips}>
        {visibleClubs.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, chosen.includes(c) && styles.chipActive]}
            onPress={() => toggleClub(c)}
          >
            <Text
              style={[
                styles.chipText,
                chosen.includes(c) && styles.chipTextActive,
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.primary} onPress={onSubmit}>
        <Text style={styles.primaryText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#F4EEFF" },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginVertical: 16 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6EA",
    padding: 12,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 12 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E6EA",
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: "#EFE4FF", borderColor: "#8B5CF6" },
  chipText: { color: "#333" },
  chipTextActive: { color: "#6D28D9", fontWeight: "600" },
  primary: {
    marginTop: 24,
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
