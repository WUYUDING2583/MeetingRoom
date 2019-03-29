import { StyleSheet,Dimensions } from 'react-native';

export const backgourndColor = "#376B6D";
export const appBackgroundColor="#FAFAFA";

const Styles = StyleSheet.create({
    default: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: backgourndColor,
        flexDirection: "row",
    },
    appDefault: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row",
    },
    text: {
        fontSize: 25,
        color: 'white',
    },
    title: {
        marginTop: 40,
        fontSize: 35,
        color: 'white',
    },
    itemTitle: {
        marginTop: 20,
        fontSize: 20,
        color: 'white',
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        color: 'white',
    },
    iconTitle: {
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        color: backgourndColor,
        borderRadius: 15,
        marginBottom: 30,
        marginRight: 20,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    iconTitleNot: {
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        color: backgourndColor,
        borderRadius: 15,
        marginBottom: 30,
        marginRight: 20,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5,
    },
    icon: {
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        color: backgourndColor,
        borderRadius: 30,
        width: 40,
        height: 40,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    iconNot: {
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        color: backgourndColor,
        borderRadius: 30,
        width: 40,
        height: 40,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5,
    },
    authButtonContainer: {
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        margin: 10
    },
    authButtonfocusdContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        margin: 10
    },
    authButtonText: {
        fontSize: 25,
        fontFamily: '楷体',
        color: 'white',
        margin: 10
    },
    authFocusedButtonText: {
        fontSize: 25,
        color: backgourndColor,
        margin: 10
    },
    appButtonContainer:{
        backgroundColor: backgourndColor,
        alignItems: 'center',
        borderColor: backgourndColor,
        borderRadius: 20,
        borderWidth: 2,
        marginTop: 20
    },
    appButtonText:{
        fontSize: 25,
        color: "white",
        margin: 10
    },
    toast:{
        width:Dimensions.get("window").width*0.5,
        height:Dimensions.get("window").width*0.5,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"white",
        borderRadius:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
    }
});

export default Styles;