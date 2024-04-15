import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import RenderHTML from "react-native-render-html";

import HTML from "react-native-render-html";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://namaste-belgium.com/wp-json/wp/v2/pages');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  const { width } = useWindowDimensions();

  return (
    <View style={{flex: 1, padding: 24}}>

<Text style={{backgroundColor: 'yellow',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,}}>namaste-belgium</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <ScrollView style={{ flex: 1 }}>
            <HTML source={{html: item.slug === 'movies' ? item.content.rendered:''}}/>
             </ScrollView>
          )}
        />
      )}
    </View>
  );
};

export default App;