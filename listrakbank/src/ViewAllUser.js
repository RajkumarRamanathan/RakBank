import React from 'react';
import { FlatList, Text, View, NetInfo, TouchableOpacity, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'demo.db', createFromLocation: 1 });

export default class ViewAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      connection_Status: false,
      ActivityIndicator_Loading: false,
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM list_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected == true) {
        this.setState({ connection_Status: true })
      }
      else {
        this.setState({ connection_Status: false })
      }
    });
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  }
  _handleConnectivityChange = (isConnected) => {
    if (isConnected == true) {
      this.setState({ connection_Status: true })
    }
    else {
      this.setState({ connection_Status: false })
    }
  };

  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };
  Insert_Data_Into_OnlineDataBase = (user_name) => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch(url,
        {
          method: 'POST',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              user_name: user_name,
            })
        }).then((response) => response.json()).then((responseJsonFromServer) => {
          alert(responseJsonFromServer);
          this.setState({ ActivityIndicator_Loading: false });

        }).catch((error) => {
          console.error(error);
          this.setState({ ActivityIndicator_Loading: false });
        });
    });
  }

  Insert_Data_Into_DeviceDataBase = (user_name) => {
    db.transaction(tx => {
      
      tx.executeSql('INSERT INTO list_user (user_name) VALUES (?)',
        [user_name],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Locally Stored ');
          } else {
            Alert.alert('DB Failed');
          }
        }
      );
    });
    

  }

  onItemPressed = (user_name) => {
   
    
    if (this.state.connection_Status) {
      this.Insert_Data_Into_OnlineDataBase(user_name)

    } else {
      this.Insert_Data_Into_DeviceDataBase(user_name)
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.user_id} style={{ backgroundColor: 'blue', padding: 20 }}>
              <TouchableOpacity onPress={() => this.onItemPressed(item.user_name)}>
                <Text>Id: {item.user_id}</Text>
                <Text>Name: {item.user_name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}