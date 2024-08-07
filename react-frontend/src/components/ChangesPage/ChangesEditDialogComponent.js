import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
const typeofchangeArray = ["A","B","C","D","E","F","G"];
const typeofchangeOptions = typeofchangeArray.map((x) => ({ name: x, value: x }));
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ChangesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [change, setChange] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount codechanges
                    client
                        .service("codechanges")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCodechangesId } })
                        .then((res) => {
                            setChange(res.data.map((e) => { return { name: e['location'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Codechanges", type: "error", message: error.message || "Failed get codechanges" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            change: _entity?.change?._id,
typeofchange: _entity?.typeofchange,
changefrom: _entity?.changefrom,
changeto: _entity?.changeto,
        };

        setLoading(true);
        try {
            
        await client.service("changes").patch(_entity._id, _data);
        const eagerResult = await client
            .service("changes")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "change",
                    service : "codechanges",
                    select:["location"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info changes updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const changeOptions = change.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Changes" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="changes-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="change">Change:</label>
            <Dropdown id="change" value={_entity?.change?._id} optionLabel="name" optionValue="value" options={changeOptions} onChange={(e) => setValByKey("change", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="typeofchange">Typeofchange:</label>
            <Dropdown id="typeofchange" value={_entity?.typeofchange} options={typeofchangeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("typeofchange", e.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="changefrom">Changefrom:</label>
            <InputText id="changefrom" className="w-full mb-3 p-inputtext-sm" value={_entity?.changefrom} onChange={(e) => setValByKey("changefrom", e.target.value)}  required  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="changeto">Changeto:</label>
            <InputText id="changeto" className="w-full mb-3 p-inputtext-sm" value={_entity?.changeto} onChange={(e) => setValByKey("changeto", e.target.value)}  required  />
        </span>
        </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created At:"></Tag>{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="created By:"></Tag>{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated At:"></Tag>{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0"><Tag value="last Updated By:"></Tag>{" " +_entity?.updatedBy?.name}</p></div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ChangesCreateDialogComponent);
