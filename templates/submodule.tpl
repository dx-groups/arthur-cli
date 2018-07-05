import fetchData from 'Utils/fetch';
import apis from 'Modules/{{ parentName }}/apis';
import { ReduckHelper } from 'Utils/helper';
import { message } from 'antd';

// ===========================> Action Types <=========================== //

export const SET_LIST = '/spa/{{ parentName }}/{{ name }}/SET_LIST'; // 商品中心

export default {
  namespace: '{{ name }}',

  state: {
    ...ReduckHelper.genListState('{{ name }}', { keywords: undefined }), // 搜索项配置
  },

  actions: {
    getList: arg =>
      ReduckHelper.genListAction(arg, fetchData, apis.{{ parentName }}.{{ name }}.list, SET_LIST),
    del: arg => dispatch =>
      fetchData(apis.{{ parentName }}.{{ name }}.del, arg).then(res => {
        if (res.code !== 0) {
          message.error(res.errmsg);
          return { status: 'error' };
        }
        return { status: 'success' };
      }),
    save: arg => dispatch =>
      fetchData(arg.id ? apis.{{ parentName }}.{{ name }}.update : apis.{{ parentName }}.{{ name }}.save, arg).then(
        res => {
          if (res.code !== 0) {
            message.error(res.errmsg);
            return { status: 'error' };
          }
          return { status: 'success' };
        }
      ),
    detail: arg => dispatch =>
      fetchData(apis.{{ parentName }}.{{ name }}.detail, arg).then(res => {
        if (res.code !== 0) {
          message.error(res.errmsg);
          return { status: 'error' };
        }
        return { status: 'success', result: res.data };
      }),
  },

  reducers: {
    [SET_LIST]: (state, action) => ReduckHelper.resolveListState('{{ name }}', state, action.payload),
  },

  children: [],
};
