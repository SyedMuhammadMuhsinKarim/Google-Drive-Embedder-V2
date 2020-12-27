import React from "react";
import image from "./719.gif";
import { Link } from "react-router-dom";

const Input = ({ name, value, onChange, placeholder }) => (
  <div className="form-group">
    <input
      name={name}
      value={value}
      onChange={onChange}
      type="text"
      className="shadow form-control form-item"
      placeholder={placeholder}
    />
  </div>
);

const SubmitButton = ({ disabled }) => (
  <div>
    <button
      disabled={disabled}
      className="shadow form-control btn btn-danger"
      type="submit"
    >
      Generate Link
    </button>
  </div>
);

const FormActions = ({ loading, image, host }) => (
  <>
    <br />
    {loading ? (
      <img className="text-center" alt="Loading" src={image} />
    ) : (
      <></>
    )}
    {host && (
      <>
        <Link className="text-center" to={"/" + host}>
          Your Link
        </Link>
      </>
    )}
  </>
);

const FormText = () => (
  <>
    <span>Link Format: </span>
    <br />
    <code>https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_ID/view</code>
    <br />
    <code> https://drive.google.com/open?id=YOUR_GOOGLE_DRIVE_ID</code>
  </>
);

const Form = ({
  onChange,
  onSubmit,
  host,
  link,
  api,
  disabled,
  error,
  loading
}) => (
  <div className=" container">
    <form className="form" onSubmit={onSubmit}>
      <Input
        name="link"
        value={link}
        onChange={onChange}
        placeholder="Enter Google Drive Video Link..."
      />
      <Input
        name="api"
        value={api}
        onChange={onChange}
        placeholder="Enter Your Google Drive API key..."
      />
      <SubmitButton disabled={disabled} />

      <FormActions loading={loading} image={image} host={host} />
    </form>
    {!host && !loading && <FormText />}
  </div>
);

export default Form;
