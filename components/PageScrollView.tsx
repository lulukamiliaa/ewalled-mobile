import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";

interface PageScrollViewProps {
    children: React.ReactNode;
}

export default function PageScrollView({ children }: PageScrollViewProps): JSX.Element {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {children}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        padding: 20
    }
});
