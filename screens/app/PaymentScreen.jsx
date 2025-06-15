import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function PaymentScreen({ route, navigation }) {
  const { bookingId } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [booking, setBooking] = useState("");
  console.log(bookingId);

  useEffect(() => {
    async function getBooking() {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");
        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

        const booking = parsedBookings.find((el) => el.id === bookingId);
        setBooking(booking);
      } catch (error) {}
    }
    getBooking();
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");
        const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

        // Update the booking's status
        const updatedBookings = parsedBookings.map((b) =>
          b.id === bookingId ? { ...b, status: "paid" } : b
        );

        await AsyncStorage.setItem("bookings", JSON.stringify(updatedBookings));

        setLoading(false);
        alert("Payment Successful! 🎉");

        navigation.reset({
          index: 0,
          routes: [{ name: "CustomerScreen" }],
        });
      } catch (error) {
        console.error("Error updating booking status:", error);
        setLoading(false);
      }
    }, 2000); // simulate payment delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <Text style={styles.label}>Service:</Text>
      <Text style={styles.value}>{booking?.service}</Text>

      <Text style={styles.label}>Amount:</Text>
      <Text style={styles.value}>₦{booking?.price?.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 16,
    color: "#666",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
