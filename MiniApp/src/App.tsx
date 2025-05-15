/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';

import LogoRepack from './logo_light.svg';

function App(): React.JSX.Element {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hello world from MiniApp2</Text>
      <LogoRepack width={150} height={50} />
    </View>
  );
}

export default App;
