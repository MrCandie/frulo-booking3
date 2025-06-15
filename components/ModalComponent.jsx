import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ModalComponent = ({
  visible,
  onClose,
  title,
  children,
  style,
  showHeader = true,
  closeOnBackdropPress = true,
}) => {
  return (
    <Modal
      animationType="fade" // Can be 'slide' or 'fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Close the modal on back press
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          closeOnBackdropPress && onClose();
        }}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, style]}>
              {showHeader && (
                <View style={styles.modalHeader}>
                  <View style={styles.textWrap}>
                    <Text style={styles.modalTitle}>{title}</Text>
                  </View>
                  <TouchableOpacity onPress={onClose}>
                    <AntDesign name="close" size={20} color={"red"} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.modalContent}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    paddingTop: 90,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10, // For shadow effect on Android
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  modalContent: {
    // marginTop: 20,
  },
  textWrap: {
    flex: 1,
  },
});

export default ModalComponent;
