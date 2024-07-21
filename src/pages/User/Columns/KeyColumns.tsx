import {ProColumns} from '@ant-design/pro-components';
import {Input, Tag} from 'antd';

export const KeyStatusEnum: any = {
  '0': 'green',
  '1': 'red',
};
export const KeyColumns: ProColumns<API.KeyVO>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
    search: false
  },
  {
    title: '创建时间',
    width: '15%',
    align: 'center',
    dataIndex: 'createTime',
    valueType: 'text',
    ellipsis: true,
    key: 'createTime',
    search: false,
  },
  {
    title: 'AccessKey/SecretKey',
    width: '50%',
    align: 'left',
    dataIndex: 'keys',
    valueType: 'text',
    key: 'keys',
    copyable: true,
    ellipsis: true,
    render: (_, record) => (
      <div>
        <div>AK:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input style={{width: '60%'}} defaultValue={record.keys[0]} readOnly/>
        </div>
        <div>SK:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input style={{width: '60%'}} defaultValue={record.keys[1]} readOnly/>
        </div>
      </div>
    ),
  },
  {
    title: '状态',
    align: 'center',
    onFilter: true,
    dataIndex: 'status',
    key: 'status',
    valueEnum: {
      '0': {
        text: '启用',
      },
      '1': {
        text: '禁用',
      },
    },
    render: (_, record) => {
      const statusText = record.status === '0' ? '启用' : '禁用';
      return <Tag color={KeyStatusEnum[record.status ?? 'default']}>{statusText}</Tag>;
    },
    search: false
  },
]

export default KeyColumns;
