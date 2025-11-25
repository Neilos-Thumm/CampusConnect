// src/context/AuthContext.js
import React, { createContext, useState, useMemo } from "react";

export const AuthContext = createContext();

const seedFriends = [
  { id: "f1", name: "Ava Thompson", club: "CS Society" },
  { id: "f2", name: "Liam Chen", club: "AI Club" },
  { id: "f3", name: "Noah Patel", club: "UQ Sport" },
  { id: "f4", name: "Mia Nguyen", club: "Music Society" },
  { id: "f5", name: "Oliver Smith", club: "Debate Club" },
];

const seedEvents = [
  {
    id: "e1",
    title: "Event #1 · CS Society",
    date: "2025-10-30",
    time: "18:00",
    location: "Hawken 50",
    description: "Meet peers, free pizza!",
  },
  { id: "e2", title: "Event #2 · CS Society", date: "2025-10-30", time: "18:00", location: "Hawken 50", description: "Meet peers, free pizza!" },
  { id: "e3", title: "Event #3 · CS Society", date: "2025-10-30", time: "18:00", location: "Hawken 50", description: "Meet peers, free pizza!" },
  { id: "e4", title: "Event #4 · CS Society", date: "2025-10-30", time: "18:00", location: "Hawken 50", description: "Meet peers, free pizza!" },
  { id: "e5", title: "Event #5 · CS Society", date: "2025-10-30", time: "18:00", location: "Hawken 50", description: "Meet peers, free pizza!" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {user, firstName, lastName, email, degree, clubs:[]}
  const [friends, setFriends] = useState(seedFriends);
  const [events, setEvents] = useState(seedEvents);

  const signIn = (email, password) => {
    if (!email || !password) return;
    setUser((u) => u ?? { email, user: email.split("@")[0] || "user" });
  };

  const signOut = () => {
    setUser(null);
  };

  const addFriend = (nameOrEmail) => {
    const name = String(nameOrEmail || "").trim();
    if (!name) return;
    const id = `f-${Date.now()}`;
    setFriends((prev) => [{ id, name, club: "CS Society" }, ...prev]);
  };

  const removeFriend = (id) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const addEvent = ({ title, date, time, location, description }) => {
    const id = `e-${Date.now()}`;
    setEvents((prev) => [{ id, title, date, time, location, description }, ...prev]);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      signIn,
      signOut,
      friends,
      addFriend,
      removeFriend,
      events,
      addEvent,
    }),
    [user, friends, events]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
