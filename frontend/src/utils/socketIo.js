import io from "socket.io-client";

let socket;

const url = window.location.origin;

export const initiateSocket = (name, gameId, setUserId) => {
  socket = io(url);
  console.log("Connecting socket...");
  console.log(url);
  socket.on("connect", () => {
    if (socket && gameId && name) socket.emit("joining", { name, gameId });
    setUserId(socket.id);
  });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const setCard = (card) => {
  if (card) socket.emit("set card", card);
};

export const showCards = () => {
  socket.emit("show cards");
};

export const resetCards = () => {
  socket.emit("reset cards");
};

export const subscribeToStateUpdate = (setPlayers, setShowValue) => {
  socket.on("state update", ({ players, showValue }) => {
    setPlayers(players);
    setShowValue(showValue);
  });
};
