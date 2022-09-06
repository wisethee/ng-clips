import firebase from 'firebase/compat/app';

export default interface IClip {
  docId?: string;
  uid: string;
  displayName: string;
  title: string;
  clipFileName: string;
  clipUrl: string;
  screenshotFileName: string;
  screenshotUrl: string;
  timestamp: firebase.firestore.FieldValue;
}
