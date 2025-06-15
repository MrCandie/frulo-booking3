import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "../../context/toast-context";
import EmptyComponent from "../../components/EmptyComponent";
import { useAuth } from "../../context/auth";

export default function BookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const { showToast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");

        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

        setBookings(parsedBookings);
      } catch (error) {
        showToast("Error fetching bookings", "error");
      }
    }
    fetchBookings();
  }, []);

  const renderItem = ({ item }) => {
    const handleDelete = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");
        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];
        const filteredBookings = parsedBookings.filter(
          (el) => el.id !== item.id
        );
        setBookings(filteredBookings?.reverse());
        await AsyncStorage.setItem(
          "bookings",
          JSON.stringify(filteredBookings)
        );
        showToast("Booking deleted");
      } catch (error) {
        showToast("Error deleting booking", "error");
      }
    };

    const getStatusStyle = (status) => {
      switch (status) {
        case "approved":
          return styles.approved;
        case "rejected":
          return styles.rejected;
        default:
          return styles.pending;
      }
    };

    return (
      <TouchableOpacity onPress={handleDelete} style={styles.card}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.datetime}>
          {format(new Date(item.date), "PPpp")}
        </Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status?.toUpperCase() || "PENDING"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      {bookings.length === 0 ? (
        <EmptyComponent message="No bookings yet. Tap below to create one!" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateBooking")}>
          <Text style={styles.buttonText}>Create Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  service: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  datetime: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonWrapper: {
    marginVertical: 20,
    gap: 10,
  },
  status: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    color: "#fff",
  },
  pending: {
    backgroundColor: "#ffa500",
  },
  approved: {
    backgroundColor: "#28a745",
  },
  rejected: {
    backgroundColor: "#dc3545",
  },
});
