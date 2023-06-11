function Login() {
    const handleSubmit = () => {

    }

    return (
        <>
            <header>
                <h1>Login Form</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username"/>
                <label>Password</label>
                <input type="text" name="password"/>
                <input type="submit"/>
            </form>
        </>
    );
}

export default Login;