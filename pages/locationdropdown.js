import Layout from "./../components/layout/Layout";
import { usePlacesWidget } from "react-google-autocomplete";

function LocationDropdown() {
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyDnDczEoeUwf7bN5b_-223uvrecPVfzggE",
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });
  return (
    <Layout parent="Home" sub="Find Location">
      <>
        <section className="mt-40 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="bx-place">
                  <form>
                    <div className="text-center">
                      <img
                        src="/assets/imgs/theme/location-img.png"
                        alt=""
                        width={200}
                      />
                    </div>
                    <h4 className="mb-3">Find Location</h4>
                    <input ref={ref}></input>
                    <button className="btn btn-heading btn-block hover-up mt-3">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}

export default LocationDropdown;
