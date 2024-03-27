import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';

const index = ({text,...other}) => {
  return (
    <Pressable>
      <TouchableOpacity {...other}>
        <View
          style={{
            width: 145,
            borderRadius: 40,
            padding: 10,
            backgroundColor: "#025592",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textTransform: "uppercase",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </Pressable>
  );
}

export default index

index.propTypes = {
    text:PropTypes.string.isRequired
}

const styles = StyleSheet.create({})
