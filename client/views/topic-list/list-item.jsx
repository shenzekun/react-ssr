import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';
import ListItemText from 'material-ui/List/ListItemText';
import Avatar from 'material-ui/Avatar';
import cx from 'classnames';
import { withStyles } from 'material-ui/styles';
import { tabs } from '../../utils/variable-define';
import { topicPrimaryStyle, topicSecondaryStyle } from './style';

const Primary = ({ classes, topic }) => {
  const className = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  });
  return (
    <div className={classes.root}>
      <span className={className}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  );
};
Primary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);
const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.replyCount}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>{topic.create_at}</span>
  </span>
);
Secondary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
};
const StyledSecondary = withStyles(topicSecondaryStyle)(Secondary);
const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
);

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
};

export default TopicListItem;
