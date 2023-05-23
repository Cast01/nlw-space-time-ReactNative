import { Image, Text, TouchableOpacity, View } from 'react-native'

import { Link, useRouter } from 'expo-router'

import * as SecureStore from 'expo-secure-store'

import Icon from '@expo/vector-icons/Feather'

import NLWLogo from '../src/assets/images/nlw-space-logo.svg'

export default function Memories() {
    const router = useRouter()

    async function logOut() {
        await SecureStore.deleteItemAsync('token')

        router.push('/signIn')
    }

    return (
        <View className="flex-1 space-y-10 py-4">
            <View className="flex-row items-center justify-between">
                <NLWLogo />
                <View className="flex-row">
                    <TouchableOpacity
                        className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
                        onPress={logOut}
                    >
                        <Icon name="log-out" size={16} color={'#000'} />
                    </TouchableOpacity>
                    <Link href={'/newMemories'} asChild>
                        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
                            <Icon name="plus" size={16} color={'#000'} />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            <View className="space-y-6">
                <View className="flex-row items-center gap-2">
                    <View className="h-px w-5 bg-gray-50" />
                    <Text className="font-roboto_400Regular text-sm text-gray-100">
                        12 de Abril, 2023
                    </Text>
                </View>
                <Image
                    source={{
                        uri: 'http://192.168.0.8:3333/uploads/ab1ed5ac-8383-490a-908d-282bd1e40615.jpg',
                    }}
                    alt=""
                    className="aspect-video w-full rounded-lg"
                />
                <Text className="font-roboto_400Regular text-base leading-relaxed text-gray-100">
                    kd ndkasndkjsand kajs da dasd akjsd akd akd akd aksd ad
                    aldasldk jaslkdjalj dlasjlajsdl as dlasd laksdl askd laskdj
                    ald aldj alsd aldkja l dajsld jald jalkajldk ajsldkajdlkal
                    akdj alsdkj alskdjaldka jdlak dal daldj lakd ljaskd jl
                    djlaskdjalskdj aldj aldkjalsd aldajslda sldajdlaksldad
                    jlaskdjoiw q wwiejqpwi hei heqweqwehq ehwqehqe8hq ehq98e.
                </Text>
                <Link href={'/memories/id'} asChild>
                    <TouchableOpacity className="flex-row">
                        <Text className="pr-2 font-roboto_400Regular text-sm text-blue-500 underline">
                            ler mais
                        </Text>
                        <Icon
                            name="arrow-right"
                            size={16}
                            color={'rgb(59 130 246)'}
                        />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}
