import styled from "styled-components";

const Styles = {
  DefaultLayoutWrap: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;
    height: 5rem;
    align-items: center;
    background-color: #1a1a26;
    padding: 0 5rem;
    font-size: 2rem;
    font-weight: bold;
    border-bottom: .1rem solid #eee;
    gap: 1rem;
    > p {
      font-size: 1.5rem;
      font-weight: normal;
      color: #aaa;
    }
  `,
  HeaderWrap: styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    >div{
      color: white;
      font-size: 1.3rem;
    }
  `,
  ContentWrap: styled.div`
    display: flex;
    flex: 1;
    background-color: #eee6e6;
    padding: 5rem 3rem;
  `,
  Content: styled.div`
    flex: 1;
    background-color: #fff;
    border-radius: 1rem;
    padding: 2rem;
  `
}

export default Styles
