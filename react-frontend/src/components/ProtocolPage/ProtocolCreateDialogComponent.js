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

const ProtocolCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [protocol, setProtocol] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [protocol], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.host)) {
                error["host"] = `Host field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.port)) {
                error["port"] = `Port field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            protocol: _entity?.protocol?._id,host: _entity?.host,port: _entity?.port,user: _entity?.user,password: _entity?.password,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("protocol").create(_data);
        const eagerResult = await client
            .service("protocol")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "protocol",
                    service : "settings",
                    select:["domain"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Protocol updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Protocol" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount settings
                    client
                        .service("settings")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleSettingsId } })
                        .then((res) => {
                            setProtocol(res.data.map((e) => { return { name: e['domain'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Settings", type: "error", message: error.message || "Failed get settings" });
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

    const protocolOptions = protocol.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Protocol" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="protocol-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="protocol">Protocol:</label>
                <Dropdown id="protocol" value={_entity?.protocol?._id} optionLabel="name" optionValue="value" options={protocolOptions} onChange={(e) => setValByKey("protocol", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["protocol"]) ? (
              <p className="m-0" key="error-protocol">
                {error["protocol"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="host">Host:</label>
                <InputText id="host" className="w-full mb-3 p-inputtext-sm" value={_entity?.host} onChange={(e) => setValByKey("host", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["host"]) ? (
              <p className="m-0" key="error-host">
                {error["host"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="port">Port:</label>
                <InputText id="port" className="w-full mb-3 p-inputtext-sm" value={_entity?.port} onChange={(e) => setValByKey("port", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["port"]) ? (
              <p className="m-0" key="error-port">
                {error["port"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="user">User:</label>
                <InputText id="user" className="w-full mb-3 p-inputtext-sm" value={_entity?.user} onChange={(e) => setValByKey("user", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["user"]) ? (
              <p className="m-0" key="error-user">
                {error["user"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="password">Password:</label>
                <InputText id="password" className="w-full mb-3 p-inputtext-sm" value={_entity?.password} onChange={(e) => setValByKey("password", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["password"]) ? (
              <p className="m-0" key="error-password">
                {error["password"]}
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

export default connect(mapState, mapDispatch)(ProtocolCreateDialogComponent);
