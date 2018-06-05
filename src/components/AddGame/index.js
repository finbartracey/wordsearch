import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';
import { Input } from 'antd';
const { TextArea } = Input;

const AddGame = ({ history }) =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
       
        add words here {authUser.uid} 
       <AddLinkForm history={history}/>
      </div>
    }
  </AuthUserContext.Consumer>


const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    title: '',
    words: '',
    error: null,
  };
  
  class AddLinkForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = (event) => {
      const {
        title,
        words,
      } = this.state;
      const {
        history,
      } = this.props;
      const uid = ''
//const uid = authdetails.uid
let wordsArray = words.split(/(?:,| |\n)+/) 
      db.doAddGame(title,wordsArray)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(updateByPropertyName('error', error));
        });
  
      event.preventDefault();
    }
  
    render() {
      const {
        title,
        words,
        error,
      } = this.state;
 
      const isInvalid =
      title === '' ||
      words === '';
  
      return (
        <form onSubmit={this.onSubmit}>

          <input
            value={title}
            onChange={event => this.setState(updateByPropertyName('title', event.target.value))}

            placeholder="title"
          />
          <TextArea rows={4} 
            value={words}
            onChange={event => this.setState(updateByPropertyName('words', event.target.value))}

            placeholder="add words"
          />
          <button disabled={isInvalid} type="submit">
            dolt
          </button>
  
          { error && <p>{error.message}</p> }
        </form>
      );
    }
  }



const authCondition = (authUser) => !!authUser;
export default withRouter(AddGame);
//export default withAuthorization(authCondition)(AddLink);