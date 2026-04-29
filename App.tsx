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
import CustomAnimatedComponent from './src/Reanimation/AnimatedApi/CustomAnimatedComponent';
import LayoutAnimation from './src/Reanimation/AnimatedApi/LayoutAnimation';
import ScrollEventHandler from './src/Reanimation/AnimatedApi/ScrollEventHandler';
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
import RnAnimatedHome from './src/Reanimation/RnAnimatedHome';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/ TanStackQuery/react-query/queryClient';
import TodoListScreen from './src/ TanStackQuery/UI/TodoListScreen';
import CreateTodoScreen from '@/ TanStackQuery/UI/CreateTodoScreen';
import PracticeGround from '@/Reanimation/AnimatedApi/practicefiles/PracticeGround';
import AnimatedEvent from './src/Reanimation/AnimatedApi/AnimatedEvent';
import FirestoreScreen from '@/firestore/FirestoreScreen';
import AnalyticsScreen from '@/firestore/AnalyticsScreen';
import ReanimatedHome from '@/Reanimation/ReanimatedHome';
import ReanimationBasic from './src/Reanimation/Reanimated/ReanimationBasic';
import ReanimationPractice from '@/Reanimation/Reanimated/ReanimationPractice';
import keyboardHandler from '@/Reanimation/Reanimated/keyboardHandler';
import EnterExist from '@/Reanimation/Reanimated/EnterExist';
import LayoutTransition from '@/Reanimation/Reanimated/LayoutTransition';
import SkippingAnimation from '@/Reanimation/Reanimated/SkippingAnimation';
import ListLayoutAnimations from '@/Reanimation/Reanimated/ListLayoutAnimations';
import KeyframeAnimations from '@/Reanimation/Reanimated/KeyframeAnimations';
import GestureHandling from '@/Reanimation/Reanimated/GestureHandling';
import Worklets from '@/Reanimation/Reanimated/Worklets';
import Threading from '@/Reanimation/Reanimated/Threading';
import RnSkiaHome from '@/Reanimation/RnSkiaHome';
import SkiaFundamentals from '@/Reanimation/skia/SkiaFundamentals';
import CarGameWithSkia from '@/Reanimation/skia/CarGameWithSkia';


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
  NativeModule: undefined;
  Nolibrary: undefined;
  Basic: undefined;
  Value: undefined;
  Interpolation: undefined;
  Animtypes: undefined;
  EasingAnimation: undefined;
  NestingFunction: undefined;
  AnimatedEvent: undefined;
  CustomAnimatedComponent: undefined;
  LayoutAnimation: undefined;
  ScrollEventHandler: undefined;
  Success: undefined;
  Move2D: undefined;
  MainHome: undefined;
  RnAnimatedHome: undefined;
  ReanimatedHome: undefined;
  TodoListScreen: undefined;
  CreateTodoScreen: undefined;
  PracticeGround: undefined;
  FirestoreScreen: undefined;
  AnalyticsScreen: undefined;
  ReanimationBasic: undefined;
  RNBasic: undefined;
  Hooks: undefined;
  Method: undefined;
  ScrollHandler: undefined;
  ScrollOffset: undefined;
  ScrollTo: undefined;
  ReanimationPractice: undefined;
  keyboardHandler: undefined;
  EnterExist: undefined;
  LayoutTransition: undefined;
  SkippingAnimation: undefined;
  ListLayoutAnimations: undefined;
  KeyframeAnimations: undefined;
  GestureHandling: undefined;
  Worklet: undefined;
  Threading: undefined;
  RnSkiaHome: undefined,
  SkiaFundamentals: undefined;
  CarGameWithSkia: undefined;


};

export type THomeNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
                  <Stack.Screen name="RnAnimatedHome" component={RnAnimatedHome} />
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
                  <Stack.Screen name="ReanimationBasic" component={ReanimationBasic} />
                  <Stack.Screen name="ReanimatedHome" component={ReanimatedHome} />
                  <Stack.Screen name="ScrollTo" component={ScrollTo} />
                  <Stack.Screen name="ScrollOffset" component={ScrollOffset} />
                  <Stack.Screen name="ScrollHandler" component={ScrollHandler} />
                  <Stack.Screen name="Hooks" component={Hooks} />
                  <Stack.Screen name="Method" component={Method} />
                  <Stack.Screen name="keyboardHandler" component={keyboardHandler} />
                  <Stack.Screen name="EnterExist" component={EnterExist} />
                  <Stack.Screen name="ReanimationPractice" component={ReanimationPractice} />
                  <Stack.Screen name="LayoutTransition" component={LayoutTransition} />
                  <Stack.Screen name="SkippingAnimation" component={SkippingAnimation} />
                  <Stack.Screen name="ListLayoutAnimations" component={ListLayoutAnimations} />
                  <Stack.Screen name="KeyframeAnimations" component={KeyframeAnimations} />
                  <Stack.Screen name="GestureHandling" component={GestureHandling} />
                  <Stack.Screen name="Worklet" component={Worklets} />
                  <Stack.Screen name="Threading" component={Threading} />


                  {/* RnSkia */}
                  <Stack.Screen name="RnSkiaHome" component={RnSkiaHome} />
                  <Stack.Screen name="SkiaFundamentals" component={SkiaFundamentals} />
                  <Stack.Screen name="CarGameWithSkia" component={CarGameWithSkia} />


                  {/* Native Module */}
                  <Stack.Screen
                    name="NativeModule"
                    component={NativeModule}
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen name="FirestoreScreen" component={FirestoreScreen} />
                  <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />


                  {/* TanStackQuery */}
                  <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
                  <Stack.Screen name="CreateTodoScreen" component={CreateTodoScreen} />



                  {/* React-native Animated Api */}
                  <Stack.Screen name="PracticeGround" component={PracticeGround} />
                  <Stack.Screen name="Nolibrary" component={Nolibrary} />
                  <Stack.Screen name="Basic" component={Basic} />
                  <Stack.Screen name="Value" component={Value} />
                  <Stack.Screen name="Interpolation" component={Interpolation} />
                  <Stack.Screen name="Animtypes" component={Animtypes} />
                  <Stack.Screen name="EasingAnimation" component={EasingAnimation} />
                  <Stack.Screen name="NestingFunction" component={NestingFunction} />
                  <Stack.Screen name="AnimatedEvent" component={AnimatedEvent} />
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
    </QueryClientProvider>
  );
};

export default App;