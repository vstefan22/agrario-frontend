export type MessageTypes = {
  id: string;
  recipient: string;
  sender: string;
  last_message: {
    body: string;
    created_at: string;
    time: string;
  };
  time: string;
  subject: string;
  created_at: string;
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
  created_at: string;
  time: string;
};

export type MessageBodyType = {
  message: string;
};
