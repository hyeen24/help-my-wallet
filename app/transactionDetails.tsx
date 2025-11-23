import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import PageHeader from '@/components/PageHeader'
import { AntDesign, Entypo, FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import  Colors from '@/constants/Colors'
import ButtonSpaceBetweenTwoItem from '@/components/ButtonSpaceBetweenTwoItem'
import { toTitleCase } from '@/utils/stringUtils'
import { useTheme } from '@/contexts/ThemeContext'
import { getUrl } from 'aws-amplify/storage'



const transactionDetails = () => {
  const { theme } = useTheme();
  const { merchantIcon, merchantName, merchantId, itemAmount,itemTitle, itemDescription, transactionId, transactionDate} = useLocalSearchParams();
  const [ merchantImageUrl, setMerchantImageUrl ]  = useState("")


  const moveToMerchant = (merchantId : string)=> {
    console.log("Merchant ID:", merchantId);
    if (merchantName === "Unknown") {
       router.push({
        pathname: '/addMerchant',
        params: {
          transactionId
        }})
      
    } else {
      console.log("Merchant Name is known, redirecting to merchantDetails")
      router.push({
            pathname: '/merchantDetails',
            params: {
                merchantId
            }
        });
    }
  };

  const getMerchantUrl = async () => {
    const res = await getUrl({
          key: merchantIcon, // your S3 key
          options: { accessLevel: "private" }, // or "public"
      })
      
    const url = res.url
    // console.log(url)
    setMerchantImageUrl(url.toString())
    
  }
    
    useEffect(()=> {
      if (merchantIcon !== "") {
        getMerchantUrl()
      }
      // setMerchantImageUrl(url)
    },[])

          // Return a new object with a `url` property
      

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor}}>
        <PageHeader
            title="Transactions Details"
            rightButton={<MaterialIcons name="notifications" size={22} color={Colors.white}/>}
            onPress={()=>{}}/>
        
        <View style={styles.container}>
          {
            merchantImageUrl === '' ? (
              <Fontisto name="shopping-store" size={50} color={theme.textColor}/>
            ) : (
              <Image
            source={{ uri :  merchantImageUrl}}
                        style={styles.merchantImage}
                      />
            ) 
          }  
          <View style={{alignItems: 'center', gap: 4}}>
                <Text style={[styles.amountTxt, { color: theme.textColor}]}>${itemAmount}</Text>
                <Text style={{ color: theme.textColor , fontWeight: 700 , fontSize: 16}}>{itemTitle}</Text>
                <Text style={{ color: theme.textColor }}>{itemDescription}</Text>
          </View>

          <ButtonSpaceBetweenTwoItem
            leftTxt='Merchant'
            rightTxt={toTitleCase(merchantName)}
            leftIcon={<Entypo name='shop' size={22} color={Colors.black}/>}
            rightIcon={<AntDesign name='right' size={22}
              color={Colors.black}
              weight="bold"
              />}
              onPress={() => moveToMerchant(merchantId)}/>
          <ButtonSpaceBetweenTwoItem
            leftTxt='Date'
            rightTxt={transactionDate}
            leftIcon={<FontAwesome name='calendar' size={22} color={Colors.black}/>}
            />
        </View>
    </View>
  )
}

export default transactionDetails

const styles = StyleSheet.create({
 container: {
  flex: 1,
  paddingTop: 24,               // ✅ Add spacing manually
  paddingHorizontal: 16,
  alignItems: 'center',
  gap: 16,
},
   merchantImage:{
    width: 100, 
    height: 100,
    borderRadius: 10
  },
  amountTxt : {
    fontSize: 36,
    fontWeight: 700,
  },
  fontTxt : {
    fontSize: 16
  },
})