import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';

const AddLink = ({ history }) =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
       
       add links here {authUser.uid}
       <AddLinkForm history={history}/>
      </div>
    }
  </AuthUserContext.Consumer>


const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    title: '',
    link: '',
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
        link,
      } = this.state;
      const {
        history,
      } = this.props;
      const uid = ''
//const uid = authdetails.uid
      db.doAddLink(title,link)
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
        link,
        error,
      } = this.state;
 
      const isInvalid =
      title === '' ||
      link === '';
  
      return (
        <form onSubmit={this.onSubmit}>

          <input
            value={title}
            onChange={event => this.setState(updateByPropertyName('title', event.target.value))}
            type="text"
            placeholder="title"
          />
          <input
            value={link}
            onChange={event => this.setState(updateByPropertyName('link', event.target.value))}
            type="text"
            placeholder="link"
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
export default withRouter(AddLink);
//export default withAuthorization(authCondition)(AddLink);