import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import PageScrollView from "@/components/PageScrollView";

export default function Transfer() {
  const [amountRaw, setAmountRaw] = useState(""); // Stores raw numeric value
  const [amountFormatted, setAmountFormatted] = useState(""); // Stores formatted value
  const [notes, setNotes] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const formatAmount = (value) => {
    // Remove non-numeric characters
    let numericValue = value.replace(/[^0-9]/g, "");

    // Allow backspace deletion naturally
    setAmountRaw(numericValue);

    // Convert to formatted currency
    if (numericValue) {
      setAmountFormatted(new Intl.NumberFormat("id-ID").format(parseInt(numericValue, 10)));
    } else {
      setAmountFormatted(""); // Reset if empty
    }
  };

  return (
    <PageScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.recipientContainer}>
          <Text style={styles.recipientLabel}>To:</Text>
          <TextInput 
            style={styles.recipientInput}
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
            placeholder="Enter account number"
            placeholderTextColor="#BBB"
          />
        </View>
        
        {/* Amount Section */}
        <Text style={styles.label}>Amount</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>IDR</Text>
          <TextInput
            value={amountFormatted}
            onChangeText={(text) => formatAmount(text)}
            keyboardType="numeric"
            style={styles.amountInput}
            placeholder="Enter amount"
            placeholderTextColor="#BBB"
          />
        </View>
        <View style={styles.divider} />
        
        {/* Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.balance}>IDR 10.000.000</Text>
        </View>
        
        {/* Notes Section */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={(text) => setNotes(text)}
          placeholder="Enter notes"
          placeholderTextColor="#BBB"
        />
        <View style={styles.divider} />

        {/* Transfer Button at Bottom */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.transferButton}>
            <Text style={styles.transferButtonText}>Transfer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    minHeight: "100%", // Ensures button stays at bottom
  },
  recipientContainer: {
    backgroundColor: "#0066FF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  recipientLabel: {
    color: "white",
    fontSize: 14,
  },
  recipientInput: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#888",
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
    fontSize: 36,
    fontWeight: "400",
    color: "black",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#CCC",
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  balance: {
    fontSize: 14,
    color: "#0066FF",
  },
  notesInput: {
    backgroundColor: "white",
    padding: 10,
    fontSize: 16,
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: "auto", // Pushes button to bottom
    paddingBottom: 35, // Avoids touching screen bottom
  },
  transferButton: {
    backgroundColor: "#0066FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  transferButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
