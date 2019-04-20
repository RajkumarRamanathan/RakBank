import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Drawer, Overlay, Modal, Stack, Actions, Lightbox } from 'react-native-router-flux';

import ViewAllUser from './src/ViewAllUser';

console.disableYellowBox = true;

export default class App extends Component {

  render() {
    return (
      <Router>
        <Overlay key="overlay">
          <Modal key="modal"
            hideNavBar>
            <Lightbox key="lightbox">
              <Stack
                hideNavBar
                key="root">
                <Scene key="alluser"
                  component={ViewAllUser}
                  hideNavBar
                  initial />
              </Stack>
            </Lightbox>
          </Modal>
        </Overlay>
      </Router>
    );
  }
}