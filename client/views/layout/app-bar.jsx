import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

class MainAppBar extends Component {
  constructor(props) {
    super(props);
    this.onHomeIconClick = this.onHomeIconClick.bind(this);
    this.loginButtonClick = this.loginButtonClick.bind(this);
    this.createButtonClick = this.createButtonClick.bind(this);
  }
  state = {};
  /* eslint-disable */
  onHomeIconClick() {}
  loginButtonClick() {}
  createButtonClick() {}
  /* eslint-disable */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography color="inherit" className={classes.flex} variant="title">
              JNode
            </Typography>
            <Button color="inherit" onClick={this.createButtonClick}>
              新建话题
            </Button>
            <Button color="inherit" onClick={this.loginButtonClick}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
MainAppBar.propType = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);
