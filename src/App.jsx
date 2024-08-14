import { useState } from "react";
import axios from "axios"


const api_key="your api key";


const App = () => {
  {/* state variables used */}
  const [tone, setTone] = useState("");
  const [bio, setBio] = useState("");
  const [generatedBio, setGeneratedBio] = useState("");
  const [loading,setLoading]=useState(false); 


  {/* POST request to openai api endpoint */}
  const sendPostRequest = async () => {
    {/* Check if tone or bio is null */}
    if (!tone || !bio){ 
      alert("please fill the bio and tone correctly")
      return null
    }

    setLoading(true);

    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = api_key // Replace with your OpenAI API key
  
    const data = {
      model: 'gpt-4',
      messages: [
       
        {
          role: 'user',
          content: `Generate 4 similar bio for a dating app in about 50 words and give the numbering in front of each one, using this information : ${bio} and the nature of the bio should be based on the tone ${tone}`,
          
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      

     

      if (response.data){ 
        const generated = response.data.choices[0].message.content
        setGeneratedBio(generated)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  




/* Helper function to copy the code to clipboard */
  const handleCopyBio = () => {
    navigator.clipboard.writeText(generatedBio);
    alert("Bio copied to clipboard!");
  };

  

  return (
    <div className="container">
      <h1 className="title">Bumble Bio Generator</h1>
      <p className="subtitle">
        Create captivating Bumble bios that showcase your personality,
        interests, and ignite conversations.
      </p>

      <div className="form-container">
        <textarea
          placeholder="Describe your profile in short..."
          className="textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        ></textarea>
        <select
          className="select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a Tone
          </option>
          <option value="funny">Funny</option>
          <option value="casual">Casual</option>
          <option value="confident">Confident</option>
          <option value="adventurous">Adventurous</option>
          <option value="romantic">Romantic</option>
        </select>
        <button className="generate-button" onClick={sendPostRequest}>
          Generate
        </button>

      {/* if loading then show loading , otherwise render the content */}
{loading ? (<>Loading...</>): (<textarea
          className="output-textarea"
          placeholder="Your generated bio will appear here..."
          value={generatedBio}
          readOnly
        ></textarea>)}
        
        <button className="copy-button" onClick={handleCopyBio}>
          Copy
        </button>
      </div>

      <p className="message">
        Struggling with your Bumble bio? Our AI tool crafts witty, charming, and
        attention-grabbing profiles, making swiping a breeze!
      </p>
    </div>
  );
};

export default App;