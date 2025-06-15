import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Picker from "../../components/Picker";
import { useToast } from "../../context/toast-context";

const SERVICE_PRICES = {
  Haircut: 5000,
  Makeup: 8000,
};

export default function CreateBookingScreen({ navigation }) {
  const [service, setService] = useState("");
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const { showToast } = useToast();

  const handleBooking = async () => {
    try {
      if (!service) return showToast("Select a service", "warning");
      if (!date) return showToast("Select a booking date", "warning");

      const storedBookings = await AsyncStorage.getItem("bookings");
      const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

      const isSlotTaken = parsedBookings.some(
        (booking) =>
          new Date(booking.date).getTime() === new Date(date).getTime()
      );

      if (isSlotTaken) return showToast("Sorry, that time’s taken.", "error");

      const bookingId = Date.now().toString();

      const newBooking = {
        service,
        date,
        price: SERVICE_PRICES[service],
        id: bookingId,
        status: "pending",
      };

      const updatedBookings = [...parsedBookings, newBooking];
      await AsyncStorage.setItem("bookings", JSON.stringify(updatedBookings));

      showToast("Booking successful");
      navigation.navigate("Payment", { bookingId });

      // reset
      setService("");
      setDate(new Date());
    } catch (error) {
      showToast("Error booking service", "error");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Picker
          onSelect={(selected) => setService(selected)}
          label="Select Service"
          data={Object.keys(SERVICE_PRICES)}
          title={service}
          placeholder="Select service"
          error={!service}
        />

        <Picker
          label="Select Date/Time"
          custom
          onPress={() => setVisible(true)}
          placeholder="Select booking time"
          error={!date}
          title={format(new Date(date), "PPpp")}
        />

        {service ? (
          <Text style={styles.price}>
            Price: ₦{SERVICE_PRICES[service].toFixed(2)}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Continue to Payment</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        mode="datetime"
        isVisible={visible}
        minimumDate={new Date()}
        date={new Date()}
        onConfirm={(selectedDate) => {
          setVisible(false);
          setDate(format(selectedDate, "yyyy-MM-dd HH:mm"));
        }}
        onCancel={() => setVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  wrapper: {
    flex: 1,
    gap: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    color: "#444",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
