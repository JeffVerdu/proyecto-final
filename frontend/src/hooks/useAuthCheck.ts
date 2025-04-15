import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;

      if (Date.now() > exp) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (e) {
      console.error("Token inválido:", e);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);
}

