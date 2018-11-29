import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherConditions } from '../../utils/WeatherConditions';

export default class App extends React.Component {
  render () {
    return (
      <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[this.props.weather].color }
      ]}
      >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[this.props.weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{this.props.temperature}˚</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[this.props.weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[this.props.weather].subtitle}
        </Text>
      </View>
      <Text style={styles.label}>Введіть назву міста та код країни</Text>
    </View>
  )}
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  label: {
    paddingLeft: 25,
    marginBottom: 20,
    fontSize: 20,
    color: '#fff'
  }
});