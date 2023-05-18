import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import { useFonts } from 'expo-font'

import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { styled } from 'nativewind'

import blurBg from './src/assets/images/luz.png'
import Stripes from './src/assets/images/Stripes.svg'
import Logo from './src/assets/images/nlw-space-logo.svg'

const StyledStripes = styled(Stripes)

export default function App() {
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

            <View className="flex-1 items-center justify-center gap-6">
                <Logo />

                <View className="space-y-2">
                    <Text className="text-center font-roboto_700Bold text-2xl leading-tight text-gray-50">
                        Sua cápsula do tempo
                    </Text>
                    <Text className="text-center font-roboto_400Regular text-base leading-relaxed text-gray-100">
                        Colecione momentos marcantes da sua jornada e
                        compartilhe (se quiser) com o mundo!
                    </Text>
                </View>

                <TouchableOpacity
                    className="rounded-full bg-green-500 px-5 py-3"
                    activeOpacity={0.7}
                >
                    <Text className="font-baiJamJuree_700Bold text-sm text-black">
                        CADASTRAR LEMBRANÇA
                    </Text>
                </TouchableOpacity>
            </View>

            <Text className="text-center font-roboto_400Regular text-sm leading-relaxed text-gray-200">
                Feito com 💜 no NLW da Rocketseat
            </Text>

            <StatusBar style="light" />
        </ImageBackground>
    )
}
