import React, { Component } from 'react';
import { db } from '../../firebase';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
   
      games:[]
    };

  }

  componentDidMount() {
    db.onceListGames().then(snapshot =>
      this.setState(() => ({ games: snapshot.val()}))
    );

  }

render() {
  const { games } = this.state;

  return (
    <div>

      { !!games && <GamesList games={games} /> }
     
    </div>
  );
}
}

const GamesList = ({ games }) =>
<div>


  {Object.keys(games).map(key =>
    <div key={key}>
    <Moment format="YYYY/MM/DD">{games[key].created}</Moment><Link to={`/${key}`}>Home</Link> {games[key].title}</div>
  )}



</div>
export default LandingPage;
