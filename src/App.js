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
      let cityData = await axios.get(url);
      this.setState({
      cityData: cityData.data.results,
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
    let cityData = this.state.cityData.map((character, idx) => {
      return <li key={idx}>{character.name}</li>;  
    });

    return (
      <>
      <h1>Ready to Explore?</h1>
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Display City Data</button>
      </form>
      {this.state.error
        ? <p>{this.state.errorMessage}</p>

        :<ul>
        {cityData}
      </ul>
      }

      <form onSubmit={this.handleCitySubmit}>
        <label>Pick a City:
          <input type="text" onInput={this.handleCityInput}/>
        </label>
        <button type="submit">Explore!</button>
      </form>
      </>
    );
  }
}

export default App;
