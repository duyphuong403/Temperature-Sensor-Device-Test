import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

interface Props {
  name: string,
  defaultValue: string,
}

const ControllerItem: React.FC<Props> = (props) => {
  const { control, handleSubmit, errors } = useForm()

  return (
    <Controller
      name={props.name}
      control={control}
      rules={{ required: true }}
      defaultValue={props.defaultValue}
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
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
})

export default ControllerItem
