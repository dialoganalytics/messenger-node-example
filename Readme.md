# Facebook Messenger Node.js Chatbot

An example [Facebook Messenger](https://kik.com) node.js chatbot integrated with [Dialog Analytics](https://dialoganalytics.com). Built with [expressjs/express](https://github.com/expressjs/express).

- [Dialog Documention](https://docs.dialoganalytics.com)
- [Dialog API reference](https://docs.dialoganalytics.com/reference)

## Getting started

Clone this repository and run `npm install`

Create an account on https://app.dialoganalytics.com, grab your Dialog API token and bot ID.

Set environment variables in `.env`:

```
FACEBOOK_PAGE_ACCESS_TOKEN=...
FACEBOOK_VERIFY_TOKEN=...
DIALOG_API_TOKEN=...
DIALOG_BOT_ID=...
```

Get your Facebook Messenger tokens at https://developers.facebook.com. Configure your application's webhook settings in the Facebook developer dashboard to the endpoint on which this server will be listening.

__Local development:__ When developping locally, use a service like https://ngrok.com to expose a server running on your machine. This should be something like https://f562681e.ngrok.io/webhook

```bash
$ ngrok http 3000
```

Start the bot:

```bash
$ npm start
```

Open the Messenger application, find your bot and exchange a few messages. Messages will be sent to Dialog's API.

## Go further

Read more on how to make the most out of the possibilities offered by Dialog here: https://dialoganalytics.com
