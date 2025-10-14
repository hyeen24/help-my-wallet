import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import PageHeader from '@/components/PageHeader';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { toTitleCase } from '@/utils/stringUtils';
import Input from '@/components/Input';
import * as ImagePicker from 'expo-image-picker'
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/Button';
import { router, useLocalSearchParams } from 'expo-router';
import Loading from '@/components/Loading';
import { generateClient } from 'aws-amplify/api'
import * as mutations from '../src/graphql/mutations';
import { listMerchants } from '@/src/graphql/queries';
import { uploadData, getUrl } from '@aws-amplify/storage';
import { useTheme } from '@/contexts/ThemeContext';
import { backgroundColor, textColor } from '@/utils/ThemeColors';

const addMerchant = () => {
    const [merchantData, setMerchantData] = useState<any[]>([]);
    const [selectedMerchant, setSelectMerchant] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [newMerchant, setNewMerchant] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState("");
    const [currentKeyWord, setCurrentKeyWord] = useState<string>("");
    const [keywords, setKeywords]  = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { transactionId } = useLocalSearchParams();
    const client = generateClient();
    const { theme } = useTheme();

    // Function to pick image from gallery
    const pickImage = async () => {
            // Ask the user for permission to access the media library
           // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
    
            console.log(result);
    
            if (!result.canceled) {
            setImage(result.assets[0].uri);
            }
        };

    const fetchData = async () => {
        try {
           const merchantResult = await client.graphql({ query: listMerchants ,authMode: 'userPool' });
           const merchants = merchantResult.data?.listMerchants?.items ?? [];

           const updatedMerchants = await Promise.all(
            merchants.map(async (merchant: any) => {
                const result = await getUrl({
                    key: merchant.image, // your S3 key
                    options: { accessLevel: "private" }, // or "public"
                });

                // Return a new object with a `url` property
                return { ...merchant, url: result.url.toString() };
            })
           );
           console.log("Merchants fetched:", updatedMerchants);
           setMerchantData(updatedMerchants);
        } catch (err) {
            console.error("API fetch error:", err);
            Alert.alert("Error fetching merchant data:", err);
            return;
        }
        };
    
    useEffect(() => {
        fetchData();
    }
    , []);

    const selectCurrentMerchant = (merchantId: string) => () => {
        if (selectedMerchant === merchantId) {
            setSelectMerchant(null);
        }else {
            setSelectMerchant(merchantId);
        }
        console.log("Selected Merchant ID:", merchantId);
    }

    const toggleMerchantNewExisting = () => {
        setNewMerchant(!newMerchant);
    }

    const attachMerchant = async () => {
        console.log("transactionId",transactionId)
        console.log("Merchant selected",selectedMerchant)

        if (selectedMerchant && transactionId) {
            await client.graphql({
                query: mutations.createMerchantTransaction,
                variables : {
                    input : {
                        merchant_id : selectedMerchant,
                        transaction_id : transactionId
                    }
                },
                 authMode: 'userPool'
            }).then((res) => {
                Alert.alert("Attached Successfully","Merchant is attached to the transaction successfully.",[
                        {
                            text: "OK",
                            onPress: () => router.push("/(tabs)/home"),
                        },
                        ])
            })
        }
    }

    const addNewWord = (keyword: string) => () => {
        console.log("Pressed Add New Word:", keyword);
        if (keyword.trim() === "") {
            console.log("Keyword is empty, not adding.");
            return;
        }

        if (keywords.includes(keyword)) {
            console.log("Keyword already exists, not adding.");
            return;
        }
        setKeywords([...keywords, keyword]);
    }

    const addNewMerchant = async () => {
          
    }
    
  return (
    <ProtectedRoute>
        { loading ? (
            <Loading/>
        ) :
        
        <View style={{ flex: 1}}>
            <PageHeader
                title="Add Merchant" />
            { !newMerchant ? (

            <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}> 
                <Text style={[styles.pageTitleTxt, { color : theme.textColor }]}>Attach a Merchant</Text>
                <Text style={[styles.pageTxt, {color: theme.textColor}]}>Let's tag a merchant to this <Text style={{ fontWeight: 600 }}>transactions</Text>.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={[styles.pageSubTitleTxt, {color : theme.textColor}]}>Exisiting Merchant</Text>
                    <Button style={styles.toggleNewMerchantBtn} onPress={toggleMerchantNewExisting}>
                        <Text style={{color : Colors.white
                        }}>Add New Merchant</Text>
                    </Button>
                </View>
                <View style={styles.containerExistingMerchant}>
                    {
                        merchantData.length > 0 ? (
                            merchantData.map((merchant: any) => (
                                <TouchableOpacity key={merchant.id} style={ 
                                    selectedMerchant === merchant.id ? styles.containerExistingMerchantItem2 : styles.containerExistingMerchantItem
                                } onPress={selectCurrentMerchant(merchant.id)}>
                                    
                                    <Image
                                        source={{
                                            uri: merchant.url,
                                        }}
                                        style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 5 }}/>
                                    
                                    <Text style={{ color: theme.textColor, fontSize: 16 }}>{toTitleCase(merchant.name)}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: theme.textColor}}>No merchants found.</Text>
                            </View>
                        )
                    }
                </View>
                <Button 
                    style={{backgroundColor: Colors.tintColor}}
                    onPress={attachMerchant} disabled={merchantData.length === 0 || selectedMerchant === null}> 
                    <Text style={{color: Colors.white, fontWeight: 500}}>Attach Merchant</Text>
                </Button>
            </View>
            ) : (
            <View style={styles.container}>
                <Text style={styles.pageTitleTxt}>Attach a Merchant</Text>
                <Text style={styles.pageTxt}>Let's tag a merchant to this <Text style={{ fontWeight: 600 }}>transactions</Text>.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={[styles.pageTitleTxt, { color : theme.textColor }]}>Add New Merchant</Text>
                    <Button style={styles.toggleNewMerchantBtn} onPress={toggleMerchantNewExisting}>
                        <Text style={{color : Colors.white}}>Existing</Text>
                    </Button>
                </View>
                <View style={{ gap: 20 }}>
                    <View>
                        <Text style={styles.groupHeaderTxt}>Merchant Name</Text>
                        <Input 
                            placeholder="Enter merchant name" 
                            onChangeText={(value) => {setCategoryName(value)}}
                            iconLeft={<MaterialIcons name='storefront' size={24} color={theme.textColor}/>}
                        />
                    </View>
                    <View style={{ gap: 5 }}>
                    </View>
                    <View>
                        <Text style={styles.groupHeaderTxt}>Merchant Icon</Text>
                        <TouchableOpacity onPress={()=>{pickImage()}} style={{ 
                            width: 100,
                            height: 100,
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            borderRadius: 10, 
                            borderWidth: 0.7,
                            borderColor: Colors.gray,
                            borderStyle: 'dashed',
                            backgroundColor: Colors.neutral200}}>  
                            { image ? (
                                <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }}/>
                            ): 
                                <MaterialCommunityIcons name='file-image-plus' size={36} color={theme.textColor}/>
                            }
                        </TouchableOpacity>                           
                    </View>
                </View>
                <Button onPress={addNewMerchant}> 
                    <Text style={{color : Colors.white}}>Add Merchant</Text>
                </Button>
            </View>
            )}
        </View>
        }
    </ProtectedRoute>
  )
}

export default addMerchant

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 16,
    },
    containerExistingMerchant: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10,
    }, 
    containerExistingMerchantItem: {
        justifyContent:'center',
        alignItems:'center', 
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.white,
        // IOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Anroid shadow
        elevation: 1,
    },
    containerExistingMerchantItem2: {
        justifyContent:'center',
        alignItems:'center', 
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.tintColor,
        padding: 10,
        // IOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Anroid shadow
        elevation: 1,
        
    },
    groupHeaderTxt: {
            fontSize: 14,
            paddingBottom: 8,
            fontWeight: 600
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
        marginBottom: 10,
    },
    descriptionTxt: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 10,
    },
    toggleNewMerchantBtn: {
        width : 150, 
        height: 30, 
        alignSelf: 'flex-end', 
        borderRadius: 8,
        justifyContent: 'center'
    }
})