import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import ChangesPage from "../ChangesPage/ChangesPage";

const SingleCodechangesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [editor, setEditor] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("codechanges")
            .get(urlParams.singleCodechangesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"editor"] }})
            .then((res) => {
                set_entity(res || {});
                const editor = Array.isArray(res.editor)
            ? res.editor.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.editor
                ? [{ _id: res.editor._id, name: res.editor.name }]
                : [];
        setEditor(editor);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Codechanges", type: "error", message: error.message || "Failed get codechanges" });
            });
    }, [props,urlParams.singleCodechangesId]);


    const goBack = () => {
        navigate("/codechanges");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Code Changes</h3>
                </div>
                <p>codechanges/{urlParams.singleCodechangesId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Location</label><p className="m-0 ml-3" >{_entity?.location}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Filename</label><p className="m-0 ml-3" >{_entity?.filename}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">TemplateLocalFile</label><p className="m-0 ml-3" >{_entity?.templateLocalFile}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Editor</label>
                    {editor.map((elem) => (
                        <Link key={elem._id} to={`/appgentemp/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.name}</p>
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
        <ChangesPage/>
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

export default connect(mapState, mapDispatch)(SingleCodechangesPage);
