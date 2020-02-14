
import { MessageDirection } from './messageDirection';


export interface BasicMessageContract {
  connectionId?: string;
  timestamp?: Date;
  text?: string;
  direction?: MessageDirection;
}
