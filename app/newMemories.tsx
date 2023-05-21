import {
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { Link } from 'expo-router'

import Icon from '@expo/vector-icons/Feather'

import NLWLogo from '../src/assets/images/nlw-space-logo.svg'
import { useState } from 'react'

export default function NewMemories() {
    const [isPublic, setIsPublic] = useState(false)

    return (
        <View className="flex-1 gap-6 py-4">
            <View className="flex-row justify-between">
                <NLWLogo />
                <Link href={'/memories'} asChild>
                    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                        <Icon name="arrow-left" size={16} color={'#fff'} />
                    </TouchableOpacity>
                </Link>
            </View>
            <View className="relative flex-1 space-y-6">
                <View className="flex-row items-center">
                    <Switch
                        value={isPublic}
                        onValueChange={setIsPublic}
                        trackColor={{
                            false: '#767577',
                            true: '#372560',
                        }}
                        thumbColor={isPublic ? '#8257e5' : '#9e9ea0'}
                    />
                    <Text className="font-roboto_400Regular text-base text-gray-200">
                        Tornar memória púbica
                    </Text>
                </View>
                <TouchableOpacity className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20">
                    <View className="flex-row">
                        <Icon name="image" color={'#fff'} />
                        <Text>Adicionar foto ou vídeo de capa.</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView>
                    <TextInput
                        multiline
                        className="rounded-t-md border-t-[1px] border-blue-400 p-0 font-roboto_400Regular text-lg text-gray-50"
                        placeholderTextColor={'#56565a'}
                        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
                    />
                </ScrollView>
                <TouchableOpacity
                    className="self-end rounded-full bg-green-500 px-5 py-3 "
                    activeOpacity={0.7}
                >
                    <Text className="font-baiJamJuree_700Bold text-sm text-black">
                        CADASTRAR LEMBRANÇA
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
