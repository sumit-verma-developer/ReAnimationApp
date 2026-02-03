import { View, Text, StyleSheet, SafeAreaView, Easing } from 'react-native';
import React from 'react';
import Nolibrary from './src/Reanimation/AnimatedApi/Nolibrary';
import Basic from './src/Reanimation/AnimatedApi/Basic';
import Value from './src/Reanimation/AnimatedApi/Value';
import Interpolation from './src/Reanimation/AnimatedApi/Interpolation';
import Animtypes from './src/Reanimation/AnimatedApi/Animtypes';
import EasingAnimation from './src/Reanimation/AnimatedApi/EasingAnimation';
import Success from './src/Reanimation/AnimatedApi/Success';
import Move2D from './src/Reanimation/AnimatedApi/Move2D';
import NestingFunction from './src/Reanimation/AnimatedApi/NestingFunction';
import Event from './src/Reanimation/AnimatedApi/Event';
import CustomAnimatedComponent from './src/Reanimation/AnimatedApi/CustomAnimatedComponent';
import LayoutAnimation from './src/Reanimation/AnimatedApi/LayoutAnimation';
import ScrollEventHandler from './src/Reanimation/AnimatedApi/ScrollEventHandler';
import RNBasic from './src/Reanimation/Reanimated/RNBasic';
import Method from './src/Reanimation/Reanimated/Method';
import Hooks from './src/Reanimation/Reanimated/Hooks';
import NativeModule from './src/Reanimation/nativeModule/NativeModule';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScrollHandler from './src/Reanimation/Reanimated/ScrollHandler';
import ScrollTo from './src/Reanimation/Reanimated/ScrollTo';
import ScrollOffset from './src/Reanimation/Reanimated/ScrollOffset';

// animation components
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ChatScreen from './src/screens/ChatScreen';
import PinCode from './src/screens/PinCodeScreen';
import HomeScreen from './src/screens/HomeScreen';
import NFCReader from './src/screens/NFCReaderScreen';
import AirbnbScreen from './src/screens/AirbnbScreen';
import TicketScreen from './src/screens/TicketScreen';
import LinePieCharts from './src/screens/LinePieCharts';
import ShutdownIOS from './src/screens/ShutdownIOSScreen';
import ParallaxScreen from './src/screens/ParallaxScreen';
import TogglersScreen from './src/screens/TogglersScreen';
import DotLoaderScreen from './src/screens/DotLoaderScreen';
import { ModalProvider } from './src/providers/ModalProvider';
import GroupStackCharts from './src/screens/GroupStackCharts';
import DoubleListScreen from './src/screens/DoubleListScreen';
import Carousel3DScreen from './src/screens/Carousel3DScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import FloatingButton from './src/screens/FloatingButtonScreen';
import CustomDrawerScreen from './src/screens/CustomDrawerScreen';
import ValuePickersScreen from './src/screens/ValuePickersScreen';
import FadeItemListScreen from './src/screens/FadeItemListScreen';
import TaskCalendarScreen from './src/screens/TaskCalendarScreen';
import ProgressLoaderScreen from './src/screens/ProgressLoaderScreen';
import LikeInteractionScreen from './src/screens/LikeInteractionScreen';
import ListWithIndicatorScreen from './src/screens/ListWithIndicatorScreen';
import DrawerInterpolateScreen from './src/screens/DrawerInterpolateScreen';
import TranslateSearchIOSScreen from './src/screens/TranslateSearchIOSScreen';
import CircularProgressBarScreen from './src/screens/CircularProgressBarScreen';
import CircularAnimatedTextScreen from './src/screens/CircularAnimatedTextScreen';
import ScreenTransitionStack from './src/screens/ScreenTransition/ScreenTransitionStack';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import MainHome from '@/screens/MainHome';
import LearningReanimationHome from './src/Reanimation/LearningReanimationHome';


const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Parallax: undefined;
  ListWithIndicator: undefined;
  DoubleList: undefined;
  Carousel3D: undefined;
  Progress: undefined;
  DotLoader: undefined;
  Togglers: undefined;
  FadeItem: undefined;
  CustomDrawer: undefined;
  DrawerInterpolate: undefined;
  ProductList: undefined;
  PinCode: undefined;
  Floating: undefined;
  Airbnb: undefined;
  Ticket: undefined;
  ShutdownIOS: undefined;
  NFCReader: undefined;
  TranslateSearchIOS: undefined;
  CircularProgressBar: undefined;
  ValuePickers: undefined;
  LikeInteraction: undefined;
  CircularAnimatedText: undefined;
  Chat: undefined;
  LinePieCharts: undefined;
  GroupStackCharts: undefined;
  TaskCalendar: undefined;
  ScreenTransition: undefined;
  ScrollTo: undefined;
  ScrollOffset: undefined;
  ScrollHandler: undefined;
  Hooks: undefined;
  RNBasic: undefined;
  Method: undefined;
  NativeModule: undefined;
  Nolibrary: undefined;
  Basic: undefined;
  Value: undefined;
  Interpolation: undefined;
  Animtypes: undefined;
  EasingAnimation: undefined;
  NestingFunction: undefined;
  Event: undefined;
  CustomAnimatedComponent: undefined;
  LayoutAnimation: undefined;
  ScrollEventHandler: undefined;
  Success: undefined;
  Move2D: undefined;
  MainHome: undefined;
  LearningReanimationHome: undefined;
};

