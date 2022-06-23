import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      cityMap: ''
    }
  };
  
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
      try {
        let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
        console.log(url);
        let cityData = await axios.get(url);
        let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12`;
        this.setState({
          cityData: cityData.data[0],
          cityMap: cityMap
        });
    } 
    catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`
      });
    }
  };


  render() {

    return (
      <>
      <h1>Ready to Explore?</h1>
      <Form onSubmit={this.handleSubmit}>
        <label>Pick a City:
          <input onChange={this.handleCityInput}type="text"/>
        </label>
        <Button type="submit">Explore!</Button>
      </Form>
      {this.state.error
        ? <p>{this.state.errorMessage}</p>
        :<ul>
        <p>{'City Name: ' + this.state.cityData.display_name}</p>
        <p>{'Latitude: ' + this.state.cityData.lat}</p>
        <p>{'Longitude: ' + this.state.cityData.lon}</p>
        <Image class="img" src={this.state.cityMap}></Image>
      </ul>
      }
      </>
    );
  }
}

export default App;
