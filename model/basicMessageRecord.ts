
import { MessageDirection } from './messageDirection';


export interface BasicMessageRecord {
  sentTime?: Date;
  direction?: MessageDirection;
  text?: string;
  id?: string;
}
