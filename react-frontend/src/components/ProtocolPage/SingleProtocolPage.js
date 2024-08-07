import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleProtocolPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [protocol, setProtocol] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("protocol")
            .get(urlParams.singleProtocolId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"protocol"] }})
            .then((res) => {
                set_entity(res || {});
                const protocol = Array.isArray(res.protocol)
            ? res.protocol.map((elem) => ({ _id: elem._id, domain: elem.domain }))
            : res.protocol
                ? [{ _id: res.protocol._id, domain: res.protocol.domain }]
                : [];
        setProtocol(protocol);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Protocol", type: "error", message: error.message || "Failed get protocol" });
            });
    }, [props,urlParams.singleProtocolId]);


    const goBack = () => {
        navigate("/protocol");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Protocol</h3>
                </div>
                <p>protocol/{urlParams.singleProtocolId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Host</label><p className="m-0 ml-3" >{_entity?.host}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Port</label><p className="m-0 ml-3" >{_entity?.port}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">User</label><p className="m-0 ml-3" >{_entity?.user}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Password</label><p className="m-0 ml-3" >{_entity?.password}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Protocol</label>
                    {protocol.map((elem) => (
                        <Link key={elem._id} to={`/settings/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.domain}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleProtocolPage);
