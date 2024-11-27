import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ImageViewer } from "@/components/app/ImageViewer";
import { styles } from "@/styles/main";
import { Button } from "@/components/app/Button";

export default function Compose() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}
