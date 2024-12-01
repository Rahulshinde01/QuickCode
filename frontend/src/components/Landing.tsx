import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

const SLUG_WORKS = ["car", "dog", "computer", "person", "inside", "word", "for", "please", "to", "cool", "open", "source"];
const SERVICE_URL = "http://localhost:3001";

// Themes
const lightTheme = {
  background: "#f9f9f9",
  color: "#333",
  inputBackground: "#fff",
  inputBorder: "#ddd",
  buttonBackground: "#007bff",
  buttonHover: "#0056b3",
};

const darkTheme = {
  background: "#1e1e2f",
  color: "#f9f9f9",
  inputBackground: "#2a2a3d",
  inputBorder: "#444",
  buttonBackground: "#6272a4",
  buttonHover: "#7082c2",
};

// Styled Components
const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  font-family: 'Fira Code', monospace;
  transition: background-color 0.3s, color 0.3s;
`;

const Pitch = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 6px;
  width: 280px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.color};
  box-sizing: border-box;
  transition: all 0.3s;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBackground};
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.4);
  }
`;

const StyledSelect = styled.select`
  margin: 10px 0;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 6px;
  width: 300px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.color};
  transition: all 0.3s;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBackground};
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.4);
  }
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: white;
  font-size: 16px;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: white;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

function getRandomSlug() {
  let slug = "";
  for (let i = 0; i < 3; i++) {
    slug += SLUG_WORKS[Math.floor(Math.random() * SLUG_WORKS.length)];
  }
  return slug;
}

export const Landing = () => {
  const [language, setLanguage] = useState("node-js");
  const [replId, setReplId] = useState(getRandomSlug());
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <ToggleButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </ToggleButton>
        <Pitch>
          Write, Run, Build Your Code, Your Way - No Installation Needed. We Handle Node.js, Python, and More.
        </Pitch>
        <Title>QuickCode</Title>
        <StyledInput
          onChange={(e) => setReplId(e.target.value)}
          type="text"
          placeholder="Repl ID"
          value={replId}
        />
        <StyledSelect
          name="language"
          id="language"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="node-js">Node.js</option>
          <option value="python">Python</option>
        </StyledSelect>
        <StyledButton
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await axios.post(`${SERVICE_URL}/project`, { replId, language });
            setLoading(false);
            navigate(`/coding/?replId=${replId}`);
          }}
        >
          {loading ? "Starting your Environment..." : "Good to Go Now, Start Coding"}
        </StyledButton>
      </Container>
    </ThemeProvider>
  );
};
