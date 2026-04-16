import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ModalCloseBtn from "@/components/ModalCloseBtn";
import MyButton from "@/components/MyButton";
import { ColorPalette } from "@/constants/constantValues";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useScan from "../hooks/useScan";

type Props = {
  setVisible: (visible: boolean) => void;
  setISBN: (scanResult: string) => void;
};

const Scan = ({ setISBN, setVisible }: Props) => {
  const { barcodeScanned, isActive, setActive } = useScan(setVisible, setISBN);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Loading />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.modalContainer}>
        <ModalCloseBtn setModalVisible={setVisible} withAlert={false} />
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <Text>We need your permission to use camera</Text>

          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.modalContainer}>
      <ModalCloseBtn setModalVisible={setVisible} withAlert={false} />
      <Header label="Scan" />

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
          <MyButton
            onPressAction={() => setActive(!isActive)}
            label="Close Camera"
          />
        </View>
      )}

      {!isActive && (
        <MyButton onPressAction={() => setActive(true)} label="Open Camera" />
      )}
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  cameraContainer: {
    height: 150,
  },
  camera: {
    flex: 1,
  },

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
