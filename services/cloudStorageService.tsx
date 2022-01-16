import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default class CloudStorageService {
  private storage = getStorage();

  /**
   * return the
   */
  async uploadMessageAudioFile(audioFile: File): Promise<string | Error> {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "audio/mpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(this.storage, "messages/" + audioFile.name);
    const uploadTask = uploadBytesResumable(storageRef, audioFile, metadata);

    // Listen for state changes, errors, and completion of the upload.
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors

          reject(new Error(error.message));

          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            return resolve(downloadURL);
          });
        }
      );
    });
  }
}
