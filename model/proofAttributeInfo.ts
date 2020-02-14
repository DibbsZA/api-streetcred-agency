
import { AttributeFilter } from './attributeFilter';
import { RevocationInterval } from './revocationInterval';


export interface ProofAttributeInfo {
  name?: string;
  restrictions?: Array<AttributeFilter>;
  non_revoked?: RevocationInterval;
}
