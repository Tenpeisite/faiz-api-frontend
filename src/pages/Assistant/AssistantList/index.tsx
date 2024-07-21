import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Card, message, Popconfirm} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import ModalForm from "@/pages/Admin/Components/ModalForm";
import UploadModal from "@/components/UploadModal";
import {
  addAssistantUsingPost, deleteAssistantUsingPost, listAssistantByPageUsingGet, offlineAssistantUsingPost,
  onlineAssistantUsingPost,
  updateAssistantAvatarUrlUsingPost, updateAssistantUsingPost
} from "@/services/qiApi-backend/assistantController";
import AssistantColumns, {AssistantModalFormColumns} from "@/pages/Admin/Columns/AssistantColumns";
import {useModel} from "@@/exports";
import {getLoginUserUsingGet} from "@/services/qiApi-backend/userController";
import Settings from "../../../../config/defaultSettings";

const AssistantList: React.FC = () => {

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.Assistant>();
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loginUser} = initialState || {}
  const [role, setUserRole] = useState<string | undefined>('');

  const loadData = async () => {
    setLoading(true)
    const res = await getLoginUserUsingGet();
    if (res.data && res.code === 0) {
      if (initialState?.settings.navTheme === "light") {
        setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "light"}})
      } else {
        setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "realDark"}})
      }
      setUserRole(loginUser?.userRole)
      setLoading(false)
    }
  }

  useEffect(() => {
      loadData()

    },
    [])

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.AssistantAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addAssistantUsingPost({
        ...fields,
      });
      if (res.data && res.code === 0) {
        hide();
        message.success('添加成功');
        return true;
      }
    } catch (error: any) {
      hide();
      message.error('添加失败! ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.AssistantUpdateRequest) => {
    const hide = message.loading('修改中');
    try {
      if (fields) {
        const res = await updateAssistantUsingPost({id: currentRow?.id, ...fields});
        if (res.data && res.code === 0) {
          hide();
          message.success('修改成功');
          return true;
        }
      }

    } catch (error: any) {
      hide();
      message.error('修改失败' + error.message);
      return false;
    }
  };


  /**
   * @en-US Update node
   * @zh-CN 更新接口图片
   *
   */
  const handleUpdateAvatar = async (url: string) => {
    if (!url) {
      message.warning('请选择图片！');
      return;
    }
    const hide = message.loading('修改中');
    try {
      const res = await updateAssistantAvatarUrlUsingPost(
        {
          id: currentRow?.id,
          avatar: url
        }
      );
      if (res.data && res.code === 0) {
        hide();
        message.success('修改成功');
        setModalOpen(false);
        actionRef.current?.reload()
        return true;
      }
    } catch (error: any) {
      hide();
      message.error('修改失败' + error.message);
      setModalOpen(false);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 发布
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      const res = await onlineAssistantUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('发布成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  const handleChangeStatus = async (record: API.AssistantUpdateRequest) => {
    const hide = message.loading('修改中');
    if (!record) return true;
    try {
      const res = await updateAssistantUsingPost({
        id: record.id,
        status:'0'
      });
      hide();
      if (res.data) {
        message.success('修改成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 下线
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      const res = await offlineAssistantUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('下线成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.Assistant) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await deleteAssistantUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('删除成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败', error.message);
      return false;
    }
  };

  const confirm = async () => {
    await handleRemove(currentRow as API.Assistant);
  };

  const cancel = () => {
    message.success('取消成功');
  };

  const columns: ProColumns<API.Assistant>[] = [
    ...AssistantColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="SUCCESS"
          onClick={() => {
            location.href = `/assistant/info/${record.id}`
          }}
        >
          查看
        </a>,
        <a
          key="update"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalOpen(true);
          }}
        >
          修改
        </a>,
        role === 'admin' && record.status === '0' ? (
          <a
            type="text"
            key="auditing"
            onClick={() => {
              handleOnline(record);
            }}
          >
            审核通过
          </a>
        ) : null,
        role === 'admin' && record.status === '0' ? (
          <a
            type="text"
            key="offline"
            style={{color: "red"}}
            onClick={() => {
              handleOffline(record);
            }}
          >
            审核不通过
          </a>
        ) : null,
        role === 'admin' && record.status === '2' ? (
          <a
            type="text"
            key="online"
            onClick={() => {
              handleOnline(record);
            }}
          >
            审核通过
          </a>
        ) : null,
        role !== 'admin' && record.status === '2' ? (
          <a
            type="text"
            key="online"
            onClick={() => {
              handleChangeStatus(record);
            }}
          >
            再次送审
          </a>
        ) : null,
        role === 'admin' && record.status === '1' ? (
          <a
            type="text"
            key="offline"
            style={{color: "red"}}
            onClick={() => {
              handleOffline(record);
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
              setCurrentRow(record);
            }}
          >
            删除
          </a>
        </Popconfirm>,
        <a
          key="upload"
          onClick={async () => {
            setCurrentRow(record);
            setModalOpen(true)
          }}
        >
          更新图片
        </a>
      ],
    },
  ];
  return (
    <Card>
      <ProTable<API.Assistant>
        headerTitle={'助手管理'}
        actionRef={actionRef}
        rowKey="key"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        pagination={{defaultPageSize: 10}}
        request={async (params) => {
          setLoading(true)
          const res = await listAssistantByPageUsingGet({...params});
          if (res.data) {
            setLoading(false)
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
      <ModalForm
        title={"添加助手"}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.AssistantAddRequest);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={AssistantModalFormColumns} width={"840px"}
      />
      <ModalForm
        title={"修改助手"}
        open={() => {
          return updateModalOpen;
        }}
        value={currentRow}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.AssistantUpdateRequest);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={AssistantModalFormColumns} width={"840px"}
      />
      <UploadModal
        url={currentRow?.avatar}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        onSubmit={handleUpdateAvatar}
      />
    </Card>
  );
};
export default AssistantList;
