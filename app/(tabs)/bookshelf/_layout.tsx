import { Stack } from "expo-router";
import React, { useState } from "react";
import { Button } from "react-native";

const BookShelfLayout = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Bookshelf" }}
      />
      <Stack.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerRight: () => (
            <Button onPress={() => alert("use Modal")} title="+" />
          ),
        }}
      />
      <Stack.Screen
        name="quotes"
        options={{
          title: "Quotes",
        }}
      />
      <Stack.Screen name="finished" options={{ title: "Finished" }} />
    </Stack>
  );
};

export default BookShelfLayout;
