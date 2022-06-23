import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=13`;
        this.setState({
          cityData: cityData.data[0],
          cityMap: cityMap
        });
    } 
    catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}. Sorry and error occured, plese refresh the page`
      });
    }
  };


  render() {

    return (
      <>
      <h1>Ready to Explore?</h1>
      <Form onSubmit={this.handleSubmit}>
        <Form.Label column="lg" lg={2}><p>Pick a City:</p>
          <input onChange={this.handleCityInput}type="text"/>
        </Form.Label>
        <Button type="submit">Explore!</Button>
      </Form>
      {this.state.error?<Alert variant="danger">{this.state.errorMessage}</Alert>:
        <ListGroup>
        <ListGroup.Item>{'City Name: ' + this.state.cityData.display_name}</ListGroup.Item>
        <ListGroup.Item>{'Latitude: ' + this.state.cityData.lat}</ListGroup.Item>
        <ListGroup.Item>{'Longitude: ' + this.state.cityData.lon}</ListGroup.Item>
        <Image class="img" src={this.state.cityMap}></Image>
      </ListGroup>
      }
      </>
    );
  }
}

export default App;
