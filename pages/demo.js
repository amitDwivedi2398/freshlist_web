import Layout from "./../components/layout/Layout";
import { usePlacesWidget } from "react-google-autocomplete";

function Demo() {
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyDnDczEoeUwf7bN5b_-223uvrecPVfzggE",
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="About">
        <input ref={ref}></input>
      </Layout>
    </>
  );
}

export default Demo;
