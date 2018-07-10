import fetchData from 'Utils/fetch';
import apis from 'Modules/{{ moduleName }}/apis';
import { ReduckHelper } from 'Utils/helper';
import { message } from 'antd';

// ===========================> Action Types <=========================== //

export const SET_LIST = '/spa/{{ parentPath }}/{{ name }}/SET_LIST';

const Actions = {
  getList: arg =>
      ReduckHelper.genListAction(arg, fetchData, apis.{{ apisPoint }}{{ name }}.list, SET_LIST),
}

export default {
  namespace: '{{ name }}',

  state: {
    ...ReduckHelper.genListState('{{ name }}', { keywords: undefined }),
  },

  actions: {
    getList: Actions.getList,
    del: arg => (dispatch, getState) => {
      const { {{ name }}Page, {{ name }}Filter, {{ name }}List } = getState()['{{ statePoint }}.{{ name }}'];
      const current = Number({{ name }}Page.pageNo);
      const pageNo = current > 1 ? current - 1 : 1; 
      fetchData(apis.{{ apisPoint }}{{ name }}.del, arg).then((res) => {
        if (res.code !== 0) {
          message.error(res.errmsg);
        }
        if ({{ name }}List.length > 1) {
          dispatch(Actions.getList({{ name }}Filter))
        } else if ({{ name }}List.length === 1) {
          dispatch(Actions.getList({ ...{{ name }}Filter, pageNo }))
        }
      }).catch(() => ({ status: 'error' }))
    },
    save: arg => dispatch =>
      fetchData(arg.id ? apis.{{ apisPoint }}{{ name }}.update : apis.{{ apisPoint }}{{ name }}.save, arg).then(
        res => {
          if (res.code !== 0) {
            message.error(res.errmsg);
            return { status: 'error' };
          }
          return { status: 'success' };
        }
      ).catch(() => ({ status: 'error' })),
    detail: arg => dispatch =>
      fetchData(apis.{{ apisPoint }}{{ name }}.detail, arg).then(res => {
        if (res.code !== 0) {
          message.error(res.errmsg);
          return { status: 'error' };
        }
        return { status: 'success', result: res.data };
      }).catch(() => ({ status: 'error' })),
  },

  reducers: {
    [SET_LIST]: (state, action) => ReduckHelper.resolveListState('{{ name }}', state, action.payload),
  },

  children: [],
};
