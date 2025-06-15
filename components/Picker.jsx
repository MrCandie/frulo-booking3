import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ModalComponent from "./ModalComponent";
import { AntDesign } from "@expo/vector-icons";

const Picker = ({
  data,
  onSelect,
  label,
  title,
  placeholder,
  component,
  style,
  custom = false,
  onPress,
  header,
  error,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (item, index) => {
    onSelect(item, index);
    setIsModalVisible(false);
  };

  return (
    <View style={[styles.pickerContainer, style]}>
      {label && (
        <View style={styles.titleWrap}>
          <Text style={styles.label}>{label}</Text>
          {component}
        </View>
      )}

      <TouchableOpacity
        style={[styles.pickerButton, error && styles.error]}
        onPress={() => {
          if (custom) return onPress();
          setIsModalVisible(true);
        }}>
        <Text numberOfLines={1} style={styles.pickerText}>
          {title || placeholder}
        </Text>

        <AntDesign name="down" size={12} color={"#333"} />
      </TouchableOpacity>

      <ModalComponent
        style={styles.modal}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={header || "Select an option"}>
        <View style={styles.container}>
          <FlatList
            scrollEventThrottle={16}
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ModalComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontFamily: "PoppinsRegular",
  },
  pickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    borderColor: "#222",
    borderWidth: 1,
    height: 50,
  },
  pickerText: {
    color: "#333",
    fontSize: 12,
    flex: 1,
    fontFamily: "PoppinsMedium",
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textTransform: "capitalize",
    fontFamily: "PoppinsRegular",
  },
  modal: {
    maxHeight: "50%",
  },
  container: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 20,
    marginBottom: 5,
  },
  error: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default Picker;
