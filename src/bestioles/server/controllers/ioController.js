
export default class IOController {
  #io;
  #players = {};

  constructor(io) {
    this.#io = io;
  }

  registerSocket(socket) {
    this.#players[socket.id] = {
      id: socket.id,
      position: 0
    };
    this.setupListeners(socket);
    this.#io.emit('update', Object.values(this.#players));
  }

  setupListeners(socket) {
    socket.on('avancement', () => {
      const player = this.#players[socket.id]; 
      player.position += 5; 
      if ((player.position) >= 100){
        this.#io.emit('over', {winner: player}); 
      }
      else{
        this.#io.emit('update', Object.values(this.#players)); 
      }
    })
    socket.on('disconnect', () => {
      delete this.#players[socket.id];
      this.#io.emit('update', Object.values(this.#players)); 
    })
  };

  result() {
    return Object.values(this.#players).sort((a, b) => b.position - a.position);
  }

}