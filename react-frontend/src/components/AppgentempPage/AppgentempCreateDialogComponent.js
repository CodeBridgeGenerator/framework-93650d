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

const AppgentempCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [name], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.typename)) {
                error["typename"] = `Typename field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.githubrepolocation)) {
                error["githubrepolocation"] = `Githubrepolocation field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name?._id,dbservice: _entity?.dbservice,typename: _entity?.typename,githubrepolocation: _entity?.githubrepolocation,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("appgentemp").create(_data);
        const eagerResult = await client
            .service("appgentemp")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "name",
                    service : "environments",
                    select:["env"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info App Gen Templates updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in App Gen Templates" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount environments
                    client
                        .service("environments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleEnvironmentsId } })
                        .then((res) => {
                            setName(res.data.map((e) => { return { name: e['env'], value: e._id }}));
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

    const nameOptions = name.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create App Gen Templates" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="appgentemp-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <Dropdown id="name" value={_entity?.name?._id} optionLabel="name" optionValue="value" options={nameOptions} onChange={(e) => setValByKey("name", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="dbservice">Dbservice:</label>
                <InputText id="dbservice" className="w-full mb-3 p-inputtext-sm" value={_entity?.dbservice} onChange={(e) => setValByKey("dbservice", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dbservice"]) ? (
              <p className="m-0" key="error-dbservice">
                {error["dbservice"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="typename">Typename:</label>
                <InputText id="typename" className="w-full mb-3 p-inputtext-sm" value={_entity?.typename} onChange={(e) => setValByKey("typename", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["typename"]) ? (
              <p className="m-0" key="error-typename">
                {error["typename"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="githubrepolocation">Githubrepolocation:</label>
                <InputText id="githubrepolocation" className="w-full mb-3 p-inputtext-sm" value={_entity?.githubrepolocation} onChange={(e) => setValByKey("githubrepolocation", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["githubrepolocation"]) ? (
              <p className="m-0" key="error-githubrepolocation">
                {error["githubrepolocation"]}
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

export default connect(mapState, mapDispatch)(AppgentempCreateDialogComponent);
