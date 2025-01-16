export type MessageTypes = {
  id: string;
  recipient: string;
  last_message: { body: string };
  time: string;
  subject: string;
};

export type MessageType = {
  recipient: string;
  subject: string;
  body: string;
};

export type MessageBodyType = {
  message: string;
};
