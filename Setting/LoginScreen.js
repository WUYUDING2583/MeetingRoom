import React, { Component } from "react";
import { View, Button, Text, TextInput, TouchableOpacity, NativeModules, } from "react-native";
import Styles, { backgourndColor } from "../Styles.js";
import Icon from "react-native-vector-icons/Ionicons"
import url from "../url.js";
import Toast from "react-native-easy-toast";
import global from "../Global.js";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            pswd: "",
        };
    }

    login = () => {
//        let data = { account: this.state.account, pswd: this.state.pswd };
//        let opt = {
//            method: "POST",
//            headers: {
//                headers: {
//                    'Accept': 'application/json;charset=utf-8',
//                    'Content-Type': 'application/json;charset=utf-8',
//                },
//                body: data,
//            }
//        }
//        fetch(url.adminLogin(), opt).then((response) => response.json())
//            .then((responseJson) => {
//                console.log(responseJson);
//                if (responseJson.status === 200) {
//                    if ("success".localeCompare(responseJson.result) === 0) {
//                          NativeModules.LoginInterface.jumpToSetting(responseJson.data.companyId);
//                       // this.refs.toast.show("登录成功");
//                    } else {
//                        this.refs.toast.show(responseJson.msg);
//                    }
//                } else {
//                    this.refs.toast.show("似乎出了什么错");
//                }
//            }).catch((error) => {
//                console.log(error);
//                this.refs.toast.show("似乎出了什么错");
//            })
        global.companyId=1;
         NativeModules.LoginInterface.jumpToSetting(1);
    }

    goBack = () => {
        NativeModules.LoginInterface.goBackToFragment(false);
    }
    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Icon name="ios-arrow-round-back" size={40} color={"white"} style={{ margin: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }} >
                    <Text style={Styles.title}>管理员登录</Text>
                    <Text style={Styles.itemTitle}>账号</Text>
                    <TextInput style={{ ...Styles.input }}
                        onChangeText={(account) => this.setState({ account })} />

                    <Text style={Styles.itemTitle}>密码</Text>
                    <TextInput style={{ ...Styles.input, marginBottom: 20 }} secureTextEntry={true}
                        onChangeText={(pswd) => this.setState({ pswd })} />
                    <TouchableOpacity onPress={this.login.bind(this)}>
                        <View style={{
                            borderWidth: 1, borderColor: "white", backgroundColor: "white",
                            height: 50, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20
                        }}>
                            <Text style={{ color: "#376B6D" }}>登录</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 }} />
                <Toast
                    ref="toast"
                    style={Styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: backgourndColor, fontSize: 20, fontWeight: "bold" }}
                />
            </View>
        )
    }
}