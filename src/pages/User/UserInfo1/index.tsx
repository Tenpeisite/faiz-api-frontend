import {useModel} from '@umijs/max';
import {
  Button,
  Descriptions,
  message,
  Modal,
  Spin,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps
} from 'antd';
import React, {useEffect, useState} from 'react';
import {RcFile} from "antd/es/upload";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

import Settings from '../../../../config/defaultSettings';
import Paragraph from "antd/lib/typography/Paragraph";
import ProCard from "@ant-design/pro-card";
import {requestConfig} from "@/requestConfig";
import SendGiftModal from "@/components/Gift/SendGift";
import EmailModal from "@/components/EmailModal";
import {
  getLoginUserUsingGet,
  updateUserUsingPost,
  userBindEmailUsingPost,
  userUnBindEmailUsingPost
} from "@/services/qiApi-backend/userController";

export const valueLength = (val: any) => {
  return val && val.trim().length > 0
}
const UserInfo1: React.FC = () => {
  const unloadFileTypeList = ["image/jpeg", "image/jpg", "image/svg", "image/png", "image/webp", "image/jfif"]
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loginUser} = initialState || {}
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const [userName, setUserName] = useState<string | undefined>('');
  const [gender, setGender] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);


  const loadData = async () => {
    setLoading(true)
    const res = await getLoginUserUsingGet();
    if (res.data && res.code === 0) {
      if (initialState?.settings.navTheme === "light") {
        setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "light"}})
      } else {
        setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "realDark"}})
      }
      const updatedFileList = [...fileList];
      if (loginUser && loginUser.userAvatar) {
        updatedFileList[0] = {
          // @ts-ignore
          uid: loginUser?.userAccount,
          // @ts-ignore
          name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
          status: "done",
          percent: 100,
          url: loginUser?.userAvatar
        }
        setFileList(updatedFileList);
      }
      setUserName(loginUser?.userName)
      setGender(loginUser?.gender)
      setLoading(false)
    }
  }

  useEffect(() => {
      loadData()

    },
    [])

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('-') + 1));
  };

  const uploadButton = () => {
    return (
      <div>
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );
  }

  const beforeUpload = async (file: RcFile) => {
    const fileType = unloadFileTypeList.includes(file.type)
    if (!fileType) {
      message.error('图片类型有误,请上传jpg/png/svg/jpeg/webp格式!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('文件大小不能超过 1M !');
    }
    if (!isLt2M && !fileType) {
      const updatedFileList = [...fileList];
      updatedFileList[0] = {
        // @ts-ignore
        uid: loginUser?.userAccount,
        // @ts-ignore
        name: "error",
        status: "error",
        percent: 100
      }
      setFileList(updatedFileList);
      return false
    }
    return fileType && isLt2M;
  };


  const updateUserInfo1 = async () => {
    let avatarUrl = ''
    if (fileList && fileList[0] && valueLength(fileList[0].url)) {
      // @ts-ignore
      avatarUrl = fileList[0].url
    }
    const res = await updateUserUsingPost({
      // @ts-ignore
      userAvatar: avatarUrl,
      id: loginUser?.id,
      userName: userName,
      gender: gender
    })
    if (res.data && res.code === 0) {
      setInitialState({loginUser: res.data, settings: Settings})
      message.success(`信息更新成功`);
    }
  }

  const props: UploadProps = {
    name: 'file',
    withCredentials: true,
    action: `${requestConfig.baseURL}api/file/upload?biz=user_avatar`,
    onChange: async function ({file, fileList: newFileList}) {
      const {response} = file;
      if (file.response && response.data) {
        const {data: {status, url}} = response
        const updatedFileList = [...fileList];
        if (response.code !== 0 || status === 'error') {
          message.error(response.message);
          file.status = "error"
          updatedFileList[0] = {
            // @ts-ignore
            uid: loginUser?.userAccount,
            // @ts-ignore
            name: loginUser?.userAvatar ? loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1) : "error",
            status: "error",
            percent: 100
          }
          setFileList(updatedFileList);
          return
        }
        file.status = status
        updatedFileList[0] = {
          // @ts-ignore
          uid: loginUser?.userAccount,
          // @ts-ignore
          name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
          status: status,
          url: url,
          percent: 100
        }
        setFileList(updatedFileList);
      } else {
        setFileList(newFileList);
      }
    },
    listType: "picture-circle",
    onPreview: handlePreview,
    fileList: fileList,
    beforeUpload: beforeUpload,
    maxCount: 1,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const handleBindEmailSubmit = async (values: API.UserBindEmailRequest) => {
    try {
      // 绑定邮箱
      const res = await userBindEmailUsingPost({
        ...values,
      });
      if (res.data && res.code === 0) {
        if (initialState?.settings.navTheme === "light") {
          setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "light"}})
        } else {
          setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "realDark"}})
        }
        setOpenEmailModal(false)
        message.success('绑定成功');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '操作失败！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const handleUnBindEmailSubmit = async (values: API.UserUnBindEmailRequest) => {
    try {
      // 绑定邮箱
      const res = await userUnBindEmailUsingPost({...values});
      if (res.data && res.code === 0) {
        if (initialState?.settings.navTheme === "light") {
          setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "light"}})
        } else {
          setInitialState({loginUser: res.data, settings: {...Settings, navTheme: "realDark"}})
        }
        setOpenEmailModal(false)
        message.success('解绑成功');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '操作失败！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <Spin spinning={loading}>
      <ProCard
        extra={
          <>
            <Tooltip title={"更新邮箱"}>
              <Button onClick={() => {
                setOpenEmailModal(true)
              }
              }>{loginUser?.email ? '更新邮箱' : "绑定邮箱"}</Button>
            </Tooltip>
            <Tooltip title={"提交修改的信息"}>
              <Button style={{marginLeft: 10}} onClick={updateUserInfo1}>提交修改</Button>
            </Tooltip>
          </>
        }
        title={<strong>个人信息</strong>}
        type="inner"
        bordered
      >
        <Descriptions.Item>
          <ImgCrop
            rotationSlider
            quality={1}
            aspectSlider
            maxZoom={4}
            cropShape={"round"}
            zoomSlider
            showReset
          >
            <Upload {...props}>
              {fileList.length >= 1 ? undefined : uploadButton()}
            </Upload>
          </ImgCrop>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
        </Descriptions.Item>
        <Descriptions column={2}>
          <div>
            <h4>昵称：</h4>
            <Paragraph
              editable={
                {
                  icon: <EditOutlined/>,
                  tooltip: '编辑',
                  onChange: (value) => {
                    setUserName(value)
                  }
                }
              }
            >
              {valueLength(userName) ? userName : '无名氏'}
            </Paragraph>
          </div>
          <div>
            <h4>性别：</h4>
            <Paragraph
              editable={
                {
                  icon: <EditOutlined/>,
                  tooltip: '编辑',
                  onChange: (value) => {
                    setGender(value)
                  }
                }
              }
            >
              {valueLength(gender) ? gender : '无'}
            </Paragraph>
          </div>
          <div>
            <h4>角色：</h4>
            <Paragraph
              copyable={valueLength(loginUser?.userRole)}
            >
              {loginUser?.userRole}
            </Paragraph>
          </div>
          <div>
            <Tooltip title={"邀请好友注册双方都可获得100积分"}>
              <h4>我的邀请码：</h4>
            </Tooltip>
            <Paragraph
              copyable={valueLength(loginUser?.invitationCode)}
            >
              {loginUser?.invitationCode}
            </Paragraph>
          </div>
          <div>
            <h4>我的id：</h4>
            <Paragraph
              copyable={valueLength(loginUser?.id)}
            >
              {loginUser?.id}
            </Paragraph>
          </div>
          <div>
            <h4>我的邮箱：</h4>
            <Paragraph
              copyable={valueLength(loginUser?.email)}
            >
              {valueLength(loginUser?.email) ? loginUser?.email : '未绑定邮箱'}
            </Paragraph>
          </div>
        </Descriptions>
      </ProCard>
      <SendGiftModal invitationCode={loginUser?.invitationCode} onCancel={() => {
        setOpen(false)
      }} open={open}/>
      <EmailModal unbindSubmit={handleUnBindEmailSubmit} bindSubmit={handleBindEmailSubmit} data={loginUser}
                  onCancel={() => setOpenEmailModal(false)}
                  open={openEmailModal}/>
    </Spin>
  );
};

export default UserInfo1;
