const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

// const { uid } = require('uid');

const {
  addPlayer,
  removePlayer,
  resetCardsForGame,
  getPlayersForGame,
  getPlayer,
  setCard,
  getGameIdForPlayer,
} = require("./players");

const { setShowValue, getShowValue } = require("./showValue");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "/../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../frontend/dist/index.html"));
});

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joining", ({ name, gameId }) => {
    const userId = socket.id;
    // todo: uid for room
    console.log("Name", name, "Id", userId);
    console.log("Joining Romm:", gameId);

    socket.join(gameId);

    addPlayer(userId, name, gameId).then(() => {
      io.in(gameId).emit("state update", {
        players: getPlayersForGame(gameId),
        showValue: getShowValue(),
      });
    });
  });

  socket.on("set card", (card) => {
    const userId = socket.id;

    const gameId = getGameIdForPlayer(userId);

    console.log("Setting card:", card, "by", userId, "in Room", gameId);

    setCard(userId, card).then(() => {
      if (gameId)
        io.in(gameId).emit("state update", {
          players: getPlayersForGame(gameId),
          showValue: getShowValue(),
        });
    });
  });

  socket.on("show cards", () => {
    const userId = socket.id;

    const gameId = getGameIdForPlayer(userId);

    console.log("Show cards by", userId, "in Room", gameId);

    setShowValue(true).then(() => {
      if (gameId)
        io.in(gameId).emit("state update", {
          players: getPlayersForGame(gameId),
          showValue: getShowValue(),
        });
    });
  });

  socket.on("reset cards", () => {
    const userId = socket.id;

    const gameId = getGameIdForPlayer(userId);

    console.log("Reset cards by", userId, "in Room", gameId);

    setShowValue(false).then(() => {
      resetCardsForGame(gameId).then(() => {
        if (gameId)
          io.in(gameId).emit("state update", {
            players: getPlayersForGame(gameId),
            showValue: getShowValue(),
          });
      });
    });
  });

  socket.on("disconnect", () => {
    const userId = socket.id;
    const gameId = getGameIdForPlayer(userId);

    console.log("Client disconnected");
    console.log("Id", userId, "RoomId", gameId);

    removePlayer(userId).then(() => {
      socket.to(gameId).emit("state update", {
        players: getPlayersForGame(gameId),
        showValue: getShowValue(),
      });
    });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
