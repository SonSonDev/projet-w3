import React from 'react';
import { View } from 'react-native';
import CardPost from '../components/organismes/CardPost.jsx';

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
      large
    />
  </View>
);

export const Medium = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardPost
      title="Parfumer son intérieur sans polluer"
      subtitle="Maison"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
      medium
    />
  </View>
);

export const Small = () => (
  <View style={{ paddingTop: 50, paddingLeft: 50 }}>
    <CardPost
      title="Parfumer son intérieur sans polluer"
      subtitle="Maison"
      photos="https://www.phenicia-marseille.fr/templates/images/img1.jpg"
      small
    />
  </View>
);
