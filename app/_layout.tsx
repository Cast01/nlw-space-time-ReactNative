import { StatusBar } from 'expo-status-bar'

import { useEffect, useState } from 'react'

import { ImageBackground } from 'react-native'

import { Stack } from 'expo-router'

import * as SecureStore from 'expo-secure-store'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useFonts } from 'expo-font'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { styled } from 'nativewind'

import blurBg from '../src/assets/images/luz.png'

import Stripes from '../src/assets/images/Stripes.svg'

const StyledStripes = styled(Stripes)

export default function Layout() {
    const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null)

    const { bottom, top } = useSafeAreaInsets()

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    })

    useEffect(() => {
        SecureStore.getItemAsync('token').then((token) => {
            console.log(isAuthenticated)

            setIsAuthenticated(!!token)
        })
    }, [isAuthenticated])

    if (!hasLoadedFonts) {
        return null
    }

    return (
        <ImageBackground
            source={blurBg}
            className="relative flex-1 bg-gray-900 px-8"
            style={{
                paddingBottom: bottom,
                paddingTop: top,
            }}
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
            >
                <Stack.Screen name="index" redirect={isAuthenticated} />

                {/* when finished put the route memories below index */}
                <Stack.Screen name="memories" />
                <Stack.Screen name="newMemories" />
            </Stack>

            <StatusBar style="light" />
        </ImageBackground>
    )
}
