import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";


function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
    <ToastContainer/>
    <GlobalStyles/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/user' element={<UserPage/>}/>
      </Routes>
   </ThemeProvider>
  );
}
export default App;



//       {/* <div className="canvas">
//         <Header />
//         <TypingBox />
//         <Footer />
//       </div> 
//  this all is moved to home page js file in order to give feel of react-routing and multiple pages from canvas
//       all code is copied and pasted */}


