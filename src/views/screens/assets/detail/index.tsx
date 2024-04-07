import { Button, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import AssetController from "../../../../controllers/asset_controller";
import { OrderTypeEnum } from "../../../../enums";
import { Dialog, Loading, Util } from "../../../../helpers";
import { AssetModel } from "../../../../models";

export const Detail = ({ route, navigation }: { route: any, navigation: any }) => {
    const { id } = route.params;
    const [asset, setAsset] = useState<AssetModel>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                Loading.start();                
                const res = await AssetController.detail({ id: id });                

                setAsset(res);
                Loading.finished();
            } catch (error) {
                Loading.finished();
                Dialog.error({ message: 'Erro ao buscar dados' });
            }
        };

        fetchData();

    }, []);

    const handleNavigate = async ({ id, type }: { id: string, type: OrderTypeEnum }) => {
        await navigation.navigate('Checkout', { id: id, type: type });
    };
    return (
        <ScrollView>
            <View paddingX={2}>
                <ListItem
                    key={asset?.id}
                    containerStyle={{
                        backgroundColor: '#1c2329',
                        marginBottom: 10
                    }}
                >
                    <Avatar
                        title={asset?.avatar}
                        overlayContainerStyle={{
                            backgroundColor: Util.cryptoBackgroundColor({ symbol: asset?.symbol ?? '' }),
                            color: 'dde4eb'
                        }}
                        rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: '#dde4eb' }}>{asset?.name}</ListItem.Title>
                        <ListItem.Subtitle style={{ color: '#eff1f3' }}>OF {asset?.supply}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content style={{ alignItems: 'flex-end' }}>

                        <ListItem.Title style={{ color: '#fcffff' }}>{asset?.price} USD</ListItem.Title>
                        <ListItem.Subtitle style={{ color: Util.isNegative({ value: asset?.percent ?? 0 }) }}>{asset?.percent} %</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                {/* <View
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
                </View> */}

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
                        <Text color='#dde4eb'>{asset?.marketCap} USD</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329' }}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Volume de negociação</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>{asset?.volume} USD</Text>
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
                        onPress={() => handleNavigate({ id: asset?.id ?? '', type: OrderTypeEnum.BUY })}
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
                    {/* <View paddingX={5}></View>
                    <Button
                        onPress={() => handleNavigate({id: asset?.id ?? '', type: OrderTypeEnum.SALE})}
                        style={{
                            backgroundColor: '#e70632',
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: '#fbfdf1'
                            }}>
                            VENDER
                        </Text>
                    </Button> */}
                </View>
            </View>
        </ScrollView>
    )
} 