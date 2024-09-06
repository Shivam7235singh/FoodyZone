import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const responce = await fetch(BASE_URL);
        const json = await responce.json();

        console.log(json);
        setFilteredData(json);
        setData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };

    fetchFoodData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };
  const filterBtns = [
    {
      name : "All",
      type :  "all",
      
    },
    {
      name : "Breakfast",
      type :  "breakfast",

    },
    {
      name : "Launch",
      type :  "lunch",

    },
    {
      name : "Dinner",
      type :  "dinner",

    }
  ];
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="search food.." />
          </div>
        </TopContainer>
        <FilterContainer>
           {filterBtns.map((value) =>  (  <Button 
            isSelected = {value.type === selectedBtn}
           key={value.name} 
           onClick={() => filterFood(value.type)}>{value.name}</Button>))}
        
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  .search {
    input {
      height: 40px;
      background-color: transparent;
      color: white;
      border: 1px solid red;
      border-radius: 5px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color : white;
      }
    }
  }
  @media (0<width <600px){
    height : 120px;
    flex-direction: column;

  }
`;

const FilterContainer = styled.section`
  display: flex;
  gap: 12px;
  justify-content: center;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color:  ${({isSelected}) => (isSelected ? "#f22f2f" : "#ff4343" ) } ;
  outline: 1px solid   ${({isSelected}) => (isSelected ? "#f7f1f1" : "#ff4343" ) } ;
  border-radius: 5px;
  padding: 4px 16px;
  border: none;
  color: white;

  cursor: pointer;
  &:hover {
    /* background-color: #97bc40; */
  }
`;
