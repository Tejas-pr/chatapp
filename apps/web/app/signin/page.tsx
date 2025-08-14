"use client";

import { useState } from "react";
import styles from "./SignUpPage.module.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onsubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      setIsLoading(false);
      return;
    }
    try {
      console.log("hitting=================");
      const response = await axios.post(`${BACKEND_URL}/signin`, {
        email: formData.email,
        password: formData.password,
      });

      if (!response.data) {
        alert("Failed to sign up. Please try again later.");
        setIsLoading(false);
        return;
      }

      if(response.data) {
        const token = response.data.token;
        localStorage.setItem("chat-app-token", token);
      } else {
        alert("please sign in again");
        setIsLoading(false);
        router.push("/signin");
        return;
      }

      setFormData({
        email: "",
        password: "",
      });

      router.push("/roomenter");
      setIsLoading(false);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.signUpPage}>
      <div className={styles.bgElements}>
        <div className={`${styles.floatingShape} ${styles.shape1}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape2}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape3}`}></div>
        <div className={`${styles.floatingShape} ${styles.shape4}`}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.signUpCard}>
          <div className={styles.cardHeader}>
            <h1>Join ChatFlow</h1>
            <p>
              Create your account and start connecting with people around the
              world
            </p>
          </div>

          <form onSubmit={onsubmit} className={styles.signUpForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email address"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Create a strong password"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.loader}>
                  <div className={styles.spinner}></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className={styles.signInPrompt}>
            <p>
              No account?{" "}
              <a href="/signup" className={styles.link}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
