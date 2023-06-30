import {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import {fullLogo} from '../../images';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Dashboard = props => {
  const {navigation} = props;

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to leave this app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView>
      <View style={tw.style(`h-full p-2`)}>
        <Image
          source={fullLogo}
          style={tw.style('w-[34%]', {aspectRatio: 4.8, height: 'auto'})}
        />

        <View style={tw.style(`w-full h-[1px] bg-gray-200 mt-2 mb-4`)} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(`ChooseFacilities`);
          }}
          style={tw.style(`rounded p-2.5 border border-black/20 my-1`)}
          activeOpacity={0.6}>
          <View style={tw.style(`flex-row justify-between`)}>
            <View style={tw.style(`flex-row`)}>
              <Text style={tw.style(`text-xl text-black text-center ml-2`)}>
                Choose Facilities
              </Text>
            </View>

            <View style={tw.style(`my-auto`)}>
              <FontAwesomeIcon icon={'fa-chevron-right'} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
