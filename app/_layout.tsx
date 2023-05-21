import { StatusBar } from 'expo-status-bar'

import { ImageBackground } from 'react-native'

import { styled } from 'nativewind'

import { useFonts } from 'expo-font'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/images/luz.png'

import Stripes from '../src/assets/images/Stripes.svg'
import { Stack } from 'expo-router'

const StyledStripes = styled(Stripes)

export default function Layout() {
    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    })

    if (!hasLoadedFonts) {
        return null
    }

    return (
        <ImageBackground
            source={blurBg}
            className="relative flex-1 bg-gray-900 px-8 py-10"
            imageStyle={{ position: 'absolute', left: '-120%' }}
        >
            <StyledStripes className="absolute left-2" />

            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />

            <StatusBar style="light" />
        </ImageBackground>
    )
}