export type THomeNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const App = () => {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ModalProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
                {/* animation: 'slide_from_right component', */}
                <Stack.Screen name="MainHome" component={MainHome} />
                <Stack.Screen name="LearningReanimationHome" component={LearningReanimationHome} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Parallax" component={ParallaxScreen} />
                <Stack.Screen
                  name="ListWithIndicator"
                  component={ListWithIndicatorScreen}
                />
                <Stack.Screen name="DoubleList" component={DoubleListScreen} />
                <Stack.Screen name="Carousel3D" component={Carousel3DScreen} />
                <Stack.Screen
                  name="Progress"
                  component={ProgressLoaderScreen}
                />
                <Stack.Screen name="DotLoader" component={DotLoaderScreen} />
                <Stack.Screen name="Togglers" component={TogglersScreen} />
                <Stack.Screen name="FadeItem" component={FadeItemListScreen} />
                <Stack.Screen
                  name="CustomDrawer"
                  component={CustomDrawerScreen}
                />
                <Stack.Screen
                  name="DrawerInterpolate"
                  component={DrawerInterpolateScreen}
                />
                <Stack.Screen
                  name="ProductList"
                  component={ProductListScreen}
                />
                <Stack.Screen name="PinCode" component={PinCode} />
                <Stack.Screen name="Floating" component={FloatingButton} />
                <Stack.Screen name="Airbnb" component={AirbnbScreen} />
                <Stack.Screen name="Ticket" component={TicketScreen} />
                <Stack.Screen name="ShutdownIOS" component={ShutdownIOS} />
                <Stack.Screen name="NFCReader" component={NFCReader} />
                <Stack.Screen
                  name="TranslateSearchIOS"
                  component={TranslateSearchIOSScreen}
                />
                <Stack.Screen
                  name="CircularProgressBar"
                  component={CircularProgressBarScreen}
                />
                <Stack.Screen
                  name="ValuePickers"
                  component={ValuePickersScreen}
                />
                <Stack.Screen
                  name="LikeInteraction"
                  component={LikeInteractionScreen}
                />
                <Stack.Screen
                  name="CircularAnimatedText"
                  component={CircularAnimatedTextScreen}
                />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="LinePieCharts" component={LinePieCharts} />
                <Stack.Screen
                  name="GroupStackCharts"
                  component={GroupStackCharts}
                />
                <Stack.Screen
                  name="TaskCalendar"
                  component={TaskCalendarScreen}
                />
                <Stack.Screen
                  name="ScreenTransition"
                  component={ScreenTransitionStack}
                />


                {/* Reanimated */}
                <Stack.Screen name="ScrollTo" component={ScrollTo} />
                <Stack.Screen name="ScrollOffset" component={ScrollOffset} />
                <Stack.Screen name="ScrollHandler" component={ScrollHandler} />
                <Stack.Screen name="Hooks" component={Hooks} />
                <Stack.Screen name="RNBasic" component={RNBasic} />
                <Stack.Screen name="Method" component={Method} />


                {/* Native Module */}
                <Stack.Screen
                  name="NativeModule"
                  component={NativeModule}
                  options={{ headerShown: false }}
                />

                {/* Animated Api */}
                <Stack.Screen name="Nolibrary" component={Nolibrary} />
                <Stack.Screen name="Basic" component={Basic} />
                <Stack.Screen name="Value" component={Value} />
                <Stack.Screen name="Interpolation" component={Interpolation} />
                <Stack.Screen name="Animtypes" component={Animtypes} />
                <Stack.Screen name="EasingAnimation" component={EasingAnimation} />
                <Stack.Screen name="NestingFunction" component={NestingFunction} />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen
                  name="CustomAnimatedComponent"
                  component={CustomAnimatedComponent}
                />
                <Stack.Screen name="LayoutAnimation" component={LayoutAnimation} />
                <Stack.Screen
                  name="ScrollEventHandler"
                  component={ScrollEventHandler}
                />
                <Stack.Screen name="Success" component={Success} />
                <Stack.Screen name="Move2D" component={Move2D} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ModalProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
};

export default App;