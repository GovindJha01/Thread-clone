import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../components/common/Loading";

const Register = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUserName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    await loginUser({ email, password });
  };

  const handleRegister = async () => {
    await signinUser({ userName, email, password });
  };

  useEffect(() => {
    if (signinUserData?.isSuccess) {
      toast.success(signinUserData?.data?.msg, { autoClose: 2500, transition: Bounce });
    } else if (signinUserData?.isError) {
      toast.error(signinUserData?.error?.data?.msg, { autoClose: 2500, transition: Bounce });
    }
  }, [signinUserData.isSuccess, signinUserData.isError]);

  useEffect(() => {
    if (loginUserData?.isSuccess) {
      toast.success(loginUserData?.data?.msg, { autoClose: 2500, transition: Bounce });
    } else if (loginUserData?.isError) {
      toast.error(loginUserData?.error?.data?.msg, { autoClose: 2500, transition: Bounce });
    }
  }, [loginUserData.isSuccess, loginUserData.isError]);

  if (signinUserData.isLoading || loginUserData.isLoading) {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <Loading />
      </Stack>
    );
  }

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Left Side: Vibrant Gradient */}
      {isMdUp && (
        <Box
          flex={1}
          sx={{
            background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 10s ease infinite",
          }}
        />
      )}

      {/* Right Side: Form Card */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            mb={3}
            sx={{
              fontFamily: "'Pacifico', cursive",
              background: "linear-gradient(to right, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Thread
          </Typography>

          <Typography variant="subtitle1" mb={3} textAlign="center">
            {isLogin ? "Welcome back! Please login" : "Create your account"}
          </Typography>

          <Stack spacing={2}>
            {!isLogin && (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={isLogin ? handleLogin : handleRegister}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(to right, #f09433, #e6683c, #dc2743)",
                ":hover": {
                  background: "linear-gradient(to right, #dc2743, #cc2366)",
                },
              }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </Stack>

          <Typography mt={3} fontSize="0.9rem" textAlign="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Box
              component="span"
              onClick={toggleMode}
              sx={{
                color: "#dc2743",
                fontWeight: 600,
                cursor: "pointer",
                ml: 1,
              }}
            >
              {isLogin ? "Sign up" : "Login"}
            </Box>
          </Typography>
        </Paper>
      </Box>

      {/* Keyframe for gradient animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Stack>
  );
};

export default Register;
