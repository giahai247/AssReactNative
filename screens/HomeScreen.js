import React from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput, Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import LinksScreen from './LinksScreen';
import Dialog from "react-native-dialog";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Trang Chủ',
    headerStyle: {
      backgroundColor: 'skyblue',
    },
  };
  
  constructor(props){
    super(props);
    this.state = {
      products: [],          
      isVisible: false,
      item:{}
    };  
  }

  fetchData = () => {
    fetch('http://5ceb737b77d47900143b89bf.mockapi.io/production', {
      method: "GET"
    })
    .then(data => data.json())
    .then(jsonData => {
      this.setState({
        products: jsonData
      })
    });
  }

  componentDidMount() {
    fetch('http://5ceb737b77d47900143b89bf.mockapi.io/production', {
      method: "GET"
    })
    .then(data => data.json())
    .then(jsonData => {
      this.setState({
        products: jsonData
      })
    });
    const {navigation} = this.props;
    navigation.addListener('willFocus', () =>{
      //  đăng ký để cập nhật vòng đời điều hướng
      this.fetchData();
    }); 
  }
  
  onRemoveProduct = (removeId) => {
    // 1. gửi request lên server để xóa sản phẩm có id = removeId
    fetch(`http://5ceb737b77d47900143b89bf.mockapi.io/production/${removeId}`, {
      method: "DELETE"
    })
    .then(data => data.json())
    .then(jsonData => {
      // 2. Nếu server xóa thành công => xóa sản phẩm có id tương ứng khỏi state.products
      // hiển thị thông báo xóa thành công
      let newProducts = this.state.products.filter(item => item.id != jsonData.id);
      this.setState({
        products: newProducts
      });
      alert(`Đã xóa thành công sản phẩm "${jsonData.product_name}"`);
    })
    .catch(err => {
      // 3. Nếu server xóa không thành công => hiển thị thông báo xóa không thành công
      alert("Xóa không thành công, đã có lỗi xảy ra");
    })
  }

  Gotodetail1 = () => {
    const {navigate} = this.props.navigation;
    navigate('Setting');
  }

  suaSanpham = () => {
    const {navigate} = this.props.navigation;
    navigate('Suasanpham');
  }
  
 
 
  
  
  render() {
    if (this.state.products == null) {
      return (
        <View style={{marginTop:20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Image
          style={{width: '100%', height: 250, marginBottom:20,borderRadius:20}}
           source={{uri: 'https://img.idesign.vn/2010/08/27-boy-girl.jpg'}}
         />       
               
        <View>{this.state.products.map(item => 
          <View style={styles.viewBig} key={item.id}>
            <View style={styles.viewLeft}>
              <Image source={{uri: item.image}} style={styles.leftImg} />          
              <Text style={styles.txtName} onPress={() => navigate('Setting', { itemId: item.id })} >{item.product_name}</Text>
              <Text style={styles.txtPrice} onPress={() => navigate('Setting', { itemId: item.id })}>Giá: ${item.price}</Text>  
              <Text style={styles.txtdetail} onPress={() => navigate('Setting', { itemId: item.id })}>Mô tả: {item.detail}</Text>    
              <TouchableOpacity
                onPress={() => navigate('Setting', { itemId: item.id })} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth:1,paddingTop:10}}>Chi Tiết</Text>
              </TouchableOpacity>      
            </View>  
             
            <View style={styles.viewButton}>
              <View style={styles.btnSua}>
                <Button       
                onPress={() => 
                navigate('Suasanpham', { itemId: item.id })}                   
                title="Sửa"
                color="skyblue"
                accessibilityLabel="Learn more about this purple button"
                />              
              </View>
              <View style={styles.btnSua}>
                <Button onPress={() =>
                Alert.alert(
                  'Xóa sản phẩm?', 
                  'Bạn có thực sựu muốn xóa sản phẩm này',              
                  [    
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},            
                    {text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Đồng Ý', onPress: () => { this.onRemoveProduct(item.id)}},
                  ],
                  { cancelable: false }
                )}
                color="skyblue"
                accessibilityLabel="Learn more about this purple button"
                title ='xóa'
                />
              </View>
            </View>
          </View>            
          )}
        </View>       
      </ScrollView>
    );
  }
}
}

const styles = StyleSheet.create({
  
container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginTop:10,
    padding:10,
    
},
viewButton:{
    flex:1,
    flexDirection: 'row',
    marginTop:2,
    marginBottom:10
},
btnSua:{
    flex:1,
    marginLeft: 40,
    marginRight:40,   
}, 
viewBig:{
  flexDirection:'column',
  width:'100%',
  height:400,
  marginTop:10
},
viewLeft:{
  flexDirection:'column',
  borderColor:'red',
  borderWidth:2,
  borderRadius:50,
  marginRight:20,
  marginLeft:20,
  alignItems:'center',
  justifyContent:'center',
  paddingTop:5,
  paddingBottom:5
},
leftImg:{
  width: '80%',
  height:200,
  borderRadius:30
},

txtName:{
  fontSize:30,
  fontWeight:'bold'
},
txtPrice:{
  fontSize:25,
  color:'red'
},
txtdetail:{
  fontSize:20,
  color:'green'
},
txtInput: {
  borderColor: 'skyblue', 
  borderWidth: 2, 
  height: 35,
  padding: 5,
  marginBottom:10
},
txtInputMulti:{
  borderColor: 'skyblue', 
  borderWidth: 2, 
  height: 100,
  padding: 5
},

  
});

