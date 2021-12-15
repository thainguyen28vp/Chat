import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, RefreshControl, StatusBar } from 'react-native'
import { deviceWidth, Form, HeaderCustomBot } from './custom';
import { Ic_cong, Ic_duyet, Ic_goto, Ic_Kduyet, Ic_search, Ic_thongke } from './iconSVG'
import { ModalSignup } from './modal';
import firestore from '@react-native-firebase/firestore'
const screenWidth = Dimensions.get("window").width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { ModalLoading } from '../../components/Loading';
import { FlatList } from 'react-native-gesture-handler';
export default function Pending({ navigation, route }) {
    const [visible, setVisible] = useState(false)
    const [datapost, setdatap] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loadingRef, setLoadingRef] = useState(false)


    useEffect(() => {
        reload()

    }, [route?.params?.reload])

    async function reload() {

        const post = await firestore().collection('Post').where('status', '==', 0).get()
        // const allposts = post.docs.map(res => res.data())
        // console.log(post.docs)
        setdatap(post.docs)
        setTimeout(async () => {
            setLoadingRef(false)
            setLoading(false);
        }, 1000)


    }



    //                     const post = await firestore().collection('Post').doc(doc.id).collection('posts').where('status', '==', 2).get()
    //                     const allposts = post.docs.map(res => res.data())
    //                     post.docs.forEach(doc2 => {
    //                         let id = doc2.id
    //                         let data = doc2.data()
    //                         const dtpost = { id, data }
    //                         data1.push(dtpost)
    //                     })


    function back() {
        const radom = Math.floor(Math.random() * 10000)
        navigation.navigate('listPost', { reload: radom })
    }


    return (
        <View
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle='dark-content' />
            <FlatList
                ListHeaderComponent={() => <View>
                    <View style={{ paddingTop: StatusBar.currentHeight }}>

                        <HeaderCustomBot title='Bài đăng chờ duyệt' back={() => back()} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 16 }}>
                        <View style={{ flexDirection: 'row', width: screenWidth - 32, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                            <Ic_search />
                            <TextInput style={{ width: '100%' }} placeholder='Tìm kiếm' onChangeText={''} value={''} />
                        </View>
                    </View>
                </View>}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                data={datapost}
                renderItem={({ item }) => <Form item={item.data()} onPress={() => navigation.navigate('detailPost', { check: 0, data: item.data(), id: item.id })} />}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl refreshing={loadingRef} onRefresh={() => console.log('load')} />

                }
            />
            <ModalLoading visible={loading} />
            <ModalSignup isVisible={visible} onPressClose={() => setVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({})