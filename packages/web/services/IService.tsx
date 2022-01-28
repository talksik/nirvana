import { Firestore } from "firebase/firestore";

export default interface IService {
  db: Firestore;
}