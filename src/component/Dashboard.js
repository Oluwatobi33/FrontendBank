import React from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom'
import first from "../assest/image/first.png";
import second from "../assest/image/second.png";
import third from "../assest/image/third.png";
import fourth from "../assest/image/fourth.png";
import check from "../assest/image/check.png";
import reinter from "../assest/image/reinter.png";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "./Endpoint";
import { Link } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
    const [transactiontime, settransactiontime] = useState("");
    const [Reguser, setReguser] = useState([]);
    const [CurrentEmail, setCurrentEmail] = useState([]);
    const [currenUserDetails, setcurrenUserDetails] = useState([]);
    const [customer, setcustomer] = useState([]);
    const [userdetails, setuserdetails] = useState([]);
    const [name, setname] = useState("");
    const [pin, setpin] = useState("");
    const [id, setid] = useState("");
    const [Name, setName] = useState("");
    const [account, setaccount] = useState("");
    const [bvn, setbvn] = useState("");
    const [total, settotal] = useState("");
    const [amount, setamount] = useState("");
    const [customers, setcustomers] = useState("");
    const [Err, setErr] = useState("");
    const [Error, setError] = useState("");
    const [email, setemail] = useState("");
    const [validem, setvalidem] = useState("");
    const [loader, setloader] = useState("");
    const [vpin, setvpin] = useState("");
    const [wrong, setwrong] = useState("");
    const [amIv, setamIv] = useState("");
    const [bal, setbal] = useState("");
    const [accountNumber, setaccountNumber] = useState("");
    // const [accpin, setaccpin] = useState("")
    const token = localStorage.token;
    const [isloader, setisloader] = useState(false);
    const [balance, setbalance] = useState("");
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let time = new Date().toLocaleTimeString();
    let DateCreated = `${date}-${month}-${year}-${time}`;
    let customerId = localStorage.ade;
    const Navigate = useNavigate();
    // console.log('6418e4a6fb869aa91ec71977');
    useEffect(() => {
        if (token) {
            // let Reguser = JSON.parse(localStorage.tobi)
            // setReguser(JSON.parse(localStorage.tobi))
            // setCurrentEmail(JSON.parse(localStorage.signinEmail))
            // setcurrenUserDetails(JSON.parse(localStorage.uselogin))
            // let email = JSON.parse(localStorage.uselogin).email

            // let hass = JSON.parse(localStorage.tobi).find((item, index) => item.email === email)
            // let index = JSON.parse(localStorage.tobi).findIndex((x) => x.email == email)
            // console.log(Reguser[index])
            // setcustomer(Reguser[index])
            axios
                .get(`${baseurl}dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((data) => {
                    if (data) {
                        let Err = data.data.message;
                        console.log(Err);
                        if (Err == "Invalid Token") {
                            Navigate("/signin");
                            // setbvn(data.data.result[0].bvn)
                            // localStorage.id = data.data.result[0]._id
                            // setid(data.data.result[0]._id)ba
                        } else {
                            setuserdetails(data.data.result[0]);
                            localStorage.ade = data.data.result[0]._id;
                            // console.log(data.data.result[0]);
                            // setName(data.data.result[0].Fullname);
                            // setbalance(data.data.result[0].balance);
                            // setbvn(data.data.result[0].bvn);
                            // setemail(data.data.result[0].Email)
                        }
                    } else {
                        localStorage.removeItem("token");
                        localStorage.removeItem("ade");
                        Navigate("/signin");
                    }
                });
        } else {
            Navigate("/signin");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        Navigate("/signin");
    };

    const seta = (e) => {
        let account = e.target.value;
        axios.post(`${baseurl}account`, { account }).then((data) => {
            if (data) {
                let Mes = data.data.message;
                console.log(Mes);
                if (Mes == "Valid account") {
                    setaccount(account);
                    // let Er = ""
                    // setError(Er)
                    setvalidem(data.data.result[0].Fullname);
                } else {
                    if (Mes == "Invalid account") {
                        setamIv(Mes);
                    }
                }
            }
        });
    };

    const setam = (e) => {
        let amt = e.target.value;
        if (amt > 49) {
            setamount(amt);
            let Er = "";
            setErr(Er);
        } else {
            let Er = "minimum amount is #50";
            setErr(Er);
        }
    };

    const add = () => {
        if (account !== "" && amount !== "") {
            setisloader(true);
            axios
                .get(`${baseurl}dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((data) => {
                    if (data) {
                        let Err = data.data.message;
                        if (Err == "Valid Token") {
                            // console.log(pin);
                            setaccountNumber(data.data.result[0].accountNumber);
                            if (data.data.result[0].accountNumber == account) {
                                // let Er = ""
                                // setErr(Er)
                                axios
                                    .post(`${baseurl}pin`, { pin, customerId })
                                    .then((data) => {
                                        if (data) {
                                            let Mes = data.data.message;
                                            console.log(Mes);
                                            if (Mes == "Valid pin") {
                                                setvpin(Mes);
                                                axios
                                                    .post(`${baseurl}account`, { account })
                                                    .then((data) => {
                                                        console.log(data.data.result[0]);
                                                        if (data) {
                                                            let Mes = data.data.message;
                                                            if (Mes == "Valid account") {
                                                                // const id = data.data.result[0]._id
                                                                let details = data.data.result[0];
                                                                console.log(details);
                                                                let newBalance =
                                                                    parseInt(details.balance) + parseInt(amount);
                                                                console.log(newBalance);
                                                                const info = {
                                                                    Fullname: details.Fullname,
                                                                    Email: details.Email,
                                                                    Password: details.Password,
                                                                    PhoneNumber: details.PhoneNumber,
                                                                    Pin: details.Pin,
                                                                    bvn: details.bvn,
                                                                    accountNumber: details.accountNumber,
                                                                    balance: newBalance,
                                                                    DateCreated: details.DateCreated,
                                                                    _id: details._id,
                                                                };
                                                                axios
                                                                    .post(`${baseurl}update`, info)
                                                                    .then((data) => {
                                                                        if (data) {
                                                                            let bes = "+ ₦";
                                                                            let his = {
                                                                                customerId,
                                                                                Fullname: details.Fullname,
                                                                                accountNumber: details.PhoneNumber,
                                                                                Email: details.email,
                                                                                Tbalance: newBalance,
                                                                                added: `${bes} ${amount}`,
                                                                                Pin: details.Pin,
                                                                            };
                                                                            axios
                                                                                .post(`${baseurl}history`, his)
                                                                                .then((data) => {
                                                                                    if (data) {
                                                                                        window.location.reload();
                                                                                    }
                                                                                });
                                                                        }
                                                                    });
                                                            }
                                                        }
                                                    });
                                            }
                                        }
                                    });
                            } else {
                                if (data.data.result[0].accountNumber !== account) {
                                    let Er = "Wrong account number";
                                    setErr(Er);
                                }
                            }
                        }
                    } else {
                        localStorage.removeItem("token");
                        Navigate("/signin");
                    }
                });
        } else {
            let err = " please fill the input";
            setErr(err);
        }
    };

    const Transfer = () => {
        if (account !== "" && amount !== "") {
            let Er = "";
            setError(Er);
            setloader((prev) => true);
            axios
                .get(`${baseurl}dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((data) => {
                    if (data) {
                        let Err = data.data.message;
                        if (Err == "Valid Token") {
                            setbal(data.data.result[0].balance);
                            if (data.data.result[0].accountNumber != account) {
                                let Er = "";
                                setError(Er);
                                axios
                                    .post(`${baseurl}pin`, { pin, customerId })
                                    .then((data) => {
                                        if (data) {
                                            let vail = data.data.message;
                                            if (vail == "Valid pin") {
                                                axios
                                                    .post(`${baseurl}account`, { account })
                                                    .then((data) => {
                                                        if (data) {
                                                            let Mes = data.data.message;
                                                            if (Mes == "account valid") {
                                                                let id = data.data.result[0]._id;
                                                                let detail = data.data.result[0];
                                                                let balan =
                                                                    parseInt(detail.balance) + parseInt(amount);
                                                                let infor = {
                                                                    Fullname: detail.Fullname,
                                                                    Email: detail.Email,
                                                                    Password: detail.Password,
                                                                    PhoneNumber: detail.PhoneNumber,
                                                                    Pin: detail.Pin,
                                                                    bvn: detail.bvn,
                                                                    accountNumber: detail.accountNumber,
                                                                    balance: balan,
                                                                    DateCreated: detail.DateCreated,
                                                                    _id: detail._id,

                                                                    // Name: detail.Name,
                                                                    // phoneno: detail.phoneno,
                                                                    // email: detail.email,
                                                                    // password: detail.password,
                                                                    // pin: detail.pin,
                                                                    // accountNumber: detail.phoneno,
                                                                    // DateCreated: detail.DateCreated,
                                                                    // bvn: detail.bvn,
                                                                    // balance: balan,
                                                                    // _id: detail._id,
                                                                };
                                                                axios
                                                                    .post(`${baseurl}update`, infor)
                                                                    .then((data) => {
                                                                        if (data) {
                                                                            let Upd = data.data.message;
                                                                            if (Upd == "updated") {
                                                                                let user = customers;
                                                                                let userb =
                                                                                    parseInt(user.balance) -
                                                                                    parseInt(amount);
                                                                                let uinfor = {
                                                                                    Fullname: detail.Fullname,
                                                                                    Email: detail.Email,
                                                                                    Password: detail.Password,
                                                                                    PhoneNumber: detail.PhoneNumber,
                                                                                    Pin: detail.Pin,
                                                                                    bvn: detail.bvn,
                                                                                    accountNumber: detail.accountNumber,
                                                                                    balance: userb,
                                                                                    DateCreated: detail.DateCreated,
                                                                                    _id: detail._id,
                                                                                };
                                                                                axios
                                                                                    .post(`${baseurl}update`, uinfor)
                                                                                    .then((data) => {
                                                                                        if (data) {
                                                                                            let be = "- ₦";
                                                                                            let his = {
                                                                                                customerId,
                                                                                                Name: detail.Name,
                                                                                                accountNumber: detail.phoneno,
                                                                                                Bbalance: user.balance,
                                                                                                transfer: `${be} ${amount}`,
                                                                                                Tbalance: userb,
                                                                                                transactiontime:
                                                                                                    transactiontime,
                                                                                            };
                                                                                            axios
                                                                                                .post(`${baseurl}history`, his)
                                                                                                .then((data) => {
                                                                                                    if (data) {
                                                                                                        let be = "+ ₦";
                                                                                                        let hisr = {
                                                                                                            receiverId: detail._id,
                                                                                                            Name: user.Name,
                                                                                                            accountNumber:
                                                                                                                user.phoneno,
                                                                                                            Bbalance: detail.balance,
                                                                                                            received: `${be} ${amount}`,
                                                                                                            Tbalance: balan,
                                                                                                            transactiontime:
                                                                                                                transactiontime,
                                                                                                        };
                                                                                                        axios
                                                                                                            .post(
                                                                                                                `${baseurl}history`,
                                                                                                                hisr
                                                                                                            )
                                                                                                            .then((data) => {
                                                                                                                if (data) {
                                                                                                                    setloader(
                                                                                                                        (prev) => false
                                                                                                                    );
                                                                                                                    window.location.reload();
                                                                                                                }
                                                                                                            });
                                                                                                    }
                                                                                                });
                                                                                        }
                                                                                    });
                                                                            }
                                                                        }
                                                                    });
                                                            }
                                                        }
                                                    });
                                            } else {
                                                setloader((prev) => false);
                                                let Er = "Incorrect pin";
                                                setError(Er);
                                            }
                                        }
                                    });
                            } else {
                                setloader((prev) => false);
                                let Er =
                                    "This is your account number, you can not transfer money to your account by your self, go to add money instead";
                                setError(Er);
                            }
                        } else {
                            localStorage.removeItem("token");
                            localStorage.removeItem("customerId");
                            Navigate("/SignIn");
                        }
                    }
                });
        } else {
            let err = "Please fill all your input outlet";
            setError(err);
        }
    };

    const [moneyTransfer, setmoneyTransfer] = useState("");
    const [Amount, setAmount] = useState("");
    const [err, seterr] = useState("");
    const Amoney = () => {
        let email = currenUserDetails.email;
        let hass = Reguser.find((item, index) => item.email === email);
        let index = Reguser.findIndex((x) => x.email == email);
        let customer = Reguser[index];
        if (moneyTransfer !== "" && Amount !== "") {
            let user = { moneyTransfer, Amount };
            let remain = parseInt(Reguser[index].defaultMoney) + parseInt(Amount);
            setReguser((Reguser[index].defaultMoney = remain));
            localStorage.setItem("tobi", JSON.stringify(Reguser));
            // window.location.reload()
        } else {
            let err = "Pls fill the input";
            seterr(err);
        }
    };
    // const Transfer = () => {
    //     // let email = currenUserDetails.email;
    //     // let hass = Reguser.find((item, index) => item.email === email);
    //     // let index = Reguser.findIndex((x) => x.email == email);
    //     // let customer = Reguser[index];
    //     // if (moneyTransfer !== "" && Amount !== "") {
    //     //     let user = { moneyTransfer, Amount };
    //     //     let remain = parseInt(Reguser[index].defaultMoney) - parseInt(Amount);
    //     //     setReguser((Reguser[index].defaultMoney = remain));
    //     //     localStorage.setItem("tobi", JSON.stringify(Reguser));
    //     //     // window.location.reload()
    //     // } else {
    //     //     let err = "Pls fill the input";
    //     //     seterr(err);
    //     // }
    // };
    const Airtime = () => {
        // let email = currenUserDetails.email;
        // let hass = Reguser.find((item, index) => item.email === email);
        // let index = Reguser.findIndex((x) => x.email == email);
        // let customer = Reguser[index];
        // console.log(customer);
        // if (moneyTransfer !== "" && Amount !== "") {
        //     let user = { moneyTransfer, Amount };
        //     let remain = parseInt(Reguser[index].defaultMoney) - parseInt(Amount);
        //     setReguser((Reguser[index].defaultMoney = remain));
        //     localStorage.setItem("tobi", JSON.stringify(Reguser));
        //     window.location.reload();
        // } else {
        //     let err = "Pls fill the input";
        //     seterr(err);
        // }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="wrapper">
                            <li className="nav-item px-3">
                                <Link to="/hist" className="btn btn-success">
                                    history
                                </Link>
                                <Link
                                    to="/Signin"
                                    className="btn btn-primary"
                                    onChange={logout}
                                >
                                    LogOut
                                </Link>
                            </li>
                            <button
                                type="button"
                                class="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                style={{ border: "none" }}
                            >
                                <img
                                    src={first}
                                    style={{ width: "80px" }}
                                    alt="none"
                                    className="img-responsive img-fluid"
                                />
                                <h6>Buy</h6>
                                <p>Airtime</p>
                            </button>
                            <div
                                class="modal fade"
                                id="exampleModal"
                                data-bs-backdrop="static"
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                                Buy your Airtime
                                            </h5>
                                        </div>
                                        <div class="modal-body">
                                            <span style={{ color: "red" }}>{err}</span>
                                            <input
                                                type="number"
                                                placeholder="Enter your account number"
                                                className="form-control my-3"
                                                onChange={(e) => seta(e)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Enter the Ammount"
                                                className="form-control"
                                                onChange={(e) => e.target.value}
                                            />
                                            <h5 className="text-dark mb-4">Total Balance</h5>
                                            <p className="text-dark">{userdetails.balance}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                onClick={Airtime}
                                            >
                                                Buy Airtime
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="wrapper">
                            <button
                                onClick={() => add()}
                                type="button"
                                class="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#Add"
                                style={{ border: "none" }}
                            >
                                <img
                                    src={third}
                                    style={{ width: "80px" }}
                                    alt="none"
                                    className="img-responsive img-fluid"
                                />
                                <h6>Add</h6>
                                <p>Money</p>
                            </button>
                            <div
                                class="modal fade"
                                id="Add"
                                data-bs-backdrop="static"
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                                Add Money
                                            </h5>
                                        </div>
                                        <div class="modal-body">
                                            <span className={validem ? "alert alert-success" : ""}>
                                                {validem}
                                            </span>
                                            <span style={{ color: "red" }}>{amIv}</span>
                                            <span style={{ color: "red" }}>{Err}</span>
                                            <label for="recipient-name" className="text-dark">
                                                Enter account
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter your account number"
                                                className="form-control my-3"
                                                onChange={(e) => seta(e)}
                                            />
                                            <label for="recipient-name" className="text-dark">
                                                Enter Amount
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Add money"
                                                className="form-control my-3"
                                                onChange={(e) => setam(e)}
                                            />
                                            <label for="recipient-name" className="text-dark">
                                                Transaction pin
                                            </label>
                                            <br />
                                            <span style={{ color: "red" }}>{vpin}</span>

                                            {/* <input
                                                type="text"
                                                placeholder="Enter your pin"
                                                className="form-control my-3"
                                                onChange={(e) => setpin(e)}
                                            /> */}
                                            <input
                                                type="password"
                                                maxLength={4}
                                                placeholder="Your transaction-pin"
                                                className="form-control"
                                                onChange={(e) => setpin(e.target.value)}
                                                style={{ backgroundColor: "#F5F7FA" }}
                                            />
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-primary"
                                                onClick={() => add()}
                                            >
                                                Add Money
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="wrapper">
                            <img
                                src={second}
                                style={{ width: "80px" }}
                                alt="none"
                                className="img-responsive img-fluid"
                            />
                            <h6>AccountNumber:</h6>
                            <h3 className="text-dark">{userdetails.accountNumber}</h3>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <div className="wrapper">
                                <button
                                    type="button"
                                    class="btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#transfer"
                                    style={{ border: "none" }}
                                >
                                    <img
                                        src={first}
                                        style={{ width: "80px" }}
                                        alt="none"
                                        className="img-responsive img-fluid"
                                    />
                                    <h6>Transfer</h6>
                                    <p>Money</p>
                                </button>
                                <div
                                    class="modal fade"
                                    id="transfer"
                                    data-bs-backdrop="static"
                                    tabindex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">
                                                    Transfer Section
                                                </h5>
                                            </div>
                                            <div class="modal-body">
                                                <p className="pt-2 ade">{userdetails.Fullname}</p>
                                                <span style={{ color: "red" }}>{Error}</span>
                                                <div className="mb-3">
                                                    <label
                                                        for="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Recipient Account
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Recipient Account Number"
                                                        onChange={(e) => seta(e)}
                                                        style={{ backgroundColor: "#F5F7FA" }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <span
                                                        className={validem ? "alert alert-success" : ""}
                                                    >
                                                        {validem}
                                                    </span>
                                                    <span style={{ color: "red" }}>{amIv}</span>
                                                    <label
                                                        for="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Amount"
                                                        className="form-control"
                                                        onChange={(e) => setam(e)}
                                                        style={{ backgroundColor: "#F5F7FA" }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <span style={{ color: "red" }}>{vpin}</span>
                                                    <label
                                                        for="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Transaction pin
                                                    </label>
                                                    <input
                                                        type="password"
                                                        maxLength={4}
                                                        placeholder="Your transaction-pin"
                                                        className="form-control"
                                                        onChange={(e) => setpin(e.target.value)}
                                                        style={{ backgroundColor: "#F5F7FA" }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label
                                                        for="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Your Balance
                                                    </label>
                                                    <h5 className="pt-2">
                                                        <b>₦</b> {userdetails.balance}
                                                    </h5>
                                                </div>
                                                <h5 className="text-dark">Total Balance</h5>
                                                <p>{balance}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-primary"
                                                    onClick={Transfer}
                                                >
                                                    Transfer Money
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="wrapper">
                                <img
                                    src={third}
                                    style={{ width: "80px" }}
                                    alt="none"
                                    className="img-responsive img-fluid"
                                />
                                <h6>Account Name:</h6>
                                <h3 className="text-dark">{userdetails.Fullname}</h3>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="wrapper">
                                <img
                                    src={second}
                                    style={{ width: "80px" }}
                                    alt="none"
                                    className="img-responsive img-fluid"
                                />
                                <h6>BVN-Number</h6>
                                <p className="text-dark">{userdetails.bvn}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section9">
                <div className="container">
                    <div className="row">
                        <div className="totalPrice">
                            <p style={{ color: "#00425f", fontSize: "23px" }}>
                                Balance @ {DateCreated}
                            </p>
                            <h4
                                className="tbalance"
                                style={{ color: "#00425f", height: "33px" }}
                            >
                                ₦ {userdetails.balance}
                            </h4>

                            <div className="resize d-flex">
                                <p style={{ color: "#00425f", fontSize: "20px" }}>
                                    VERVE E-Cash{" "}
                                    <img
                                        src={check}
                                        style={{ width: "20px" }}
                                        alt="none"
                                        className="img-responsive img-fluid ms-3"
                                    />
                                </p>
                                <p style={{ color: "#00425f" }} className="ms-5 fs-2 fw-bold">
                                    Email:{userdetails.Email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section10">
                <div className="container">
                    <div className="row justify-content-center">
                        <h4
                            style={{
                                color: "#00425f",
                                borderBottom: "1px solid #00425f",
                                marginBottom: "12px",
                            }}
                        >
                            Quick Service
                        </h4>
                        <div className="row justify-content-center d-flex py-3">
                            <div className="col-sm-6 col-md-4">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "black" }}
                                >
                                    Electricty
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 pt-3 pt-md-0">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "black" }}
                                >
                                    Sport Bet
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center d-flex py-3">
                            <div className="col-sm-6 col-md-4">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "red" }}
                                >
                                    Electricty
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 pt-3 pt-md-0">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "blue" }}
                                >
                                    Sport Bet
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center d-flex py-3">
                            <div className="col-sm-6 col-md-4">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "violet" }}
                                >
                                    Airlines
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 pt-3 pt-md-0">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "diamond" }}
                                >
                                    Loan
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center d-flex py-3">
                            <div className="col-sm-6 col-md-4">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "blue" }}
                                >
                                    western Union
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 pt-3 pt-md-0">
                                <div
                                    className="text-white ele"
                                    style={{ backgroundColor: "purple" }}
                                >
                                    internet service
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section11 mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mt-5">
                            <img
                                src={reinter}
                                className="img-responsive img-fluid text-white"
                            />
                            <p className="text-dark fw-bold h3">
                                Quickteller Paypoint Agents always have business
                            </p>
                            <button type="submit" class="btn btn-secondary rounded rounded-4">
                                To become a Paypoint vist
                                <a className="text-white px-3" href="#">
                                    www.qucikteller.com
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className='section6'>
            <div className='container'>
                <div className="row justify-content-center pt-4">
                    <div className="col-md-4">
                        <div className=" circle4">
                            <div className="custom">
                                <h4 className='text-dark text-center' style={{ fontSize: "15px" }}>{currenUserDetails.fullname}</h4>
                                <p className='text-dark text-center'>{currenUserDetails.email}</p>
                                <p className='text-dark text-center'>{currenUserDetails.cardno}</p>
                                <h3 className='text-dark text-center'>{currenUserDetails.bvn}</h3>
                                <h4 className='text-dark text-center'>{currenUserDetails.cardno}</h4>
                                <h5 className='text-dark text-center'>{defaultMoney}</h5>
                            </div>
                        </div>
                        <p className='text-white text-center fw-normal' style={{ fontSize: "20px" }}>We are dedicated to making the rest of your life as rewarding as your job.</p>
                    </div>
                </div> */}
            {/* <div className="row justify-content-center">
                    <div className="col-lg-4  col-md-4 text-center">
                        <image src="file:///C:/Users/Bakare%20Oluwatobi/Pictures/5e203a0288f6a461c456295e_Salary.svg" alt='ss' className='img-responsive img-fluid w-40 rand' />
                        <p style={{ fontSize: "12px", color: "white" }}>Competitive compensation</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="col-lg-4 col-md-4 text-center">
                            <image src='file:///C:/Users/Bakare%20Oluwatobi/Pictures/People.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                            <p style={{ fontSize: "12px", color: "white" }}>Comprehensive health plans</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="col-lg-4 col-md-4 text-center">
                            <image src='file:///C:/Users/Bakare%20Oluwatobi/Pictures/5e203a0276a59b03ed9a0164_House.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                            <p style={{ fontSize: "12px", color: "white" }}>Learning and development</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4  col-md-4 text-center">
                        <image src='https://ca col-sm-6 reers.interswitchgroup.com/Content/Assests/images/Food.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                        <p style={{ fontSize: "12px", color: "white" }}>Competitive compensation</p>
                    </div>
                    <div className="col-md-4">
                        <div className="col-lg-4  col-md-4 text-center">
                            <image src='https://uploads-ssl.webflow.com/5e1eeca4f33b534003b7d964/5e203a025cacb38782ee14ef_Car.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                            <p style={{ fontSize: "12px", color: "white" }}>Comprehensive health plans</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="col-lg-4 col-md-4 text-center">
                            <image src='https://uploads-ssl.webflow.com/5e1eeca4f33b534003b7d964/5e203a0276a59bb1219a0166_Time.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                            <p style={{ fontSize: "12px", color: "white" }}>Learning and development</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-4  text-center">
                        <image src='https://careers.interswitchgroup.com/Content/Assests/images/People.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                        <p style={{ fontSize: "12px", color: "white" }}>Competitive compensation</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="col-md-4 col-md-4  text-center">
                            <image src='https://careers.interswitchgroup.com/Content/Assests/images/Money.svg' alt='ss' className='img-responsive img-fluid w-40 rand' />
                            <p style={{ fontSize: "12px", color: "white" }}>Comprehensive health plans</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 ">
                        <div className="col-md-4 text-center">
                            <image src='https://uploads-ssl.webflow.com/5e1eeca4f33b534003b7d964/5e203a0276a59b03ed9a0164_House.svg' alt='ss' className='img-responsive img-fluid w-40 rand' style={{ color: "white" }} />
                            <p style={{ fontSize: "12px", color: "white" }}>Learning and development</p>
                        </div>
                    </div>
                </div> */}
        </>
    );
};

export default Dashboard;
