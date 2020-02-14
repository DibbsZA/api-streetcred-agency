
import { ProofAttributeContract } from './proofAttributeContract';


/**
 * Verification result
 */
export interface VerificationResult {
  /**
   * True if verification passed, otherwise False
   */
  valid?: boolean;
  /**
   * Verification Proof Details
   */
  proof?: { [key: string]: ProofAttributeContract; };
}
