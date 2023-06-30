import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import tw from 'twrnc';
import {
  apartment,
  boat,
  condo,
  garage,
  garden,
  land,
  noroom,
  rooms,
  swimming,
} from '../../images';

import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChooseFacilities = props => {
  const {navigation} = props;
  const toast = useToast();
  const [localLoader, setLocalLoader] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [exclusions, setExclusions] = useState([]);

  const facilityImages = {
    apartment: apartment,
    boat: boat,
    condo: condo,
    garage: garage,
    garden: garden,
    land: land,
    'no-room': noroom,
    rooms: rooms,
    swimming: swimming,
  };

  const handleOptionChange = (facilityId, optionId) => {
    // If option already selected and user want to deselect
    if (selectedOptions?.[facilityId] === optionId) {
      const copySelectedOptions = {...selectedOptions};
      delete copySelectedOptions?.[facilityId];
      setSelectedOptions(copySelectedOptions);
    } else {
      // New Option Selection
      setSelectedOptions(pre => ({...pre, [facilityId]: optionId}));
    }
  };

  const isExclusionViolated = (facilityId, optionId) => {
    for (const exclusion of exclusions) {
      const [exclusion1, exclusion2] = exclusion;

      if (
        exclusion1.facility_id === facilityId &&
        exclusion1.options_id === optionId &&
        selectedOptions[exclusion2.facility_id] === exclusion2.options_id
      ) {
        return true;
      }

      if (
        exclusion2.facility_id === facilityId &&
        exclusion2.options_id === optionId &&
        selectedOptions[exclusion1.facility_id] === exclusion1.options_id
      ) {
        return true;
      }
    }

    return false;
  };

  const getDataFromServer = async () => {
    try {
      const facilityDataResp = await axios.get(
        `https://my-json-server.typicode.com/iranjith4/ad-assignment/db`,
      );

      setFacilities(facilityDataResp?.data?.facilities);
      setExclusions(facilityDataResp?.data?.exclusions);

      await AsyncStorage.setItem(
        '@FacilitiesData',
        JSON.stringify({
          data: facilityDataResp?.data,
          time: new Date().getTime(),
        }),
      );
    } catch (error) {
      setLocalLoader(false);
      toast.show('Unable to load facilities, Please try after sometime!', {
        type: 'warning',
      });
    }
  };

  const getData = async () => {
    try {
      setLocalLoader(true);
      const facilitiesDataAsyncStorage = JSON.parse(
        await AsyncStorage.getItem('@FacilitiesData'),
      );

      if (!facilitiesDataAsyncStorage) {
        await getDataFromServer();
      } else {
        const timeDiffrence =
          (new Date().getTime() - facilitiesDataAsyncStorage?.time) /
          (1000 * 60 * 60);

        if (timeDiffrence > 24) {
          await getDataFromServer();
        } else {
          setFacilities(facilitiesDataAsyncStorage?.data?.facilities);
          setExclusions(facilitiesDataAsyncStorage?.data?.exclusions);
        }
      }

      setLocalLoader(false);
    } catch (error) {
      setLocalLoader(false);
      toast.show('Unable to load facilities, Please try after sometime!', {
        type: 'warning',
      });
    }
  };
  useEffect(() => {
    getData();
    const backAction = () => {
      navigation.goBack();
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
      <View style={tw.style(`h-full p-2 bg-white`)}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw.style(`flex-row items-center mb-2`)}>
          <FontAwesomeIcon icon={'fa-arrow-left'} size={24} />
          <Text style={tw.style(`text-xl text-black font-medium ml-2`)}>
            Choose Facilities
          </Text>
        </TouchableOpacity>

        {localLoader ? (
          <View style={tw.style(`items-center justify-center flex-1`)}>
            <ActivityIndicator
              color={'#000'}
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              size={'large'}
            />

            <Text style={tw.style(`mt-4`)}>Loading...</Text>
          </View>
        ) : (
          <View style={tw.style(`flex-1`)}>
            <ScrollView>
              {facilities?.map((facilityType, index) => (
                <View
                  key={index}
                  style={tw.style(`bg-gray-100/80 p-2 rounded my-1.5`)}>
                  <Text
                    style={tw.style(
                      `text-black font-medium text-base text-center relative bottom-1 capitalize`,
                    )}>
                    Select {facilityType?.name}
                  </Text>

                  <View style={tw.style(`flex-row items-center`)}>
                    {facilityType.options.map((facility, index) => {
                      const isDisabled = isExclusionViolated(
                        facilityType?.facility_id,
                        facility?.id,
                      );

                      return (
                        <TouchableOpacity
                          onPress={() =>
                            isDisabled
                              ? toast.show(
                                  'This combination is not possible!',
                                  {
                                    type: 'warning',
                                  },
                                )
                              : handleOptionChange(
                                  facilityType?.facility_id,
                                  facility?.id,
                                )
                          }
                          key={index}
                          activeOpacity={0.5}
                          style={tw.style(
                            `w-${
                              100 / facilityType.options?.length - 2 + '%'
                            }  p-1 py-2 items-center rounded m-[1%] border border-black/10 ${
                              selectedOptions?.[facilityType?.facility_id] ===
                              facility?.id
                                ? 'bg-blue-200/80'
                                : isDisabled
                                ? 'opacity-35'
                                : 'bg-gray-200/50'
                            }`,
                          )}>
                          <Image
                            source={facilityImages[facility?.icon]}
                            style={tw.style(`w-[60%]`, {
                              aspectRatio: 1,
                              height: 'auto',
                            })}
                          />

                          <Text
                            numberOfLines={1}
                            style={tw.style(
                              `text-black font-light text-sm mt-1`,
                            )}>
                            {facility?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                toast.show('Done!', {
                  type: 'warning',
                });
              }}
              activeOpacity={0.8}
              style={tw.style(`bg-black/80 rounded py-2.5 items-center`)}>
              <Text style={tw.style(`text-white text-base`)}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChooseFacilities;
