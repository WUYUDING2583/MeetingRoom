import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { backgourndColor } from "../Styles.js";

export default class RoomItem extends Component {

    handleOnPress = () => {
        this.props.onPress(this.props.data.id);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleOnPress}>
                <View style={this.props.select?styles.selectItemContainer:styles.itemContainer}>
                    <Text style={this.props.select?styles.selectTextStyle:styles.textStyle}>{this.props.data.name}</Text>
                    <Text style={this.props.select?styles.selectTextStyle:styles.textStyle}>{this.props.data.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 18, color: backgourndColor, margin: 10
    },
    selectTextStyle:{
        fontSize: 18, color: "#FAFAFA", margin: 10
    },
    selectItemContainer:{
        backgroundColor: backgourndColor,
        borderWidth: 1,
        borderColor: backgourndColor,
        borderRadius: 20,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: backgourndColor,
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
    itemContainer: {
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderColor: "#FAFAFA",
        borderRadius: 20,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: backgourndColor,
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
})