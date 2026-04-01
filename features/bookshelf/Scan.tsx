import { ColorPalette, FontSize } from "@/constants/useTheme";
import { Ionicons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  setVisible: (visible: boolean) => void;
  setISBN: (scanResult: string) => void;
};

const Scan = ({ setISBN, setVisible }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isActive, setActive] = useState(false);

  if (!permission) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <View>
          <Text>We need your permission to show the camera</Text>
          <TouchableOpacity
            onPress={() => requestPermission()}
            style={styles.btnInnerContainer}
          >
            <Text>Open Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const barcodeScanned = (data: BarcodeScanningResult) => {
    CameraView.dismissScanner();
    setActive(false);
    const barcode = data.data;
    if (!(barcode.startsWith("978") || barcode.startsWith("979"))) {
      Alert.alert(
        "Invalid Barcode",
        "Scan a barcode starting from '978' or '979'",
        [{ text: "Ok", onPress: () => setActive(true) }],
      );
      return;
    }
    setISBN(barcode);
    setVisible(false);

    console.log(data.data);
    return;
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={() => {
          setActive(false);
          setVisible(false);
        }}
        style={{ alignSelf: "flex-start", padding: 5 }}
      >
        <Ionicons name="close" size={20} style={{ paddingLeft: 10 }} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Scan</Text>
      </View>

      {isActive && (
        <View>
          <View style={styles.cameraContainer}>
            <CameraView
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
              onBarcodeScanned={barcodeScanned}
              style={styles.camera}
              active={isActive}
            />
          </View>
          <View style={styles.btnOuterContainer}>
            <TouchableOpacity
              onPress={() => setActive(!isActive)}
              style={styles.btnInnerContainer}
            >
              <Text style={styles.btn}>Close Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isActive && (
        <View style={styles.btnOuterContainer}>
          <TouchableOpacity
            onPress={() => setActive(true)}
            style={styles.btnInnerContainer}
          >
            <View style={styles.btn}>
              <Text>Open Camera</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  cameraContainer: {
    height: 150,
  },
  camera: {
    flex: 1,
  },

  btnOuterContainer: {
    width: "80%",
    alignSelf: "center",
  },

  btnInnerContainer: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    borderRadius: 5,
  },

  btn: { flexDirection: "row", alignSelf: "center" },

  closeIcon: {
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
});
