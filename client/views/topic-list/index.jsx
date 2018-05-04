import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import queryString from 'query-string';
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import List from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import { AppState } from '../../store/app-state';
import Container from '../layout/container';
import TopicListItem from './list-item';
import { tabs } from '../../utils/variable-define';

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  };
})
@observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }
  componentDidMount() {
    const tab = this.getTab();
    this.props.topicStore.fetchTopics(tab);
    // do something here
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search));
    }
  }
  getTab(search) {
    search = search || this.props.location.search;
    const query = queryString.parse(search);
    return query.tab || 'all';
  }
  changeTab(e, value) {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    });
  }
  /* eslint-disable */
  listItemClick() {}
  /* eslint-disable */
  asyncbootstrap() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true);
      });
    });
  }
  render() {
    const { topicStore } = this.props;
    const { syncing } = topicStore;
    const topicList = topicStore.topics;
    const tab = this.getTab();
    return (
      <Container>
        <Helmet>
          <title>this is a topic list</title>
          <meta name="description" content="this is a topic list" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {Object.keys(tabs).map(item => {
            return <Tab label={tabs[item]} value={item} key={item} />;
          })}
        </Tabs>
        <List>
          {topicList.map(topic => {
            return <TopicListItem key={topic.id} onClick={this.listItemClick} topic={topic} />;
          })}
        </List>
        {syncing ? (
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 0' }}>
            <CircularProgress color="secondary" size={100} />
          </div>
        ) : null}
      </Container>
    );
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired,
};
TopicList.propTypes = {
  location: PropTypes.object.isRequired,
};
export default TopicList;
