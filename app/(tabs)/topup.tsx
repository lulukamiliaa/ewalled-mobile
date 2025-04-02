import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet 
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import PageScrollView from "@/components/PageScrollView";

export default function TopUp() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BYOND Pay");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notes, setNotes] = useState("");

  const paymentMethods = [
    "BYOND Pay", "Bank Transfer", "Credit Card", "GoPay", "OVO", "Dana", "ShopeePay"
  ];

  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) return "";
    return parseInt(numericValue, 10).toLocaleString("id-ID");
  };

  return (
    <PageScrollView>
      <View style={styles.container}>
        {/* Amount Input */}
        <Text style={styles.label}>Amount</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>IDR</Text>
          <TextInput
            value={amount}
            onChangeText={(text) => setAmount(formatAmount(text))}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#AAA"
            style={styles.amountInput}
          />
        </View>
        <View style={styles.divider} />

        {/* Payment Method Dropdown */}
        <TouchableOpacity style={styles.paymentContainer} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.paymentText}>{paymentMethod}</Text>
          <AntDesign name="down" size={18} color="black" />
        </TouchableOpacity>
        <View style={styles.divider} />

        {/* Notes Input */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter notes"
          placeholderTextColor="#AAA"
        />
        <View style={styles.divider} />

        {/* Top Up Button at Bottom */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Top Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Dropdown Options */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <FlatList
              data={paymentMethods}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.optionItem} 
                  onPress={() => {
                    setPaymentMethod(item);
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </PageScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    minHeight: "100%",
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  currency: {
    fontSize: 16,
    fontWeight: "400",
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: "400",
    color: "black",
  },
  divider: {
    height: 1,
    backgroundColor: "#CCC",
    marginBottom: 40, // Reduced spacing
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  paymentText: {
    fontSize: 16,
  },
  notesInput: {
    paddingVertical: 10,
    backgroundColor: "white",
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 55, // Keeps button near the bottom
  },
  button: {
    backgroundColor: "#0066FF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionItem: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#0066FF",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});