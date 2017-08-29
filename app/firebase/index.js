import firebase from 'firebase';

try {
    var config = {
    apiKey: "AIzaSyDwDy5G37NvmPTcejl9koGjxvzYXQeYWns",
    authDomain: "todo-app-e2057.firebaseapp.com",
    databaseURL: "https://todo-app-e2057.firebaseio.com",
    projectId: "todo-app-e2057",
    storageBucket: "todo-app-e2057.appspot.com",
    messagingSenderId: "972303345662"
  };

  firebase.initializeApp(config);
  
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
