import React from "react"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Card, Divider, Text, View, Icon, Button } from "native-base";
import { ListItem, Avatar } from 'react-native-elements';

export const Details = () => {
    return (
        <View paddingX={2}>
            <ListItem 
                key={1}
                containerStyle={{ backgroundColor: '#131a20', marginBottom: 10}}
              >
              <Avatar
                title={'BTC'}
                overlayContainerStyle={{ backgroundColor: "#5F9EA0", color:'dde4eb'}}
              />
              <ListItem.Content>
                <ListItem.Title style={{ color: '#dde4eb'}}>{"BITCOIN"}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#eff1f3'}}>{"PM 1000"}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={{ alignItems: 'flex-end'}}>
                <ListItem.Title style={{ color: '#fcffff'}}>{"R$ 200,00"}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#3bdd8a'}}>{"+0,65%"}</ListItem.Subtitle>
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
                        flexDirection: 'row', // Para alinhar o ícone e o texto horizontalmente
                        alignItems: 'center', // Para alinhar verticalmente o ícone e o texto
                    }}>
                    <MaterialCommunityIcons name= "calendar-clock" color={'#f0cb36'} size={30}/>
                    <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>Mercado Fechado</Text>
                </View>
                <Text 
                    style={{ 
                            color: '#e4ebf3', 
                            fontSize: 16, 
                            marginTop: 10, 
                            lineHeight: 30,
                            fontWeight:'normal'
                        }}>
                            Você pode agendar ordens limitadas de Swing Trade para a abertura do próximo pregão.
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20 
                    }}>
                    <Text style={{ color: '#72b1e5', fontSize: 17}}>
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
                        containerStyle={{ backgroundColor: '#1c2329'}}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb'}}>Oferta</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>R$ 1000,00</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329'}}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Quantidade</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>2000</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329'}}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Oferta x Preço</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>R$ 1000,00</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329'}}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Volume de negociação</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>R$ 1000,00</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329'}}
                        bottomDivider={true}
                    >
                        <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Preço ponderado</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>R$ 3000,00</Text>
                    </ListItem>
                    <ListItem
                        containerStyle={{ backgroundColor: '#1c2329'}}
                        
                    >
                        <ListItem.Content>
                        <ListItem.Title style={{ fontWeight: 'bold', color: '#dde4eb' }}>Valor nas últimas 24 horas</ListItem.Title>
                        </ListItem.Content>
                        <Text color='#dde4eb'>R$ 6000,00</Text>
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
                        backgroundColor:'#63b7ff',
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
                        backgroundColor:'#e70632',
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
    )
} 