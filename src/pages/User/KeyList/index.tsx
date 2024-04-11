import InterfaceInfoColumns from '@/pages/Admin/Columns/InterfaceInfoColumns';
import {PlusOutlined} from '@ant-design/icons';
import type { ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Card, message, Popconfirm} from 'antd';

const InterfaceInfoList: React.FC = () => {


  const cancel = () => {
    message.success('取消成功');
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    ...InterfaceInfoColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.status === 0 ? (
          <a
            type="text"
            key="auditing"
            onClick={() => {
            }}
          >
            审核通过
          </a>
        ) : null,
        record.status === 2 ? (
          <a
            type="text"
            key="online"
            onClick={() => {
            }}
          >
            上线
          </a>
        ) : null,
        record.status === 1 ? (
          <a
            type="text"
            key="offline"
            style={{color: "red"}}
            onClick={() => {
            }}
          >
            下线
          </a>
        ) : null,
        <Popconfirm
          key={'Delete'}
          title="请确认是否删除该接口!"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a
            key="Remove"
            style={{color: "red"}}
            onClick={async () => {
            }}
          >
            删除
          </a>
        </Popconfirm>,
        <a
          key="upload"
          onClick={async () => {
          }}
        >
          更新图片
        </a>
      ],
    },
  ];
  return (
    <Card>
      <ProTable<API.InterfaceInfo>
        headerTitle={'接口管理'}
        // actionRef={actionRef}
        rowKey="key"
        // loading={loading}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        pagination={{defaultPageSize: 10}}
        // request={async (params) => {
        //   const res = await listInterfaceInfoByPageUsingGET({...params});
        //   if (res.data) {
        //     return {
        //       data: res.data.records || [],
        //       success: true,
        //       total: res.data.total,
        //     };
        //   } else {
        //     return {
        //       data: [],
        //       success: false,
        //       total: 0,
        //     };
        //   }
        // }}
        columns={columns}
      />
    </Card>
  );
};
export default InterfaceInfoList;
