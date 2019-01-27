/**
 * @file messageUpdate event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const credentialsFilter = xrequire('./filters/credentialsFilter');
const wordFilter = xrequire('./filters/wordFilter');
const linkFilter = xrequire('./filters/linkFilter');
const inviteFilter = xrequire('./filters/inviteFilter');

module.exports = async  (oldMessage, newMessage) => {
  try {
    // If message content hasn't been changed, do nothing
    if (oldMessage.content === newMessage.content) return;

    // Filter Bastion's credentials from the message
    credentialsFilter(newMessage);

    if (!oldMessage.guild) return;
    if (newMessage.author.bot) return;

    // Filter specific words from the message
    wordFilter(newMessage);

    // Filter links from the message
    linkFilter(newMessage);

    // Filter Discord server invites from the message
    inviteFilter(newMessage);
  }
  catch (e) {
    newMessage.client.log.error(e);
  }
};
