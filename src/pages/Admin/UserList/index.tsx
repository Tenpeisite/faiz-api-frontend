import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Card, message, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import ModalForm from "@/pages/Admin/Components/ModalForm";

import UserColumns, {UserAddModalFormColumns, UserUpdateModalFormColumns} from "@/pages/Admin/Columns/UserColumns";
import {
  addUserUsingPost, banUserUsingPost,
  deleteUserUsingPost,
  listUserByPageUsingGet,
  normalUserUsingPost, updateUserAvatarUrlUsingPost,
  updateUserUsingPost
} from "@/services/qiApi-backend/userController";
import UploadModal from "@/components/UploadModal";


const UserList: React.FC = () => {

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
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [modalOpen, setModalOpen] = useState(false);


  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addUserUsingPost({
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
   * @zh-CN 解封
   *
   * @param record
   */
  const handleNormalUser = async (record: API.IdRequest) => {
    const hide = message.loading('解封中');
    if (!record) return true;
    try {
      const res = await normalUserUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('解封成功');
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
   * @zh-CN 封号
   *
   * @param record
   */
  const handleBanUser = async (record: API.IdRequest) => {
    const hide = message.loading('封号中');
    if (!record) return true;
    try {
      const res = await banUserUsingPost({
        id: record.id,
      });
      hide();
      if (res.data) {
        message.success('封号成功');
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
      const res = await updateUserAvatarUrlUsingPost(
        {
          id: currentRow?.id,
          userAvatar: url
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
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserUpdateRequest) => {
    const hide = message.loading('修改中');
    try {
      const res = await updateUserUsingPost({id: currentRow?.id, ...fields});
      if (res.data && res.code === 0) {
        hide();
        message.success('修改成功');
        setModalOpen(false);
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
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.UserVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      const res = await deleteUserUsingPost({
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
    await handleRemove(currentRow as API.UserVO);
  };

  const cancel = () => {
    message.success('取消成功');
  };

  const columns: ProColumns<API.UserVO>[] = [
    ...UserColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalOpen(true);
          }}
        >
          修改
        </a>,
        record.status === 1 ? (
          <a
            type="text"
            key="normal"
            onClick={() => {
              handleNormalUser(record);
            }}
          >
            解封
          </a>
        ) : null,
        record.status === 0 ? (
          <a
            style={{color: "red"}}
            type="text"
            key="ban"
            onClick={() => {
              handleBanUser(record);
            }}
          >
            封号
          </a>
        ) : null,
        <a
          key="upload"
          onClick={async () => {
            setCurrentRow(record);
            setModalOpen(true)
          }}
        >
          更新头像
        </a>,
        <Popconfirm
          key={'Delete'}
          title="请确认是否删除该用户!"
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
      ],
    },
  ];
  return (
    <Card>

      <ProTable<API.UserVO>
        headerTitle={'用户管理'}
        actionRef={actionRef}
        rowKey="user"
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
          const res = await listUserByPageUsingGet({...params});
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
        title={"添加用户"}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.UserVO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={UserAddModalFormColumns} width={"480px"}
        size={"large"}
      />
      <ModalForm
        title={"修改用户信息"}
        open={() => {
          return updateModalOpen;
        }}
        value={currentRow}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.UserVO);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={UserUpdateModalFormColumns} width={"480px"}
        size={"large"}
      />
      <UploadModal
        url={currentRow?.userAvatar}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        onSubmit={handleUpdateAvatar}
      />
    </Card>
  );
};
export default UserList;
