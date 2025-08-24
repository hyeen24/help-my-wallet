import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import Input from './Input';
import Colors from '@/constants/Colors';
import Button from './Button';
import { useAuth } from '@/contexts/AuthContext';
import { generateClient } from 'aws-amplify/api';
import { uploadData, list } from 'aws-amplify/storage';
import { Storage } from 'aws-amplify';

const AddNewMerchant = () => {
    const { theme } = useTheme();
    const [ categoryName, setCategoryName ] = React.useState("");
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
    }
  };

  const addMerchant = async () => {
    // const payload = {
    //     merchant_name: categoryName,
    //     author_id: user.userId || "",



    // }
    // console.log(filename)

    try {
    const result = await uploadData({
        key: `photos/${filename}`,
        // path: `photos/${filename}`,
        data: image || "",
        options: {
            accessLevel: 'private'
        }
    }).result;
    console.log('Succeeded: ', result);
    } catch (error) {
    console.log('Error : ', error);
    }


    // if (result) {
    //     const key = result.key || "";      

    //     await list({
    //         prefix: 'photos/',
    //         options:  {
    //             accessLevel: 'private',
    //         }
    //     }).then((res)=> {
    //         console.log('Listed Items:', res.items);
    //     })
    //     }

      

  }


  return (
    
    <View style={{ gap: 20 }}>
        <View>
            <Text style={[styles.groupHeaderTxt, {color:theme.textColor}]}>Merchant Name</Text>
            <Input
                placeholder="Enter merchant name"
                onChangeText={(value) => {
                setCategoryName(value);
                }}
                iconLeft={
                <MaterialIcons
                    name="storefront"
                    size={24}
                    color={theme.textColor}
                />
                }
            />
        </View>
        <View>
            <Text style={[styles.groupHeaderTxt, {color:theme.textColor}]}>Linked Account</Text>
            <Input
                placeholder="Select linked account"
                onChangeText={(value) => {}} // Handle linked account selection
                iconLeft={
                <MaterialCommunityIcons
                    name="bank"
                    size={22}
                    color={theme.textColor}
                />
                }
            />
        </View>
        <View>
            <Text style={[styles.groupHeaderTxt, {color: theme.textColor}]}>Merchant Icon</Text>
            <TouchableOpacity
                onPress={() => {
                pickImage();
                }}
                style={{
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 0.7,
                borderColor: theme.textColor,
                borderStyle: "dashed",
                backgroundColor: '#ccc',
                }}
            >
                {image ? (
                <Image
                    source={{ uri: image }}
                    style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    }}
                />
                ) : (
                <MaterialCommunityIcons
                    name="file-image-plus"
                    size={36}
                    color={theme.textColor}
                />
                )}
            </TouchableOpacity>
        </View>
        <Button onPress={addMerchant}>
            <Text style={[styles.groupHeaderTxt, {color:Colors.white}]}>Add Merchant</Text>
        </Button>
    </View>
              
  )
}

export default AddNewMerchant

const styles = StyleSheet.create({
    groupHeaderTxt: {
        fontSize: 14,
        paddingBottom: 8,
        fontWeight: 600,
      }
})