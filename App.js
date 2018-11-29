import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Weather from './app/components/Weather';

export default class App extends React.Component {
  state = {
    byBtn: false,
    location: {cityName: '', countryCode: ''},
    positionText: '',
    isLoading: true,
    temperature: 0,
    weatherCondition: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
    );
  }

  fetchWeatherByCity = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.location.cityName},${this.state.location.countryCode}&APPID=${weatherApiKey}&units=metric`
    ).then(res => res.json())
     .then(json=>{
      this.setState({
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main
      })
    });
  }

  fetchWeather = (lat = 25, lon = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${weatherApiKey}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        })
    });
  }

  findWeather = () => {
    this.setState({isLoading: true});
    const loc = this.state.positionText.trim().split(',');
    this.setState({location: {cityName: loc[0], countryCode: loc[1]}});
    this.fetchWeatherByCity();
    this.setState({isLoading: false});
  }

  render() {
    const isLoading  = this.state.isLoading;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Загрузка погоди...</Text> : 
                     <Weather 
                      weather={this.state.weatherCondition} 
                      temperature={this.state.temperature} 
                     />}
        <Button 
          onPress={this.findWeather}
          style={styles.btn} 
          title='Пошук' 
          color='black'
        ></Button>
        <TextInput
          style={styles.textInput}
          placeholder='ternopil,ua'
          placeholderTextColor='grey'
          onChangeText={(text) => this.setState({positionText: text})}
          value={this.state.positionText}
        >
        </TextInput>
      </View>
    );
  }
}

const weatherApiKey = '8475da6618522109050f7b2ba4bb78d4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    padding: 30,
  },
  textInput: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'white',
    margin: 25,
  },
  btn: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 20
  }
});