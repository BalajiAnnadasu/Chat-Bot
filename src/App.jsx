import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CodeBlockWithCopy from "./components/CodeBlockWithCopy";
import { AiOutlineWechatWork } from "react-icons/ai";
import NavBar from "./components/NavBar";


function App() {
 const[question,setQuestion]=useState("");
 const[answer,setAnswer]=useState("");
 const [chatHistory, setChatHistory] = useState([]);

 async function generateAnswer(){
  if (!question.trim()) return;
  setAnswer("Loading...");
  const responce= await axios({
    url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAg0amDIsFZMtjqy13cC8ERNJ2YqDbFAVo",
    method: "post",
    data:{
      contents:[
        {parts:[{text:question}]},
      ],
    },
  });
  const airesponce=responce ['data']['candidates']['0']['content']['parts']['0']['text'];
  setChatHistory([...chatHistory, { question, answer: airesponce }]);

      // Clear the question input and display the new answer
      setQuestion("");
      setAnswer(airesponce);
      
 }
 function handleKeyDown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    // Prevent adding a new line in the textarea
    event.preventDefault();
    generateAnswer();
  } 
 }
  return (
  <>
  <NavBar />
  <div className="main">
   {/* <header className="header">Chat bot</header> */}
    <div className="chat-area">
      {chatHistory.length === 0 ? (
          <div className="intro-message"> 
            <div className="chaticon"><AiOutlineWechatWork /></div>
            <p>Welcome to the Chat Bot!</p>
            <p>Ask me anything, and I'll try my best to answer.</p>
            <p>Type your question below and press Enter or click "Generate" to get started.</p>
          </div>
        ) : (chatHistory.map((chat, index) => (
          <div key={index} className="chat-entry">
            <p className="user-message"><ReactMarkdown>{chat.question}</ReactMarkdown> </p>
            <div className="bot-message">
              
              {/* <ReactMarkdown>{chat.answer}</ReactMarkdown> */}
              <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => {
                        const codeContent = node.children[0]?.children[0]?.value || "";
                        return (
                          <CodeBlockWithCopy
                            code={codeContent.trim()}
                            {...props}
                          />
                        );
                      },
                      // Prevent rendering code outside pre
                      code: ({ node, ...props }) => {
                        return <code {...props}>{props.children}</code>;
                      },
                    }}
                  >
                    {chat.answer}
                  </ReactMarkdown>
            </div>
          </div>
        )))}
     {/* <pre>{answer}</pre> */}
    </div>
   <div className="input-area">
      <textarea className="textbox" value={question} onChange={(e)=>setQuestion(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your question here..." cols="auto" rows="auto"></textarea>
      <button onClick={generateAnswer} type="submit">Genrate</button>
   </div>
  </div>
  </>
  );
}

export default App;
