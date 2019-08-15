import React from 'react';
import { ScrollView, StyleSheet,Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Sửa Sản Phẩm',
    headerStyle: {
      backgroundColor: 'skyblue',
    },
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      isVisible:false,
      item:{},
      ipId: null,
      ipName: null,
      ipImage: null,
      ipPrice: null,
      ipDetail: null,
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
          ipId: jsonData.id,
          ipName: jsonData.product_name,
          ipImage: jsonData.image,
          ipPrice: jsonData.price,
          ipDetail: jsonData.detail
        })
      });
  }
  onUpdateProduct = (id) => {
    var updateData = {
      id: this.state.ipId,
      product_name: this.state.ipName,
      image: this.state.ipImage,
      price: this.state.ipPrice,
      detail: this.state.ipDetail
    };
    console.log(updateData);  
    fetch(`http://5ceb737b77d47900143b89bf.mockapi.io/production/${this.state.ipId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updateData)       
    }).then(responseData => {
      return responseData.json()
    })
    .then(jsonData => {
      console.log(jsonData);  
      alert("cap nhat thanh cong!");
      const { navigation } = this.props;
      navigation.navigate('Home');
    });  
  }
  render() {
    if(this.state.ipId == null){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }else{      
      return (
        <ScrollView style={styles.container}>
          <Image
            style={{width: '100%', height: 250, marginBottom:20,borderRadius:20}}
            source={{uri: "http://iconmediaholdings.com/wp-content/uploads/2015/12/update12-15-2015.jpeg"}}
          />
          <View style={styles.addnew}>
            <Text style={styles.textInput}>Tên Sản Phẩm</Text>
            <TextInput
              onChangeText={(txt) => {this.setState({ipName: txt})}}
              style={styles.txtInput}
              value={this.state.ipName}
            />
            
            <Text style={styles.textInput}>Giá</Text>
            <TextInput
              onChangeText={(txt) => {this.setState({ipPrice: txt})}}
              style={styles.txtInput}
              value={this.state.ipPrice}
            />
            
            <Text style={styles.textInput}>Ảnh</Text>
            <TextInput
              onChangeText={(txt) => {this.setState({ipImage: txt})}}
              style={styles.txtInput}
              value={this.state.ipImage} 
            />

            <Text style={styles.textInput}>Mô Tả</Text>
            <TextInput
              onChangeText={(txt) => {this.setState({ipDetail: txt})}}
              style={styles.txtInputMulti}
              multiline={true}
              value={this.state.ipDetail} 
            />
            
            <Button
              onPress={() => {this.onUpdateProduct()}}
              title="+ Sửa sản phẩm"
              color="skyblue"
              accessibilityLabel="Learn more about this purple button"        
            />
          </View>
        </ScrollView>       
      );
    }
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
    margin:10
    
  },
  txtInputMulti:{
    borderColor: 'skyblue', 
    borderWidth: 2, 
    height: 100,
    padding: 5
  },
  
});
