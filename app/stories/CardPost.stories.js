import React from 'react';
import { View } from 'react-native';
import CardPost from '../components/organismes/CardPost';

export default {
  title: 'CardPost',
  component: CardPost,
};

export const Large = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardPost
      title="Parfumer son intérieur sans polluer"
      subtitle="Maison"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
    />
  </View>
);

export const Medium = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardPost
      title="Parfumer son intérieur sans polluer"
      subtitle="Maison"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
    />
  </View>
);

export const Small = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardPost
      title="Parfumer son intérieur sans polluer"
      subtitle="Maison"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
    />
  </View>
);
