import { memo, useEffect, useState } from 'react';
import type { ChangeEvent, FC, ReactNode } from 'react';
import { Input } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { LIST_SEARCH_PARAM_KEY } from '@/constant';

interface Props {
  children?: ReactNode;
}

const { Search } = Input;

const ListSearch: FC<Props> = memo((props) => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState('');

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <Search
      size='large'
      allowClear
      placeholder='输入关键字'
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    />
  );
});

export default ListSearch;
