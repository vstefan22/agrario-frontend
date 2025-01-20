export type MessageTypes = {
  id: string;
  recipient: string;
  last_message: { body: string };
  time: string;
  subject: string;
};

export type Attachment = {
  id: string;
  file: string;
  created_at: string;
};

export type MessageType = {
  recipient: string;
  subject: string;
  body: string;
  sender: string;
  attachments: Attachment[];
};

export type MessageBodyType = {
  message: string;
};
