
export default class IOController {
  #io;
  #players = [];

  constructor(io) {
    this.#io = io;
  }

  registerSocket(socket) {
    console.log(`connection ${socket.id}`);
  }

  setupListeners(socket) {
    //ajoute la deconnexion
    // est ce qu'il gere l'avancement des insectes et les condition pour gagner???
  };

  result(){
    // gere le classement :)
    }

}