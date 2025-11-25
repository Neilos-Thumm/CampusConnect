// src/screens/TimetableScreen.js
import React, { useContext, useMemo, useState } from "react";
import {
  View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import { AuthContext } from "../context/AuthContext";

const formatDate = (d) => d.toISOString().slice(0, 10);
const pad2 = (n) => String(n).padStart(2, "0");

export default function TimetableScreen() {
  const { events, addEvent } = useContext(AuthContext);
  const [selected, setSelected] = useState(formatDate(new Date()));
  const [open, setOpen] = useState(false);

  // form
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [when, setWhen] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const marked = useMemo(() => {
    const m = {};
    events.forEach((e) => {
      m[e.date] = { marked: true, dotColor: "#7C3AED" };
    });
    m[selected] = { ...(m[selected] || {}), selected: true, selectedColor: "#7C3AED" };
    return m;
  }, [events, selected]);

  const onAdd = () => {
    const date = formatDate(when);
    const time = `${pad2(when.getHours())}:${pad2(when.getMinutes())}`;
    addEvent({
      title: title || "New Event",
      date,
      time,
      location: "TBD",
      description: desc || "—",
    });
    setOpen(false);
    setTitle("");
    setDesc("");
    setWhen(new Date());
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4EEFF" }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Text style={styles.title}>Demo</Text>
      </View>

      <Calendar
        current={selected}
        onDayPress={(d) => setSelected(d.dateString)}
        markedDates={marked}
        theme={{
          todayTextColor: "#7C3AED",
          arrowColor: "#7C3AED",
          selectedDayBackgroundColor: "#7C3AED",
        }}
        style={{ backgroundColor: "#F4EEFF" }}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)}>
        <Text style={{ fontSize: 24, color: "#fff" }}>＋</Text>
      </TouchableOpacity>

      {/* Add modal */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Event</Text>

            <TextInput
              placeholder="Event Name"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Event Description"
              style={styles.input}
              value={desc}
              onChangeText={setDesc}
            />

            <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowDate(true)}>
              <Text>Select Date: {formatDate(when)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowTime(true)}>
              <Text>
                Select Time: {pad2(when.getHours())}:{pad2(when.getMinutes())}
              </Text>
            </TouchableOpacity>

            {(showDate || showTime) && (
              <View style={{ marginTop: 6 }}>
                {showDate && (
                  <DateTimePicker
                    value={when}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(_, d) => {
                      setShowDate(false);
                      if (d) setWhen((old) => new Date(d.setHours(old.getHours(), old.getMinutes())));
                    }}
                  />
                )}
                {showTime && (
                  <DateTimePicker
                    value={when}
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(_, d) => {
                      setShowTime(false);
                      if (d) setWhen(d);
                    }}
                  />
                )}
              </View>
            )}

            <View style={styles.modalRow}>
              <TouchableOpacity style={styles.cancel} onPress={() => setOpen(false)}>
                <Text style={{ color: "#6b7280", fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.add} onPress={onAdd}>
                <Text style={{ color: "#7C3AED", fontWeight: "700" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "600", marginVertical: 8 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: "86%",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#E6E6EA",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  pickerBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E6E6EA",
    borderRadius: 10,
    marginVertical: 6,
  },
  modalRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10, gap: 12 },
  cancel: { paddingVertical: 10, paddingHorizontal: 12 },
  add: { paddingVertical: 10, paddingHorizontal: 12 },
});
