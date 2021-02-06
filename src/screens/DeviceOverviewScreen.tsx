import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Alert, Button, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import DeviceItem from '../components/DeviceItem'
import Colors from '../contants/Colors'
import { selectToken } from '../store/slicers/accessToken'

import { selectDevice, setDevice } from '../store/slicers/device'

const DeviceOverviewScreen: React.FC = (props: any) => {
  const devices = useSelector(selectDevice)
  const token = useSelector(selectToken)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const selectItemHandler = (
    id: number,
    name: string,
    serial: string,
    mac: string,
    region: string,
    floor: number,
    distance: number,
    active: boolean
  ) => {
    props.navigation.navigate('EditDevice', {
      deviceId: id,
      name: name,
      serial: serial,
      mac: mac,
      region: region,
      floor: floor,
      distance: distance,
      active: active,
    })
  }

  const onDeleteHandle = (id: number) => {
    setIsLoading(true)
    if (id === 101502 || id === 101503) {
      Alert.alert('Sorry', `You can't delete this Device`, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ])
    } else {
      Alert.alert('Warning', 'Are you sure want to DELETE this DEVICE ?', [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE IT',
          onPress: () =>
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
                    deleteDevices(
                      deviceIds: [${id}]
                    ){
                        rows_deleted
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
                if (
                  !result.data.deleteDevices.rows_deleted ||
                  result.data.deleteDevices.rows_deleted < 1
                ) {
                  Alert.alert('Oops...', 'Delete Device Failed', [
                    {
                      text: 'Close',
                      style: 'cancel',
                    },
                  ])
                } else {
                  Alert.alert('Success', 'Delete Device Successfully', [
                    {
                      text: 'OK',
                      style: 'default',
                    },
                  ])
                  
                  dispatch(setDevice(devices.filter(device => device.deviceId !== id)))
                }
              })
              .catch((error) => {
                console.log('Api call error, ', error.message)
              }),
        },
      ])
    }

    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
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
                query {
                  getSensorsWithIoT(
                  model: 19,
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
          if (result.errors && result.errors[0].message) {
            props.navigation.navigate('GetAccessToken')
          } else {
            dispatch(setDevice(result.data.getSensorsWithIoT))
          }
        })
        .catch((error) => {
          console.log('Api call error, ', error.message)
        })
      setIsLoading(false)
    }, [token, dispatch])
  )

  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item: any) => item.deviceId.toString()}
          renderItem={(itemData) => (
            <DeviceItem
              deviceId={itemData.item.deviceId}
              name={itemData.item.name}
              serial={itemData.item.serial}
              region={itemData.item.region}
              distance={itemData.item.distance}
              active={itemData.item.active}
              temperature={itemData.item.temperature}
            >
              <Button
                color={Colors.primary}
                title="Edit Device"
                onPress={() =>
                  selectItemHandler(
                    itemData.item.deviceId,
                    itemData.item.name,
                    itemData.item.serial,
                    itemData.item.mac,
                    itemData.item.region,
                    itemData.item.floor,
                    itemData.item.distance,
                    itemData.item.active
                  )
                }
              />
              <Button
                color={Colors.accent}
                title="Delete Device"
                onPress={() => {
                  onDeleteHandle(itemData.item.deviceId)
                }}
              />
            </DeviceItem>
          )}
        ></FlatList>
      )}
    </View>
  )
}

export default DeviceOverviewScreen
