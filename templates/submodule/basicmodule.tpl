import fetchData from 'Utils/fetch';
import apis from 'Modules/{{ moduleName }}/apis';
import { message } from 'antd';
import { createAction } from '@dx-groups/arthur/index';
import { SHOW_LIST_SPIN } from 'Global/module';

// ===========================> Action Types <=========================== //

export const SET_DATA = '/spa/{{ parentPath }}/{{ name }}/SET_DATA';

export default {
  namespace: '{{ name }}',

  state: {
    <key>: <value>,
  },

  actions: {
    getData() {
      return dispatch => {
        fetchData(dispatch, SHOW_LIST_SPIN)(apis.{{ apisPoint }}{{ name }}).then(res => {
          if (res.code === 0) {
            dispatch(createAction(SET_DATA)(res.data));
          } else {
            message.error(res.errmsg);
          }
        });
      };
    },
  },

  reducers: {
    // eslint-disable-next-line
    [SET_DATA]: (state, { payload }) => {
      return {
        ...state,
        <key>: payload,
      };
    },
  },

  children: [],
};
