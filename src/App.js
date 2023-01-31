import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import style from "./App.css";

function App() {
  // const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState("");

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <main>
      <h3 style={{ color: "#fff" }}>Welcome From My Open AI</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={style.container}>
        <textarea
          style={{
            backgroundColor: "transparent",
            padding: "10px",
            fontSize: "24px",
            color: "#fff",
            borderRadius: "10px",
          }}
          // className={style.questionsBox}
          cols="80"
          rows="5"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write Your Question...."></textarea>
        <br />
        <button
          style={{
            width: "30vw",
            padding: "10px 30px",
            margin: " 20px",
            backgroundColor: "#7f7f",
            color: "#000",
            borderRadius: "10px",
            border: "none",
          }}
          // className={style.generateBtn}
          onClick={handleClick}
          disabled={loading || prompt.length === 0}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <p
        style={{
          width: "95vw",
          height: "30vh",
          padding: "20px",
          backgroundColor: "#ffffff50",
          fontWeight: "700",
          borderRadius: "20px",
        }}>
        {loading ? "Wait....." : result.length !== 0 ? result : "Result"}
      </p>
    </main>
  );
}

export default App;
