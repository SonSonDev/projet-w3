import React, { useState } from "react";
import Typo from "../components/atoms/Typography";
import Spacer from "../components/atoms/Spacer";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import * as s from "../styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_ARTICLE } from "../graphql/article";

// "5efb38b824aa9a000784c28f"

export default function Article({ route, navigation }) {
  const { itemId } = route.params;
  console.log(itemId);

  const { data: { getArticle = {} } = {}, error, loading } = useQuery(
    GET_ARTICLE,
    {
      variables: { id: "5efb38b824aa9a000784c28f" },
    }
  );
  console.log(getArticle);
  return (
    <ScrollView style={[s.flex, s.backgroundPale, s.p2]}>
      <Image
        style={[s.p0]}
        source={getArticle.photo}
        style={{ width: 400, height: 400, backgroundColor: "#181a1e" }}
      />
      <Spacer spacing={40} />
      <Typo color="#181B1B" fontSize={14} text="Énergie" />
      <Spacer spacing={8} />
      <Typo
        fontSize={40}
        text="Dégivrer son congélateur régulièrement pour faire des économies"
      />
      <Spacer spacing={40} />
      <Typo
        fontSize={16}
        color="#181B1B"
        lineHeight={24}
        text="Si vous procédez à un dégivrage de votre congélateur et à son nettoyage régulièrement, vous n’aurez que peu de givre à l’intérieur et toute l’opération sera beaucoup plus rapide que si vous tardez à le faire. Dans ce cas-là, il vous suffira donc d’utiliser simplement une éponge avec de l’eau chaude ou tiède pour décoller la glace. Vous pouvez aussi vous munir d’un vaporisateur rempli d’eau bouillante pour en asperger les parois. Ensuite, frottez-les avec délicatesse, à l’aide d’un grattoir, pour être sûr d’éliminer toute la glace. Faites ceci jusqu’à ce que vous ayez enlevé tout le givre.
        
        Pour de multiples raisons, vous pouvez vous retrouver avec énormément de givre. Ne tardez donc pas à procéder à un dégivrage de votre congélateur ! Dans ce cas, pour vous faciliter les choses, faites bouillir de l’eau dans une casserole puis déposez-la sur un repose-plat dans votre appareil. Ensuite, fermez la porte et laissez agir la chaleur pendant environ 15 minutes. La glace fondra sans que vous ayez à fournir le moindre effort ! Il existe aussi d’autres astuces, comme l’utilisation d’un sèche-cheveux ou encore d’un nettoyeur vapeur. Cependant, même si la glace vous résiste, n’utilisez jamais d’objets pointus ou aiguisés qui ne feraient qu’endommager votre équipement, ou pire, le rendre complètement inutilisable.
        
        Pour terminer de dégivrer votre congélateur, il ne vous reste plus qu’une étape de nettoyage : celle de la carrosserie et des joints. Ce sont souvent des éléments oubliés qui peuvent pourtant être de véritables nids à bactéries ! Pour cela, vous pouvez comme précédemment utiliser une éponge imprégnée d’eau et de vinaigre blanc. Et c’est aussi un bon moment pour vérifier la bonne étanchéité des articulations : fermez alors la porte du congélateur sur une feuille de papier. Si vous réussissez trop facilement à l’enlever, c’est que les joints sont usés. Enfin, vous pouvez finir par rebrancher votre appareil. Pour y replacer les denrées alimentaires congelées."
      />
      <Spacer spacing={16} />
      <Typo color="#181B1B" fontSize={14} text="Articles similaires" />
      <Spacer spacing={4} />
    </ScrollView>
  );
}
