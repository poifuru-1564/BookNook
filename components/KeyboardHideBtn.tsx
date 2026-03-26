import { ColorPalette } from "@/constants/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableOpacity, View } from "react-native";

type Props = {
  keyboardHeight: number;
};

const KeyboardHideBtn = ({ keyboardHeight }: Props) => {
  return (
    <View
      style={{
        bottom: keyboardHeight,
        position: "absolute",
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{
          justifyContent: "center",
          marginRight: 10,
          marginBottom: 4,
          backgroundColor: ColorPalette.whiteOverlay,
          borderRadius: 50,
        }}
      >
        <MaterialIcons name="keyboard-hide" size={28} style={{ padding: 7 }} />
      </TouchableOpacity>
    </View>
  );
};

export default KeyboardHideBtn;
