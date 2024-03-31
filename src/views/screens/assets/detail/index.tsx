import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Button, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import AssetController from "../../../../controllers/asset_controller";
import { AssetModel } from "../../../../models";
import { Dialog, Loading, Util } from "../../../../helpers";

export const Detail = ({ route, navigation }: {route: any, navigation: any}) => {
    const { id } = route.params;
    const [asset, setAsset] = useState<AssetModel>();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                Loading.start();
                const res = await AssetController.detail({id: id});
                setAsset(res);
                Loading.finished();
            } catch (error) {
                Loading.finished();
                Dialog.error({message: 'Erro ao buscar dados'});
            }
        };
    
        fetchData();
    }, []);

    return (
        <ScrollView>
            <View paddingX={2}>
                <ListItem
                    key={asset?.id} 
                    containerStyle={{ backgroundColor: Util.cryptoBackgroundColor({symbol: asset?.symbol ?? ''}), marginBottom: 10 }}
                >
                    <Avatar
                        title={asset?.avatar}
                        overlayContainerStyle={{ backgroundColor: "#5F9EA0", color: 'dde4eb' }}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: '#dde4eb' }}>{asset?.name}</ListItem.Title>
                        <ListItem.Subtitle style={{ color: '#eff1f3' }}>{asset?.marketCap}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content style={{ alignItems: 'flex-end' }}>
                        <ListItem.Title style={{ color: '#fcffff' }}>{asset?.price} USD</ListItem.Title>
                        <ListItem.Subtitle style={{ color: Util.isNegative({value: asset?.percent ?? 0}) }}>{asset?.percent} %</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <View
                    style={{
                        backgroundColor: '#1c2329',
                        borderRadius: 8,
                        padding: 20,
                        marginBottom: 20
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons name="calendar-clock" color={'#f0cb36'} size={30} />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>Mercado Fechado</Text>
                    </View>
                    <Text
                        style={{
                            color: '#e4ebf3',
                            fontSize: 16,
                            marginTop: 10,
                            lineHeight: 30,
                            fontWeight: 'normal'
                        }}>
                        Você pode agendar ordens limitadas de Swing Trade para a abertura do próximo pregão.
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                        <Text style={{ color: '#72b1e5', fontSize: 17 }}>
                            Tire suas dúvidas sobre o agendamento
                        </Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#72b1e5" style={{ marginLeft: 10 }} />
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor: '#1c2329',
                        paddingHorizontal: 5,
                        paddingVertical: 10
                    }}>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Oferta</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>{asset?.supply}</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Quantidade</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>{asset?.maxSupply}</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Oferta x Preço</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>{asset?.marketCap}</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Volume de negociação</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>{asset?.volume}</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Preço médio</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>{asset?.price}</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}

                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Valor nas últimas 24 horas</ListItem.Title>
                        </ListItem.Content>
                        <Text color={Util.isNegative({value: asset?.percent ?? 0})}>{asset?.percent} %</Text>
                    </ListItem>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        width: '100%'
                    }}
                >

                    <Button
                        style={{
                            backgroundColor: '#63b7ff',
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: '#fbfdf1'
                            }}>
                            COMPRAR
                        </Text>
                    </Button>
                    <View paddingX={5}></View>
                    <Button
                        style={{
                            backgroundColor: '#e70632',
                            flex: 1
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: '#fbfdf1'
                            }}>
                            VENDER
                        </Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
} 