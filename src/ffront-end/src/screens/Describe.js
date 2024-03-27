// import React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, RefreshControl, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import ApiService from '../utils/ApiService';
import { useAuth } from '../context/AuthContext';

import MapView,{Polygon} from "react-native-maps"





const FakeScreen = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false); // Initialize isFavorite as false
  const [selectedBox, setSelectedBox] = useState(null);
  const [CultureDisease,setCultureDisease] = useState([])
  const {token,user} = useAuth()
  const route = useRoute()
  const {culture} = route.params
  const [refreshing, setRefreshing] = React.useState(false);


  const getCoordinates = (coordinates) => {
    console.log(coordinates)
    const coords = coordinates.map(coord=>({
      latitude:coord[1],
      longitude:coord[0]
    }))
    return coords
  }
  console.log("selectedBox ",selectedBox)
  const [action,setAction] = useState(null)

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBoxPress = (box) => {
    setSelectedBox(box);
  };

  const handleClosePopup = () => {
    setSelectedBox(null);
    setAction(null)
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
    //   navigation.navigate('FavoriteScreen', { text: 'Crop 1 Selected' });
    }
  };

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   ApiService.getPopularCultures(token).then(res=>res.json()).then(cultures=>{
  //     setPopularCultures(cultures)
  //     console.log(cultures[0].culture)
  //    }).catch(err=>console.log(err.message))
  //   setTimeout(() => {

  //     setRefreshing(false);
  //   }, 2000);
  // }, []);
 
  // const renderBoxes = () => {
  //   return (
  //     <ScrollView horizontal> 
  //       <View style={styles.boxContainer}>
  //         {fertilizer.map((box, index) => (
  //           <TouchableOpacity style={styles.box} key={index} onPress={() => handleBoxPress(box)}>
  //             <Image
  //               source={{ uri: box.image }}
  //               style={styles.boxImage}
  //             />
  //             <Text style={styles.locationText}>{box.location}</Text>
  //             <Text style={styles.elementText}>{box.element}</Text>
  //           </TouchableOpacity>
  //         ))}
  //       </View>
  //     </ScrollView>
  //   );
  // };

  const RenderBoxes = ({culture}) => {
    const [cultureIllness,setCultureIllness]=useState([])
    const {token} = useAuth()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
      setLoading(true)
      ApiService.getCultureDisease(culture?.id,token)
      .then(res=>res.json())
      .then(data=>{
        console.log('Data recieved',data.length)
        setCultureIllness(data);
        setLoading(false)
      }).catch(err=>console.log("error ",err.message))
    },[culture])
  
    if(loading){
      return  <ActivityIndicator size={'large'} color={'blue'} />
    }
    else{
      return (
        <ScrollView horizontal> 
       
         <View style={styles.boxContainer}>
           {cultureIllness && cultureIllness?.map((data, index) => (
             <TouchableOpacity style={styles.box} key={index} onPress={() => {setAction("illness");handleBoxPress(data)}}>
               <Image
                 source={{ uri: data.image }}
                 style={styles.boxImage}
               />
               <Text style={styles.locationText}>{data.disease_name}</Text>
               <Text style={styles.elementText}>{data.solution}</Text>
             </TouchableOpacity>
           ))}
           
         </View>
       </ScrollView>
     );
    }
   
  };

 
  const renderfertilizers = () => {
    // const [fertilizer,setfertilizer]=useState([])
    // const [loading,setLoading]=useState(true)

    // useEffect(()=>{
    //   ApiService.getCultureFavorableAreas(culture?.id,token).then(res=>res.json()).then(data=>{
    //     setfertilizer(data.features)
    //     setLoading(false)
    //     console.log(data)
    //   }).catch(err=>console.log(err.message))
    // },[])
    // if(loading){
    //   return <ActivityIndicator size={20} color={'blue'}/>
    // }
    // return (
    //   <ScrollView horizontal> 
    //     <View style={styles.boxContainer}>
    //       {fertilizer?.map((area, index) => (
    //         <TouchableOpacity style={styles.box} key={index} onPress={() => {setAction("fertilizer");handleBoxPress(area)}}>
    //           {/* <Image
    //             source={{ uri: box.image }}
    //             style={styles.boxImage}
    //           /> */}
    //           {/* <Text style={styles.locationText}>{data.disease_name}</Text>
    //            <Text style={styles.elementText}>{data.solution}</Text> */}
    //           <Text style={styles.locationText}>{area.properties.soil.type}</Text>
    //           <Text style={styles.elementText}>{area.properties.soil.description}</Text>
    //         </TouchableOpacity>
    //       ))}
    //     </View>
    //   </ScrollView>
    // );

    
    return (
      <ScrollView horizontal> 
        <View style={styles.boxContainer}>
          {fertilizer.map((box, index) => (
            <TouchableOpacity style={styles.box} key={index} onPress={() => {setAction("fertilizer");handleBoxPress(box)}}>
              <Image
                source={{ uri: box.image }}
                style={styles.boxImage}
              />
              <Text style={styles.locationText}>{box.location}</Text>
              <Text style={styles.elementText} numberOfLines={1}>{box.element}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderzones = () => {
    const [favorableArea,setFavorableAreas]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
      ApiService.getCultureFavorableAreas(culture?.id,token).then(res=>res.json()).then(data=>{
        setFavorableAreas(data.features)
        setLoading(false)
        console.log(data)
      }).catch(err=>console.log(err.message))
    },[])
    if(loading){
      return <ActivityIndicator size={20} color={'blue'}/>
    }
    return (
      <ScrollView horizontal> 
        <View style={styles.boxContainer}>
          {favorableArea?.map((area, index) => (
            <TouchableOpacity style={styles.box} key={index} onPress={() => {setAction("zone");handleBoxPress(area)}}>
              {/* <Image
                source={{ uri: box.image }}
                style={styles.boxImage}
              /> */}
              <Text style={styles.locationText}>{area.properties.soil.type}</Text>
              <Text style={styles.elementText}>{area.properties.soil.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };


  const fertilizer = [
    {  location: 'Nitrogen Fertilizers', element: 'Nitrogen fertilization is the process of adding nitrogen-containing compounds to the soil or plants to supply the essential nutrient nitrogen (N) for optimal plant growth and development. The appropriate dosage and application method should be determined based on soil tests, nutrient requirements of the specific crop, and local agricultural recommendations.  Efficient nitrogen fertilization practices aim to minimize nitrogen losses through leaching, volatilization, or denitrification, which can have negative environmental impacts. Proper timing, dosage, and placement of nitrogen fertilizers help optimize nutrient uptake by plants and reduce potential environmental pollution. Its important to note that excessive or unbalanced application of nitrogen fertilizers can lead to environmental issues, such as water pollution and greenhouse gas emissions. Therefore, it is recommended to follow best management practices and guidelines provided by agricultural experts to ensure responsible and efficient nitrogen fertilization.' },
    {  location: 'Phosphurus Fertilization', element: 'Phosphorus fertilization is the process of applying phosphorus-containing compounds to the soil or plants to provide the essential nutrient phosphorus (P) for optimal plant growth and development. Phosphorus is a vital element for plants as it plays a crucial role in energy transfer, photosynthesis, nutrient uptake, and overall plant metabolism.The primary objective of phosphorus fertilization is to maintain an adequate and balanced supply of phosphorus in the soil, as phosphorus availability is often limited in many agricultural soils. Phosphorus fertilizers are used to replenish or enhance the phosphorus levels in the soil, ensuring that plants have access to sufficient phosphorus for their growth and development.' },
    {  location: 'Compound Fertilization', element: 'Compound fertilization, also known as blended or complex fertilization, refers to the practice of using fertilizers that contain two or more essential nutrients in a single product. These fertilizers are formulated by combining different nutrient sources to provide a balanced supply of nutrients to plants. Compound fertilizers typically contain a combination of nitrogen (N), phosphorus (P), and potassium (K), but they can also include secondary and micronutrients depending on the specific formulation.The main advantage of compound fertilizers is their ability to provide multiple nutrients in a single application, which simplifies the fertilization process and ensures a more balanced nutrient supply to the plants. Instead of applying different fertilizers separately, farmers can use compound fertilizers to meet the nutritional needs of crops efficiently.' },
    {  location: 'Organic Fertilization', element: 'Organic fertilizer refers to any natural substance or product that is derived from organic matter and used to provide essential nutrients to plants. Unlike synthetic or chemical fertilizers, organic fertilizers are made from natural sources and undergo minimal processing. They are commonly used in organic farming and gardening practices as they promote soil health, environmental sustainability, and the production of nutritious crops.' },
  ];


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: culture?.photo }} // Replace with your image URL
        style={styles.backgroundImage}
      />

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title1}>{culture?.name} Description</Text>
      <Text style={styles.descriptionText} numberOfLines={10}>
        {culture?.description}
      </Text>
      <Text style={styles.heading}>Crop illnesses</Text>
      <RenderBoxes culture={culture}/>
      <Modal visible={selectedBox !== null && action=='illness'} animationType="slide">
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          {selectedBox && (
            <View style={styles.popupContent}>
              <Text style={styles.popupLocationText}>{selectedBox.disease_name}</Text>
              <Text style={styles.popupElementText}>{selectedBox.solution}</Text>
            </View>
          )}
        </View>
      </Modal>

      <Text style={styles.heading}>Fertilization</Text>
      <Text style={styles.descriptionText}>
         The available fertilizers for this crop are:
      </Text>
      {renderfertilizers()}
      <Modal visible={selectedBox !== null && action=="fertilizer"} animationType="slide">
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          {selectedBox && (
            <View style={styles.popupContent}>
              <Text style={styles.popupLocationText}>{selectedBox.location}</Text>
              <Text style={styles.popupElementText} >{selectedBox.element}</Text>
            </View>
          )}
        </View>
      </Modal>

      <Text style={styles.heading}>Cultivation Zones</Text>
      <Text style={styles.descriptionText}>
         The best zones for the cultivation of this crop are listed below:
      </Text>
      {renderzones()}
      <Modal visible={selectedBox !== null && action=='zone'} animationType="slide">
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <View>
            {/* {getCoordinates(selectedBox)} */}
            {console.log(selectedBox)}
            <MapView style={{width:320,marginTop:100,height:500}} initialRegion={{latitude:4,longitude:11,latitudeDelta: 0.015,
              longitudeDelta: 0.0121,}} zoomControlEnabled
            zoomTapEnabled>
              {/* {selectedBox?.geometry && 
              
              <Polygon coordinates={getCoordinates(selectedBox.geometry?.coordinates)} strokeColor='#FF0000' fillColor='rgba(255,0,0,0.5)'/>
              } */}
            </MapView>
          </View>
        </View>
      </Modal>
    </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '150%',
    height: '20%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  contentContainer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    marginTop: 125, 
    width: '105%',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  boxContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: 20,
  },
  box: {
    width: 200,
    height: 160,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#025592',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
  boxImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    Top: 0,
    left: 0,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  elementText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  popupContent: {
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  
});

export default FakeScreen;