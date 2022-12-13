import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Layout from "../components/layout/Layout";

function Location() {
    return (
        <>
            <Layout parent="Home" sub="Location" >
                <div className="page-content pt-30 pb-20">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                 <div className="locate-box">
                                     <h4 className="mb-3">Add New Adress</h4>
                                    <form>
                                        <Row>
                                            <Col md="12">
                                               <input className="form-control loc-int" placeholder="Search Your Location" />
                                            </Col>
                                            <br></br>
                                            <Col md="12">
                                                <input className="form-control loc-int" placeholder="Use Current Location"/>
                                            </Col>
                                        </Row>
                                    </form>
                                 </div>
                            </div>
                            <div className="col-md-6">
                                 <div className="locate-box mt-10">
                                     <h4 className="mb-3">Seved  Adress</h4> 
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Location;
