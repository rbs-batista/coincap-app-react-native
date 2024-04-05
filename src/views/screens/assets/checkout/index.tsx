import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Text, VStack } from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from "yup";
import ShoppingCartController from "../../../../controllers/shopping_cart_controller";
import { OrderTypeEnum } from "../../../../enums";
import { Dialog, Loading } from "../../../../helpers";
import { Button, Input } from '../../../components';

type FormDataProps = {
  // id: any;
  // name: string;
  amount: number;
}

const schemaRegister = yup.object({
  // name: yup.string().required('Nome obrigatório'),
  amount: yup.string().required('Valor é obrigatório'),

})

export const Checkout = ({ route, navigation }: { route: any, navigation: any }) => {
  const { id, type } = route.params;
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schemaRegister) as any
  }
  );

  async function handlerRegister(data: FormDataProps) {
    try {
      Loading.start();
      console.log(`--------------Checkout req-----------------`);
      var message = '';
      if (type === OrderTypeEnum.BUY) {
        console.log(`1[Checkout][req][buy]type: ${type}`);
        await ShoppingCartController.buy({ id: id, amount: data.amount });
        console.log(`1[Checkout][res][buy]id: ${id}, amount: ${data.amount}`);
        message = 'Compra efatuada com sucesso!';
      }

      if (type === OrderTypeEnum.SALE) {
        console.log(`1[Checkout][req][buy]type: ${type}`);
        await ShoppingCartController.sale({ id: id, amount: data.amount });
        console.log(`1[Checkout][res][buy]id: ${id}, amount: ${data.amount}`);
        message = 'Venda efetuada com sucesso!';
      }

      console.log(`--------------Checkout res-----------------`);
      Loading.finished();
      Dialog.success({ message: message });
    } catch {
      Loading.finished();
      Dialog.error({ message: 'Erro ao fazer o pagamento' });
    }

  }

  return (
    <KeyboardAwareScrollView>

      <VStack flex={1} p={3}>
        <Heading my={10}>
          Compra de ativos
        </Heading>
        {/* <Text color={'#dde4eb'} marginLeft={'3'} marginBottom={'1'}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        /> */}
        <Text color={'#dde4eb'} marginLeft={'3'} marginBottom={'1'}>Valor</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="R$ 0.00"
              onChangeText={onChange}
              errorMessage={errors.amount?.message}
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
