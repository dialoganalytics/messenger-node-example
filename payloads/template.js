module.exports = {
  attachment: {
    type: "template",
    payload: {
      template_type: "button",
      text: "Check out our documentation!",
      buttons: [
        {
          type: "web_url",
          url: "https://docs.dialoganalytics.com",
          title: "URL button"
        },
        {
          type: "postback",
          title: "Postback button",
          payload: "DEVELOPER_DEFINED_PAYLOAD"
        },
        {
          "type":"phone_number",
          "title":"Call me maybe",
          "payload":"+15105551234"
        }
      ]
    }
  }
};
