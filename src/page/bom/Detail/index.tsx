import { useParams } from "react-router-dom";
import AdminAction from "../../../store/action/adminAction";
import { Wrap, Table, MailWrap } from './Style';
import { useEffect, useState } from "react";

const firstKey = ['기구부', '제어부']
const secondKey = ['토출부', '공급부', '구동부', '기타 요소']
const thirdKey = ['토출 구분', '공급 구분', '구동 구분', '제어 구분']
const third = ['discharge', 'supply', 'application',  'robot']


const Index = () => {
  const { seq } = useParams();

  const [tableSpan, setTableSpan] = useState({
    first: [0],
    second: [0],
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [email, setEmail] = useState('')

  let rowIndex = 0;
  let targetRow = 0;
  const columns = 19;

  const [state, setState] = useState<any>({});
  const [price, setPrice] = useState([0,0,0,0,0]);

  const { getDetail } = AdminAction();

  useEffect(() => {
    seq && getDetail(seq, setState);
  }, [seq]);

  useEffect(() => {
    if (state?.survey) {
      const depth1 = {
        application: state?.survey.application,
        discharge: state?.survey.discharge,
        supply: state?.survey.supply,
      };


      const depth2 = {
        robot: state?.survey.robot,
      };

      setPrice([
        state?.survey.discharge.reduce((prev: number, next: any) => prev + next.single_amount, 0),
        state?.survey.supply.reduce((prev: number, next: any) => prev + next.single_amount, 0),
        state?.survey.application.reduce((prev: number, next: any) => prev + next.single_amount, 0),
        state?.survey.robot.reduce((prev: number, next: any) => prev + next.single_amount, 0),
      ])

      setTableSpan({
        first: [
          (Number(depth1.application.length) || 1) + 1 + Number(depth1.discharge.length) + 1 + Number(depth1.supply.length) + 1,
          2,
        ],
        second: [
          Number(depth1.discharge.length) + 1,
          Number(depth1.supply.length) + 1,
          (Number(depth1.application.length) || 1) + 1,
          2
        ],
      });
    }
  }, [state]);

  useEffect(() => {
    setTotalRows(tableSpan.first.reduce((acc, cur) => acc + cur, 0));
  }, [tableSpan]);

  useEffect(() => {
    if (tableSpan.first[0] > 0) setIsDrawing(true);
  }, [tableSpan]);

  return (
    <Wrap>
      <Table className="tg">
        <thead>
        <tr>
          <td colSpan={100}>장비구성 BOM</td>
        </tr>
        </thead>
        {isDrawing && (
          <tbody>
          {new Array(totalRows).fill(1).map((_, i) => {
            let firstTd = null;
            let secondTd = null;
            let isSecondTdFirstRender = false;
            let isSecondTdLastRender = false;

            let currentFirstIndex = tableSpan.first.findIndex((span, idx) => {
              const sum = tableSpan.first.slice(0, idx + 1).reduce((a, c) => a + c, 0);
              return rowIndex < sum;
            });

            let currentSecondIndex = tableSpan.second.findIndex((span, idx) => {
              const sum = tableSpan.second.slice(0, idx + 1).reduce((a, c) => a + c, 0);
              return rowIndex < sum;
            });

            // 첫 번째 행인지 확인
            if (rowIndex === (currentFirstIndex > 0 ? tableSpan.first.slice(0, currentFirstIndex).reduce((a, c) => a + c, 0) : 0)) {
              firstTd = <td className="dept1" rowSpan={tableSpan.first[currentFirstIndex]}>{firstKey[currentFirstIndex]}</td>;
            }

            // 첫 번째 행인지 확인
            if (rowIndex === (currentSecondIndex > 0 ? tableSpan.second.slice(0, currentSecondIndex).reduce((a, c) => a + c, 0) : 0)) {
              secondTd = <td className="dept2" rowSpan={tableSpan.second[currentSecondIndex]}>{secondKey[currentSecondIndex]}</td>;
              isSecondTdFirstRender = true;
              targetRow = rowIndex; // 이 행이 두 번째 td가 첫 번째로 렌더링되는 행
            }

            // 마지막 행인지 확인
            if (rowIndex === tableSpan.second.slice(0, currentSecondIndex + 1).reduce((a, c) => a + c, 0) - 1) {
              isSecondTdLastRender = true;
            }


            rowIndex++;

            return (
              <tr key={i}>
                {firstTd}
                {secondTd}
                {new Array(columns - 2).fill(1).map((_, j) => {
                  if (isSecondTdLastRender) {
                    if (j === 0) return <td className="bottom" colSpan={columns - 2} key={j}>메모</td>;
                    else return null;
                  } else {
                    switch (j) {
                      case 0:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? thirdKey[currentSecondIndex] : ''}</td>
                      case 1:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? state.survey[third[currentSecondIndex]][i - targetRow]?.category : ''}</td>
                      case 2:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '제품명' : ''}</td>
                      case 3:
                        return <td className="top" key={j}>{state.survey[third[currentSecondIndex]][i - targetRow]?.part_name}</td>
                      case 4:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '변경' : ''}</td>
                      case 5:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '▽' : ''}</td>
                      case 7:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '옵션' : ''}</td>
                      case 8:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '1' : ''}</td>
                      case 9:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? 'EA' : ''}</td>
                      case 10:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '+' : ''}</td>
                      case 11:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '-' : ''}</td>
                      case 13:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '단가' : ''}</td>
                      case 14:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? price[currentSecondIndex].toLocaleString('KO-KR') : ''}</td>
                      case 15:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '원' : ''}</td>
                      case 16:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? 'x' : ''}</td>
                      default:
                        return <td className="top" key={j} />
                    }
                  }
                })}
              </tr>
            );
          })}
          <tr className={'etcTr'}>
            <td className={'dept1'} rowSpan={5}>기타 비용</td>
            <td className={'dept2 top'}>SET-UP</td>
            <td className={'top'} colSpan={8}>필요 내역 직접 입력</td>
            <td className={'top'}>1</td>
            <td className={'top'}>EA</td>
            <td className={'top'}>+</td>
            <td className={'top'}>-</td>
            <td className={'top'} />
            <td className={'top'}>단가</td>
            <td className={'top'}>0</td>
            <td className={'top'}>원</td>
            <td className={'top'}>x</td>
          </tr>
          <tr className={'etcTr'}>
            <td className={'dept2 top'}>전장</td>
            <td className={'top'} colSpan={8}>필요 내역 직접 입력</td>
            <td className={'top'}>1</td>
            <td className={'top'}>EA</td>
            <td className={'top'}>+</td>
            <td className={'top'}>-</td>
            <td className={'top'} />
            <td className={'top'}>단가</td>
            <td className={'top'}>0</td>
            <td className={'top'}>원</td>
            <td className={'top'}>x</td>
          </tr>
          <tr className={'etcTr'}>
            <td className={'dept2 top'}>설계</td>
            <td className={'top'} colSpan={8}>필요 내역 직접 입력</td>
            <td className={'top'}>1</td>
            <td className={'top'}>EA</td>
            <td className={'top'}>+</td>
            <td className={'top'}>-</td>
            <td className={'top'} />
            <td className={'top'}>단가</td>
            <td className={'top'}>0</td>
            <td className={'top'}>원</td>
            <td className={'top'}>x</td>
          </tr>
          <tr className={'etcTr'}>
            <td className={'dept2 top'}>생산</td>
            <td className={'top'} colSpan={8}>필요 내역 직접 입력</td>
            <td className={'top'}>1</td>
            <td className={'top'}>EA</td>
            <td className={'top'}>+</td>
            <td className={'top'}>-</td>
            <td className={'top'} />
            <td className={'top'}>단가</td>
            <td className={'top'}>0</td>
            <td className={'top'}>원</td>
            <td className={'top'}>x</td>
          </tr>
          <tr className={'etcTr'}>
            <td className={'dept2 top'}>운송</td>
            <td className={'top'} colSpan={8}>필요 내역 직접 입력</td>
            <td className={'top'}>1</td>
            <td className={'top'}>EA</td>
            <td className={'top'}>+</td>
            <td className={'top'}>-</td>
            <td className={'top'} />
            <td className={'top'}>단가</td>
            <td className={'top'}>0</td>
            <td className={'top'}>원</td>
            <td className={'top'}>x</td>
          </tr>
          </tbody>
        )}
      </Table>

      <MailWrap>
        <input type={'text'} placeholder={'example@email.com'} value={email} onChange={(e: any) => setEmail(e.target.value)}/>
        <button>메일발송</button>
      </MailWrap>
    </Wrap>
  );
};

export default Index;
