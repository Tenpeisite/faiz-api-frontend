import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Card, Flex, List, Tag, Spin} from "antd";
import Search from "antd/es/input/Search";
import {history} from "@umijs/max";
import {
  listAssistantBySearchTextPageUsingGet
} from "@/services/qiApi-backend/assistantController";
import {Meta} from "antd/es/list/Item";


const InterfaceSquare: React.FC = () => {
  const [data, setData] = useState<API.Assistant[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [total, setTotal] = useState<number>();
  const [pageSize] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);

  const tagsData = [
    {name: '', description: '全部'},
    {name: 'textCreation', description: '文本创作'},
    {name: 'practicalTools', description: '实用工具'},
    {name: 'domainExperts', description: '领域专家'},
    {name: 'famousFigures', description: '知名人物'},
    {name: 'interestRecommendation', description: '兴趣推荐'},
    {name: 'lifeGuide', description: '生活指南'},
    {name: 'entertainment', description: '休闲娱乐'},
    {name: 'others', description: '其他'},
  ];
  const [selectedTag, setSelectedTag] = React.useState<string>('');


  const loadData = async (current = 1) => {
    console.log(1)
    setLoading(true)
    const res = await listAssistantBySearchTextPageUsingGet({
      current: current,
      pageSize: pageSize,
      description: searchText,
      type:selectedTag
    });
    if (res.code === 0 && res.data) {
      setData(res?.data?.records || []);
      setTotal(res.data.total)
      setLoading(false)
    } else {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedTag]);

  const handleChange = async (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTag(tag);
      // 在这里立即打印 selectedTag 的值
      console.log(tag);
    } else {
      setSelectedTag('');
    }
    const res = await listAssistantBySearchTextPageUsingGet({
      current: 1,
      searchText: searchText,
      type: tag
    });
    if (res.data) {
      setData(res?.data?.records || []);
      setTotal(res?.data?.total || 0)
    }
  };

  const onSearch = async () => {
    const res = await listAssistantBySearchTextPageUsingGet({
      current: 1,
      searchText: searchText,
      type: selectedTag
    });
    if (res.data) {
      setData(res?.data?.records || []);
      setTotal(res?.data?.total || 0)
    }
  };

  return (
    <>
      <Card hoverable>
        <ProCard layout="center">
          <Search
            showCount
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            allowClear
            size={"large"}
            maxLength={50}
            enterButton="搜索"
            placeholder={"没有找到心仪的助手？快搜索一下吧"}
            onSearch={onSearch}
            style={{maxWidth: 600, height: 60}}/>
        </ProCard>
        <ProCard layout="center">
          <Flex gap={4} wrap align="center">
            <span style={{fontSize: '16px'}}>分类:</span>
            {tagsData.map((tagObj) => (
              <Tag.CheckableTag
                key={tagObj.name}
                checked={selectedTag === tagObj.name}
                onChange={(checked) => handleChange(tagObj.name, checked)}
                style={{fontSize: '16px'}} // 设置标签文字的字体大小为16px
              >
                {tagObj.description}
              </Tag.CheckableTag>
            ))}
          </Flex>
        </ProCard>
      </Card>
      <br/>
      <br/>
      <Spin spinning={loading}>
        <List
          pagination={{
            onChange: (page) => {
              loadData(page)
            },
            pageSize: pageSize,
            total: total
          }}
          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 4
          }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                key={index} bordered hoverable style={{width: 250}}
                onClick={() => {
                  history.push(`/assistant/info/${item.id}`)
                }}
                cover={<img
                  alt={item.name}
                  src={item?.avatar ?? "http://blog.tempeisite.xyz/2024/02/18/cd7e282a00d340d7869998e6e85266ba.jpg"}
                />}
              >
                <Meta title={item.name} description={item.description} style={{textAlign: "center"}}/>
              </Card>

            </List.Item>
          )}
        />
      </Spin>
    </>
  )
};

export default InterfaceSquare;
