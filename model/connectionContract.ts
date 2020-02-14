
import { AgentEndpoint } from './agentEndpoint';
import { ConnectionState } from './connectionState';


export interface ConnectionContract {
  connectionId?: string;
  name?: string;
  imageUrl?: string;
  myDid?: string;
  theirDid?: string;
  myKey?: string;
  theirKey?: string;
  state?: ConnectionState;
  invitation?: string;
  invitationUrl?: string;
  endpoint?: AgentEndpoint;
  createdAtUtc?: Date;
}
