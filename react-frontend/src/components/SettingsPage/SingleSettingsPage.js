import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import ProtocolPage from "../ProtocolPage/ProtocolPage";

const SingleSettingsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [settings, setSettings] = useState([]);
const [domain, setDomain] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("settings")
            .get(urlParams.singleSettingsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"settings","domain"] }})
            .then((res) => {
                set_entity(res || {});
                const settings = Array.isArray(res.settings)
            ? res.settings.map((elem) => ({ _id: elem._id, type: elem.type }))
            : res.settings
                ? [{ _id: res.settings._id, type: res.settings.type }]
                : [];
        setSettings(settings);
const domain = Array.isArray(res.domain)
            ? res.domain.map((elem) => ({ _id: elem._id, type: elem.type }))
            : res.domain
                ? [{ _id: res.domain._id, type: res.domain.type }]
                : [];
        setDomain(domain);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Settings", type: "error", message: error.message || "Failed get settings" });
            });
    }, [props,urlParams.singleSettingsId]);


    const goBack = () => {
        navigate("/settings");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Settings</h3>
                </div>
                <p>settings/{urlParams.singleSettingsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Debug</label><p className="m-0 ml-3" ><i id="debug" className={`pi ${_entity?.debug?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Url</label><p className="m-0 ml-3" >{_entity?.url}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Settings</label>
                    {settings.map((elem) => (
                        <Link key={elem._id} to={`/environments/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.type}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Domain</label>
                    {domain.map((elem) => (
                        <Link key={elem._id} to={`/environments/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.type}</p>
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
        <ProtocolPage/>
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

export default connect(mapState, mapDispatch)(SingleSettingsPage);
