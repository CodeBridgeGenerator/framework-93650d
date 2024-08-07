import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

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

const ServicegentempCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.templateLocalFile)) {
                error["templateLocalFile"] = `TemplateLocalFile field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.destFolder)) {
                error["destFolder"] = `DestFolder field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.destFilename)) {
                error["destFilename"] = `DestFilename field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.customrelationship)) {
                error["customrelationship"] = `Customrelationship field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            templateLocalFile: _entity?.templateLocalFile,destFolder: _entity?.destFolder,destFilename: _entity?.destFilename,customrelationship: _entity?.customrelationship,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("servicegentemp").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Service Gen Template created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Service Gen Template" });
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

    

    return (
        <Dialog header="Create Service Gen Template" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="servicegentemp-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="templateLocalFile">TemplateLocalFile:</label>
                <InputText id="templateLocalFile" className="w-full mb-3 p-inputtext-sm" value={_entity?.templateLocalFile} onChange={(e) => setValByKey("templateLocalFile", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["templateLocalFile"]) ? (
              <p className="m-0" key="error-templateLocalFile">
                {error["templateLocalFile"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="destFolder">DestFolder:</label>
                <InputText id="destFolder" className="w-full mb-3 p-inputtext-sm" value={_entity?.destFolder} onChange={(e) => setValByKey("destFolder", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["destFolder"]) ? (
              <p className="m-0" key="error-destFolder">
                {error["destFolder"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="destFilename">DestFilename:</label>
                <InputText id="destFilename" className="w-full mb-3 p-inputtext-sm" value={_entity?.destFilename} onChange={(e) => setValByKey("destFilename", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["destFilename"]) ? (
              <p className="m-0" key="error-destFilename">
                {error["destFilename"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="customrelationship">Customrelationship:</label>
                <InputText id="customrelationship" className="w-full mb-3 p-inputtext-sm" value={_entity?.customrelationship} onChange={(e) => setValByKey("customrelationship", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customrelationship"]) ? (
              <p className="m-0" key="error-customrelationship">
                {error["customrelationship"]}
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

export default connect(mapState, mapDispatch)(ServicegentempCreateDialogComponent);
