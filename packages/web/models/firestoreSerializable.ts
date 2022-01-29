export default interface IFirestoreSerializable { 
  id: string;

  serialize: () => {};

  // deserialize: (firestoreData: {}) => {};
}