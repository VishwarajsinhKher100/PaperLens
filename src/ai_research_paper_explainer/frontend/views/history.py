import streamlit as st
from .api import fetch_history


def render_history_view():
    st.header("📚 Saved History & Bookmarks")
    st.session_state.history = fetch_history(st.session_state.token)

    if not st.session_state.history:
        st.info("No saved explanations yet.")
    else:
        for item in st.session_state.history:
            with st.expander(
                f"{'⭐ ' if item.get('is_bookmarked') else ''}{item.get('paper_name')}"
            ):
                st.caption(
                    f"**Goal:** {item.get('reading_goal')} | **Depth:** {item.get('tech_depth')} | **Created:** {item.get('created_at')}"
                )
                st.markdown(item.get("explanation"))
