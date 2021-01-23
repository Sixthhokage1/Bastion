const sendHeartbeat = require('./modules/sendHeartbeat');
const guildCount = require('./modules/guildCount');

module.exports = async (Bastion) => {
  try {
    await guildCount(Bastion);
  }
  catch (e) {
    Bastion.log.error(e);
  }
};
