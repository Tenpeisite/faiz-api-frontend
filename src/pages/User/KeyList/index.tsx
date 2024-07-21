import {ActionType, ProColumns} from '@ant-design/pro-components';
import React, {useRef, useState} from "react";
import {ProTable} from "@ant-design/pro-table/lib";
import KeyColumns from "@/pages/User/Columns/KeyColumns";
import {
  addKeyUsingPost,
  delKeyByIdUsingPost,
  listKeysByUserIdUsingGet, updateKeyStatusUsingPost
} from "@/services/qiApi-backend/keyController";
import {Button, Card, message, Popconfirm, Space} from 'antd';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.KeyVO>();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  /**
   *  Delete node
   * @zh-CN 正在删除密钥
   *
   * @param record
   */
  const handleDelete = async (record: API.KeyVO) => {
    const hide = message.loading('正在删除密钥');
    if (!record) return true;
    try {
      const res = await delKeyByIdUsingPost({
        id: record.id
      });
      hide();
      if (res.data) {
        message.success('删除密钥成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('删除密钥失败', error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 修改密钥状态
   *
   * @param record
   */
  const handlechangeStatus = async (record: API.KeyVO) => {
    if (!record) return true;
    if (record.status === '0') {
      const hide = message.loading('正在禁用密钥');
      try {
        const res = await updateKeyStatusUsingPost({
          id: record.id
        });
        hide();
        if (res.data) {
          message.success('禁用密钥成功');
          actionRef.current?.reload();
        }
        return true;
      } catch (error: any) {
        hide();
        message.error('禁用密钥失败', error.message);
        return false;
      }
    } else {
      const hide = message.loading('正在启用密钥');
      try {
        const res = await updateKeyStatusUsingPost({
          id: record.id
        });
        hide();
        if (res.data) {
          message.success('启用密钥成功');
          actionRef.current?.reload();
        }
        return true;
      } catch (error: any) {
        hide();
        message.error('启用密钥失败', error.message);
        return false;
      }
    }

  };

  const addKey = async () => {
    setLoading(true)
    try {
      const res = await addKeyUsingPost();
      console.log("res.data:" + res.data)
      console.log("res.code:" + res.code)
      if (res.data && res.code === 0) {
        message.success(`新增密钥成功`);
        setLoading(false)
        actionRef.current?.reload()
      } else {
        setLoading(false)
        actionRef.current?.reload()
      }
    } catch (error: any) {
      message.error('新增密钥失败', error.message);
      setLoading(false)
      actionRef.current?.reload()
    }

  }

  const deleteConfirm = async () => {
    await handleDelete(currentRow as API.KeyVO);
    actionRef.current?.reload()
  };

  const changeStatusConfirm = async () => {
    await handlechangeStatus(currentRow as API.KeyVO);
    actionRef.current?.reload()
  };


  const keyColumns: ProColumns<API.KeyVO>[] = [
    ...KeyColumns, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.status === '0' &&
        <Popconfirm
          key={'ban'}
          title="是否确认禁用这对密钥!"
          onConfirm={changeStatusConfirm}
          okText="确定"
          cancelText="取消"
        >
          <a
            key="SUCCESS"
            style={{color: "gray"}}
            onClick={async () => {
              setCurrentRow(record);
            }}
          >
            禁用
          </a>
        </Popconfirm>,
        record.status === '1' &&
        <Popconfirm
          key={'Delete'}
          title="是否确认删除这对密钥!"
          onConfirm={deleteConfirm}
          okText="确定"
          cancelText="取消"
        >
          <a
            key="SUCCESS"
            style={{color: "red"}}
            onClick={async () => {
              setCurrentRow(record);
            }}
          >
            删除
          </a>
        </Popconfirm>,
        record.status === '1' &&
        <a
          key="SUCCESS"
          style={{color: "blue"}}
          onClick={async () => {
            handlechangeStatus(record);
          }}
        >
          启用
        </a>
      ],
    },
  ]

  return (
    <>
      <Space direction="vertical" size="middle" style={{display: 'flex'}}>
        <Card title="提示：" size="default">
          <p style={{fontSize: '15px'}}>一个账号最多拥有两对密钥(Access/Secret Key)；更换密钥时，请创建第二个密钥；删除密钥前须停用；</p>
          <p style={{fontSize: '15px'}}> 出于安全考虑，建议您周期性地更换密钥。</p>
          <div style={{position: 'relative'}}>
            <Button
              style={{position: 'absolute', bottom: 0, right: 0}}
              loading={loading}
              onClick={addKey}
            >
              新增密钥
            </Button>
          </div>
        </Card>
      </Space>
      <br/>
      <ProTable<API.KeyVO>
        loading={loading}
        rowKey="key"
        actionRef={actionRef}
        columns={keyColumns}
        pagination={false}
        search={false}
        options={false}
        request={async (params) => {
          setLoading(true)
          const res = await listKeysByUserIdUsingGet({...params});
          if (res.data) {
            setLoading(false)
            return {
              data: res.data || [],
              success: true,
              // total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
      />
    </>
  );
};
