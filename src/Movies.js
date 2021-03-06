import React from 'react';

class Movies extends React.Component {
  render() {
    let weather = this.props.weatherData.map((day, idx) => (
    <Movies
      key={idx}
      city={this.props.city}
      day={day}
    />
))
return (
      <div className="border-top-4">
        <h3>Weather</h3>
        {!weather.length ? (
          <p>No Weather Available</p>
        ) : (
          <ul className='list-unstyle'>
          {[weather]}
          </ul>
        )}
      </div>
    );
  }
}

export default Movies;