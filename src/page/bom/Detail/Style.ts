import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: .9rem;
  border: 1px solid #000;

  thead{
    tr {
      td {
        border: 1px solid #000;
        font-size: 1.3rem;
      }
    }
  }
  td.top {
    border-top: 1px solid #000;
  }


  tr:nth-child(2n) {
    td.top {
      background-color: #FFF;
    }
  }

  tr:nth-child(2n - 1) {
    td.top {
      background-color: #F9f9f9;
    }
  }

  td {
    min-width: 1rem;
    padding: .5rem 0;
  }

  * {
    text-align: center;
    border: 1px solid #eee;
  }

  td.dept1 {
    border: 1px solid #000;
    background-color: #f3f3fe;
  }

  td.dept2 {
    border: 1px solid #000;
    background-color: white;
  }

  tr {
    border: 1px solid #000;

    td:last-child {
      border-right: 1px solid #000;
      //background-color: white;
    }
    
  }
  
  tr:last-child {
    td{
      border-bottom: 1px solid #000;
    }
  }


  td.bottom {
    background-color: #e6e6e6;
    border-bottom: 1px solid #000;
    text-align: left;
    color: #aaa;
    padding-left: 1rem;
    font-size: .8rem;
  }
`

const MailWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  float: right;
  gap: 1rem;
  > input {
    padding: .3rem 1rem;
    min-width: 10rem;
    border-radius: .5rem;
    outline: none;
    stroke: none;
    border: 1px solid #000;
  }
  > button {
    background-color: #452df8;
    color: white;
    font-size: 1rem;
    padding: .3rem 1.5rem;
    border-radius: .5rem;
    
  }
`

export {
  Wrap,
  Table,
  MailWrap
}
