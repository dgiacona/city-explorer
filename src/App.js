import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        city: '',
        cityData: {},
        error: false,
        errorMessage: ''
      }
    };


  handleSubmit = async (event) => {
    event.preventDefault();
      try {
        let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
        console.log(url);

      let cityData = await axios.get(url);
      console.log(cityData.data[0]);
      this.setState({
      cityData: cityData.data[0],
      error: false
      });
    } catch (error) {
      console.log('error: ', error)
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`
      });
    }
  };


  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };


  render() {

    return (
      <>
      <h1>Ready to Explore?</h1>
      <form onSubmit={this.handleSubmit}>
        <label>Pick a City:
          <input onChange={this.handleCityInput}type="text"/>
        </label>
        <button type="submit">Explore!</button>
      </form>
      {this.state.error
        ? <p>{this.state.errorMessage}</p>
        :<ul>
        <li>{'City Name: ' + this.state.cityData.display_name}</li>
        <li>{'Latitude: ' + this.state.cityData.lat}</li>
        <li>{'Longitude: ' + this.state.cityData.lon}</li>
      </ul>
      }
      </>
    );
  }
}

export default App;
