import React,{Component} from "react";
import {View,TouchableOpacity,NativeModules} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Styles, { backgourndColor } from "../Styles.js";

export default class Example extends Component{
    constructor(props){
        super(props);
    }

    goBack=()=>{
        NativeModules.RecognizeInterface.goBackToFragment(true);
    }
    render(){
        return(
            <View style={{flex:1,justifyContent:"flex-end",alignItems:"center"}}>
            <TouchableOpacity onPress={this.goBack}>
            <View style={{justifyContent:"center",alignItems:"center",margin:30,backgroundColor:backgourndColor,width:50,height:50,borderRadius:50}}>
                <Icon name="md-home" size={40} color={"white"} />
             </View>
             </TouchableOpacity>
             </View>
        )
    }
}
