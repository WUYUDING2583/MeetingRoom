import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { backgourndColor } from "../Styles.js";

class FragmentSelectItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            isSelect:false,
        }
    }

    handle = () => {
        // alert(this.props.data.item.id)
        let isSelect=!this.state.isSelect;
        this.setState({isSelect});
        this.props.onPress(this.props.data.item.id,isSelect);
    }



    render() {
        let backgroundColor = this.state.isSelect ? backgourndColor : "#FAFAFA";
        let fontColor = this.state.isSelect ? "white" : backgourndColor;
        return (
            <View style={{ backgroundColor: backgroundColor, flexDirection: "row", height: 40, }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.handle}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: fontColor }}>{this.props.data.item.start}~{this.props.data.item.end}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FragmentSelectItem;