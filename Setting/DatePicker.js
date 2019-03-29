import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DatePickerAndroid,
    TouchableHighlight,
  } from 'react-native';
  import React,{Component} from 'react';
  //简单封装一个组件
  class CustomButton extends Component {
    render() {
      return (
        <TouchableHighlight
          style={styles.button}
          underlayColor="#a5a5a5"
          onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableHighlight>
      );
    }
  }
  class DatePicker extends Component {
    constructor(props){
      super(props);
      this.state={
        date: new Date(),
        text: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
      };
    }
    //进行创建时间日期选择器
    async showPicker(options) {
      try {
        var newState = {};
        const {action, year, month, day} = await DatePickerAndroid.open(options);
        if (action != DatePickerAndroid.dismissedAction) {
          var date = new Date(year, month, day);
          newState['text'] = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
          newState['date'] = date;
        }
        this.setState(newState);
        this.props.onSelect(year,month,day);
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    }

    render() {
      return (
        <View>
          <CustomButton text={this.state.text}
           onPress={this.showPicker.bind(this,  {date: this.state.date})}/>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    button: {
      margin:5,
      backgroundColor: 'white',
      padding: 15,
      borderBottomWidth: 2,
      borderBottomColor: '#cdcdcd',
    },
    buttonText:{
        fontSize:20,
    }
  });

export default DatePicker;