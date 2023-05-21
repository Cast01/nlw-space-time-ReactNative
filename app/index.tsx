import { useEffect } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import * as SecureStore from 'expo-secure-store'

import { useRouter } from 'expo-router'

import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'

import { api } from '../src/lib/api'

import Logo from '../src/assets/images/nlw-space-logo.svg'

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
        'https://github.com/settings/connections/applications/a64293d580f860e0c846',
}

export default function App() {
    const router = useRouter()

    const [, response, signInWithGithub] = useAuthRequest(
        {
            clientId: 'a64293d580f860e0c846',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'nlwspacetime',
            }),
        },
        discovery,
    )

    async function handleGithubOAuthCode(code: string) {
        const response = await api.post('/register', {
            code,
        })

        const { token } = response.data

        await SecureStore.setItemAsync('token', token)

        router.push('/memories')
    }

    useEffect(() => {
        console.log(
            makeRedirectUri({
                scheme: 'nlwspacetime',
            }),
        )

        if (response?.type === 'success') {
            const { code } = response.params
            console.log('CODE: ' + code)

            handleGithubOAuthCode(code)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    return (
        <View className="flex-1">
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
                    onPress={() => signInWithGithub()}
                >
                    <Text className="font-baiJamJuree_700Bold text-sm text-black">
                        CADASTRAR LEMBRANÇA
                    </Text>
                </TouchableOpacity>
            </View>

            <Text className="text-center font-roboto_400Regular text-sm leading-relaxed text-gray-200">
                Feito com 💜 no NLW da Rocketseat
            </Text>
        </View>
    )
}
