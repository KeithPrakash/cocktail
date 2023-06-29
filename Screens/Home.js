import React, { useState,useEffect } from "react";
import {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Pressable,
  SafeAreaView,
  FlatList,
  Ref
} from "react-native";
import AppLoading from "expo-app-loading";
import BoxCard from "./components/BoxCard";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

const Home = () => {   
const [data,setData]=useState([]);
const [inputText, setInputText] = useState(""); 
const [favorites, setFavorites] = useState([]);
const [modalVisible, setModalVisible] = useState(false);
const [List, setList]=useState([]);
const [count,setCount]= useState(0);
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 200);
}, []);

// console.log({favorites})
 const addToFavorites = (item) => {
  setFavorites((prevFavorites) => [...prevFavorites, {item} ]);
 setCount(favorites.length)
}

const removeAll=()=>{
setFavorites(favorites.slice(- 1));

}

const removeItem=(key)=>{
console.log(key)
//  setFavorites(favorites.slice(key -1));
 let target = key;
 let targetIndex = favorites.findIndex((each) => {
   each.item.item.id == target;
 });
 favorites.splice(targetIndex - 1, 1)
 
 console.log(favorites);
}


let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  handle=()=>{
    setData([]);
         fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`
         )
           .then((results) => results.json())
           .then((value) => {
             console.log(`${inputText}`);
             setData(value.drinks);
            //  console.log(data);
           }).catch(e=>{
            console.log(e);
           })   
  }
useEffect(()=>{
   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
     .then((results) => results.json())
     .then((value) => {
       console.log(`${inputText}`);
       setData(value.drinks);
      //  console.log(data);
     })
     .catch((e) => {
       console.log(e);
     });
    },[]) ;  
     
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.navOuter}>
        <View>
          <Text style={styles.MainTitle}>cocktail</Text>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={{backgroundColor:'red',padding:5,borderRadius:5}}
                  onPress={() => setFavorites([])}
                >
                  <Text style={styles.textStyle}>Remove All</Text>
                </Pressable>
                <ScrollView
                  style={{
                    height: "auto",
                    width: 325,
                  }}
                  contentContainerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                >
                  {favorites ? (
                    favorites.map(({ item }) => {
                      return (
                        <View style={styles.populorCourseCard} key={item.key}>
                          <View style={styles.courseImageOuter}>
                            <Image
                              source={{ uri: `${item.item.image}` }}
                              style={{
                                width: "100%",
                                height: 100,
                                alignSelf: "center",
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View style={styles.cardBottom}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "Roboto_500Medium",
                              }}
                            >
                              {item.item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontFamily: "Roboto_400Regular",
                                opacity: 0.75,
                              }}
                            >
                              {item.item.category}
                            </Text>
                            <TouchableOpacity
                              style={{ borderRadius: 10, padding: 5 }}
                              onPress={() => {
                                removeItem(item.item.key)
                                onRefresh()
                                }}

                            >
                              <Image source={require("../assets/Delete.png")} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Text>nothin</Text>
                  )}
                </ScrollView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Image source={require("../assets/Heart.png")} />
        </Pressable>
      </View>
      <View style={styles.searchOuter}>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search"
            id="outlined-basic"
            onChangeText={setInputText}
            value={inputText}
          />
        </View>
        <View style={styles.searchButtonOuter}>
          <TouchableOpacity onPress={handle}>
            <Image source={require("../assets/Search.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.cardContainer}>
          {data ? (
            data.map((item) => {
              return (
                <Card
                  key={item.idDrink}
                  item={{
                    key: item.idDrink,
                    name: item.strDrink,
                    image: item.strDrinkThumb,
                    category: item.strCategory,
                    addToFavorites: { addToFavorites },
                  }}
                  add={addToFavorites}
                />
              );
            })
          ) : (
            <View>
              <Text>No search results</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
  
};
const Card = ({ item ,add }) => {
  return (
    <View style={styles.populorCourseCard}>
      <View style={styles.courseImageOuter}>
        <Image
          source={{ uri: `${item.image}` }}
          style={{
            width: "100%",
            height: 100,
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.cardBottom}>
        <Text style={{ fontSize: 14, fontFamily: "Roboto_500Medium" }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Roboto_400Regular",
            opacity: 0.75,
          }}
        >
          {item.category}
        </Text>
        <TouchableOpacity
          style={styles.favButtonOuter}
          onPress={() => add({item})}
        >
          <Text style={{ fontSize: 12 }}>Add to </Text>
          <Image source={require("../assets/Heart.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const FavCard = ({ item, remove }) => {
  
  return (
    <View style={styles.populorCourseCard}>
      <View style={styles.courseImageOuter}>
        <Image
          source={{ uri: `${item.image}` }}
          style={{
            width: "100%",
            height: 100,
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.cardBottom}>
        <Text style={{ fontSize: 14, fontFamily: "Roboto_500Medium" }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Roboto_400Regular",
            opacity: 0.75,
          }}
        >
          {item.category}
        </Text>
        <TouchableOpacity
          style={{ borderRadius:10,padding:5}}
          onPress={() => remove(item.key)}
        >
          <Image source={require("../assets/Delete.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "rgba(242, 242, 242, 1)",
  },
  navOuter: {
    height: "auto",
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  MainTitle: {
    fontSize: 24,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  searchOuter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 1,
    height: 58,
    paddingBottom: 8,
  },
  searchbar: {
    flex: 1,
    backgroundColor: "#ECECEC",
    // borderColor: "red",
    // borderWidth: 1,
    padding: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  searchButtonOuter: {
    height: 50,
    width: 50,
    // borderColor: "red",
    // borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bdc3c7",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  populorCourseCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "49d%",
    maxHeight: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    marginTop: 8,
  },
  courseImageOuter: {
    width: "100%",
    resizeMode: "contain",
  },
  cardBottom: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 16,
    height: 80,
    //  borderColor: "blue",
    //  borderWidth: 1,
  },
  favButtonOuter: {
    marginTop: 3,
    padding: 3,
    backgroundColor: "#3498db",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    // flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 5,
    padding:8,
    backgroundColor: "#dfe6e9",
    height: 500,
    width: 325,
    borderRadius: 10,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  button: {
    borderRadius: 10,
    padding: 5,
    flexDirection:"row"
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Home;
 /* <FavCard
                          key={item.item.key}
                          item={{
                            key: item.item.key,
                            name: item.item.name,
                            image: item.item.image,
                            category: item.item.category,
                            remove: { removeItem },
                          }}
                          remove={removeItem}
                        /> */