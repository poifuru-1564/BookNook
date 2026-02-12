import { ColorPalette, FontSize } from "@/constants/useTheme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";

// defines tab layout
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: ColorPalette.muted,
        tabBarActiveTintColor: ColorPalette.success,
        tabBarStyle: {
          backgroundColor: ColorPalette.background,
          paddingTop: 12,
          borderTopWidth: 1,
          borderStyle: "solid",
          borderTopColor: ColorPalette.muted,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: FontSize.sub,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="bookshelf"
        options={{
          title: "Bookshelf",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bookshelf"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
