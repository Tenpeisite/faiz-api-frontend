import {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';
import {Tag} from 'antd';
import {NewRequestColumn, NewResponseColumn} from "@/components/ParamsTable/components/type";


export const AssistantRequestMethodEnum: any = {
  '0': 'red',
  '1': 'green',
  '2': 'orange',
  'default': 'red'
};

export const defaultNewRequestColumn: NewRequestColumn = {
  fieldName: '',
  required: "是",
  type: "string",
  desc: "",
}

export const defaultNewResponseColumn: NewResponseColumn = {
  fieldName: '',
  type: "string",
  desc: "",
}


export const AssistantModalFormColumns: ProFormColumnsType<API.Assistant, "text">[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
  },
  {
    title: '助手名称',
    dataIndex: 'name',
    valueType: 'text',
    key: 'name',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '接口名称为必填项',
        },
      ],
    },
    // width: 'lg',
  },
  {
    title: '一句话描述助手',
    key: "description",
    dataIndex: 'description',
    // width: 'lg',
    valueType: "text",
    formItemProps: {
      rules: [
        {
          required: true,
          message: '助手描述为必填项',
        },
      ],
    },
  },
  {
    title: '助手设定',
    dataIndex: 'prompt',
    key: 'prompt',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '助手设定为必填项',
        },
      ],
    },
    // width: 'lg',
    valueType: 'jsonCode',
    colProps: {
      span: 12,
    },
  },
  {
    title: '详细描述',
    key: "detail",
    dataIndex: 'detail',
    // width: 'lg',
    valueType: 'jsonCode',
    colProps: {
      span: 12,
    },
  },
  {
    title: '示例问题',
    dataIndex: 'exampleQuestion',
    key: 'exampleQuestion',
    valueType: 'jsonCode',
    colProps: {
      span: 12,
    },
  },
  {
    title: '示例回答',
    dataIndex: 'exampleAnswer',
    key: 'exampleAnswer',
    valueType: 'jsonCode',
    colProps: {
      span: 12,
    },
  },
  {
    title: '助手类型',
    dataIndex: 'type',
    key: 'type',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '助手类型为必填项',
        },
      ],
    },
    colProps: {
      span: 24,
    },
    valueEnum: {
      others: {
        text: '其他',
      },
      textCreation: {
        text: '文本创作',
      },
      practicalTools: {
        text: '实用工具',
      },
      domainExperts: {
        text: "领域专家"
      },
      famousFigures: {
        text: "知名人物"
      },
      interestRecommendation: {
        text: "兴趣推荐"
      },
      lifeGuide: {
        text: "生活指南"
      },
      entertainment: {
        text: "休闲娱乐"
      },
    }
  },
];


const AssistantColumns: ProColumns<API.Assistant>[] = [
  {
    title: '助手id',
    dataIndex: 'id',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    // hideInTable: true,
    key: 'id',
  },
  {
    title: '助手名称',
    dataIndex: 'name',
    copyable: true,
    valueType: 'text',
    ellipsis: true,
    key: 'name',
  },
  {
    title: '助手图片',
    dataIndex: 'avatar',
    valueType: 'image',
    // width: 80,
    key: 'avatar',
    hideInSearch: true
  },
  {
    title: '助手设定',
    dataIndex: 'prompt',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
    key: 'prompt',
  },
  {
    title: '描述',
    key: "description",
    dataIndex: 'description',
    ellipsis: true,
    // width: 'lg',
    valueType: "text",
  },
  {
    title: '示例问题',
    dataIndex: 'exampleQuestion',
    key: 'exampleQuestion',
    valueType: 'textarea',
    // width: 120,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '示例回答',
    dataIndex: 'exampleAnswer',
    key: 'exampleAnswer',
    valueType: 'textarea',
    // width: 120,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  // {
  //   title: '状态',
  //   filters: true,
  //   onFilter: true,
  //   width: 100,
  //   dataIndex: 'status',
  //   key: 'status',
  //   valueEnum: {
  //     0: {
  //       text: '审核中',
  //       status: 'Default',
  //     },
  //     2: {
  //       text: '已下线',
  //       status: 'Error',
  //     },
  //     1: {
  //       text: '已上线',
  //       status: 'Processing',
  //     },
  //   },
  // },
  {
    title: '状态',
    dataIndex: 'status',
    filters: true,
    // width: 100,
    onFilter: true,
    hideInSearch: true,
    valueType: 'text',
    key: 'status',
    render: (_, record) => {
      let statusText = '';
      switch (record.status) {
        case '0':
          statusText = '审核中';
          break;
        case '1':
          statusText = '通过';
          break;
        case '2':
          statusText = '未通过';
          break;
        default:
          statusText = '未知状态';
          break;
      }
      return <Tag color={AssistantRequestMethodEnum[record.status ?? 'default']}>{statusText}</Tag>;
    },
  },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updateTime',
  //   valueType: 'dateTime',
  //   key: 'updateTime',
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    key: 'createTime',
    search: false,
    hideInTable: true
  },
];

export default AssistantColumns;
