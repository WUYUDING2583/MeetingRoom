 import React from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Dimensions,
   NativeModules,
   ToastAndroid
 } from 'react-native';
export default class Communication extends React.Component {
constructor(props) {
        super(props);

    }

    componentDidMount() {
            NativeModules.SpeechSynthesizerInterface.init();
      }
  onPress = ()=> {
      // 这样 调用原生端  方法    原生来吐司
//      NativeModules.CommunicationInterface.HandleMessage("Rn调用 原生 来吐司！！");
NativeModules.SpeechSynthesizerInterface.start(
                                                "唉呀呦"+
                                                "呔卟啲呔卟啲呔卟啲呔卟啲"+
                                                "呀儿咿儿呦"+
                                                "呔卟啲呔卟啲呔卟啲呔卟啲"+
                                                "呔卟啲呔咿呦"+
                                                "呔哈啦哈啦哈啦哈哩哈啦"+
                                                "哈啦哩哈啦哈啦哩"+
                                                "啊诶"+
                                                "啊咿啊咿呦"+
                                                "啊"+
                                                "啊咿呦"+
                                                "啊"+
                                                "咳咿呀咿呦"+
                                                "咳呀"+
                                                "啊哦"+
                                                "啊哦诶"+
                                               " 啊嘶嘚啊嘶嘚"+
                                                "啊嘶嘚咯嘚咯嘚"+
                                                "啊嘶嘚啊嘶嘚咯吺"+
                                                "啊哦"+
                                                "啊哦诶"+
                                                "啊嘶嘚啊嘶嘚"+
                                                "啊嘶嘚咯嘚咯嘚"+
                                                "啊嘶嘚啊嘶嘚咯吺"+
                                               " 啊"+
                                               " 啊"+
                                               " 啊"+
                                                "啊"+
                                               " 啊呀呦"+
                                                "啊呀呦"+
                                               " 啊嘶嘚咯呔嘚咯呔"+
                                               " 嘚咯呔嘚咯呔嘚啲吺"+
                                                "呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                               " 唉呀呦"+
                                               " 呔咯嘚呔咯嘚呔咯嘚"+
                                                "呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                               "呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                               " 呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                               " 呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                               " 呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                                "呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                                "呔咯嘚呔咯嘚呔咯嘚"+
                                                "呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                                "呔咯嘚呔咯嘚呔咯嘚"+
                                                "呔咯嘚呔咯嘚呔咯嘚"+
                                               " 呔咯嘚呔咯啲嘚"+
                                              "  呔咯嘚呔咯啲嘚"+
                                              "  呔咯嘚呔咯啲嘚"+
                                               " 呔咯嘚呔咯啲嘚呔咯嘚咯吺"+
                                               " 啊咿呦咿"+
                                               " 啊咿呦咿"+
                                               " 啊咿呦咿"+
                                               " 啊咿呦咿"+
                                               " 呦"+
                                                "咳呀"+
                                                "呔咯嘚呔咯嘚呔咯嘚"+
                                                "呔咯嘚呔咯啲嘚呔咯嘚咯吺");
  }

   render() {
     return (
       <TouchableOpacity style={styles.container} onPress = {this.onPress.bind(this)}>
          <View style={{width:Dimensions.get('window').width,height:50,
          backgroundColor:'#dfd',alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.hello}>点击Rn 调用原生Toast方法</Text>
          </View>
       </TouchableOpacity>
     )
   }
 }
 var styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
   }
 });
