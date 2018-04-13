import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Divider } from 'react-native-elements';

const MyListItem = ({ id, selected, text, user }) => {
  return (
    <Card key={id}>
      <View style={styles.container}>
        <Avatar
          small
          rounded
          source={{ uri: user.profile_image_url }}
          containerStyle={styles.avatar}
        />
        <Text>{user.screen_name}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.content}>
        <Text>
          { text }
        </Text>
      </View>
    </Card>
  );
}


MyListItem.propTypes = {
  id :PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  avatar: {
    marginRight: 10
  },
  divider: {
    backgroundColor: '#e1e8ee'
  },
  content: {
    padding: 10
  }
});

export default MyListItem;

