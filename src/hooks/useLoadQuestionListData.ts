import { useSearchParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getQuestionListService } from '@/services/question';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '@/constant/index';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

/**
 * 根据页面的情况（关键字、页数、页面长度等）获取问卷列表数据
 * @param opt isStar：是否标星，isDeleted：是否删除
 * @returns data：问卷列表数据，loading：加载状态，error：报错，refresh：刷新函数
 */
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });
      return data;
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    },
  );

  return { data, loading, error, refresh };
}

export default useLoadQuestionListData;
