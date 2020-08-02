# nodeifier

A system to receive events via a web hook and forward them along to an app via websockets and push notifications.

## Requirements

- Node
- [Postgres](https://postgresapp.com/)

## Installation

```bash
$ yarn install
```

Edit `config/config.json` if to change database connection info.

Copy `.env.sample` to `.env` and paste in an Expo Push Token from [`notifier-native`](https://github.com/CodingItWrong/notifier-native).

## Running

```bash
$ yarn dev
```

Then run [`notifier-native`](https://github.com/CodingItWrong/notifier-native) on a simulator or device.

Then send a message to the "web hook":

```
$ curl -X POST http://localhost:3000/webhooks/test -d "Hello, world!"
```

The following should happen:

- If you are running in the simulator, you should see "Hello, world!" added to the list of messages on the screen. This happens via web hook.
- If you are running on a physical device, and have updated your Expo push token in the code, you should see a push notification with the message.
- If you go to `http://localhost:3000/list` you should see the message included in the list. It was persisted to Postgres and loaded from there.

## Architecture

The app is an Express webapp with the following parts:

- The HTTP service
  - The `/webhooks` endpoints receive messages from various sources, save them to the database, and send them back out via websockets and push notifications.
    - `/webhooks/test` allows you to POST a test message. The whole body of the POST request is sent along as the message.
    - `/webhooks/github` allows you to receive GitHub webhook messages about pull requests opening and closing.
    - `/webhooks/heroku` allows you to receive webhook messages about Heroku app events.
  - The `/list` endpoint returns all messages that have been received.
- The websockets service accepts connects from `nodeifier-native` and forwards messages along in real-time.

## Integrations

### GitHub

- In the repo you want to be notified about, choose Settings > Webhooks, then click "Add webhook"
- Enter the following values:
  - Payload URL: the deployed domain name of the app, followed by `/webhooks/github`
  - Content type: `application/json`
  - Secret: leave blank
  - SSL verification: Enable SSL verification
  - Which events would you like to trigger this webhook? Let me select individual events.
    - Recommended: Pull requests
  - Active: checked
- Click "Add webhook"
- To test, open a PR

## License

MIT
