import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { loginUser } from "../api"
/**
 * Challenge: Code the sad path 🙁
 * 5. Add an `error` state and default it to `null`. When the
 *    form is submitted, reset the errors to `null`. If there's
 *    an error from `loginUser` (add a .catch(err => {...}) in 
 *    the promise chain), set the error to the error that 
 *    comes back.
 * 6. Display the error.message below the `h1` if there's ever
 *    an error in state
 */

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState(
        { email: "", password: "" }
    )
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    
    const location = useLocation()
    
    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        setError(null)
        loginUser(loginFormData)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() =>{
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {
                location.state?.message && 
                <h3 className="login-error">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
            {
                error && 
                <h3 className="login-error">{error.message}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button 
                    disabled={status === "submitting"}
                >
                    {status === "submitting" 
                        ? "Logging in..." 
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )

}