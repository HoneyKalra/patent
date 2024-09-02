import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PatentIntro from "./components/PatentIntro";
import PatentDetails from "./components/PatentsDetails";
import PatentContextProvider from "./context/PatentContextProvider";

function App() {
  if ("0") {
    console.log("will this code run ?");
  }
  const aarOfObj = [
    { name: "arif", age: 25 },
    { name: "deepak", age: 20 },
  ];
  aarOfObj.map((val) => {
    if (val.name === "arif") {
      val.age = 45;
    }
  });

  console.log(aarOfObj);

  let userName = prompt("what is your UserName");
  if (userName === "Admin") {
    let password = prompt("Please enter a password");
    if (password === "the master") {
      alert("welcome");
    } else if (password === "" || password === null) {
      console.log("cancel");
    } else {
      console.log("wrong password");
    }
  } else {
    console.log("i don't know you");
  }
  let height = 0;
  console.log(height ?? `height is 100`);
  // const obj = { name: "arif", age: 25 };

  // function object(object) {
  //   object.name = "honey";
  //   return obj;
  // }
  // console.log(object(obj), "ha");
  // let a = 7;
  // let b = a;
  // b = b + 3;
  // console.log(a, "aaaaaa");
  // function vara(num) {
  //   num = 9;
  //   return a;
  // }
  // console.log(vara(a), "hi");
  // async function getAIResponse(prompt) {
  //   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  //   const response = await fetch("https://api.openai.com/v1/completions", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       prompt: prompt,
  //       max_tokens: 100,
  //     }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data.choices[0].text.trim());
  //     return data.choices[0].text.trim();
  //   } else {
  //     console.error("Error:", response.statusText);
  //     return null;
  //   }
  // }

  // getAIResponse("'Captal of India is ?'")
  //   .then((response) => console.log("AI Response:", response))
  //   .catch((error) => console.error("Request failed:", error));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PatentIntro />,
    },

    {
      path: "/patent-details/:patentId",
      element: <PatentDetails />,
    },
  ]);

  return (
    <div className="App overflow-hidden">
      {/* <Navbar />*/}

      <PatentContextProvider>
        <RouterProvider router={router} />
      </PatentContextProvider>
    </div>
  );
}

export default App;
