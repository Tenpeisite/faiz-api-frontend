import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
    const defaultMessage = 'faiz';
    const currentYear = new Date().getFullYear();
    return (
        <DefaultFooter
            style={{
                background: 'none',
            }}
            copyright={`${currentYear} ${defaultMessage}`}
            links={[
                {
                    // key: 'Ant Design Pro',
                    title: '赣ICP备2022007945号-1',
                    href: 'https://beian.miit.gov.cn/',
                    blankTarget: true,
                },
                // {
                //     key: 'github',
                //     title: <GithubOutlined />,
                //     href: 'https://github.com/ichensw/',
                //     blankTarget: true,
                // },
                // {
                //     key: 'Ant Design',
                //     title: 'Ant Design',
                //     href: 'https://ant.design',
                //     blankTarget: true,
                // },
            ]}
        />
    );
};
export default Footer;
