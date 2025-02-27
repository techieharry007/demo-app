import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../utils/dimentions'
import { colors } from '../assets/colors'
import { navigate } from '../utils/helper'
import { AppRoutes } from '../utils/constants'
import { useAuth } from '../context/authContext'

const CommonHeader = ({title,flag,logout}:{title:string,flag:boolean,logout:boolean}) => {
  const {signOut}=useAuth()
  return (
    <View style={styles.container}>
      {flag &&<Pressable style={{position:"absolute",right:horizontalScale(20)}} onPress={()=>{navigate(AppRoutes.edit)}}>
        <Text style={{fontSize:moderateScale(40),color:colors.white}}>+</Text>
      </Pressable>}
      {logout &&<Pressable style={{position:"absolute",left:horizontalScale(20)}} onPress={()=>{navigate(AppRoutes.edit)}} onPressIn={()=>signOut()}>
        <Text style={{fontSize:moderateScale(40),color:colors.white}}>{"<-"}</Text>
      </Pressable>} 
      <Text style={styles.txt}>{title}</Text>
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
    container:{
        height:verticalScale(100),
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:colors.primary
    },
    txt:{
        fontSize:moderateScale(25),
        color:colors.white,
        fontWeight:'700'
    
    }
})