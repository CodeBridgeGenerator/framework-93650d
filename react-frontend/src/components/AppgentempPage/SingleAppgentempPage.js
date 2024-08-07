import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import CodechangesPage from "../CodechangesPage/CodechangesPage";

const SingleAppgentempPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [name, setName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("appgentemp")
            .get(urlParams.singleAppgentempId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"name"] }})
            .then((res) => {
                set_entity(res || {});
                const name = Array.isArray(res.name)
            ? res.name.map((elem) => ({ _id: elem._id, env: elem.env }))
            : res.name
                ? [{ _id: res.name._id, env: res.name.env }]
                : [];
        setName(name);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Appgentemp", type: "error", message: error.message || "Failed get appgentemp" });
            });
    }, [props,urlParams.singleAppgentempId]);


    const goBack = () => {
        navigate("/appgentemp");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">App Gen Templates</h3>
                </div>
                <p>appgentemp/{urlParams.singleAppgentempId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Dbservice</label><p className="m-0 ml-3" >{_entity?.dbservice}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Typename</label><p className="m-0 ml-3" >{_entity?.typename}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Githubrepolocation</label><p className="m-0 ml-3" >{_entity?.githubrepolocation}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Name</label>
                    {name.map((elem) => (
                        <Link key={elem._id} to={`/environments/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.env}</p>
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
        <CodechangesPage/>
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

export default connect(mapState, mapDispatch)(SingleAppgentempPage);
