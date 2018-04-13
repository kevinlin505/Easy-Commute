import React from 'react';
import { FlatList, ScrollView, View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import utf8 from 'utf8';
import base64 from 'base-64';
import { List, ListItem } from 'react-native-elements';
import MyListItem from '../components/MyListItem';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  state = {
    tweets: []
  }

  componentWillMount() {
    this._getUserBearerToken();
  }

  _getUserBearerToken = async () => {
    const key = 'OnS2J5qzSYa0E3H142yndt7ab';
    const secret = 'iN6lkSJlHYYTbDYp1svha7KgX8yLS4pyfqi2zhbtM7VIoVQ4nF';
    const cat = `${key}:${secret}`;
    const bytes = utf8.encode(cat);
    const credentials = base64.encode(bytes);
    const url = 'https://api.twitter.com/oauth2/token';
    const options = {
      method: 'POST',
      headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: "grant_type=client_credentials"
    }

    const response = await fetch(url, options);
    const json = await response.json();

    if (json.token_type === 'bearer') {
      const breaerToken = `Bearer ${json.access_token}`;
      this._fetchFeedAsync(breaerToken)
    }
  } 

  _fetchFeedAsync = async (breaerToken) => {
    const query = encodeURIComponent('"G Train" "status" -filter:retweets');
    const url = `https://api.twitter.com/1.1/search/tweets.json?lang=en&tweet_mode=extended&count=50&q=${query}`;
    const options = {
      headers: {
        "Authorization": breaerToken,
      }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    
    const transformedData = this._transformData(data);
    this.setState({ tweets: transformedData });
  }

  _transformData = (data) => {
    return data.statuses.map((status) => {
      return {
        id: status.id,
        text: status.full_text,
        retweet_count: status.retweet_count,
        favorite_count: status.favorite_count,
        hashtags: status.entities.hashtags,
        url: status.entities.urls.url,
        user: {
          name: status.user.name,
          screen_name: status.user.screen_name,
          description: status.user.description,
          profile_image_url: status.user.profile_image_url
        }
      }
    })
  }

  _keyExtractor = (item, index) => item.id.toString();
  _getItemLayout = (data, index) => ({
    length: 40,
    offset: 40 * index,
    index: index
  });

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      text={item.text}
      user={item.user}
    />
  );

  _onPress = (tweet) => {
    console.log('Works!');
  }

  render() {
    if (this.state.tweets.length > 0) {
      return (
        <View>
          <FlatList
            data={this.state.tweets}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            getItemLayout={this._getItemLayout}
          />
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
