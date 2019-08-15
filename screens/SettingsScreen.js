import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  Overlay,
  Button,
  TouchableOpacity,
  Input
  
} from 'react-native';

export default class ProductDetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Chi Tiết Sản Phẩm',
    headerStyle: {
      backgroundColor: 'skyblue',
    },
  };
  constructor(props) {

    super(props);
    const { navigation } = this.props;
    this.state = {
      products:null,
            isVisible:false,
    }
    this.state.itemId = navigation.getParam('itemId', 0)
  }

  componentDidMount() {
    console.log(this.state.itemId);
    fetch(`http://5ceb737b77d47900143b89bf.mockapi.io/production/${this.state.itemId}`, {
      method: "GET"
    })
      .then(data => data.json())
      .then(jsonData => {
        this.setState({
          products: jsonData
        })
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
        <ScrollView>
          <View style={styles.container}>
            <Image style={{ width: '100%', height: 300, padding:20, borderRadius:50}} source={{ uri: this.state.products.image }} />
            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10}}>{this.state.products.id}</Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10}}>{this.state.products.product_name}</Text>
            <Text style={{ fontSize: 20, fontWeight: "normal", marginTop: 10, color:'red' }}>Giá: ${this.state.products.price}</Text>
            <Text style={{ fontSize: 20, fontWeight: "normal", marginTop: 10, color: 'green' }}>Mô tả: {this.state.products.detail}</Text>      
            
          </View> 
        </ScrollView> 
      )
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginTop:10,
    padding:20,
    alignItems:'center',
    justifyContent:'center',
    
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
  marginTop:10
}, 
});