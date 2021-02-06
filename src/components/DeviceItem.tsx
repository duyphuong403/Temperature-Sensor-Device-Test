import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

interface Props {
  deviceId: number,
  name: string,
  serial: string,
  active: boolean,
  region: string,
  distance: number,
  temperature: number,
}

const DeviceItem: React.FC<Props> = (props) => {

  return (
    <View style={styles.device}>
      <View style={styles.information}>
        <View style={styles.eachInformation}>
          <Text>DeviceID: </Text>
          <Text style={styles.text}>{props.deviceId ? props.deviceId : "--"}</Text>
        </View>
        <View style={styles.eachInformation}>
          <Text>Name: </Text>
          <Text style={styles.text}>{props.name}</Text>
        </View>
        <View style={styles.eachInformation}>
          <Text>Serial: </Text>
          <Text style={styles.text}>{props.serial}</Text>
        </View>
        <View style={styles.eachInformation}>
          <Text>Status: </Text>
          <Text style={styles.text}>{props.active ? props.active.toString() : "--"}</Text>
        </View>
        <View style={styles.eachInformation}>
          <Text>Region: </Text>
          <Text style={styles.text}>{props.region}</Text>
        </View>
        <View style={styles.eachInformation}>
          <Text>Distance: </Text>
          <Text style={styles.text}>{props.distance ? props.distance : "--"}</Text>
        </View>
        <View style={styles.eachInformation}>
          <Text>Temperature: </Text>
          <Text style={styles.text}>{props.temperature ? props.temperature : "--"}</Text>
        </View>
      </View>
      <View style={styles.actions}>{props.children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  device: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  information: {
    padding: 20,
    height: '77%',
  },
  eachInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5
  },
  text: {
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
})

export default DeviceItem
