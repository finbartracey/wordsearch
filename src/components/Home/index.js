import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import Grid from '../grid';
import WordList from '../WordList';
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      words:[],
     // game:props.match.params.game,
    };
    console.log('props',props)
    this.strikeoutWord = this.strikeoutWord.bind(this);
  }
  strikeoutWord(selectedLetters){
    console.log('selectedLetters',selectedLetters)
    let words = [...this.state.words];
let index = words.findIndex(el => el.name.toUpperCase() === selectedLetters.toUpperCase());
words[index] = {...words[index], active: false};
this.setState({ words });
 
  }
  componentDidUpdate ({ params, location }) {
    console.log(params,location)
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val()}))
    );
    console.log('----',this.props.match.params.game)
     db.onceGetWords(this.props.match.params.game).then(snapshot =>{
      var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        returnArr.push({name:item,active:true});
    });
      this.setState(() => (
        { words: returnArr}))
     });
  }
  componentWillMount() {

  }
  render() {
    
    const { users,words } = this.state;
const strikeoutWord = this.strikeoutWord;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
        
        { !!words.length>0 && <WordList words = {words}></WordList>}
        { !!words.length>0 &&<Grid words = {words} gameKey={this.props.match.params.game} strikeoutWord = {this.strikeoutWord}></Grid>}
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}



  </div>


export default withRouter(HomePage);