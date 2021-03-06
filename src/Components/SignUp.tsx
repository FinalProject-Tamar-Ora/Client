
import { TextField, Button } from "@material-ui/core";
import "./SignIn.css";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../store/Actions/User";
import { IstatePro } from "../store/Reducers/ProductInList";
import { getPurchaseList } from "../store/Actions/ProductInList";
import { getList } from "./LogIn";

export function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const addCustomer = async (data: User) => {
    console.log("start");
    console.log(data);
    await axios
      .post("https://localhost:44378/api/Customer", data)
      .then(async () => {
        await axios
          .get(
            `https://localhost:44378/api/GetCustomerByPasswordName/${data.password}/${data.firstName}/${data.lastName}`
          )
          .then(async (response) => {
            // handleClose
            console.log(response.data);
            let user: User;
            user = {
              firstName: response.data.FirstName,
              lastName: response.data.LastName,
              id: response.data.CustomerId,
              password: response.data.Password,
              email: response.data.Email,
            };
            localStorage.setItem("user", JSON.stringify(user));
            console.log("user :   " + { user });
            dispatch(signUp(user));
            const list: IstatePro = (await getList(user)) as IstatePro;
            localStorage.setItem("productList", JSON.stringify(list));
            dispatch(getPurchaseList(list));
          })
          .then(() => {
            navigate("/allCategory");
          });
      });
  };

  return (
    <div>
      <div className="card">
        <h1>הרשמה</h1>

        <form id="sinUpForm" onSubmit={handleSubmit(addCustomer)}>
          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              label="שם פרטי"
              {...register("firstName", {
                required: true,
                minLength: 2,
                maxLength: 10,
              })}
            />
            {errors.firstName?.type === "minLength" && (
              <span>שם פרטי קצר מדי</span>
            )}
            {errors.firstName?.type === "maxLength" && (
              <span>שם פרטי ארוך מדי</span>
            )}
            {errors.firstName?.type === "required" && <span>חסר שם פרטי</span>}
          </span>
          <br />
          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              label="שם משפחה"
              {...register("lastName", {
                required: true,
                minLength: 2,
                maxLength: 10,
              })}
            />
            {errors.lastName?.type === "required" && <span>חסר שם משפחה</span>}
            {errors.lastName?.type === "minLength" && (
              <span>שם משפחה קצר מדי</span>
            )}
            {errors.lastName?.type === "maxLength" && (
              <span>שם משפחה ארוך מדי</span>
            )}
          </span>
          <br />
          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="password"
              label="סיסמה"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 8,
              })}
            />
            {errors.password?.type === "required" && <span>חסרה סיסמה</span>}
            {errors.password?.type === "minLength" && (
              <span>סיסמה קצרה מדי</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span>סיסמה ארוכה מדי</span>
            )}
          </span>
          <br />
          <span className="op">
            <TextField
              id="standard-basic"
              variant="standard"
              type="email"
              label="מייל"
              {...register("email", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
            />
          </span>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            הרשם
          </Button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
