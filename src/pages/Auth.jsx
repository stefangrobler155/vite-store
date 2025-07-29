import { useState } from "react"

export default function Auth() {
    const [logInData, setLoginData] = useState({
        loginUsername: "",
        loginPassword: "",
    });

    const [signUpData, setSignUpData] = useState({
        signupName: "",
        signupEmail: "",
        signupUsername: "",
        signupPassword: "",
    });

    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLoginData( (prevLoginData) => ( {
            ...prevLoginData,
            [name]: value,
        }))
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        console.log(logInData);
        setLoginData({
            loginUsername: "",
            loginPassword: "",
        })
    }

    const handleChangeSignup = (e) => {
    const {name, value} = e.target;
    setSignUpData( (prevData) => ( {
        ...prevData,
        [name]: value,
    }))
    }

    const signupSubmit = (e) => {
        e.preventDefault()
        console.log(signUpData);
        setSignUpData({
            signupName: "",
            signupEmail: "",
            signupUsername: "",
            signupPassword: "",
        })
    }

    return (
        <>
            <div className="container">
                <div className="toast-container"></div>
                <h1 className="my-4 text-center">Login / Signup</h1>
                <div className="row">
                {/* Login */}
                <div className="col-md-6">
                    <h2>Login</h2>
                    <form onSubmit={loginSubmit}>
                    <div className="mb-3">
                        <label htmlFor="loginUsername" className="form-label">Username</label>
                        <input
                        type="text"
                        id="loginUsername"
                        name="loginUsername"
                        value={logInData.loginUsername}
                        className="form-control"
                        placeholder="Enter username"
                        onChange={ handleLoginChange }
                        />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            id="loginPassword"
                            name="loginPassword"
                            value={logInData.loginPassword}
                            className="form-control"
                            placeholder="Enter password"
                            onChange={ handleLoginChange }
                        />
                    </div>
            
                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                    </form>
                </div>
                {/* signup */}
                <div className="col-md-6">
                    <h2>Signup</h2>
                    <form onSubmit={signupSubmit}>
                    <div className="mb-3">
                        <label htmlFor="signupName" className="form-label">Name</label>
                        <input
                            type="text"
                            id="signupName"
                            name="signupName"
                            value={signUpData.signupName}
                            className="form-control"
                            placeholder="Enter name"
                            onChange={ handleChangeSignup }
                        />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            id="signupEmail"
                            name="signupEmail"
                            value={signUpData.signupEmail}
                            className="form-control"
                            placeholder="Enter email"
                            onChange={ handleChangeSignup }
                        />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="signupUsername" className="form-label">Username</label>
                        <input
                            type="text"
                            id="signupUsername"
                            name="signupUsername"
                            value={signUpData.signupUsername}
                            className="form-control"
                            placeholder="Enter username"
                            onChange={ handleChangeSignup }
                        />
                    </div>
            
                    <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            id="signupPassword"
                            name="signupPassword"
                            value={signUpData.signupPassword}
                            className="form-control"
                            placeholder="Enter password"
                            onChange={ handleChangeSignup }
                        />
                    </div>
            
                    <button type="submit" className="btn btn-success mt-3">Signup</button>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}