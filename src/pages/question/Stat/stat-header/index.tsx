import { memo, useMemo, useRef, type FC, type ReactNode } from 'react';
import {
  Button,
  Input,
  message,
  Popover,
  Space,
  Tooltip,
  QRCode,
  Typography,
  type InputRef,
} from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './index.module.scss';
import useGetPageInfo from '@/hooks/useGetPageInfo';

interface Props {
  children?: ReactNode;
}

const { Title } = Typography;

const StatHeader: FC<Props> = memo(() => {
  const nav = useNavigate();
  const { id } = useParams();

  const { title, isPublished } = useGetPageInfo();

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);

  async function copy(url: string) {
    // 现代方法: 使用Clipboard API
    try {
      await navigator.clipboard.writeText(url);
      message.success('拷贝成功');
    } catch (err) {
      message.error('拷贝失败');
      console.error('复制失败:', err);

      // 备用方法: 使用execCommand (兼容旧浏览器)
      try {
        const input = urlInputRef.current?.input;
        if (input) {
          input.select();

          // 使用已弃用但广泛支持的execCommand作为备选
          const success = document.execCommand('copy');
          if (success) {
            message.success('拷贝成功');
          } else {
            throw new Error('execCommand failed');
          }
        }
      } catch (err) {
        // 终极备选方案: 提示用户手动复制
        message.warning('自动复制失败，请手动复制链接');
        console.error('复制失败:', err);
        if (urlInputRef.current) {
          urlInputRef.current.select();
        }
      }
    }
  }

  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '355px' }} ref={urlInputRef} readOnly />
        <Tooltip title='拷贝链接'>
          <Button icon={<CopyOutlined />} onClick={() => copy(url)}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type='link' icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type='primary' onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
});

export default StatHeader;
