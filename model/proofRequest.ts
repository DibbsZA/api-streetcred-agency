
import { ProofAttributeInfo } from './proofAttributeInfo';
import { ProofPredicateInfo } from './proofPredicateInfo';
import { RevocationInterval } from './revocationInterval';


export interface ProofRequest {
  name?: string;
  version?: string;
  nonce?: string;
  requested_attributes?: { [key: string]: ProofAttributeInfo; };
  requested_predicates?: { [key: string]: ProofPredicateInfo; };
  non_revoked?: RevocationInterval;
}
