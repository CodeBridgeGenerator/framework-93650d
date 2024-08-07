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

const CodechangesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [editor, setEditor] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [editor], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.location)) {
                error["location"] = `Location field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.filename)) {
                error["filename"] = `Filename field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.templateLocalFile)) {
                error["templateLocalFile"] = `TemplateLocalFile field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            editor: _entity?.editor?._id,location: _entity?.location,filename: _entity?.filename,templateLocalFile: _entity?.templateLocalFile,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("codechanges").create(_data);
        const eagerResult = await client
            .service("codechanges")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "editor",
                    service : "appgentemp",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Code Changes updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Code Changes" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount appgentemp
                    client
                        .service("appgentemp")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleAppgentempId } })
                        .then((res) => {
                            setEditor(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Appgentemp", type: "error", message: error.message || "Failed get appgentemp" });
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

    const editorOptions = editor.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Code Changes" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="codechanges-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="editor">Editor:</label>
                <Dropdown id="editor" value={_entity?.editor?._id} optionLabel="name" optionValue="value" options={editorOptions} onChange={(e) => setValByKey("editor", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["editor"]) ? (
              <p className="m-0" key="error-editor">
                {error["editor"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) ? (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="filename">Filename:</label>
                <InputText id="filename" className="w-full mb-3 p-inputtext-sm" value={_entity?.filename} onChange={(e) => setValByKey("filename", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["filename"]) ? (
              <p className="m-0" key="error-filename">
                {error["filename"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(CodechangesCreateDialogComponent);
