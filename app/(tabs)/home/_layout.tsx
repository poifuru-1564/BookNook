import { Stack } from "expo-router";
import React from "react";

const homeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="startBook" options={{ headerShown: false }} />
    </Stack>
  );
};

export default homeLayout;
