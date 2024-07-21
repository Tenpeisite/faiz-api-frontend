import {
  message,
  Spin,
  Image
} from 'antd';
import React, {useEffect, useState} from 'react';

import {ProDescriptions} from '@ant-design/pro-components';
import ProCard from "@ant-design/pro-card";
import {getAssistantByIdUsingGet} from "@/services/qiApi-backend/assistantController";
import {useParams} from "@@/exports";

export const valueLength = (val: any) => {
  return val && val.trim().length > 0
}
const UserInfo1: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.AssistantVO>()

  const params = useParams()
  const loadData = async () => {
    if (!params.id) {
      message.error("参数不存在")
      return
    }
    setLoading(true)
    const res = await getAssistantByIdUsingGet({id: params.id})
    if (res.data && res.code === 0) {
      setData(res.data)

      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
      loadData()

    },
    [])


  return (
    <Spin spinning={loading}>
      <ProCard
        title={<strong>助手信息</strong>}
        type="inner"
        bordered
      >
        <ProDescriptions
          column={1}
        >
          <ProDescriptions.Item
            label="助手头像"
            valueType="avatar"
          >
            <img src={data?.avatar} style={{width: '100px', height: '100px', borderRadius: '50%'}} alt="头像"/>
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="助手id"
            copyable={true}
            valueType="textarea"
          >
            {valueLength(data?.id) ? data?.id : '无'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="助手名称"
            valueType="textarea"
          >
            {valueLength(data?.name) ? data?.name : '无名氏'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="助手类型"
            valueType="textarea"
          >
            {valueLength(data?.type) ? data?.type : '无名氏'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="助手描述"
            valueType="textarea"
          >
            {valueLength(data?.description) ? data?.description : '无'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="详细介绍"
            valueType="textarea"
          >
            {valueLength(data?.detail) ? data?.detail : '无'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="助手设定"
            valueType="textarea"
          >
            {valueLength(data?.prompt) ? data?.prompt : '无'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="示例问题"
            valueType="textarea"
          >
            {valueLength(data?.exampleQuestion) ? data?.exampleQuestion : '无'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="示例回答"
            valueType="textarea"
          >
            {valueLength(data?.exampleAnswer) ? data?.exampleAnswer : '无'}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="创建者"
            valueType="textarea"
          >
            {valueLength(data?.creatorName) ? data?.creatorName : '无名氏'}
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>
    </Spin>
  );
};

export default UserInfo1;
