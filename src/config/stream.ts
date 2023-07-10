import { StreamChat } from 'stream-chat';
import ENVIRONMENT from './environment';

const streamInstance = StreamChat.getInstance(
  ENVIRONMENT.STREAM_KEY,
  ENVIRONMENT.STREAM_SECRET
);

export default streamInstance;
