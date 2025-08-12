"use client";

import { useState } from "react";
import styles from "./SignUpPage.module.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onsubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!formData.Name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      setIsLoading(false);
      return;
    }
    if (!formData.acceptTerms) {
      alert("You must accept the terms");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, {
        name: formData.Name,
        email: formData.email,
        password: formData.password,
      });

      if (!response.data) {
        alert("Failed to sign up. Please try again later.");
        setIsLoading(false);
        return;
      }
      setFormData({
        Name: "",
        email: "",
        password: "",
        acceptTerms: false,
      });

      router.push("/signin");
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
            <div className={styles.nameFields}>
              <div className={styles.inputGroup}>
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  placeholder="Enter your name..."
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      Name: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

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

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  className={styles.checkbox}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      acceptTerms: e.target.checked,
                    });
                  }}
                />
                <span className={styles.checkmark}></span>I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.loader}>
                  <div className={styles.spinner}></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className={styles.signInPrompt}>
            <p>
              Already have an account?{" "}
              <a href="/signin" className={styles.link}>
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
