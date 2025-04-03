import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageScrollView from "@/components/PageScrollView";

// Formatting currency
const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState(null); // Initialize as null

  // Fetch user's name from AsyncStorage
  useEffect(() => {
    const getFullName = async () => {
      try {
        const fullName = await AsyncStorage.getItem("fullName");
        if (fullName) {
          const firstName = fullName.split(" ")[0];
          setFullName(firstName); // Set only first name
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    getFullName();
  }, []);

  // Handlers
  const handleTopupPress = () => navigation.navigate("topup");
  const handleTransferPress = () => navigation.navigate("transfer");

  return (
    <PageScrollView>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            Good Morning, {fullName ?? "Guest"} {/* Use nullish coalescing */}
          </Text>
          <Text style={styles.subText}>
            Check all your incoming and outgoing transactions here
          </Text>
        </View>
        <Image source={require("@/assets/images/sun.png")} style={styles.icon} />
      </View>

      {/* Account Number */}
      <View style={styles.accountCard}>
        <Text style={styles.accountLabel}>Account No.</Text>
        <Text style={styles.accountNumber}>100899</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.balanceLabel}>Balance</Text>
          <View style={styles.seeBalance}>
            <Text style={styles.balanceAmount}>Rp 10.000.000</Text>
            <Image source={require("@/assets/images/eye.png")} style={styles.eyeIcon} />
          </View>
        </View>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleTopupPress}>
            <Image source={require("@/assets/images/plus.png")} style={styles.balanceIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleTransferPress}>
            <Image source={require("@/assets/images/arrow.png")} style={styles.balanceIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        <View style={styles.horizontalLine} />
        <ScrollView style={styles.transactionList} nestedScrollEnabled={true}>
          {transactions.map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.avatar} />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{item.name}</Text>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.amount > 0 ? "green" : "black" },
                ]}
              >
                {item.amount > 0
                  ? `+ ${formatCurrency(item.amount)}`
                  : `- ${formatCurrency(Math.abs(item.amount))}`}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </PageScrollView>
  );
}

// Mock Transaction Data
const transactions = [
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: -75000 },
  { name: "Adityo Gizwanda", type: "Topup", date: "08 December 2024", amount: 75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: -75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: -75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: 75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: -75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: 75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: -75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: 75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: -75000 },
  { name: "Adityo Gizwanda", type: "Transfer", date: "08 December 2024", amount: 75000 },
];

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    maxWidth: "70%",
    flexShrink: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "gray",
  },
  icon: {
    width: 70,
    height: 70,
  },
  accountCard: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountLabel: {
    color: "white",
    fontSize: 16,
  },
  accountNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  balanceCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: "gray",
  },
  seeBalance: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  eyeIcon: {
    width: 19,
    height: 11,
    marginLeft: 10,
  },
  balanceActions: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#19918F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  balanceIcon: {
    width: 18,
    height: 18,
  },
  historyContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  transactionList: {
    maxHeight: 250,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  transactionType: {
    fontSize: 12,
    color: "gray",
  },
  transactionDate: {
    fontSize: 12,
    color: "gray",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
