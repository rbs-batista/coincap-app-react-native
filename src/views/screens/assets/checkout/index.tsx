import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Text, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from "react-native-uuid";
import * as yup from "yup";
import { Button, Input } from '../../../components';

type FormDataProps = {
  id: any;
  name: string;
  amount: number;
}

const schemaRegister = yup.object({
  name: yup.string().required('Nome obrigatório'),
  amount: yup.string().required('Valor é obrigatório'),

})

export const Checkout = ({ route, navigation }: { route: any, navigation: any }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schemaRegister) as any
  }
  );

  function handlerRegister(data: FormDataProps) {

    data.id = uuid.v4;
    console.log(data);
  }

  return (
    <KeyboardAwareScrollView>

      <VStack flex={1} p={3}>
        <Heading my={10}>
          Compra de ativos
        </Heading>
        <Text color={'#dde4eb'} marginLeft={'3'} marginBottom={'1'}>Nome</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Text color={'#dde4eb'} marginLeft={'3'} marginBottom={'1'}>Valor</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="R$ 0.00"
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Button
          onPress={handleSubmit(handlerRegister)}
          title={"CONFIRMAR"}>
        </Button>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
