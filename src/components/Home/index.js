import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import Grid from '../grid';
import WordList from '../WordList';
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      words:[]
    };
    this.strikeoutWord = this.strikeoutWord.bind(this);
  }
  strikeoutWord(selectedLetters){
    console.log('selectedLetters',selectedLetters)
    let words = [...this.state.words];
let index = words.findIndex(el => el.name === selectedLetters);
words[index] = {...words[index], active: false};
this.setState({ words });
 
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val()}))
    );

  }
  componentWillMount() {
   
    this.setState(() => ({  words: [
      {name:'MAEBH', active:true},
      {name:'ORLAITH', active:true},
      {name:'AOIFE', active:true},
      {name:'CAROLINE', active:true},
      {name:'FINBAR', active:true}
       ]}))
  }
  render() {
    const { users,words } = this.state;
const strikeoutWord = this.strikeoutWord;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
        <WordList words = {words}></WordList>
        <Grid words = {words} strikeoutWord = {this.strikeoutWord}></Grid>
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

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);