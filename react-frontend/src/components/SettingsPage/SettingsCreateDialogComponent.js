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
import { Checkbox } from 'primereact/checkbox';

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

const SettingsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [settings, setSettings] = useState([])
const [domain, setDomain] = useState([])

    useEffect(() => {
        let init  = {debug: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [settings,domain], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.url)) {
                error["url"] = `Url field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            settings: _entity?.settings?._id,domain: _entity?.domain?._id,debug: _entity?.debug || false,url: _entity?.url,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("settings").create(_data);
        const eagerResult = await client
            .service("settings")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "settings",
                    service : "environments",
                    select:["type"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Settings updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Settings" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount environments
                    client
                        .service("environments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleEnvironmentsId } })
                        .then((res) => {
                            setSettings(res.data.map((e) => { return { name: e['type'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Environments", type: "error", message: error.message || "Failed get environments" });
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

    const settingsOptions = settings.map((elem) => ({ name: elem.name, value: elem.value }));
const domainOptions = domain.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Settings" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="settings-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="settings">Settings:</label>
                <Dropdown id="settings" value={_entity?.settings?._id} optionLabel="name" optionValue="value" options={settingsOptions} onChange={(e) => setValByKey("settings", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["settings"]) ? (
              <p className="m-0" key="error-settings">
                {error["settings"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="domain">Domain:</label>
                <Dropdown id="domain" value={_entity?.domain?._id} optionLabel="name" optionValue="value" options={domainOptions} onChange={(e) => setValByKey("domain", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["domain"]) ? (
              <p className="m-0" key="error-domain">
                {error["domain"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field flex mt-5">
            <span className="align-items-center">
                <label htmlFor="debug">Debug:</label>
                <Checkbox id="debug" className="ml-3" checked={_entity?.debug} onChange={(e) => setValByKey("debug", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["debug"]) ? (
              <p className="m-0" key="error-debug">
                {error["debug"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="url">Url:</label>
                <InputText id="url" className="w-full mb-3 p-inputtext-sm" value={_entity?.url} onChange={(e) => setValByKey("url", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["url"]) ? (
              <p className="m-0" key="error-url">
                {error["url"]}
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

export default connect(mapState, mapDispatch)(SettingsCreateDialogComponent);
