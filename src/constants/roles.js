// user roles
export const CIO = 'cio';
export const FELLOW = 'fellow';
export const SOCIETY_SECRETARY = 'society secretary';
export const SUCCESS = 'success';
export const SUCCESS_OPS = 'success ops';
export const SOCIETY_PRESIDENT = 'society president';

// user groups
export const STAFF_USERS = [CIO, SUCCESS_OPS, SUCCESS];
export const VERIFICATION_USERS = [SOCIETY_SECRETARY, SUCCESS_OPS, CIO];

export const ROLES = {
  1: FELLOW,
  2: SOCIETY_SECRETARY,
  3: SOCIETY_PRESIDENT,
  4: SUCCESS_OPS,
  5: CIO,
};

