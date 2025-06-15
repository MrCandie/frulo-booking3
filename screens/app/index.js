import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../context/auth";
import BookingsScreen from "./BookingsScreen";
import VendorScreen from "./VendorScreen";
import CreateBookingScreen from "./CreateBookingScreen";
import PaymentScreen from "./PaymentScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { role } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={
        role === "customer" ? "CustomerScreen" : "VendorScreen"
      }>
      {role === "customer" ? (
        <>
          <Stack.Screen
            name="CustomerScreen"
            component={BookingsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CreateBooking"
            component={CreateBookingScreen}
            options={{
              headerShown: true,
              headerTitle: "Book Service",
              headerBackTitle: "Back",
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{
              headerShown: true,
              headerTitle: "Make Payment",
              headerBackTitle: "Back",
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerShadowVisible: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="VendorScreen"
          component={VendorScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
