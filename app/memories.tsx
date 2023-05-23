import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Link, useRouter } from 'expo-router'

import * as SecureStore from 'expo-secure-store'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import Icon from '@expo/vector-icons/Feather'

import NLWLogo from '../src/assets/images/nlw-space-logo.svg'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'
dayjs.locale(ptBr)

type Memory = {
    coverUrl: string
    exerpt: string
    id: string
    createdAt: string
}

export default function Memories() {
    const [memoriesList, setMemoriesList] = useState<Memory[]>([])

    const router = useRouter()

    async function logOut() {
        await SecureStore.deleteItemAsync('token')

        router.push('/signIn')
    }

    async function getMemories() {
        const token = await SecureStore.getItemAsync('token')

        const response = await api.get('/memories', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        setMemoriesList(response.data)
    }

    useEffect(() => {
        getMemories()
    }, [])

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
            <ScrollView>
                {memoriesList.map((memory) => {
                    return (
                        <View className="space-y-6 py-4" key={memory.id}>
                            <View className="flex-row items-center gap-2">
                                <View className="h-px w-5 bg-gray-50" />
                                <Text className="font-roboto_400Regular text-sm text-gray-100">
                                    {dayjs(memory.createdAt).format(
                                        'D[ de ]MMMM[, ]YYYY',
                                    )}
                                </Text>
                            </View>
                            <Image
                                source={{
                                    uri: memory.coverUrl,
                                }}
                                alt=""
                                className="aspect-video w-full rounded-lg"
                            />
                            <Text className="font-roboto_400Regular text-base leading-relaxed text-gray-100">
                                {memory.exerpt}
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
                    )
                })}
            </ScrollView>
        </View>
    )
}
