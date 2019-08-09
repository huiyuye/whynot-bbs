import axios from 'axios';
import { CHANGE_LIST } from "./constants";

//普通action
const changeList = list => ({
  type: CHANGE_LIST,
  list
});
//异步操作的action(采用thunk中间件)
export const getHomeList = () => {
  return (dispatch) => {
    return axios.get('/public/api/news.json')
      .then((res) => {
        const list = res.data.data;
        console.log(list)
        dispatch(changeList(list))
      });
  };
}