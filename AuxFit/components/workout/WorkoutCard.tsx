import React from "react";
import { Colors, Spacing, Texts  } from "@/constants/Styles";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function WorkoutCard() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.sm,
        backgroundColor: Colors.bgMedium,
        flex: 1
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colors.secondary
    }
})

