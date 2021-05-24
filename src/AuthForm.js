import React from "react";

const AuthForm = () => {

    return(
        <form>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export { AuthForm };