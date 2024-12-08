import { useEffect, useState } from 'react'; // Removed 'customReactQuery' from imports
import './App.css';
import axios from "axios";

function App() {

  // const [products, error, loading] = customReactQuery('/api/products'); // Use the locally defined function
  // Define the customReactQuery function

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false); // Fixed: Changed to boolean instead of array
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('wood');

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('/api/products?search=' + search
          , { signal: controller.signal });
        console.log(response.data); 
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isCancel(error)){
          console.log("Request was cancelled", error.message);
          return 
        }
        setError(true);
        setLoading(false);
      }
    })();

    //cleanup
    return () =>{
      controller.abort();
    }

 
}, [search]);

  // if (error) {
  //   return <h1>Something went wrong! Please try again later.</h1>;
  // }
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      <div>
        <h1>Axios Chai</h1>
        <input type="text"  placeholder='Search'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        />
        {loading && <h1>Loading...</h1>}
        {error && <h1>Something went wrong! Please try again later.</h1>}
        <h2>Number of products: {products.length}</h2>
      </div>
    </>
  );
}

export default App;


const customReactQuery = (urlPath) =>{

  return [products, error, loading]
}

