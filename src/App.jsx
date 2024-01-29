import './App.css'
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import SnippetPage from "./pages/SnippetPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
            <Navbar />
              <Routes>
                  <Route path="/" element={<LoginPage />}/>
                  <Route path="/snippets" element={<HomePage />}/>
                  <Route path="/create" element={<CreatePage />}/>
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/signup" element={<SignupPage />}/>
                  <Route path="/snippet/:id" element={<SnippetPage />}/>
                  <Route path="/:id" element={<UpdatePage />}/>
                  <Route path="/search" element={<SearchPage />}/>
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App

