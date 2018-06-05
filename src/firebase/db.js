import { db,auth, utils } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
export const doAddLink = ( title, link) =>
  db.ref(`links/`).push({
    'uid': auth.currentUser.uid,
    title,
    link,
    'created': utils.ServerValue.TIMESTAMP
  });

  export const doAddComment = ( comment, linkid, parentid) =>
  db.ref(`links/`).push({
    'uid': auth.currentUser.uid,
    comment,
    linkid,
    'created': utils.ServerValue.TIMESTAMP,
    'parentid' : parentid
  });

  export const doAddGame = ( title, words) =>
  db.ref(`games/`).push({
    'uid': auth.currentUser.uid,
    title,
  //  'username':auth.currentUser.username,
    words,
    'created': utils.ServerValue.TIMESTAMP
  });
  export const onceGetLinks = () =>
  db.ref('links').once('value');
  export const onceListGames = () =>
  db.ref(`games`).once('value');
  export const onceGetWords = (id) =>
  db.ref(`games/${id}/words`).once('value');
  export const doGameComplete = ( gameId,time) =>
  db.ref(`gamesComplete/`).push({
    'uid': auth.currentUser.uid,
    gameId,
    time,
    'created': utils.ServerValue.TIMESTAMP
  });