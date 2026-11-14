import streamlit as st
from .api import generate_explanation, save_explanation


def render_generator_view():
    col_config, col_output = st.columns([1, 1.5])

    with col_config:
        st.subheader("⚙️ Configuration")
        with st.form("paper_form"):
            paper_name = st.text_input(
                "Research Paper Title or Topic",
                placeholder="e.g., Attention Is All You Need",
            )
            tech_depth = st.selectbox(
                "Technical Depth",
                [
                    "Beginner (Simple terms & analogies)",
                    "Intermediate (Core concepts & logic)",
                    "Advanced / Expert (Equations & implementation details)",
                ],
            )
            reading_goal = st.selectbox(
                "Reading Goal / Style",
                [
                    "Quick Summary",
                    "General Overview & Key Takeaways",
                    "Deep Dive into Math & Code Snippets",
                ],
            )
            length = st.selectbox(
                "Explanation Length",
                [
                    "Short (1 min read)",
                    "Medium (Balanced overview)",
                    "Comprehensive Detailed Breakdown",
                ],
            )

            submit_btn = st.form_submit_button(
                "Generate Explanation", use_container_width=True
            )

        if submit_btn:
            if not paper_name.strip():
                st.error("Please enter a research paper title.")
            else:
                payload = {
                    "paper_name": paper_name,
                    "tech_depth": tech_depth,
                    "reading_goal": reading_goal,
                    "length": length,
                }
                with st.spinner("Analyzing research paper..."):
                    res = generate_explanation(payload)
                    if res and res.status_code == 200:
                        st.session_state.current_explanation = res.json().get(
                            "explanation", ""
                        )
                        st.session_state.current_form_data = payload
                    elif res:
                        st.error(
                            f"Error: {res.json().get('detail', 'Failed to generate explanation')}"
                        )
                    else:
                        st.error("Failed to connect to backend API.")

    with col_output:
        st.subheader("📝 Explanation Output")
        if st.session_state.current_explanation:
            st.markdown(st.session_state.current_explanation)

            st.divider()
            bookmark = st.checkbox("Bookmark Insight")
            if st.button("Save to History", type="primary"):
                save_payload = {
                    **st.session_state.current_form_data,
                    "explanation": st.session_state.current_explanation,
                    "is_bookmarked": 1 if bookmark else 0,
                }
                res = save_explanation(st.session_state.token, save_payload)
                if res and res.status_code == 200:
                    st.success("Saved successfully!")
                else:
                    st.error("Failed to save explanation.")
        else:
            st.info(
                "Configure your preferences on the left and click **Generate Explanation**."
            )
