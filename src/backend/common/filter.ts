import errorFilter from '@/backend/common/errorFilter.ts';
import { Hanlder } from '@/backend/common/interfaces.ts';

// NOTE: HoF로 체인과 같은 역할을 할 것이기 때문에 filter라 칭함.
export default function filter(handler: Hanlder) {
  return errorFilter(handler);
}
