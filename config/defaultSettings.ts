import {ProLayoutProps} from '@ant-design/pro-components';

// const Settings: ProLayoutProps & {
//   pwa?: boolean;
//   logo?: string;
//   navTheme?: string
// } = {
//   navTheme: 'light',
//   colorPrimary: "#1677FF",
//   layout: 'top',
//   contentWidth: 'Fluid',
//   fixedHeader: true,
//   fixSiderbar: true,
//   colorWeak: false,
//   splitMenus: false,
//   title: '基于Web的AI问答开放平台',
//   pwa: false,
//   // logo: 'https://img.qimuu.icu/typory/faiz.png',
//   iconfontUrl: 'https://img.qimuu.icu/typory/faiz.png',
// };

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  "navTheme": "light",
  "colorPrimary": "#1890ff",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "splitMenus": false,
  "siderMenuType": "group",
  title:'基于Web的AI问答开放平台',
  "pwa": true,
  "logo": "http://blog.tempeisite.xyz/2024/03/31/d6c8c7049b34419a97000fa6229c67d7.png"
}
export default Settings;
