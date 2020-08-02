const Expo = require('expo-server-sdk').default;

const token = process.env.EXPO_PUSH_TOKEN;
console.log(`Expo Push Token: ${token}`);

const expo = new Expo();

async function push({ text }) {
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token ${token} is not a valid Expo push token`);
    return;
  }

  const messages = [
    {
      to: token,
      title: text,
    },
  ];

  console.log('sending to expo push', messages);
  const chunks = expo.chunkPushNotifications(messages);

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { push };
