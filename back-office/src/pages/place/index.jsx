import React, { useState } from "react";
import { GET_PLACES } from "../../graphql/queries/places";
import { DELETE_PLACE } from "../../graphql/mutations/places";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../../components/loader";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";
import Table from "../../components/table";
import Tabs from "../../components/Tabs/Tabs.jsx";

const PlacesIndex = () => {
  console.log("render PlacesIndex");
  const [activeTabIndex, setactiveTabIndex] = useState(0);

  const [places, setPlaces] = useState([]);

  const { error, loading } = useQuery(GET_PLACES, {
    onCompleted: ({ getPlaces }) => setPlaces(getPlaces),
    onError: error => console.log(error.message)
  });

  const [deletePlace] = useMutation(DELETE_PLACE, {
    onCompleted: data => {
      window.location.reload();
      console.log(data);
    }
  });
  if (error) return <div>{error.message}</div>;

  if (loading) {
    return (
      <Loader/>
    );
  }

  const columns = [
    { title: "Nom", key: "name" },
    { title: "Catégorie", key: "category" },
    { title: "Adresse", key: "address", link: address => `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}`
    },
    { label: "Delete", handleClick: deletePlace },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") }
  ];

  const tabs = [
    { title: "All", filter: () => true },
    { title: "Shop", filter: ({ category }) => category === "SHOP" },
    { title: "Activity", filter: ({ category }) => category === "ACTIVITY" },
    { title: "Food", filter: ({ category }) => category === "FOOD" }
  ];

  const data = places
    .map(({ address: { street, zipCode, number }, ...place }) => ({
      ...place,
      address: `${number} ${street} ${zipCode}`
    }))
    .filter(tabs[activeTabIndex].filter);

  return (
    <section className="list-page">
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} onTabClick={setactiveTabIndex} action={{label:"Ajouter une adresse", url: "/place/create"}}/>
      <div className="padding16">
        <Table data={data} columns={columns} />
      </div>
    </section>
  );
};

export default withAuthenticationCheck(PlacesIndex, [
  "SUPER_ADMIN",
  "ADMIN",
  "USER"
]);
