import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import Button from "@/components/form/Button";
import tailwindClasses from "@/services/ClassTransformer";

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
    <View style={tailwindClasses("container")}>
      <View>
        <Button theme="primary" onPress={pickImageAsync}>
          Choose a photo
        </Button>
        <Button>Use this photo</Button>
      </View>
    </View>
  );
}
