
import { AttributeFilter } from './attributeFilter';
import { RevocationInterval } from './revocationInterval';


export interface ProofPredicateInfo {
  p_type?: string;
  p_value?: string;
  name?: string;
  restrictions?: Array<AttributeFilter>;
  non_revoked?: RevocationInterval;
}
