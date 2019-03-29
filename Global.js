import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const { width, height } = Dimensions.get('window');
const OS = Platform.OS;
const ios = (OS == 'ios');
const android = (OS == 'android');
const isIPhoneX = (ios && height == 812 && width == 375);
const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight);


global.gScreen = {
  screen_width: width,
  screen_height: height,
  statusBarHeight: statusBarHeight,
  onePixelRatio: 1 / PixelRatio.get(),
}

global.gDevice = {
  ios: ios,
  android: android,
  isIPhoneX: isIPhoneX,
}

global.companyId=-1;
global.place_id=-1;

let storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')

})

global.fragment=[
    [{ start: '08:00', end: '08:30', use: false, id: 0 },
                { start: '08:40', end: '09:10', use: true, id: 1 },
                { start: '09:20', end: '09:50', use: false, id: 2 },
                { start: '10:00', end: '10:30', use: false, id: 3 },
                { start: '10:40', end: '11:10', use: false, id: 4 },
                { start: '11:20', end: '11:50', use: false, id: 5 },
                { start: '12:00', end: '12:30', use: false, id: 6 },
                { start: '12:40', end: '13:10', use: false, id: 7 },
                { start: '13:20', end: '13:50', use: false, id: 8 },
                { start: '14:00', end: '14:30', use: false, id: 9 },
                { start: '14:40', end: '15:10', use: false, id: 10 },
                { start: '15:20', end: '15:50', use: false, id: 11 },
                { start: '16:00', end: '16:30', use: false, id: 12 },
                { start: '16:40', end: '17:10', use: false, id: 13 },
                { start: '17:20', end: '17:50', use: false, id: 14 },
                { start: '18:00', end: '18:30', use: true, id: 15 },
                { start: '18:40', end: '19:10', use: false, id: 16 },
                { start: '19:20', end: '19:50', use: false, id: 17 },
                { start: '20:00', end: '20:30', use: false, id: 18 },
                { start: '20:40', end: '21:10', use: true, id: 19 },
                { start: '21:20', end: '21:50', use: true, id: 20 },
                { start: '22:00', end: '22:30', use: true, id: 21 }
                ],
                [{ start: '08:00', end: '08:30', use: false, id: 0 },
                            { start: '08:40', end: '09:10', use: true, id: 1 },
                            { start: '09:20', end: '09:50', use: false, id: 2 },
                            { start: '10:00', end: '10:30', use: false, id: 3 },
                            { start: '10:40', end: '11:10', use: false, id: 4 },
                            { start: '11:20', end: '11:50', use: false, id: 5 },
                            { start: '12:00', end: '12:30', use: true, id: 6 },
                            { start: '12:40', end: '13:10', use: false, id: 7 },
                            { start: '13:20', end: '13:50', use: false, id: 8 },
                            { start: '14:00', end: '14:30', use: false, id: 9 },
                            { start: '14:40', end: '15:10', use: false, id: 10 },
                            { start: '15:20', end: '15:50', use: true, id: 11 },
                            { start: '16:00', end: '16:30', use: false, id: 12 },
                            { start: '16:40', end: '17:10', use: false, id: 13 },
                            { start: '17:20', end: '17:50', use: true, id: 14 },
                            { start: '18:00', end: '18:30', use: true, id: 15 },
                            { start: '18:40', end: '19:10', use: false, id: 16 },
                            { start: '19:20', end: '19:50', use: false, id: 17 },
                            { start: '20:00', end: '20:30', use: false, id: 18 },
                            { start: '20:40', end: '21:10', use: false, id: 19 },
                            { start: '21:20', end: '21:50', use: false, id: 20 },
                            { start: '22:00', end: '22:30', use: false, id: 21 }],
]

global.storage = storage;

export default global;