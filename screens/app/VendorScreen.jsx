import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "../../context/toast-context";
import EmptyComponent from "../../components/EmptyComponent";
import { useAuth } from "../../context/auth";

export default function VendorScreen({ navigation }) {
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

  const handleShare = () => {
    const bookingLink = "bookingLink";
    const message = `Hi! Please use this link to book your service: ${bookingLink}`;
    const url = `https://wa.me/+2348145751581?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url);
  };

  const renderItem = ({ item }) => {
    const handleStatusChange = async (newStatus) => {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");
        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

        const updatedBookings = parsedBookings.map((el) =>
          el.id === item.id ? { ...el, status: newStatus } : el
        );

        setBookings(updatedBookings);
        await AsyncStorage.setItem("bookings", JSON.stringify(updatedBookings));
        showToast(`Booking ${newStatus}`);
      } catch (error) {
        showToast("Error updating booking", "error");
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

    const handleShareBooking = () => {
      const message = `✅ Booking Confirmed!
Date: ${new Date(item.date).toLocaleDateString()}
Time: ${new Date(item.date).toLocaleTimeString()}
Link: [Booking Details URL]
`;

      const url = `https://wa.me/+2348145751581?text=${encodeURIComponent(
        message
      )}`;

      Linking.openURL(url);
    };

    return (
      <View style={styles.card}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.datetime}>
          {format(new Date(item.date), "PPpp")}
        </Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status?.toUpperCase() || "PENDING"}
        </Text>

        {item.status === "approved" && (
          <TouchableOpacity
            style={[styles.approvedButton]}
            onPress={handleShareBooking}>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        )}

        {item.status === "paid" && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.approveButton]}
              onPress={() => handleStatusChange("approved")}>
              <Text style={styles.actionText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleStatusChange("rejected")}>
              <Text style={styles.actionText}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
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
    gap: 6,
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

  logoutButton: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  approvedButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  actionRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#28a745",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonWrapper: {
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },
});
