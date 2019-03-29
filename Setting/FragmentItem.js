import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {backgourndColor} from "../Styles.js";

class FragmentItem extends Component {
    constructor(props) {
        super(props);
    }

    handle=()=>{
        this.props.onPress(this.props.data.id,this.props.data.use);
    }

    render() {
        let backgroundColor = this.props.data.use ? backgourndColor : "#FAFAFA";
        let fontColor = this.props.data.use ? "white" : backgourndColor;
        return (
            <View style={{ backgroundColor: backgroundColor, flexDirection: "row", height: 40, }}>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: fontColor }}>{this.props.data.start}~{this.props.data.end}</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, color: fontColor }}>{this.props.data.use ? "已预约" : "空闲"}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.handle}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ fontSize: 15, color: fontColor }}>{this.props.data.use ? "开启" : "预约"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FragmentItem;