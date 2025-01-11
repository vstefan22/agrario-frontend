export type MessageTypes = {
  id: string;
  name: string;
  message: string;
  time: string;
  category: string;
};

export type MessageType = {
  recipient: string;
  subject: string;
  body: string;
};

export type MessageBodyType = {
  message: string;
};
