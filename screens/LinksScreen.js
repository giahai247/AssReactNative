import React from 'react';
import { ScrollView, StyleSheet,Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Alert } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Thêm Mới Sản Phẩm',
    headerStyle: {
      backgroundColor: 'skyblue',
    },
  };
  
  constructor(props){
    super(props);
    this.state = {
      products: [],
      ipName: "",
      ipPrice: "",
      ipImage: "",
      ipdeltai: "",     
    }
  }

  
  sendNewProduct = () => {
    const { ipName,ipImage,ipPrice,ipdeltai }  = this.state ;
    if(ipName == ""){
      this.setState({Error:'Vui lòng nhập Tên Sản Phẩm'});
    }
    else if(ipPrice == ""){
      this.setState({Error:'Vui lòng nhập Giá Sản Phẩm'});
    }
    else if(ipImage == ""){
      this.setState({Error:'Vui lòng nhập Ảnh Sản Phẩm'});
    }
    else if(ipdeltai == ""){
      this.setState({Error:'Vui lòng nhập Mô Tả Sản Phẩm'});
    }else{
    var data = {
      product_name: this.state.ipName,
      image: this.state.ipImage,
      price: this.state.ipPrice,
      detail: this.state.ipdeltai
    }
    fetch('http://5ceb737b77d47900143b89bf.mockapi.io/production', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonData => {
      var newProducts = [...this.state.products].filter(item => item.id != jsonData.id);    
      newProducts.push({
        product_name: this.state.ipName,
        image: this.state.ipImage,
        price: this.state.ipPrice,
        detail: this.state.ipdeltai,
      });
      this.setState({
        ipImage: null,
        ipName: null,
        ipPrice: null,
        ipdeltai: null,
        Error:''
      });
    });  
    alert("Thêm thành công sản phẩm " + this.state.ipName)
    const {navigate} = this.props.navigation;
    navigate('Home') 
  }
}
    
  render() {
    return (      
      <ScrollView style={styles.container}>
        <Image
          style={{width: '100%', height: 400, marginBottom:20,borderRadius:20}}
           source={{uri: 'http://images6.fanpop.com/image/photos/34400000/Sasuke-Naruto-sasuke-and-naruto-34490615-500-402.png'}}
        />       
        <Text style={{color:'blue', textAlign:'center', fontSize:20, fontWeight:'bold'}}>{this.state.Error}</Text>   
        <View style={styles.addnew}>
          <Text style={styles.textInput}>Tên Sản Phẩm</Text>
          <TextInput
            //sự kiện để đọc dữ liệu nhập của người dùng
            onChangeText={ipName => this.setState({ipName})}
            style={styles.txtInput}
            //Giá trị hiển thị cho đầu vào văn bản
            value={this.state.ipName}
            placeholder="Enter Name"
          />
          
          <Text style={styles.textInput}>Giá</Text>
          <TextInput
            onChangeText={ipPrice => this.setState({ipPrice})}
            style={styles.txtInput}
            multiline={true}
            value={this.state.ipPrice}
            placeholder="Enter Price"
          />
          
          <Text style={styles.textInput}>Ảnh</Text>
          <TextInput
            onChangeText={ipImage => this.setState({ipImage})}
            style={styles.txtInput}
            value={this.state.ipImage}
            placeholder="Enter Image"
          />
          
          <Text style={styles.textInput}>Mô Tả</Text>
          <TextInput
            onChangeText={ipdeltai => this.setState({ipdeltai})}
            style={styles.txtInputMulti}
            multiline={true}
            value={this.state.ipdeltai}
            placeholder="Enter Detail"
          />
                  
          <Button
            onPress={() => {this.sendNewProduct();}}
            title="+ Thêm mới sản phẩm"
            color="skyblue"
            accessibilityLabel="Learn more about this purple button"        
          />
        </View>
      </ScrollView>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    padding:10
  },
  txtInput: {
    borderColor: 'skyblue', 
    borderWidth: 2, 
    height: 35,
    padding: 5,
    marginBottom:10
  },
  textInput:{
    fontSize:20,
    color:'red',
    fontWeight:'bold'
  },
  addnew:{
    margin:10,   
  },
  txtInputMulti:{
    borderColor: 'skyblue', 
    borderWidth: 2, 
    height: 100,
    padding: 5
  }
});
