import {Area, Column} from '@ant-design/plots';
import {Col, Progress, Row} from 'antd';
import numeral from 'numeral';
import {useEffect, useState} from 'react';
import type {DataItem} from '../data.d';
import useStyles from '../style.style';
import {ChartCard, Field} from './Charts';
import Trend from './Trend';
import {getIntroduceRowUsingGet} from "@/services/qiApi-backend/analysisController";

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};
const IntroduceRow = ({loading, visitData}: { loading: boolean; visitData: DataItem[] }) => {
  const {styles} = useStyles();
  const [introduceRow, setIntroduceRow] = useState<API.IntroduceRowVO>();
  const [dayOverDayFlag, setDayOverDayFlag] = useState<string>('');
  const [weekOverWeekFlag, setWeekOverWeekFlag] = useState<string>('');

  const onload = async () => {
    // 发起请求
    const resIntroduceRow = await getIntroduceRowUsingGet();
    if (resIntroduceRow && resIntroduceRow.code === 0) {
      if (resIntroduceRow.data.dayOverDay === null) {
        setDayOverDayFlag('');
        resIntroduceRow.data.dayOverDay = "无对比数据";
      } else {
        if (resIntroduceRow.data.dayOverDay[0] === "-") {
          resIntroduceRow.data.dayOverDay = resIntroduceRow.data.dayOverDay.substring(1);
          setDayOverDayFlag('down');
        } else {
          setDayOverDayFlag('up');
        }
      }
      if (resIntroduceRow.data.weekOverWeek === null) {
        setWeekOverWeekFlag('');
        resIntroduceRow.data.weekOverWeek = "无对比数据";
      } else {
        if (resIntroduceRow.data.weekOverWeek[0] === '-') {
          resIntroduceRow.data.weekOverWeek = resIntroduceRow.data.weekOverWeek.substring(1);
          setWeekOverWeekFlag('down');
        } else {
          setWeekOverWeekFlag('up');
        }
      }
      setIntroduceRow(resIntroduceRow.data);
    }
  };
  useEffect(() => {
    onload();
  }, []);
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="收入总额"
          loading={loading}
          total={() => <>{introduceRow?.sucessTotalAmount / 100}</>}
          contentHeight={46}
        >
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="支付笔数"
          loading={loading}
          total={numeral(introduceRow?.successPayCount).format('0,0')}
          contentHeight={46}
        >
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="总调用次数"
          loading={loading}
          total={numeral(introduceRow?.interfaceInfoCount).format('0,0')}
          contentHeight={46}
        >
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="访问量"
          loading={loading}
          total={numeral(introduceRow?.userCount).format('0,0')}
          contentHeight={46}
        >
        </ChartCard>
      </Col>
    </Row>
  );
};
export default IntroduceRow;
