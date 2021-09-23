import React from 'react';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import Global from './utils/global';
import Splash from './screens/splash';
import AppWrapper from './screens/wrapper';

export default function App() {

  const [fontsLoaded] = useFonts({
    AvenirHeavy: Global.FONT.AVENIR_HEAVY,
    AvenirBlack: Global.FONT.AVENIR_BLACK,
    AvenirBook: Global.FONT.AVENIR_BOOK,
  });

  const [imagesLoaded] = useAssets([
    Global.IMAGE.SPLASH,
    Global.IMAGE.GUIDE1,
    Global.IMAGE.GUIDE2,
    Global.IMAGE.GUIDE3,
    Global.IMAGE.LOCATION,
    Global.IMAGE.NOTIFY,
    Global.IMAGE.DOWN,
    Global.IMAGE.UNKNOWN,
    Global.IMAGE.LEFT,
    Global.IMAGE.RIGHT,
  ]);

  if(!fontsLoaded || !imagesLoaded)
    return (<Splash/>);

  return (
    <AppWrapper/>
  );
}
