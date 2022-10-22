import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const FormComponent = ({ fields, btnTitle, onSubmit }) => {
  return (
    <form className="w-100" onSubmit={onSubmit}>
      {fields.map((fld, index) => (
        <MDBInput
          key={index * 4563}
          className="mb-4"
          type={fld.type}
          id={fld.id}
          label={fld.label}
          value={fld.value}
          onChange={(e) => fld.onChange(e.target.value)}
        />
      ))}
      <MDBBtn type="submit" block>
        {btnTitle}
      </MDBBtn>
    </form>
  );
};

export default FormComponent;
