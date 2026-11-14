import streamlit as st
from .api import login_user, register_user


def render_auth_view():
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.title("📄 Research Paper Explainer AI")
        tab1, tab2 = st.tabs(["Login", "Register"])

        with tab1:
            st.subheader("Welcome Back")
            login_email = st.text_input("Email", key="login_email")
            login_password = st.text_input(
                "Password", type="password", key="login_pass"
            )
            if st.button("Login", use_container_width=True):
                response = login_user(login_email, login_password)
                if response and response.status_code == 200:
                    data = response.json()
                    st.session_state.token = data.get("access_token")
                    st.success("Login successful!")
                    st.rerun()
                else:
                    detail = (
                        response.json().get("detail", "Login failed")
                        if response
                        else "Connection error"
                    )
                    st.error(f"⚠️ {detail}")

        with tab2:
            st.subheader("Create Account")
            reg_email = st.text_input("Email", key="reg_email")
            reg_password = st.text_input("Password", type="password", key="reg_pass")
            if st.button("Register", use_container_width=True):
                response = register_user(reg_email, reg_password)
                if response and response.status_code == 200:
                    st.success("Registration successful! Please login.")
                else:
                    detail = (
                        response.json().get("detail", "Registration failed")
                        if response
                        else "Connection error"
                    )
                    if isinstance(detail, list):
                        detail = ", ".join([d.get("msg", "") for d in detail])
                    st.error(f"⚠️ {detail}")
