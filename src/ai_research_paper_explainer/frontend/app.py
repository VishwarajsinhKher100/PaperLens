import streamlit as st
from views.auth import render_auth_view
from views.generator import render_generator_view
from views.history import render_history_view

st.set_page_config(
    page_title="Research Paper Explainer",
    page_icon="📄",
    layout="wide",
)

# Initialize Session States
if "token" not in st.session_state:
    st.session_state.token = ""
if "current_explanation" not in st.session_state:
    st.session_state.current_explanation = ""
if "current_form_data" not in st.session_state:
    st.session_state.current_form_data = {}
if "history" not in st.session_state:
    st.session_state.history = []

# --- Authentication View ---
if not st.session_state.token:
    render_auth_view()
else:
    # --- Main Application Header ---
    head_col1, head_col2 = st.columns([4, 1])
    with head_col1:
        st.title("📄 Research Paper Explainer")
        st.caption("Powered by LangChain & Groq AI")
    with head_col2:
        if st.button("Logout", type="secondary"):
            st.session_state.token = ""
            st.session_state.history = []
            st.session_state.current_explanation = ""
            st.rerun()

    # Sidebar Navigation & History
    st.sidebar.header("Navigation")
    page = st.sidebar.radio("Go to", ["Generate Explanation", "Saved History"])

    if page == "Saved History":
        render_history_view()
    elif page == "Generate Explanation":
        render_generator_view()
