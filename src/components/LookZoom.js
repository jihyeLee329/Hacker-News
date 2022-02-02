import {useState, useEffect} from 'react'
import {getData} from '../API/HNApi'
import styled from 'styled-components';
import useIsMount from "./useIsMount";

const List = styled.div`
& +& {margin-top:12px;}
width:calc(100vw - 40px); 
margin:0 auto;
box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
border-radius: 16px;
padding:16px 16px 0; background:#fff;
  .list_title{
    font-size:18px; line-height:24px;
    padding-bottom:12px; 
  }
  >div:not(.list_title) {
    border-top: 1px solid #F0F0F6;
    padding-top:8px; padding-bottom:12px; display:flex; justify-content:space-between; font-size:12px; line-height:16px;}
  .userId{color:#767676; line-height:inherit; font-size:inherit; width:35%;
    &:after{content:url(/img/ic_arrow.svg); display:inline-block; vertical-align:top;}
  }
  .listInfo{line-height:inherit; font-size:inherit; width:74%; text-align:right;
    span{display:inline-block; vertical-align:top;}
    span:before {display:inline-block; vertical-align:top; margin-right:3px;}
    .listComments{color:#FF6600; margin-left:8px;
      &:before {content:url(/img/ic_comment.svg);}
      }
  }
  .listPoint{color:#505050;
    &:before{content:url(/img/ic_point.svg);
  }
  `;

function LookZoom({id, listName}) {
    const [listId, setListId] = useState({});
    const [idUrl ,setIdUrl] = useState("");
    const isMount = useIsMount();

    useEffect(() => {
      if (isMount.current) {
        getData(id).then((data) => data && setListId(data));
        setIdUrl(`https://news.ycombinator.com/item?id=${id}`);
      }
    }, [isMount]);



  return (
    <List>
      <div className='list_title'><a href={idUrl} target="_blank">{listId.title}</a></div>
      {listName === 'jobs' ? null :
      <div>
        <p className='userId'>{listId.by}</p>
         <div className='listInfo'>
          <a href={idUrl} target="_blank">
            <span className='listPoint'>{listId.score}</span>
            <span className='listComments'>{listId.descendants? listId.descendants : 0}</span>
          </a>
        </div>
      </div>
       }
    </List>
  ) 
}

export default LookZoom;
