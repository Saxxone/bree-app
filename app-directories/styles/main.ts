import { gray_200, gray_800, indigo_500, white } from "../constants/Colors";

export const headerLight = {
  tabBarActiveTintColor: indigo_500,
  headerStyle: {
    backgroundColor: gray_200,
  },
  headerShadowVisible: false,
  headerTintColor: gray_800,
  tabBarStyle: {
    backgroundColor: gray_200,
  },
};

export const headerDark = {
  tabBarActiveTintColor: indigo_500,
  headerStyle: {
    backgroundColor: gray_800,
  },
  headerShadowVisible: false,
  headerTintColor: white,
  tabBarStyle: {
    backgroundColor: gray_800,
  },
};
