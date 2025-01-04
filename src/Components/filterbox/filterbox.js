import { Fragment, useState, useEffect} from "react"
import "./filterbox.css";
import { SingleFilter } from "../singleFilter/singleFilter";
import axios from 'axios';


export const FilterBox = ({ onQueryParametersChange }) => {

    //const dataCategory = [{Category: "online"}, {Category: "home_tutions"},{Category: "in_person"}, {Category: "home_tutions1"}, {Category: "home_tutions2"},{Category: "home_tutions3"}, {Category: "home_tutions4"}]                
    //const dataCity = [{City: "Bangalore"}, {City: "Manglore"}, {City: "Vishakapatnam"}, {City: "Hyderabad"}];
    const [filterNames, setfilterNames] = useState([]);
    const [filterOption, setfilterOption] = useState({});
    
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`https://shikshana.vercel.app/api/filter/filterOptions`);
                setfilterNames(data[0].filterName)
                setfilterOption((data[0].filterOptions))
                //console.log("aneesh",data[0].filterOptions)
            } catch (error) {
                console.log(error);
            }
        })();
    },[])

    return (
       <Fragment>
            <h1 className="Filter-heading">Filter</h1>
            <div className="Singlefilter">
            {/* <SingleFilter data={dataCategory} filter={"Category"} onQueryParametersChange={onQueryParametersChange} />
            <SingleFilter data={dataCity} filter={"City"} onQueryParametersChange={onQueryParametersChange}/> */}
            {filterNames.map((filter) => (
                    <SingleFilter 
                        key={filter} 
                        data={filterOption[filter]} 
                        filter={filter} 
                        onQueryParametersChange={onQueryParametersChange} 
                    />
                ))}
            </div>
            
       </Fragment>
        
    )
} 