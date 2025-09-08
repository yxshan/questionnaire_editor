import { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Empty, Typography, Tag, Table, Space, Button, Modal, message, Spin } from 'antd';
import { useRequest, useTitle } from 'ahooks';

import styles from '../common.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '@/components/list-search';
import { deleteQuestionsService, updateQuestionService } from '@/services/question';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import ListPage from '@/components/list-page';

interface Props {
  children?: ReactNode;
}

// 定义问卷项类型
interface IQuestionItem {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
}

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC<Props> = memo((props) => {
  useTitle('小慕问卷 - 回收站');

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功');
        refresh(); // 手动刷新列表
        setSelectedIds([]);
      },
    },
  );

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionsService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功');
        refresh();
        setSelectedIds([]);
      },
    },
  );

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion,
    });
  }

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color='processing'>已发布</Tag> : <Tag>未发布</Tag>;
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ];

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type='primary' disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table<IQuestionItem>
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {list.length > 0 ? TableElem : !loading && <Empty description='暂无数据' />}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
});

export default Trash;
