import { Layout, Menu, Button, theme, Input, Space, Flex } from 'antd';
import { useState } from 'react';
const { Header, Sider, Content } = Layout
function VerifierPanel() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const {TextArea} = Input
    return (
        <Layout style={{ padding: '12px' }}>
            <span style={{ marginLeft: '12px' }}>性质列表</span>
            <Layout style={{ padding: '12px' }}>
                <Content style={{
                    marginRight: 12,
                    padding: 24,
                    height: 200,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                </Content>
                <Sider theme='light' width='96px' style={{ margin: '20px' }}>
                    <Flex justify='center' vertical>
                        <Button>开始验证</Button>
                        <Button>Get Trace</Button>
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>备注</Button>
                    </Flex>

                </Sider>
            </Layout>
            <span style={{ marginLeft: '12px' }}>待验证性质</span>
            <Layout style={{ padding: '12px', marginRight:'12px'}}>
                <TextArea style={{
                    resize:'none',
                    height: 100,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                </TextArea>
            </Layout>
            <span style={{ marginLeft: '12px' }}>备注</span>
            <Layout style={{ padding: '12px', marginRight:'12px' }}>
                <TextArea style={{
                    resize:'none',
                    height: 100,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                </TextArea>
            </Layout>
            <span style={{ marginLeft: '12px' }}>验证进度与结果</span>
            <Layout style={{ padding: '12px' }}>
                <Content style={{
                    marginRight: 12,
                    padding: 24,
                    height: 100,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                </Content>
            </Layout>
        </Layout>
    )
}

export default VerifierPanel