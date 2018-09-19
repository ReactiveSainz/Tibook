import * as HOCS from './HOCS';
import * as NAV from './Navigation';

const getError = error => JSON.parse(JSON.stringify(error));
export { HOCS, NAV, getError };
