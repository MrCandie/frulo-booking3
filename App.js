import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { AuthProvider } from "./context/auth";
import { ToastProvider } from "./context/toast-context";
import Screen from "./screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "./components/Toast";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <Screen />
            <Toast />
          </ToastProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
