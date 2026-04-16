import { BarcodeScanningResult, CameraView } from "expo-camera";
import { useState } from "react";
import { Alert } from "react-native";

const useScan = (
  setModalVisible: (isVisible: boolean) => void,
  setISBN: (result: string) => void,
) => {
  const [isActive, setActive] = useState(false);

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
    setModalVisible(false);

    console.log(data.data);
    return;
  };

  return {
    barcodeScanned,

    isActive,
    setActive,
  };
};

export default useScan;
