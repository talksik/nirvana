export default class CreateRoom {
  showModal: boolean;

  meetLink?: string;

  constructor() {
    this.showModal = false;

    this.meetLink = "";
  }
}