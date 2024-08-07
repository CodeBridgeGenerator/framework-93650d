import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ServicechangesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [Change, setChange] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [Change], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.typeofchanges)) {
                error["typeofchanges"] = `Typeofchanges field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            Change: _entity?.Change?._id,typeofchanges: _entity?.typeofchanges,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("servicechanges").create(_data);
        const eagerResult = await client
            .service("servicechanges")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "Change",
                    service : "servicegentemp",
                    select:["templateLocalFile"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Service Gen Changes updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Service Gen Changes" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount servicegentemp
                    client
                        .service("servicegentemp")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleServicegentempId } })
                        .then((res) => {
                            setChange(res.data.map((e) => { return { name: e['templateLocalFile'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Servicegentemp", type: "error", message: error.message || "Failed get servicegentemp" });
                        });
                }, []);

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

    const ChangeOptions = Change.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Service Gen Changes" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="servicechanges-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Change">Change:</label>
                <Dropdown id="Change" value={_entity?.Change?._id} optionLabel="name" optionValue="value" options={ChangeOptions} onChange={(e) => setValByKey("Change", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Change"]) ? (
              <p className="m-0" key="error-Change">
                {error["Change"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="typeofchanges">Typeofchanges:</label>
                <InputText id="typeofchanges" className="w-full mb-3 p-inputtext-sm" value={_entity?.typeofchanges} onChange={(e) => setValByKey("typeofchanges", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["typeofchanges"]) ? (
              <p className="m-0" key="error-typeofchanges">
                {error["typeofchanges"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(ServicechangesCreateDialogComponent);
