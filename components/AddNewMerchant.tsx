import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import Input from './Input';
import Colors from '@/constants/Colors';
import Button from './Button';
import { useAuth } from '@/contexts/AuthContext';
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl } from 'aws-amplify/storage';
import * as mutations from '../src/graphql/mutations';
import { router } from 'expo-router';


const AddNewMerchant = () => {
    const { theme } = useTheme();
    const [ categoryName, setCategoryName ] = React.useState("");
    const [ contentType, setContentType ] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [ filename, setFilename ] = useState("");
    const { user } = useAuth();
    const client = generateClient();


    const pickImage = async () => {
    // Ask the user for permission to access the media library
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFilename(result.assets[0].fileName ?? "")
      setContentType(result.assets[0].mimeType ?? "")
      console.log(result.assets[0].mimeType)
    }
  };

  const addMerchant = async () => {

    const response = await fetch(image);
    const blob = await response.blob()
    ;
    try {
      const result = await uploadData({
        key: `photos/${filename}`,
        // path: `photos/${filename}`,
        data: blob,
        options: {
          accessLevel: 'private',
          contentType: contentType
        }
      }).result;
      console.log('Succeeded: ', result);

      const payload = {
        name: categoryName,
        image: `${result.key}`
      };
      
      const response = await client.graphql({
              query: mutations.createMerchant,
              variables: { input: payload },
              authMode: 'userPool'
            });

        Alert.alert("New Merchant Added", "Your merchant has been added successfully.", [
        {
            text: "OK",
            onPress: () => router.push("/(tabs)/home"),
        },
        ]);

      // You can now use payload here (e.g., send to backend)
    } catch (error) {
      console.log('Error : ', error);
    }

  }


  return (
    
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View>
            <Text style={[styles.pageTitleTxt, { color: theme.textColor}]}>Add a New Merchant</Text>
            <Text style={[styles.pageTxt, {marginLeft: 20, color:theme.textColor}]}>Let's add a new merchant to your <Text style={{ fontWeight: 600 }}>account</Text>.</Text>
          </View>
          <View style={ {gap: 16}}>
            <View>
                <Text style={[styles.groupHeaderTxt, {color: theme.textColor}]}>Merchant Name</Text>
                <Input 
                    placeholder="Enter merchant name" 
                    onChangeText={(value) => {setCategoryName(value)}}
                    iconLeft={<MaterialIcons name='storefront' size={24} color={theme.textColor}/>}
                />
            </View>
            <View>
              <Text style={[styles.groupHeaderTxt, {color: theme.textColor}]}>Merchant Icon</Text>
              <TouchableOpacity onPress={()=>{pickImage()}} style={{ 
                  width: 100,
                  height: 100,
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  borderRadius: 10, 
                  borderWidth: 0.7,
                  borderColor: Colors.gray,
                  borderStyle: 'dashed',
                  backgroundColor: "#333"}}>  
                  { image ? (
                      <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>
                  ): 
                      <MaterialCommunityIcons name='file-image-plus' size={36} color={theme.textColor}/>
                  }
              </TouchableOpacity>                           
            </View>
                </View>
                <Button onPress={addMerchant}> 
                    <Text style={{color : Colors.white,fontSize:16, fontWeight: 400}}>Add Merchant</Text>
                </Button>
    </View>
              
  )
}

export default AddNewMerchant

const styles = StyleSheet.create({
  container: {
        flex: 1,
        gap: 16,
      },
  groupHeaderTxt: {
      fontSize: 14,
      paddingBottom: 8,
      fontWeight: 600,
    },
  pageTitleTxt : {
          fontSize: 24,
          fontWeight: 700
      },
  pageSubTitleTxt : {
    fontSize: 18,
    fontWeight: 700
  },
  pageTxt : {
      fontSize: 12,
  },
})