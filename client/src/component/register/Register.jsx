import { useState, useEffect } from "react";
import categories from "./categories";
import { v4 as uuidv4 } from "uuid";
import { validate } from "./auxiliary";
import { getCities } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { postCustomer, postSeller } from "../../redux/actions";
import "../register/register.css";

function Register(props) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const [input, setInput] = useState({
    supplier: false,
    //image: props.picture,
    email: props.email.toLowerCase(),
    name: props.name.toLowerCase(),

    namesupplier: "",
    phone: "",
    image: "",
    adress: "",
    cities: [],
    cuit: "",
    category: "",
  });
  // console.log(input.cities,'INPUUUUUTTT')

  const [error, setError] = useState({});

  const changeState = function (e) {
    if (e.target.name !== "supplier") {
      e.preventDefault();
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      // console.log(error)
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
      setError({
        ...error,
        namesupplier: "Se requiere un nombre",
      });

      if (e.target.checked === false) {
      }
    }
  };

  const handleSelectCity = (e) => {
    if (!input.cities.length) {
      setError({
        ...error,
        cities: undefined,
      });
    }
    if (!input.cities.includes(e.target.value)) {
      setInput({
        ...input,
        cities: [...input.cities, e.target.value],
      });
    }
  };

  const option_categories = () => {
    return (
      categories &&
      categories.map((category) => (
        <option key={uuidv4()} value={category}>
          {category}
        </option>
      ))
    );
  };

  const registerSupplier = (e) => {
    const name = input.namesupplier;
    const { phone, email, adress, cuit, image, category } = input;
    if (!Object.keys(error).length) {
      console.log({ phone, email, adress, cuit, image, category, name });
      dispatch(
        postSeller({
          phone,
          email,
          adress,
          cuit,
          image,
          category,
          name,
          cities: [],
        })
      );
    } else {
      e.preventDefault();
      alert(
        "Hay campos incompletos o inválidos. Por favor revise su formulario, todos los campos son obligatorios."
      );
    }
  };

  const registerCustomer = () => {
    const { name, email } = input;
    console.log({ name, email });
    dispatch(postCustomer({ name, email }));
  };

  console.log(input.cities, "CITIES SELECCIONADAS");

  const handleDeleteCity = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (input.cities.length === 1) {
      setError({
        ...error,
        cities: "Debe seleccionar al menos una ciudad!",
      });
    }
    setInput({
      ...input,
      cities: input.cities.filter((g) => g !== e.target.value),
    });
  };

  const handleSellerImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInput({
          ...input,
          image: reader.result,
        });

        // setInput.image(reader.result);
      };
    } else {
      setInput({
        ...input,
        image: "",
      });
      // setInput.image("");
    }
  };

  return (
    <>
      <form className="form-check form-switch my-3 mx-5" id="formDiv">
        <div className="text-center">
          <h1>¡COMPLETA TU REGISTRO!</h1>
        </div>

        <div className="input-group has-validation my-3 mx-5">
          <input
            className="form-check-input me-3"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            name="supplier"
            onClick={(e) => changeState(e)}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Soy proveedor
          </label>
        </div>

        <div className="input-group has-validation my-3 mx-5">
          <input
            className="form-check-input me-3"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            name="supplier"
            onClick={(e) => changeState(e)}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Soy proveedor
          </label>
        </div>

        <div className="input-group has-validation">
          <div className="form-floating is-invalid">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="floatingInputName"
              value={props.email}
            />
            <label htmlFor="floatingInputGroup2">Email</label>
          </div>
        </div>

        {!input.supplier ? (
          <>
            <div className="input-group has-validation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="green"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <div className="form-floating is-invalid">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="floatingInputName"
                  placeholder="Name"
                  value={props.name}
                />
                <label htmlFor="floatingInputGroup2">Nombre</label>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                type="submit"
                value="registerCustomer"
                onClick={(event) => {
                  registerCustomer(event);
                }}
              >
                Confirmar
              </button>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="m-0 row justify-content-center">
              <div className="col-auto p-5 text-center" id="contForm">
                <h5>Información requerida para ser proveedor de Not Waste</h5>

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="text"
                      className={
                        !error.namesupplier
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="Name"
                      name="namesupplier"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label for="floatingInputGroup2">
                      Nombre del establecimiento
                    </label>
                    {error.namesupplier && (
                      <div className="invalid-feedback">
                        {error.namesupplier}
                      </div>
                    )}
                  </div>
                </div>

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="file"
                      accept="image/"
                      className={
                        !error.image
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputFormImage"
                      placeholder="imagen"
                      name="imagen"
                      required
                      onChange={handleSellerImageUpload}
                    />
                    {/* <label for="floatingInputGroup2">Foto de perfil</label> */}
                    {error.image && (
                      <div className="invalid-feedback">{error.image}</div>
                    )}
                  </div>
                </div>
                {input.image ? (
                  <>
                    <br />
                    <img
                      src={input.image}
                      alt="Seller image!"
                      style={{ width: "300px" }}
                    />
                  </>
                ) : (
                  <p>Cargando imagen...</p>
                )}

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="tel"
                      className={
                        !error.phone
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="phone"
                      name="phone"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label for="floatingInputGroup2">Número de teléfono</label>
                  </div>
                  {error.phone && (
                    <div className="invalid-feedback">{error.phone}</div>
                  )}
                </div>

                <br />

                {/* <div className="form-control ms-2"> */}
                <select
                  className="form-select ms-2"
                  aria-label="Default select example"
                  id="inputForm"
                  onChange={(e) => handleSelectCity(e)}
                  value=""
                >
                  <option selected>Seleccione su localidad</option>
                  {cities?.map((cities, i) => {
                    return (
                      <option key={i} value={cities.name}>
                        {cities.name}
                      </option>
                    );
                  })}
                </select>
                {/* </div> */}

                <div>
                  {input.cities?.map((ci, i) => (
                    <div key={i}>
                      <p>{ci}</p>
                      <button
                        value={ci}
                        name="cities"
                        onClick={(e) => handleDeleteCity(e)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="text"
                      className={
                        !error.adress
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="adress"
                      name="adress"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label>Dirección</label>
                    {error.adress && (
                      <div className="invalid-feedback">{error.adress}</div>
                    )}
                  </div>
                </div>

                <br />

                <div className="input-group has-validation">
                  <div className="form-floating is-invalid">
                    <input
                      type="tel"
                      className={
                        !error.cuit
                          ? "form-control ms-2"
                          : "form-control is-invalid ms-2"
                      }
                      id="inputForm"
                      placeholder="cuit"
                      name="cuit"
                      required
                      onChange={(e) => changeState(e)}
                    />
                    <label for="floatingInputGroup2">CUIT</label>
                  </div>
                  {error.cuit && (
                    <div className="invalid-feedback">{error.cuit}</div>
                  )}
                  {error.category && (
                    <div className="invalid-feedback">{error.category}</div>
                  )}
                </div>

                <br />

                {/* <div className="form-control ms-2"> */}
                <select
                  className="form-select form-select-lg ms-2"
                  name="category"
                  id="inputForm"
                  aria-label=".form-select-lg example"
                  onChange={(e) => changeState(e)}
                  value={input.category}
                >
                  <option value="">Seleccione su categoría</option>
                  {option_categories()}
                </select>
                {/* </div> */}

                <div className="col-12">
                  <button
                    id="buttonRegister"
                    className="btn btn-primary"
                    type="submit"
                    value="register"
                    onClick={(event) => {
                      registerSupplier(event);
                    }}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
      {/* {console.log(VerifyProfile("Miguel@gmail.com"))} */}
    </>
  );
}

export default Register;
