const players = {};

const addPlayer = async (userId, name, gameId) =>
  (players[userId] = { name, gameId, card: null });

const removePlayer = async (userId) => delete players[userId];

const getPlayer = (userId) => players[userId];

const getGameIdForPlayer = (userId) => {
  const player = getPlayer(userId);
  if (player) {
    return player.gameId;
  }
};

const getPlayersForGame = (gameId) =>
  Object.keys(players)
    .filter((player) => players[player].gameId === gameId)
    .map((player) => ({ ...players[player], userId: player }));

const setCard = async (userId, card) => (players[userId].card = card);

const resetCardsForGame = async (gameId) =>
  Object.keys(players).filter((player) => {
    if (players[player].gameId === gameId) {
      players[player].card = null;
    }
  });

export {
  addPlayer,
  removePlayer,
  resetCardsForGame,
  getPlayersForGame,
  getPlayer,
  setCard,
  getGameIdForPlayer,
};
