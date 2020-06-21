import React from 'react';
import { View } from 'react-native';
import CardAddress from '../components/organismes/CardAddress';

export default {
  title: 'CardAddress',
  component: CardAddress,
};

export const Large = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardAddress
      name="Hank Burger"
      category="Jssp"
      distance="12"
      headline="“Vegan par conviction, restaurateurs par évidence”"
      description="Une fois votre commande passée, enfoncez vous dans les coussins luxuriants et regardez comme les gens autour de vous sont beaux, ..."
      tags="ijoij"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
    />
  </View>
);

export const Small = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardAddress
      cardStyle="small"
      name="Hank Burger"
      category="Jssp"
      distance="12"
      headline="“Vegan par conviction, restaurateurs par évidence”"
      description="Une fois votre commande passée, enfoncez vous dans les coussins luxuriants et regardez comme les gens autour de vous sont beaux, ..."
      tags="ijoij"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
    />
  </View>
);
