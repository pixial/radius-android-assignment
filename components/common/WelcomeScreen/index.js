import React, {useRef, useEffect} from 'react';
import {Animated, View, Text, SafeAreaView, Image} from 'react-native';
import {fullLogo} from '../../../images';

import tw from 'twrnc';
const WelcomeScreen = param => {
  const {navigation} = param;

  const timerWidth = useRef(new Animated.Value(0)).current;

  const redirectToDashbaord = () => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 600);
  };

  useEffect(() => {
    redirectToDashbaord();

    Animated.timing(timerWidth, {
      toValue: 100,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <SafeAreaView>
      <View style={tw.style(`bg-gray-100 h-full items-center justify-center`)}>
        <View style={tw.style(`w-[80%]`)}>
          <Image
            source={fullLogo}
            style={tw.style('w-[100%]', {aspectRatio: 4.8, height: 'auto'})}
          />
        </View>

        <View style={tw.style(`w-[65%] mt-6 bg-gray-200`)}>
          <Animated.View
            style={tw.style(`w-full h-1 bg-black rounded-lg`, {
              width: timerWidth.interpolate({
                inputRange: [0, 100],
                outputRange: [`0%`, `100%`],
              }),
            })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
