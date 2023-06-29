import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
 
} from "@expo-google-fonts/roboto";

const BoxCard = ({name,image}) => {
 let [fontsLoaded] = useFonts({
   Roboto_100Thin,
   Roboto_300Light,
   Roboto_400Regular,
   Roboto_500Medium,
 });
  if (!fontsLoaded) {
    return null;
  }
    return (
     <View></View>
    );
}
 const styles = StyleSheet.create({
   populorCourseCard: {
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     width: "90%",
     maxHeight: "auto",
     backgroundColor: "#FFFFFF",
     borderRadius: 14,
     padding: 25,
     marginTop:8,
   },
   courseImageOuter: {
     width: "100%",
     resizeMode: "contain",
   },
   cardBottom: {
     width:'100%',
     display: "flex",
     flexDirection: "column",
     alignItems: "flex-start",
     paddingTop: 16,
    //  borderColor: "blue",
    //  borderWidth: 1,
   },
 });
export default BoxCard;