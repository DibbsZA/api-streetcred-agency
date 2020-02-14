


/**
 * Transaction author agreement
 */
export interface NetworkTxnAgreementContract {
  /**
   * Acceptance agreement text
   */
  text?: string;
  /**
   * Agreement version
   */
  version?: string;
  /**
   * List of agreement acceptance methods
   */
  acceptanceMethods?: { [key: string]: string; };
}
