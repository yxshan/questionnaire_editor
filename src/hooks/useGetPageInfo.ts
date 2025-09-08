import { shallowEqual, useSelector } from 'react-redux';
import type { StateType } from '@/store';
import type { PageInfoType } from '@/store/modules/pageInfoReducer';

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo, shallowEqual) as PageInfoType;
  return pageInfo;
}

export default useGetPageInfo;
