import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

interface SearchInputInterface {
  value: string
  setValue: any
  list: any | never
}

const Wrap = styled.div`
  background-color: transparent;
  border: none;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`

const SearchBox = styled.div`
  left: 0;
  border: none;
  position: relative;

  ul, li {
    border: none;
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: white;
    border: .1rem solid #EEE;
    border-radius: 1rem;
    max-height: 10rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  li {
    width: 100%;
    padding: .5rem 0;

    &:not(:first-child) {
      border-top: .1rem solid #EEE;
    }

    &:hover {
      background-color: #EFEFEF;
    }
  }
`

const Index = ({value, setValue, list}: SearchInputInterface) => {

  const [state, setState] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [searchList, setSearchList] = useState([])

  const handleChangeValue = (e: any) => {
    setState(e.target.value)
  }

  useEffect(() => {
    value && setState(value)
  }, [])

  useEffect(() => {
    list && setSearchList(list)
  }, [list])

  const wrapperRef = useOutsideClick(() => setIsShow(false));


  return <Wrap ref={wrapperRef}>
    <Input
      type={'text'}
      value={state}
      onChange={(e: any) => handleChangeValue(e)}
      onFocus={() => setIsShow(true)}
    />
    {
      isShow && <>
        <SearchBox>
          <ul>
            {
              searchList && searchList
                .filter((it: any) => it?.part_name.toUpperCase().indexOf(state.toUpperCase()) !== -1)
                .map((item: any, key: number) => {
                  return <li key={key} onClick={() => {
                    console.log(item?.part_name)
                    setState(item?.part_name)
                    setIsShow(false)
                    setValue && setValue(item?.part_name)
                  }
                  }> {item?.part_name} </li>
                })
            }

          </ul>
        </SearchBox>
      </>
    }
  </Wrap>
}

export default Index
