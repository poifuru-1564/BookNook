import { Stack } from "expo-router";
import React from "react";

const BookShelfLayout = () => {
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="quotes"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="finished" options={{ headerShown: false }} />

      <Stack.Screen
        name="recommendation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default BookShelfLayout;
