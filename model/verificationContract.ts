
import { ProofAttributeContract } from './proofAttributeContract';
import { ProofState } from './proofState';


export interface VerificationContract {
  connectionId?: string;
  verificationId?: string;
  state?: ProofState;
  createdAtUtc?: Date;
  updatedAtUtc?: Date;
  isValid?: boolean;
  verifiedAtUtc?: Date;
  proof?: { [key: string]: ProofAttributeContract; };
}
