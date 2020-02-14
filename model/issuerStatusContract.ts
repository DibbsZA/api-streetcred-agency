
import { EndorserType } from './endorserType';


/**
 * Issuer Status contract
 */
export interface IssuerStatusContract {
  /**
   * Transaction Author Agreement Text
   */
  acceptanceText?: string;
  /**
   * Transaction Author Agreement Version
   */
  acceptanceVersion?: string;
  acceptanceDigest?: string;
  acceptanceTime?: number;
  /**
   * Indicates if user needs to accept the   latest agreement on the network
   */
  requireAcceptance?: boolean;
  txnEndorsement?: EndorserType;
  /**
   * Indicates if the user has Endorser status
   */
  issuerCanEndorse?: boolean;
}
