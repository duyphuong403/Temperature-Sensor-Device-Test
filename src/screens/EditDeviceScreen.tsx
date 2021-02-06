import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { ScrollView, Switch } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

import Colors from '../contants/Colors'
import { selectToken } from '../store/slicers/accessToken'

const EditDeviceScreen: React.FC = (props: any) => {
  const { control, handleSubmit, errors } = useForm()
  const token = useSelector(selectToken)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (values: any) => {
    setIsLoading(true)
    fetch(
      'https://aitjmbzhsbagnbysj2jrinbrsq.appsync-api.ap-northeast-1.amazonaws.com/graphql',
      {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'x-api-key': 'da2-zlk3xmy44fg4jpj73vlwlfi7sq',
        }),
        body: JSON.stringify({
          query: `
              mutation {
                updateDevice(
                  input: {
                    deviceId: ${values.deviceId},
                    name: "${values.name}",
                    serial: "${values.serial}",
                    mac: "${values.mac}",
                    region: "${values.region}",
                    floor: ${parseInt(values.floor)},
                    distance: ${parseInt(values.distance)},
                    active: ${values.active},
                  }
                ){
                    deviceId,
                    name,
                    serial,
                    mac,
                    region,
                    longitude,
                    latitude,
                    floor,
                    distance,
                    remark,
                    active,
                    date,
                    battery,
                    temperature,
                }
            }
          `,
        }),
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        if (!result.data.updateDevice.deviceId) {
          return Alert.alert('Oops...', 'Update Device Failed', [
            {
              text: 'OK',
              style: 'cancel',
            },
          ])
        }
      })
      .catch((error) => {
        console.log('Api call error, ', error.message)
      })
    setIsLoading(false)
    props.navigation.goBack()
  }

  const {
    deviceId,
    name,
    serial,
    mac,
    region,
    floor,
    distance,
    active,
  } = props.route.params

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <View>
              <View>
                <Text>Device ID</Text>
                <Controller
                  name="deviceId"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={deviceId.toString()}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                      editable={false}
                    />
                  )}
                />
              </View>

              <View>
                <Text>Name</Text>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={name}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.name && (
                  <Text style={styles.error}>This is required</Text>
                )}
              </View>

              <View>
                <Text>Serial</Text>
                <Controller
                  name="serial"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={serial}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.serial && (
                  <Text style={styles.error}>This is required</Text>
                )}
              </View>

              <View>
                <Text>Mac Address</Text>
                <Controller
                  name="mac"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={mac}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.mac && (
                  <Text style={styles.error}>This is required</Text>
                )}
              </View>

              <View>
                <Text>Region</Text>
                <Controller
                  name="region"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={region}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.region && (
                  <Text style={styles.error}>This is required</Text>
                )}
              </View>

              <View>
                <Text>Floor</Text>
                <Controller
                  name="floor"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={floor ? floor.toString() : ''}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.floor && (
                  <Text style={styles.error}>This is required</Text>
                )}
              </View>

              <View>
                <Text>Distance</Text>
                <Controller
                  name="distance"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={distance ? distance.toString() : ''}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.distance && (
                  <Text style={styles.error}>This is required</Text>
                )}
              </View>

              <View style={styles.status}>
                <Text>Status</Text>
                <Controller
                  name="active"
                  control={control}
                  defaultValue={active}
                  render={({ onChange, value }) => (
                    <Switch
                      onValueChange={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="submit"
                  onPress={handleSubmit(onSubmit)}
                  color={Colors.primary}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  error: {
    color: 'red',
  },
  button: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
  },
  status: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
})

export default EditDeviceScreen
