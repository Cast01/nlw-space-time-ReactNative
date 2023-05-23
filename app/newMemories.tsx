import { useState } from 'react'

import {
    Image,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

import { Link } from 'expo-router'

import * as ImagePicker from 'expo-image-picker'
// import * as SecureStore from 'expo-secure-store'

import Icon from '@expo/vector-icons/Feather'

import NLWLogo from '../src/assets/images/nlw-space-logo.svg'
import { api } from '../src/lib/api'

export default function NewMemories() {
    const [isPublic, setIsPublic] = useState(false)
    const [content, setContent] = useState('')
    const [preview, setPreview] = useState<string | null>(null)

    async function openImagePicker() {
        try {
            // No permissions request is necessary for launching the image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if (result.assets[0]) {
                setPreview(result.assets[0].uri)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function submitNewMemory() {
        // const token = await SecureStore.getItemAsync('token')

        let coverUrl = ''

        if (preview) {
            const uploadFormData = new FormData()

            uploadFormData.append('file', {
                uri: preview,
                name: 'image.jpg',
                type: 'image/jpeg',
            } as any)

            // eslint-disable-next-line
            // const getUri = uploadFormData["_parts"][0][1]["uri"]

            // console.log(
            //     // eslint-disable-next-line
            //     'upload_form_data: ' + JSON.stringify(uploadFormData["_parts"][0][1]["uri"]),
            // )

            const uploadResponse = await api.post('/upload', uploadFormData, {
                // To Android pass content-type
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            coverUrl = uploadResponse.data.fileUrl

            console.log('CoverUrl: ' + coverUrl)
        }
    }

    // uploadFormData
    //
    // {
    //     "_parts" : [[
    //         "file",
    //         {
    //             "uri":"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmobile-ebe0bdcb-9f67-4339-be00-f607e1a537c8/ImagePicker/8529c2bd-1497-46b0-9c3f-d1bdf9f837e8.jpeg",
    //             "name":"image.jpg",
    //             "type":"image/jpeg"
    //         }
    //     ]]
    // }

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
                <TouchableOpacity
                    className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
                    onPress={openImagePicker}
                >
                    {preview ? (
                        <Image
                            source={{ uri: preview }}
                            className="h-full w-full rounded-lg object-cover"
                            alt=""
                        />
                    ) : (
                        <View className="flex-row">
                            <Icon name="image" color={'#fff'} />
                            <Text>Adicionar foto ou vídeo de capa.</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <ScrollView>
                    <TextInput
                        multiline
                        value={content}
                        onChangeText={setContent}
                        className="rounded-t-md border-t-[1px] border-blue-400 p-0 font-roboto_400Regular text-lg text-gray-50"
                        placeholderTextColor={'#56565a'}
                        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
                    />
                </ScrollView>
                <TouchableOpacity
                    className="self-end rounded-full bg-green-500 px-5 py-3 "
                    activeOpacity={0.7}
                    onPress={submitNewMemory}
                >
                    <Text className="font-baiJamJuree_700Bold text-sm text-black">
                        ENVIAR
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
