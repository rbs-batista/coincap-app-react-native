import React from 'react';
import { Center, Heading, VStack, Text, Button, View } from 'native-base'
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";
import { Input } from '../../../components';
import { TextInput } from 'react-native';
import styles from "./styles";
 
type FormDataProps = {
  id:any;
  name: string;
  amount: number;
  // senha: string;
  // confirmaSenha: string;
}
 
const schemaRegister = yup.object({
  name: yup.string().required('Nome obrigatório'),
  amount: yup.string().required('Valor é obrigatório'),
  // senha: yup.string().required('Senha obrigatória').min(3,'Informe bno minímo 3 digitos').max(6, 'Informe no máximo 6 digitos'),
  // confirmaSenha:
  // yup.string()
  // .required('Confirmação de senha obrigatória')
  // .oneOf([yup.ref('senha')], 'As senhas devem coincidir'),
 
})
 
export const Checkout = ({ route, navigation }: {route: any, navigation: any}) => {
  const {control, handleSubmit, formState:{errors}} = useForm<FormDataProps>({
    resolver: yupResolver(schemaRegister) as any
  }
  );
 
  function handlerRegister(data:FormDataProps){
   
    data.id = uuid.v4;
    console.log(data);
  }
 
  return (
    <KeyboardAwareScrollView>
   
    <VStack>
      <Center>
        {/* <Heading my={10}>
          Cadastro de Usuário
        </Heading> */}
        <View>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange}})=>(
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                placeholderTextColor="#dde4eb"
              />
            )}
          />
          <Controller
            control={control}
            name="amount"
            render={({field: {onChange}})=>(
              <TextInput
                style={styles.input}
                // value={searchQuery}
                onChangeText={onChange}
                placeholderTextColor="#dde4eb"
              />
            )}
          />
        </View>
          {/* <Controller
          control={control}
          name="email"
          render={({field: {onChange}})=>(
            <Input
              placeholder="Informe o email"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            >
            </Input>
          )}/> */}
          {/* <Controller
          control={control}
          name="senha"
          render={({field: {onChange}})=>(
            <Input
              placeholder="Informe a senha"
              onChangeText={onChange}
              secureTextEntry
              errorMessage={errors.senha?.message}
            >
            </Input>
          )}/> */}
          {/* <Controller
          control={control}
          name="confirmaSenha"
          render={({field: {onChange}})=>(
            <Input
              placeholder="Confirme sua senha"
              onChangeText={onChange}
              secureTextEntry
              errorMessage={errors.confirmaSenha?.message}
            >
            </Input>
          )}/> */}
 
          {/* <Button title='Cadastrar' onPress={handleSubmit(handlerRegister)}></Button> */}
          <Button
              onPress={handleSubmit(handlerRegister)}
              style={{ backgroundColor: '#63b7ff',}}
          >
              <Text style={{ fontWeight: 'bold', color: '#fbfdf1' }}>
                  VENDER
              </Text>
          </Button>  
      </Center>
    </VStack>
    </KeyboardAwareScrollView>
   
  );
}
 