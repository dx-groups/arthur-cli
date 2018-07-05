import React, { Component } from 'react';
import { connect } from '@dx-groups/arthur';
import { genPagination, genPlanColumn, genSelectColumn, genEllipsisColumn } from 'Utils/helper';
import { Table, Popconfirm, Button } from 'antd';
import Filter from 'Components/Filter';
import Module from './module';

const options = [{ name: '是', value: '0' }, { name: '否', value: '1' }];

@connect(
  ['{{ parentName }}.{{ name }}', 'common.showListSpin'],
  state => ({
    ...state['{{ parentName }}.{{ name }}'],
    page: state['{{ parentName }}.{{ name }}'].{{ name }}Page,
    filter: state['{{ parentName }}.{{ name }}'].{{ name }}Filter,
    list: state['{{ parentName }}.{{ name }}'].{{ name }}List,
    showListSpin: state['common.showListSpin'],
  })
)
export default class {{ className }} extends Component {
  _columns = [
    genPlanColumn('id', 'id'),
    genEllipsisColumn('ellipsis', 'ellipsis', 20),
    genSelectColumn('select', 'select', options),
    genPlanColumn('option', '操作', {
      render: (text, row) => (
        <div>
          <Popconfirm
            placement="rightBottom"
            title="删除后将不可恢复，是否继续此操作？"
            onConfirm={() => this._handleDelete(row.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small">删除</Button>
          </Popconfirm>
          <Button size="small">编辑</Button>
          <Button size="small">查看</Button>
        </div>
      ),
    }),
  ];

  componentWillMount() {
    const { dispatch, filter } = this.props;
    dispatch(Module.actions.getList({ pageNo: 1, pageSize: filter.pageSize }));
  }

  // 搜索表单
  _genFilterFields = () => {
    const { filter } = this.props;
    const fields = [
      {
        key: 'keywords',
        label: 'keywords',
        initialValue: filter.keywords || undefined,
        type: 'Input',
      },
    ];
    return fields;
  };

  // 整合搜索
  _genFilter = (
    pageNo = this.props.page.pageNo,
    pageSize = this.props.page.pageSize,
    params = {}
  ) => {
    const { filter } = this.props;
    const finalFilter = { ...filter, ...params, pageNo, pageSize };
    return finalFilter;
  };

  // 搜索
  _handleSearch = searchData => {
    const { page, dispatch } = this.props;
    const finalFilter = this._genFilter(1, page.pageSize, searchData);
    dispatch(Module.actions.getList(finalFilter));
  };

  // 翻页
  _handlePageChange = pagination => {
    const { filter, page, dispatch } = this.props;
    const { current, pageSize } = pagination;
    const finalFilter = {
      ...filter,
      pageNo: page.pageSize !== pageSize ? 1 : current,
      pageSize,
    };
    dispatch(Module.actions.getList(finalFilter));
  };

  // 删除
  _handleDelete = id => {
    const { filter, list, page, dispatch } = this.props;
    const current = Number(page.pageNo);
    const pageNo = current > 1 ? current - 1 : 1;
    dispatch(Module.actions.del({ id })).then(res => {
      if (res.status === 'success') {
        if (list.length > 1) {
          dispatch(Module.actions.getList(filter));
        } else if (list.length === 1) {
          dispatch(Module.actions.getList({ ...filter, pageNo }));
        }
      }
    });
  };

  render() {
    const { page, list, showListSpin } = this.props;
    const pagination = genPagination({ ...page });
    const fields = this._genFilterFields();
    return (
      <div>
        <Filter
          fields={fields}
          onSearch={this._handleSearch}
          extraBtns={[
            <Button key="1" type="primary">
              新增
            </Button>,
          ]}
        />
        <Table
          columns={this._columns}
          dataSource={list}
          loading={showListSpin}
          rowKey="id"
          onChange={this._handlePageChange}
          pagination={pagination}
        />
      </div>
    );
  }
}
