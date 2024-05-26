import { useParams } from "react-router-dom";
import AdminAction from "../../../store/action/adminAction";
import { Wrap, Table, MailWrap, MemoInput} from './Style';
import { useEffect, useState } from "react";
import SearchInput from "../../../module/searchInput";

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
  const [list, setList] = useState<any>({
    application: [],
    discharge: [],
    supply: [],
    robot: [],
  })

  let rowIndex = 0;
  let targetRow = 0;
  const columns = 19;

  const [state, setState] = useState<any>({});
  const [price, setPrice] = useState([0,0,0,0,0]);

  const { getDetail, getItemList, saveBom } = AdminAction();

  const handleAppendRow = (key: string) => {
    setState((prevState:any) => {
      let temp = {...prevState}
      temp.survey[key].item.push({})
      return temp
    })
  }

  const handleSaveBom = () => {
    saveBom(state)
  }

  const handleUpdateState = (key: string, idx: number, partName: string) => {
    setState((prevState: any) => {
      let temp = { ...prevState };
      const item = list[key].filter((it: any) => it.part_name === partName)[0]
      try {
        temp.survey[key].item[idx] = item
      }catch (e){
        temp.survey[key].item.push(item)
      }
      // console.log(temp.survey[key].item[idx])
      return temp;
    });
  }

  const handleUpdateStateCnt = (key: string, idx: number, num: number) => {
    setState((prevState: any) => {
      let temp = { ...prevState };
      temp.survey[key].cnt = temp.survey[key].cnt + num < 0 ? 0 : temp.survey[key].cnt + num;
      return temp;
    });
  }

  const handleUpdateMemo = (e: any, key: string) => {
    setState((prevState: any) => {
      let temp = { ...prevState };
      temp.survey[key].memo = e.target.value
      return temp;
    });
  }

  const returnList = (currentSecondIndex: number) => {
    switch (currentSecondIndex) {
      case 0:
        return list.discharge
      case 1:
        return list.supply
      case 2:
        return list.application
      case 3:
        return list.robot
      default:
        return []
    }
  }

  useEffect(() => {
    seq && getDetail(seq, setState);
    getItemList(setList)
  }, [seq]);

  useEffect(() => {
    if (state?.survey) {

      console.log(state.survey)

      setPrice([
        state?.survey.discharge.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
        state?.survey.supply.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
        state?.survey.application.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
        state?.survey.robot.item.reduce((prev: number, next: any) => prev + next?.single_amount, 0),
      ])

      setTableSpan({
        first: [
          (Number(state?.survey.application.item.length) || 1) + 1 + Number(state?.survey.discharge.item.length) + 1 + Number(state?.survey.supply.item.length) + 1,
          2,
        ],
        second: [
          (Number(state?.survey.discharge.item.length) || 1) + 1,
          (Number(state?.survey.supply.item.length) || 1) + 1,
          (Number(state?.survey.application.item.length) || 1) + 1,
          (Number(state?.survey.robot.item.length) || 1) + 1,
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
            const idx = i - targetRow

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
                    if (j === 0) return <td className="bottom" colSpan={columns - 2} key={j}>
                      <MemoInput
                        type={'text'}
                        value={state.survey[third[currentSecondIndex]].memo || ''}
                        placeholder={'메모를 입력해 주세요'}
                        onChange={(e:any) => handleUpdateMemo(e, third[currentSecondIndex])}
                      />
                    </td>;
                    else return null;
                  } else {
                    switch (j) {
                      case 0:
                        return <td className="top" key={j}>
                          {isSecondTdFirstRender ? <button className={'dept3-add-btn'} onClick={() => {handleAppendRow(third[currentSecondIndex])}}>+</button> : null }
                          {isSecondTdFirstRender ? thirdKey[currentSecondIndex] : ''}
                        </td>
                      case 1:
                        return <td className="top" key={j}>
                          {isSecondTdFirstRender ? state.survey[third[currentSecondIndex]].item[i - targetRow]?.category : ''}
                        </td>
                      case 2:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '제품명' : ''}</td>
                      case 3:
                        return <td className="top" key={j}>
                          <SearchInput
                            value={state.survey[third[currentSecondIndex]].item[i - targetRow]?.part_name}
                            setValue={(name: string) => handleUpdateState(third[currentSecondIndex], idx, name)}
                            list={returnList(currentSecondIndex)}
                          />
                        </td>
                      case 4:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '변경' : ''}</td>
                      case 5:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '▽' : ''}</td>
                      case 7:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '옵션' : ''}</td>
                      case 8:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? state.survey[third[currentSecondIndex]].cnt : ''}</td>
                      case 9:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? 'EA' : ''}</td>
                      case 10:
                        return <td className="top" key={j} >
                          {isSecondTdFirstRender ? <button onClick={() => handleUpdateStateCnt(third[currentSecondIndex],i - targetRow, 1)}> + </button>
                            : ''}
                        </td>
                      case 11:
                        return <td className="top" key={j} >
                          {isSecondTdFirstRender ? <button onClick={() => handleUpdateStateCnt(third[currentSecondIndex],i - targetRow, -1)} >-</button> : ''}
                        </td>
                      case 13:
                        return <td className="top" key={j}>{isSecondTdFirstRender ? '단가' : ''}</td>
                      case 14:
                        // return <td className="top" key={j}>{isSecondTdFirstRender ? (price[currentSecondIndex] * state.survey[third[currentSecondIndex]].cnt).toLocaleString('KO-KR') : ''}</td>
                        return <td className="top" key={j}>{isSecondTdFirstRender ? (price[currentSecondIndex]).toLocaleString('KO-KR') : ''}</td>
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
        <button >메일발송</button>
        <button onClick={handleSaveBom}>저장</button>
      </MailWrap>
    </Wrap>
  );
};

export default Index;
