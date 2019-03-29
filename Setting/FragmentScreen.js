import React, { Component } from "react";
import {
    View, Button, Text, StyleSheet, Modal,
    TouchableOpacity, FlatList, NativeModules, Dimensions, Alert
} from "react-native";
import Styles, { backgourndColor } from "../Styles.js";
import Icon from "react-native-vector-icons/Ionicons"
import url from "../url.js";
import Toast from "react-native-easy-toast";
import FragmentItem from "./FragmentItem.js";
import FragmentSelectItem from "./FragmentSelectItem.js";
import QRCode from "react-native-qrcode-svg";
import global from "../Global.js";
import DatePicker from 'react-native-date-picker';

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            fragment: global.fragment[0],
            duration: 0,//会议室开启的时间长度
            piece: 0,//时间片
            rest: 0,//会议间隔时间
            isModalVisible: false,
            available: [],//预约会议可选取的时间片
            selectId: [],//预约会议选取的时间片id
            isVerify: false,//预约前的身份确认
            isSuccession: true,//判断选择的时间段是否连续
            showVerify: false,
            date:new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate(),
            isSetting:false,
            meetingRoomId:-1,
            showDatePicker:false,
            d:new Date(),
        };
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    componentWillMount(){
        global.storage.load({
              key: 'MeetingRoomId',
              autoSync: false,
              syncInBackground: false,
            }).then(ret => {
              this.setState({meetingRoomId:ret,isSetting:true});
            }).catch((err)=>{
              console.log("personInfo"+err)
            })
    }
    componentDidMount() {
             NativeModules.FragmentInterface.getIsSetting((isSetting)=>{
                this.setState({isSetting});
            })
            NativeModules.FragmentInterface.getIsVerify((isVerify,isPreview)=>{
                if(isVerify){
                    this.refs.toast.show("人脸登录成功\n您的信息将在两分钟后被清理");
                }else if(isPreview){
                    this.refs.toast.show("人脸登录失败");
                }
                 this.setState({isVerify});
                  this.timer=setTimeout(() => {
                       this.setState({isVerify:false})
                     }, 1000*2*60);
             })
        // this.getArrangeList();
        // let date = new Date();
        // let start = "08:00:00";
        // let end = "21:32:00";
        // let startHour = parseInt(start.substring(0, 2));
        // let startMinute = parseInt(start.substring(3, 5));
        // let endHour = parseInt(end.substring(0, 2));
        // let endMinute = parseInt(end.substring(3, 5));
        // let duration = endHour * 60 + endMinute - startHour * 60 - startMinute;
        // let piece = 30;
        // let rest = 10;
        // let fragment = [];
        // start = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + start;
        // end = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + end;
        // let timestamp1 = new Date(start).getTime();

        // for (var i = 0; i < (duration / (piece + rest)) + 1; i++) {
        //     timestamp = timestamp1 + i * (piece + rest) * 60 * 1000;
        //     let startDate = new Date();
        //     let endDate = new Date();
        //     startDate.setTime(timestamp);
        //     let startHour = startDate.getHours();
        //     let startMinute = startDate.getMinutes();
        //     if (startHour / 10 < 1) {
        //         startHour = "0" + startHour;
        //     }
        //     if (startMinute / 10 < 1) {
        //         startMinute = "0" + startMinute;
        //     }
        //     let start = startHour + ":" + startMinute;
        //     endDate.setTime(timestamp + piece * 60 * 1000);

        //     let endHour = endDate.getHours();
        //     let endMinute = endDate.getMinutes();
        //     if (endHour / 10 < 1) {
        //         endHour = "0" + endHour;
        //     }
        //     if (endMinute / 10 < 1) {
        //         endMinute = "0" + endMinute;
        //     }
        //     let end = endHour + ":" + endMinute;
        //     fragment.push({
        //         start,
        //         end,
        //         use: false,
        //         id: i,
        //     })
        // }
        // this.setState({ duration, piece, rest, fragment });
        // console.log(fragment);

    }

    getArrangeList = () => {
        let d = new Date();
        let time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        console.log(time);
        let place_id = 20;
        let URL = url.searchArrange(time, place_id);
        let opt = {
            method: "GET",
        }
        fetch(URL, opt).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    if ("success".localeCompare(responseJson.result) === 0) {
                        this.setState({ data: responseJson.data })
                    } else {
                        this.refs.toast.show("似乎出了什么错");
                    }
                } else {
                    this.refs.toast.show("似乎出了什么错");
                }
            }).catch((error) => {
                console.log(error);
                this.refs.toast.show("似乎出了什么错");
            })
    }

    goToLogin = () => {
        NativeModules.FragmentInterface.goToLogin();
    }
    _keyExtractor = (item, index) => index.toLocaleString();

    _renderItem = ({ item }) => <FragmentItem data={item} onPress={this.handle} />

    //点击开启或预约
        handle = (id, use) => {
            let { fragment, rest,date } = this.state;
            let start, end;
            let d=new Date();
            fragment.findIndex((item) => {
                if (item.id === id) {
                    start = date + " " + item.start;
                    end = date + " " + item.end;
                }
            });
            if (use) {
                //跳转至人脸识别
//                NativeModules.FragmentInterface.jumpToRecognize();
                if (d.getTime() > new Date(start).getTime() - rest / 2 * 60 * 1000 && d.getTime() < new Date(end).getTime()) {
                     NativeModules.FragmentInterface.jumpToRecognize();
                } else if (d.getTime() < new Date(start).getTime() - rest / 2 * 60 * 1000) {
                    this.refs.toast.show("还未到会议时间请稍后再来");
                } else {
                    this.refs.toast.show("该会议已结束");
                }
            } else {
                let { isVerify } = this.state;
                if (!isVerify) {
                    this.setState({ showVerify: true });
                    return;
                }
                if (d.getTime() > new Date(start).getTime() - 20 * 60 * 1000) {
                    this.refs.toast.show("无法预约该时间段的会议");
                    return;
                }
                let available = [];
                for (var i = id; i < fragment.length; i++) {
                    if (!fragment[i].use) {
                        available.push(fragment[i]);
                        continue;
                    }
                    break;
                }
                this.setState({ available,showDatePicker:false });
                console.log(this.state.available);
                this._toggleModal();
                this.timer = setTimeout(() => {
                    this.setState({ isVerify: true });
                }, 3000);
            }
        }

    showDatePicker=()=>{
        this.setState({showDatePicker:true});
        this._toggleModal();
    }


    header = () => (
        <View>
            <TouchableOpacity onPress={this.showDatePicker}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{fontSize:20,color:backgourndColor}}>{this.state.date}</Text>
            </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: "#FAFAFA", flexDirection: "row", height: 40, borderBottomWidth: 1, borderBottomColor: backgourndColor }}>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: backgourndColor, fontWeight: "bold" }}>时间段</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: backgourndColor, fontWeight: "bold" }}>预约状态</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontSize: 15, color: backgourndColor, fontWeight: "bold" }}>操作</Text>
                </View>
            </View>
        </View>
    )

    separator = () => <View style={{ borderTopWidth: 1, borderColor: backgourndColor }} />

    _renderSelectItem = (item) => <FragmentSelectItem data={item} onPress={this.select} />

    //选择预约时间段
    select = (id, isSelect) => {
        let { selectId } = this.state;
        if (isSelect) {
            selectId.push(id);
        } else {
            selectId.splice(selectId.findIndex(item => item === id), 1);
        }
        console.log(selectId);
        this.setState({ selectId });
    }

    //选择时间段完成
    selectComplete = () => {
        let { selectId, fragment } = this.state;
        if (selectId.length === 0) {
            this._toggleModal();
            return;
        }
        let {date}=this.state;
         for (var i = 0; i < fragment.length; i++) {
             if (fragment[i].id === selectId[0]) {
                 let dat = new Date();
                 let start = date + " " + fragment[i].start;
                 console.log(start);
                 if (new Date(start).getTime() < dat.getTime()) {
                     this._toggleModal();
                     this.refs.toast.show("预约的时间不能早于当前时间");
                     return;
                 }
             }
         }
        let bitmap = [];
        for (var i = 0; i < selectId.length; i++) {
            bitmap.push(0);
        }
        selectId.map((item) => {
            bitmap[item % selectId.length] += 1;
        })
        console.log(bitmap);
        for (var i = 0; i < bitmap.length; i++) {
            if (bitmap[i] != 1) {
                this.setState({ isSuccession: false });
                return;
            }
        }
        fragment.map((item) => {
            selectId.map((i) => {
                if (i === item.id) {
                    item.use = true;
                }
            })
        })
        this.setState({ fragment, selectId: [] });
        this._toggleModal();
        this.refs.toast.show("预约成功");
         this.setState({selectId:[]});

    }

    jumpToLogin=()=>{
        NativeModules.FragmentInterface.jumpToLogin();
    }
    render() {
        let { width, height } = Dimensions.get("window");
        return (
            <View style={Styles.default}>
                {this.state.showVerify ?
                    <View style={{
                        width: width * 0.5, height: width * 0.3, position: "absolute", borderWidth: 1,
                         borderColor: "white",zIndex:10,top: height * 0.25, left: width * 0.25,
                         backgroundColor: backgourndColor, borderRadius: 20, padding: 20,
                    }}>
                        <Text style={{ fontSize: 20, color: "white", margin: 10 }}>你还没有登录哦，登陆后才能预约</Text>
                        <Text style={{ fontSize: 18, color: "white", marginLeft: 10 }}>是否进行人脸登录</Text>
                        <View style={{ flexDirection: "row-reverse", marginBottom: 10 }}>
                            <TouchableOpacity onPress={this.notFace}>
                                <Text style={{ fontSize: 15, color: "white", margin: 15 }}>否</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.jumpToFace}>
                                <Text style={{ fontSize: 15, color: "white", margin: 15 }}>是</Text>
                            </TouchableOpacity>
                        </View>
                    </View>:null}
                <View style={{ flex: 1, }}>
                    <TouchableOpacity onPress={this.goToLogin.bind(this)}>
                        <Icon name="ios-settings" size={30} color={"white"} style={{ margin: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 9, alignItems: "stretch", justifyContent: "flex-start", padding: 20 }} >
                    {this.state.isSetting ? <View style={{ borderRadius: 30, flex: 1, borderWidth: 1, borderColor: "#FAFAFA", padding: 20, backgroundColor: "#FAFAFA" }}>
                                            {this.header()}
                                            <FlatList
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}
                                                data={this.state.fragment}
                                                extraData={this.state}
                                                keyExtractor={this._keyExtractor}
                                                renderItem={this._renderItem}
                                                ItemSeparatorComponent={this.separator}
                                            />

                                        </View> :
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center" ,marginBottom:30}}>
                                                    <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>此设备还未设置代表会议室，请设置</Text>
                                                </View>
                                                <TouchableOpacity onPress={this.jumpToLogin}>
                                                <View style={{width:Dimensions.get("window").width*0.4, borderWidth: 1, borderColor: "white", borderRadius: 20, backgroundColor: "white",justifyContent:"center",alignItems:"center",height:50 }}>
                                                    <Text style={{ fontSize: 20, color: backgourndColor }}>设置</Text>
                                                </View>
                                                </TouchableOpacity>
                                            </View>

                                        }
                </View >
                <View style={{ flex: 1 }} />
                <Toast
                    ref="toast"
                    style={styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1500}
                    textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                />
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => { this._toggleModal() }}
                >
                    <View style={{ flex: 1, flexDirection: "row", backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "center" }}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 8, padding: 20 }}>
                            {this.state.showDatePicker ?
                                                            <View style={{
                                                                flex: 1, borderRadius: 30, borderWidth: 1, alignItems: "center",
                                                                borderColor: backgourndColor, padding: 20, backgroundColor: "#FAFAFA",
                                                                justifyContent: "center"
                                                            }}>
                                                                <Text style={{ fontSize: 20, color: backgourndColor, margin: 20 }}>请选择要查看的日期</Text>
                                                                <DatePicker
                                                                    style={{
                                                                        backgroundColor: "#FAFAFA", color: "white",
                                                                        marginBottom: 40, borderRadius: 30
                                                                    }}
                                                                    mode={"date"}
                                                                    date={this.state.d}
                                                                    fadeToColor={'none'}
                                                                    onDateChange={d => {
                                                                        let {index}=this.state;
                                                                        index=(index+1)%2;
                                                                        let fragment=global.fragment[index];
                                                                        let date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
                                                                        this.setState({ d, date ,index,fragment});
                                                                    }}
                                                                />
                                                                <TouchableOpacity onPress={() => this._toggleModal()}>
                                                                    <View style={{
                                                                        width: width * 0.5, height: 50, borderColor: backgourndColor, backgroundColor: backgourndColor
                                                                        , borderRadius: 20, borderWidth: 1, justifyContent: "center", alignItems: "center"
                                                                    }}>
                                                                        <Text style={{ fontSize: 20, color: "white" }}>确定</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                            : <View style={{
                                                                flex: 1, borderRadius: 30, borderWidth: 1, alignItems: "stretch",
                                                                borderColor: "#FAFAFA", padding: 20, backgroundColor: "#FAFAFA",
                                                            }}>
                                                                <View style={{ flex: 1, alignItems: "stretch" }}>
                                                                    <View style={{ borderBottomColor: backgourndColor, borderBottomWidth: 1, alignItems: "center" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: backgourndColor }}>从该时间段起您可选择以下时间</Text>
                                                                    </View>

                                                                    <FlatList
                                                                        showsHorizontalScrollIndicator={false}
                                                                        showsVerticalScrollIndicator={false}
                                                                        data={this.state.available}
                                                                        extraData={this.state}
                                                                        keyExtractor={this._keyExtractor}
                                                                        renderItem={this._renderSelectItem}
                                                                        ItemSeparatorComponent={this.separator}
                                                                    />
                                                                    <TouchableOpacity onPress={this.selectComplete}>
                                                                        <View style={{
                                                                            borderRadius: 20, borderWidth: 1, borderColor: "#FAFAFA", justifyContent: "center",
                                                                            backgroundColor: backgourndColor, alignItems: "center", height: 50,
                                                                        }}>
                                                                            <Text style={{ fontSize: 20, color: "white" }}>完成</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    {this.state.isSuccession ? null : <View style={{
                                                                        width: width * 0.5, height: width * 0.3, position: "absolute", borderWidth: 1, borderColor: "white",
                                                                        top: height * 0.25, left: width * 0.1, backgroundColor: backgourndColor, borderRadius: 20, padding: 20,
                                                                    }}>
                                                                        <Text style={{ fontSize: 20, color: "white", margin: 10 }}>选择的时间段必须要连续哦</Text>
                                                                        <Text style={{ fontSize: 18, color: "white", marginLeft: 10 }}>重新选择</Text>
                                                                        <View style={{ flexDirection: "row-reverse", marginBottom: 10 }}>
                                                                            <TouchableOpacity onPress={this.setSuccession}>
                                                                                <Text style={{ fontSize: 15, color: "white", margin: 15 }}>是</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>}
                                                                </View>

                                                            </View>}
                        </View>
                        <View style={{ flex: 1 }} />

                    </View>
                </Modal>
            </View >
        )
    }

    jumpToFace=()=>{
        NativeModules.FragmentInterface.jumpToFaceLogin();
    }
    notFace = () => {
        this.setState({ showVerify: false });
    }
    setSuccession = () => {
        this.setState({ isSuccession: true })
    }
}

const styles=StyleSheet.create({
    toast:{
        width:Dimensions.get("window").width*0.5,
        height:Dimensions.get("window").width*0.5,
        backgroundColor:backgourndColor,
        borderWidth:1,
        borderColor:"white",
        borderRadius:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center"
    }
})
