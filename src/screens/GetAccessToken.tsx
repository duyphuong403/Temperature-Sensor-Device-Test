import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../contants/Colors'
import { setToken } from '../store/slicers/accessToken'

const GetAccessToken: React.FC = (props: any) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const getAccessToken = () => {
    setIsLoading(true)
    fetch('https://bms-api.viatick.com/main/api/oauth2/token', {
      method: 'post',
      headers: new Headers({
        grant_type: 'client_credentials',
        scope:
          '7c62db1cfb47550927b11191b7995f6cd482b7481fd0d98f1d8b403937b909f9',
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setIsLoading(false)
        if (result.access_token) {
          dispatch(setToken(result.access_token))
          props.navigation.navigate('Device')
        } else {
          return Alert.alert('Oops...', 'Cannot get access token.', [
            {
              text: 'Try again',
              onPress: () => getAccessToken(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ])
        }
      })
  }

  return (
    <View style={styles.main}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.text}>
            Access Token is expired. Click Get Access Token to get new token
          </Text>
          <View style={styles.button}>
            <Button
              color={Colors.accent}
              title="Get Access Token"
              onPress={getAccessToken}
            />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 20,
  },
  body: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
  },
})

export default GetAccessToken
