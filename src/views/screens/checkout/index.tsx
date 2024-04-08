import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Text, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from "yup";
import ShoppingCartController from "../../../controllers/shopping_cart_controller";
import { OrderTypeEnum, OrderTypeTranslate } from "../../../enums";
import { Dialog, Loading, Money } from "../../../helpers";
import { Button, Input, Select } from '../../components';
import styles from "./styles";
import { BalanceModel } from "../../../models";
import BaasController from "../../../controllers/baas_controller";

type FormDataProps = {
  amount: number;
}

const schemaRegister = yup.object({
  amount: yup.string().required('Valor é obrigatório'),

})

export const Checkout = ({ route, navigation }: { route: any, navigation: any }) => {
  const { id, type }:{id: string, type: OrderTypeEnum} = route.params;
  const [balance, setBalance] = useState<BalanceModel | null>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schemaRegister) as any
  }
  );

  const handleNavigate = async () => {
    await navigation.navigate('Orders');
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        Loading.start();        
        const balance = await BaasController.balance();             
        setBalance(balance);
        Loading.finished();
      } catch (err) {
        Loading.finished();
        Dialog.error({ message: 'Erro ao buscar saldo' });
      }
    };

    fetchData();
  });

  async function handlerRegister(data: FormDataProps) {
    try {
      
      console.log(OrderTypeTranslate(type))

      if (type === OrderTypeEnum.BUY) {
        await ShoppingCartController.buy({ id: id, amount: data.amount });
        Dialog.success({ message: 'Compra efatuada com sucesso!' });
      }

      if (type === OrderTypeEnum.SALE) {
        await ShoppingCartController.sale({ id: id, amount: data.amount });      
        Dialog.success({ message: 'Venda efetuada com sucesso!'});
      }

      await handleNavigate();
    } catch(e) {
      Loading.finished();
      Dialog.error({ message: 'Erro ao fazer o pagamento!' + e});
    }
  }

  return (
    <>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{Money.formatCurrency({value: balance?.amount})}</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.headerContainer}>
          <Heading style={styles.header}>
              { OrderTypeTranslate(type) }
          </Heading>
        </View>
        <VStack style={styles.form}>
          <Text style={styles.form.formLabel}>Valor</Text>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="R$ 0.00"
                onChangeText={onChange}
                errorMessage={errors.amount?.message}
                keyboardType="numeric"
              />
            )}
          />
          <Button
            onPress={handleSubmit(handlerRegister)}
            title={"CONFIRMAR"}>
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </>
  );
}
